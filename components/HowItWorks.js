import { FaSearch, FaPaperPlane, FaTools, FaCreditCard } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "Find a Service",
    text: "Browse approved repair services and pick the technician you like.",
  },
  {
    icon: <FaPaperPlane />,
    title: "Send a Request",
    text: "Describe the problem, add your address and choose a date.",
  },
  {
    icon: <FaTools />,
    title: "Technician Fixes It",
    text: "Track the job step by step from accepted to completed.",
  },
  {
    icon: <FaCreditCard />,
    title: "Pay After Completion",
    text: "Pay securely online only when the work is done.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <h2 className="section-title">How FixMate Works</h2>
        <p className="section-subtitle">Get your device fixed in 4 simple steps</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-base-300 bg-base-200 p-6 text-center"
            >
              <span className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
                {index + 1}
              </span>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl text-white">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}