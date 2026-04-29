import { useState } from "react";

function ApiKeys({
  apiKeys,
  isGeneratingKey,
  onGenerateKey,
  selectedApiKey,
  onSelectApiKey,
}) {
  const [copiedKey, setCopiedKey] = useState("");

  const copyKey = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(value);

      setTimeout(() => {
        setCopiedKey("");
      }, 1500);
    } catch (error) {
      setCopiedKey("");
    }
  };

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-600">API Keys</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">Manage access keys</h2>
        </div>
        <button
          onClick={onGenerateKey}
          disabled={isGeneratingKey}
          className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
        >
          {isGeneratingKey ? "Generating..." : "Generate API Key"}
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {apiKeys.length > 0 ? (
          apiKeys.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  API Key
                </p>
                <p className="mt-2 break-all text-sm font-medium text-slate-800">
                  {item.key}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSelectApiKey(item.key)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                    selectedApiKey === item.key
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {selectedApiKey === item.key ? "Selected" : "Use This Key"}
                </button>
                <button
                  onClick={() => copyKey(item.key)}
                  className="rounded-xl bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-600"
                >
                  {copiedKey === item.key ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
            No API keys yet. Click the button above to generate one.
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiKeys;
