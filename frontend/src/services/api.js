const API_BASE_URL = "";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("fluxos_token");
  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  let data = null;

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new Error(
      typeof data === "string" && data ? data : "Request failed"
    );
  }

  return data;
}

export async function loginUser(payload) {
  return request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function signupUser(payload) {
  return request("/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function getMyPlan() {
  return request("/billing/my-plan");
}

export async function getDashboardSummary() {
  return request("/dashboard/summary");
}

export async function upgradeToPro() {
  return request("/billing/upgrade/PRO", {
    method: "POST",
  });
}

export async function getUsageCount() {
  return request("/usage/count");
}

export async function getUsageLogs() {
  return request("/usage");
}

export async function generateApiKey() {
  return request("/api-keys/generate", {
    method: "POST",
  });
}

export async function getMyApiKeys() {
  return request("/api-keys/my");
}

export async function getGatewayData(apiKey) {
  return request("/gateway/data", {
    headers: {
      "x-api-key": apiKey,
    },
  });
}
