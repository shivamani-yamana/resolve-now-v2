interface TestimonialProps {
  content: string;
  name: string;
  role: string;
  company: string;
}

function TestimonialCard({ content, name, role, company }: TestimonialProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md">
      <div className="flex mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-700 mb-6">{content}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex-shrink-0"></div>
        <div className="ml-3">
          <div className="font-medium">{name}</div>
          <div className="text-sm text-gray-500">
            {role}, {company}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const testimonials: TestimonialProps[] = [
    {
      content:
        "ResolveNow transformed how we handle customer complaints. The AI suggestions have helped us reduce resolution times by 40%.",
      name: "Sarah Johnson",
      role: "Customer Service Director",
      company: "TechCorp Inc.",
    },
    {
      content:
        "The analytics capabilities are incredible. We now have clear visibility into common complaint patterns and can address root causes.",
      name: "Michael Chang",
      role: "Operations Manager",
      company: "Retail Solutions",
    },
    {
      content:
        "Implementation was smooth and our team adapted quickly. The ROI was evident within the first three months of deployment.",
      name: "Elena Rodriguez",
      role: "CIO",
      company: "Global Logistics",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organizations across industries have transformed their grievance
            management with ResolveNow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {[1, 2, 3, 4, 5, 6].map((logo) => (
            <div
              key={logo}
              className="h-10 w-32 bg-gray-200 rounded opacity-60"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
