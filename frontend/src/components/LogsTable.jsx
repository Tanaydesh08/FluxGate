function formatTime(value) {
  if (!value) {
    return "No time";
  }

  return new Date(value).toLocaleString();
}

function LogsTable({ logs, planName }) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-600">Recent logs</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">Latest activity</h2>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {logs.length} rows
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500">
              <th className="pb-3 font-medium">Endpoint</th>
              <th className="pb-3 font-medium">Time</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Plan</th>
            </tr>
          </thead>
          <tbody>
            {logs.slice(0, 7).map((log, index) => (
              <tr key={log.id || index} className="border-b border-slate-100">
                <td className="py-4 pr-4 text-sm font-medium text-slate-800">
                  {log.endpoint || "Gateway request"}
                </td>
                <td className="py-4 pr-4 text-sm text-slate-500">
                  {formatTime(log.timestamp)}
                </td>
                <td className="py-4 pr-4 text-sm">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700">
                    {log.status || "success"}
                  </span>
                </td>
                <td className="py-4 text-sm text-slate-600">
                  {log.plan || planName || "FREE"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LogsTable;
