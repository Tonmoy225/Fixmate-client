export default async function ServicesPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className="container-page py-16">
      <h1 className="section-title">Services</h1>
    </div>
  );
}