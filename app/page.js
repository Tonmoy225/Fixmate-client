export default function Home() {
  return (
    <main className="container-page py-16">
      <h1 className="section-title">FixMate</h1>
      <p className="section-subtitle">Theme and font test</p>

      <div className="flex justify-center gap-4">
        <button className="btn btn-fixmate">Primary Button</button>
        <button className="btn btn-secondary">Navy Button</button>
        <span className="badge badge-info">Requested</span>
        <span className="badge badge-warning">In Progress</span>
        <span className="badge badge-success">Completed</span>
      </div>
    </main>
  );
}