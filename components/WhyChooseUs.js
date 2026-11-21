import { FaShieldAlt, FaClipboardCheck, FaLock, FaHeadset } from "react-icons/fa";

const points = [
  {
    icon: <FaShieldAlt />,
    title: "Verified Technicians",
    text: "Every service is reviewed and approved by our admin team.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Track Every Job",
    text: "See a clear status for your repair from request to delivery.",
  },
  {
    icon: <FaLock />,
    title: "Pay After Service",
    text: "No advance payment. You pay only after the job is completed.",
  },
  {
    icon: <FaHeadset />,
    title: "Friendly Support",
    text: "Our team is ready to help whenever you face a problem.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-secondary py-20">
      <div className="container-page">
        <h2 className="text-center text-[2rem] font-extrabold text-white">
          Why Choose FixMate
        </h2>
        <p className="mb-10 mt-2 text-center text-slate-300">
          A repair experience built on trust and transparency
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div key={point.title} className="rounded-2xl bg-slate-800 p-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-2xl text-white">
                {point.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{point.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}