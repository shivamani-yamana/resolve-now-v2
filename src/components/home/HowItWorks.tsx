export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Submit a Grievance",
      description:
        "Users can easily submit their complaints through our intuitive interface with guided form fields.",
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "Our AI engine analyzes the complaint, categorizes it, and suggests potential solutions based on similar cases.",
    },
    {
      number: "03",
      title: "Assignment & Tracking",
      description:
        "Complaints are automatically assigned to the right department with clear tracking for all stakeholders.",
    },
    {
      number: "04",
      title: "Resolution & Feedback",
      description:
        "After resolution, the system collects feedback and learns from the outcome to improve future handling.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-stone-950">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            How ResolveNow Works
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Our streamlined process ensures every complaint is handled
            efficiently from submission to resolution.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-0 bottom-0 hidden w-1 transform -translate-x-1/2 left-1/2 bg-gradient-to-b from-blue-500 to-purple-500 md:block"></div>

          <div className="relative space-y-16 md:space-y-32">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="mb-8 md:w-1/2 md:mb-0">
                  <div
                    className={`text-center md:text-${
                      index % 2 === 1 ? "left" : "right"
                    } md:px-10`}
                  >
                    <div className="inline-block mb-4 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                      {step.number}
                    </div>
                    <h3 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="relative md:w-0">
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-4 border-purple-500 rounded-full dark:bg-stone-800">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  </div>
                </div>

                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
