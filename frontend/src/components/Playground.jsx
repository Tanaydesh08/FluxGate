function Playground({
  gatewayData,
  isCallingGateway,
  onCallGateway,
  selectedApiKey,
  gatewayError,
}) {
  const maskedKey = selectedApiKey
    ? `${selectedApiKey.slice(0, 8)}...${selectedApiKey.slice(-6)}`
    : "";

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-600">API Playground</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">Test live gateway data</h2>
        </div>
        <button
          onClick={onCallGateway}
          disabled={isCallingGateway || !selectedApiKey}
          className="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {isCallingGateway ? "Calling API..." : "Call Gateway API"}
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-medium text-slate-700">Selected access key</p>
        <p className="mt-2 break-all text-sm text-slate-600">
          {selectedApiKey ? maskedKey : "Generate and select an API key before testing."}
        </p>
      </div>

      <div className="mt-5 rounded-[24px] bg-slate-900 p-6 text-white">
        {gatewayError && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {gatewayError}
          </div>
        )}

        {gatewayData ? (
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                {gatewayData.family}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                {gatewayData.status}
              </span>
            </div>

            <h3 className="mt-4 text-3xl font-bold">{gatewayData.name}</h3>
            <p className="mt-2 text-slate-300">{gatewayData.message}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Version</p>
                <p className="mt-2 text-lg font-semibold">{gatewayData.version}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Release year</p>
                <p className="mt-2 text-lg font-semibold">
                  {gatewayData.releaseYear}
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Kernel / Status</p>
                <p className="mt-2 text-lg font-semibold">
                  {gatewayData.kernel || gatewayData.status}
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Desktop / Gateway</p>
                <p className="mt-2 text-lg font-semibold">
                  {gatewayData.desktop || gatewayData.gateway}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/20 p-6 text-sm text-slate-300">
            Generate a key, select it, and then call the gateway to fetch a
            random OS response from the backend.
          </div>
        )}
      </div>
    </div>
  );
}

export default Playground;
