import Link from "next/link";
import {
  MdSmartphone,
  MdLaptop,
  MdAcUnit,
  MdKitchen,
  MdTv,
  MdLocalLaundryService,
  MdElectricalServices,
} from "react-icons/md";

const categories = [
  { name: "Smartphone", icon: <MdSmartphone /> },
  { name: "Laptop & PC", icon: <MdLaptop /> },
  { name: "AC", icon: <MdAcUnit /> },
  { name: "Refrigerator", icon: <MdKitchen /> },
  { name: "TV", icon: <MdTv /> },
  { name: "Washing Machine", icon: <MdLocalLaundryService /> },
  { name: "Electrical", icon: <MdElectricalServices /> },
];

export default function Categories() {
  return (
    <section className="container-page py-20">
      <h2 className="section-title">Popular Categories</h2>
      <p className="section-subtitle">Choose the device or appliance you need fixed</p>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/services?category=${encodeURIComponent(category.name)}`}
            className="group flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:bg-secondary hover:shadow-xl"
          >
            <span className="mb-3 text-5xl text-primary">{category.icon}</span>
            <span className="font-bold group-hover:text-white">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}