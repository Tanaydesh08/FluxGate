function StatsCards({ stats, loading }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-[24px] bg-white p-5 shadow-soft transition hover:-translate-y-1"
        >
          <p className="text-sm font-medium text-slate-500">{item.title}</p>
          <p className="mt-4 text-3xl font-bold text-slate-900">
            {loading ? "..." : item.value}
          </p>
          <p className="mt-2 text-sm text-slate-500">{item.note}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
