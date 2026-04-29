function buildKey(email, section) {
  return `fluxos_${section}_${email}`;
}

export function getSavedApiKeys(email) {
  if (!email) {
    return [];
  }

  return JSON.parse(localStorage.getItem(buildKey(email, "api_keys")) || "[]");
}

export function saveApiKeys(email, keys) {
  if (!email) {
    return;
  }

  localStorage.setItem(buildKey(email, "api_keys"), JSON.stringify(keys));
}

export function getSavedGatewayData(email) {
  if (!email) {
    return null;
  }

  return JSON.parse(localStorage.getItem(buildKey(email, "gateway_data")) || "null");
}

export function saveGatewayData(email, data) {
  if (!email) {
    return;
  }

  localStorage.setItem(buildKey(email, "gateway_data"), JSON.stringify(data));
}

export function getSavedLogs(email) {
  if (!email) {
    return null;
  }

  return JSON.parse(localStorage.getItem(buildKey(email, "recent_logs")) || "null");
}

export function saveLogs(email, logs) {
  if (!email) {
    return;
  }

  localStorage.setItem(buildKey(email, "recent_logs"), JSON.stringify(logs));
}

export function clearUserSessionCache(email) {
  if (!email) {
    return;
  }

  localStorage.removeItem(buildKey(email, "gateway_data"));
  localStorage.removeItem(buildKey(email, "recent_logs"));
}
