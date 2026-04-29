import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import BillingCard from "../components/BillingCard";
import UsageSection from "../components/UsageSection";
import LogsTable from "../components/LogsTable";
import ApiKeys from "../components/ApiKeys";
import Playground from "../components/Playground";
import useDashboardStorage from "../hooks/useDashboardStorage";
import {
  getDashboardSummary,
  generateApiKey,
  getGatewayData,
  getMyApiKeys,
  getMyPlan,
  getUsageLogs,
  upgradeToPro,
} from "../services/api";
import {
  saveApiKeys,
  saveGatewayData,
  saveLogs,
} from "../store/dashboardStore";
import { getUserEmail } from "../store/authStore";

const fallbackPlan = {
  name: "FREE",
  requestPerMinute: 5,
  monthlyQuota: 10000,
  price: 0,
};

const fallbackUsage = [];

function Dashboard() {
  const email = getUserEmail() || "demo@fluxos.dev";
  const [plan, setPlan] = useState(fallbackPlan);
  const [usageCount, setUsageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [billingMessage, setBillingMessage] = useState("");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [isCallingGateway, setIsCallingGateway] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState("");
  const [gatewayError, setGatewayError] = useState("");
  const [apiKeyMessage, setApiKeyMessage] = useState("");
  const [latestGatewayJson, setLatestGatewayJson] = useState("");
  const [activityLogs, setActivityLogs] = useState([]);
  const {
    apiKeys,
    setApiKeys,
    gatewayData,
    setGatewayData,
    usageLogs,
    setUsageLogs,
  } = useDashboardStorage(email, fallbackUsage);

  useEffect(() => {
    if (apiKeys.length === 0) {
      setSelectedApiKey("");
      return;
    }

    const keyStillExists = apiKeys.some((item) => item.key === selectedApiKey);

    if (!selectedApiKey || !keyStillExists) {
      setSelectedApiKey(apiKeys[0].key);
    }
  }, [apiKeys, selectedApiKey]);

  useEffect(() => {
    if (gatewayData) {
      setLatestGatewayJson(JSON.stringify(gatewayData, null, 2));
    } else {
      setLatestGatewayJson("");
    }
  }, [gatewayData]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const addActivity = (message) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newItem = {
      id: Date.now() + Math.random(),
      message,
      time,
    };

    setActivityLogs((oldLogs) => [newItem, ...oldLogs].slice(0, 8));
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setPageError("");

    try {
      // Keep each backend call separate so one small failure does not reset
      // the whole dashboard back to FREE visually.
      try {
        const summaryData = await getDashboardSummary();

        if (summaryData) {
          setPlan({
            name: summaryData.plan || fallbackPlan.name,
            requestPerMinute:
              summaryData.requestsPerMinute || fallbackPlan.requestPerMinute,
            monthlyQuota: summaryData.monthlyQuota || fallbackPlan.monthlyQuota,
            price: summaryData.price ?? fallbackPlan.price,
          });
          setUsageCount(Number(summaryData.totalUsage || 0));
          addActivity("Dashboard summary fetched from backend");
        }
      } catch (error) {
        setPageError("Summary data could not be refreshed completely.");
        addActivity("Dashboard summary request failed");
      }

      try {
        const usageData = await getUsageLogs();

        if (Array.isArray(usageData) && usageData.length > 0) {
          setUsageLogs(usageData);
          saveLogs(email, usageData);
          addActivity("Usage logs fetched successfully");
        } else {
          setUsageLogs([]);
          addActivity("No usage logs found for this user");
        }
      } catch (error) {
        setUsageLogs([]);
        addActivity("Usage log request failed");
      }

      try {
        // Load the user's real backend-generated keys on every dashboard load.
        const keyData = await getMyApiKeys();

        if (Array.isArray(keyData)) {
          setApiKeys(keyData);
          saveApiKeys(email, keyData);
          addActivity("API keys loaded for current user");
        }
      } catch (error) {
        setApiKeys([]);
        addActivity("API key list request failed");
      }
    } catch (error) {
      setPageError("Unable to load backend dashboard data right now.");
      addActivity("Dashboard load failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    setBillingMessage("");

    try {
      const data = await upgradeToPro();
      // Refresh the plan directly after upgrade so the billing card updates
      // even if some other dashboard request fails later.
      const updatedPlan = await getMyPlan();

      setBillingMessage(data);
      setPlan(updatedPlan);
      addActivity("Plan upgraded and latest billing data fetched");
      await fetchDashboardData();
    } catch (error) {
      setBillingMessage(error.message || "Upgrade failed.");
      addActivity("Plan upgrade request failed");
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleGenerateKey = async () => {
    setIsGeneratingKey(true);
    setApiKeyMessage("");

    try {
      const keyData = await generateApiKey();

      // After creating a key, fetch the backend list again so the UI always
      // matches what is really stored for this logged-in user.
      const refreshedKeys = await getMyApiKeys();
      setApiKeys(refreshedKeys);
      saveApiKeys(email, refreshedKeys);
      setSelectedApiKey(keyData.key);
      setApiKeyMessage("New API key generated and selected.");
      addActivity("New API key generated and selected");
    } catch (error) {
      setApiKeyMessage(error.message || "Unable to generate API key.");
      addActivity("API key generation failed");
    } finally {
      setIsGeneratingKey(false);
    }
  };

  const handleCallGateway = async () => {
    if (!selectedApiKey) {
      setGatewayError("Select an API key before calling the gateway.");
      addActivity("Gateway call blocked because no API key was selected");
      return;
    }

    setIsCallingGateway(true);
    setGatewayError("");
    addActivity("Gateway request sent with selected API key");

    try {
      const data = await getGatewayData(selectedApiKey);
      setGatewayData(data);
      saveGatewayData(email, data);
      setLatestGatewayJson(JSON.stringify(data, null, 2));
      addActivity("Gateway response received successfully");

      const newLog = {
        id: Date.now(),
        endpoint: "/gateway/data",
        timestamp: new Date().toISOString(),
        apiKey: selectedApiKey,
        status: "success",
        plan: plan.name,
      };

      const updatedLogs = [newLog, ...usageLogs].slice(0, 8);
      setUsageLogs(updatedLogs);
      saveLogs(email, updatedLogs);
      setUsageCount((oldCount) => oldCount + 1);
    } catch (error) {
      setGatewayError(error.message || "Gateway request failed.");
      addActivity("Gateway request failed");
    } finally {
      setIsCallingGateway(false);
    }
  };

  const totalBill = plan.name === "PRO" ? plan.price || 499 : 0;
  const activeApiKeys = apiKeys.length;
  const remainingQuota = Math.max((plan.monthlyQuota || 0) - usageCount, 0);
  const monthlyUsagePercent = plan.monthlyQuota
    ? Math.min(Math.round((usageCount / plan.monthlyQuota) * 100), 100)
    : 0;
  const rpmUsagePercent = plan.requestPerMinute
    ? Math.min(Math.round((usageCount / plan.requestPerMinute) * 100), 100)
    : 0;

  const stats = [
    {
      title: "Total API Calls",
      value: usageCount,
      note: "User-specific backend usage",
    },
    {
      title: "Current Plan",
      value: plan.name || "FREE",
      note: "Billing status",
    },
    {
      title: "Requests / Minute",
      value: plan.requestPerMinute || 0,
      note: "Rate limit cap",
    },
    {
      title: "Estimated Monthly Bill",
      value: `Rs ${totalBill}`,
      note: "Based on current plan",
    },
    {
      title: "Active API Keys",
      value: activeApiKeys,
      note: "Loaded from backend",
    },
  ];

  const notifications = [];

  if (remainingQuota < 500) {
    notifications.push("Quota is getting low. Consider upgrading your plan.");
  }

  if ((plan.requestPerMinute || 0) <= 60) {
    notifications.push("FREE plan has a lower RPM limit. PRO is better for demos.");
  }

  if (pageError) {
    notifications.push(pageError);
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Navbar email={email} />

        <div className="mt-6">
          <div className="mb-6 overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#071220_0%,#0b2342_55%,#0f8cff_100%)] p-6 text-white shadow-soft">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-200">
                  FluxOS Control Center
                </p>
                <h1 className="mt-3 text-3xl font-bold">API Billing Dashboard</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-200">
                  Track API calls, manage keys, test gateway responses, and review
                  billing details in one simple frontend.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm backdrop-blur-sm">
                <p className="text-slate-200">Signed in as</p>
                <p className="mt-1 font-semibold">{email}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-slate-200">Platform focus</p>
                <p className="mt-2 text-xl font-semibold">Usage-based billing</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-slate-200">Gateway status</p>
                <p className="mt-2 text-xl font-semibold">
                  {selectedApiKey ? "Ready with selected key" : "Waiting for access key"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-slate-200">Current tier</p>
                <p className="mt-2 text-xl font-semibold">{plan.name}</p>
              </div>
            </div>
          </div>

          <StatsCards stats={stats} loading={loading} />

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <UsageSection
              usageCount={usageCount}
              monthlyUsagePercent={monthlyUsagePercent}
              rpmUsagePercent={rpmUsagePercent}
              remainingQuota={remainingQuota}
              plan={plan}
            />

            <BillingCard
              plan={plan}
              billingMessage={billingMessage}
              isUpgrading={isUpgrading}
              onUpgrade={handleUpgrade}
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <Playground
              gatewayData={gatewayData}
              isCallingGateway={isCallingGateway}
              onCallGateway={handleCallGateway}
              selectedApiKey={selectedApiKey}
              gatewayError={gatewayError}
            />
            <ApiKeys
              apiKeys={apiKeys}
              isGeneratingKey={isGeneratingKey}
              onGenerateKey={handleGenerateKey}
              selectedApiKey={selectedApiKey}
              onSelectApiKey={setSelectedApiKey}
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <LogsTable logs={usageLogs} planName={plan.name} />

            <div className="rounded-[24px] bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-brand-600">
                    Notifications
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Smart reminders
                  </h2>
                </div>
                <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  {notifications.length} alerts
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {latestGatewayJson && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4">
                    <p className="mb-3 text-sm font-medium text-white">
                      Latest gateway raw JSON
                    </p>
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-200">
                      {latestGatewayJson}
                    </pre>
                  </div>
                )}

                {apiKeyMessage && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-sm font-medium text-emerald-700">{apiKeyMessage}</p>
                  </div>
                )}

                {activityLogs.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="mb-3 text-sm font-medium text-slate-900">
                      Recent frontend activity
                    </p>
                    <div className="space-y-3">
                      {activityLogs.map((item) => (
                        <div key={item.id} className="rounded-xl bg-white p-3">
                          <p className="text-sm font-medium text-slate-800">
                            {item.message}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">{item.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {notifications.length > 0 ? (
                  notifications.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="text-sm font-medium text-slate-800">{item}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                    No important notifications right now.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
