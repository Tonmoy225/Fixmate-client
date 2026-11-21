export default function ServicesSkeleton() {
  return (
    <section className="container-page py-20">
      <h2 className="section-title">Featured Services</h2>
      <p className="section-subtitle">Loading services...</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-96 animate-pulse rounded-2xl bg-slate-200"></div>
        ))}
      </div>
    </section>
  );
}