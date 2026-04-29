function BillingCard({ plan, billingMessage, isUpgrading, onUpgrade }) {
  const isPro = plan.name === "PRO";

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-soft">
      <p className="text-sm font-semibold text-brand-600">Billing</p>
      <h2 className="mt-1 text-xl font-bold text-slate-900">Current plan</h2>

      <div className="mt-5 rounded-[24px] bg-slate-900 p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-300">Plan name</p>
            <h3 className="mt-2 text-3xl font-bold">{plan.name}</h3>
          </div>
          <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            {isPro ? "Premium" : "Starter"}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-sm text-slate-300">Price</p>
            <p className="mt-2 text-2xl font-semibold">
              Rs {plan.price || 0}
              <span className="text-sm font-normal text-slate-300"> / month</span>
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-sm text-slate-300">Plan status</p>
            <p className="mt-2 text-lg font-semibold">
              {isPro ? "PRO plan active" : "FREE plan active"}
            </p>
          </div>
        </div>

        <button
          onClick={onUpgrade}
          disabled={isUpgrading || isPro}
          className="mt-6 w-full rounded-2xl bg-brand-500 px-4 py-3 font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUpgrading ? "Upgrading..." : isPro ? "Already on PRO" : "Upgrade to PRO"}
        </button>

        {billingMessage && (
          <div className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-100">
            {billingMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default BillingCard;
