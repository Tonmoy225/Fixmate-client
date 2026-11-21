import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Rafiq Ahmed",
    area: "Mirpur, Dhaka",
    text: "My laptop was fixed in one day. I could see every update and paid only after it worked perfectly.",
  },
  {
    name: "Nusrat Jahan",
    area: "Uttara, Dhaka",
    text: "The AC technician came to my home on time and the price was exactly what was shown on the website.",
  },
  {
    name: "Tanvir Hasan",
    area: "Dhanmondi, Dhaka",
    text: "As a technician, FixMate gives me regular jobs and a clean way to manage all my requests.",
  },
];

export default function Testimonials() {
  return (
    <section className="container-page py-20">
      <h2 className="section-title">What Our Users Say</h2>
      <p className="section-subtitle">Real feedback from customers and technicians</p>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-md"
          >
            <div className="mb-3 flex gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} />
              ))}
            </div>
            <p className="flex-1 text-slate-600">&quot;{review.text}&quot;</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-bold text-white">
                {review.name.charAt(0)}
              </span>
              <div>
                <p className="font-bold">{review.name}</p>
                <p className="text-sm text-slate-500">{review.area}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}