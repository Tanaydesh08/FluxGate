function ProgressBar({ label, value, helper, colorClass }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-sm font-semibold text-slate-900">{value}%</p>
      </div>
      <div className="h-3 rounded-full bg-slate-100">
        <div
          className={`h-3 rounded-full ${colorClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-slate-500">{helper}</p>
    </div>
  );
}

function UsageSection({
  usageCount,
  monthlyUsagePercent,
  rpmUsagePercent,
  remainingQuota,
  plan,
}) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-soft">
      <p className="text-sm font-semibold text-brand-600">Analytics</p>
      <h2 className="mt-1 text-xl font-bold text-slate-900">Usage overview</h2>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Average Daily Calls</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">
            {Math.max(Math.floor(usageCount / 30), 1)}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Monthly Usage</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{usageCount}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Remaining Quota</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{remainingQuota}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <ProgressBar
          label="Monthly quota usage"
          value={monthlyUsagePercent}
          helper={`${usageCount} used out of ${plan.monthlyQuota || 0}`}
          colorClass="bg-brand-500"
        />
        <ProgressBar
          label="Rate limit pressure"
          value={rpmUsagePercent}
          helper={`Plan limit: ${plan.requestPerMinute || 0} requests per minute`}
          colorClass="bg-emerald-500"
        />
        <ProgressBar
          label="Quota remaining"
          value={100 - monthlyUsagePercent}
          helper={`Current plan: ${plan.name}`}
          colorClass="bg-amber-400"
        />
      </div>
    </div>
  );
}

export default UsageSection;
