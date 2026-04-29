import { useEffect, useState } from "react";
import {
  getSavedApiKeys,
  getSavedGatewayData,
  getSavedLogs,
} from "../store/dashboardStore";

function useDashboardStorage(email, defaultLogs) {
  const [apiKeys, setApiKeys] = useState(() => getSavedApiKeys(email));
  const [gatewayData, setGatewayData] = useState(() => getSavedGatewayData(email));
  const [usageLogs, setUsageLogs] = useState(() => getSavedLogs(email) || defaultLogs);

  useEffect(() => {
    setApiKeys(getSavedApiKeys(email));
    setGatewayData(getSavedGatewayData(email));

    const storedLogs = getSavedLogs(email);
    if (storedLogs) {
      setUsageLogs(storedLogs);
    } else if (defaultLogs.length > 0) {
      setUsageLogs(defaultLogs);
    } else {
      setUsageLogs([]);
    }
  }, [email, defaultLogs]);

  return {
    apiKeys,
    setApiKeys,
    gatewayData,
    setGatewayData,
    usageLogs,
    setUsageLogs,
  };
}

export default useDashboardStorage;
