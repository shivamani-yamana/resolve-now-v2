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
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How ResolveNow Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined process ensures every complaint is handled
            efficiently from submission to resolution.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-16 md:space-y-32 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <div
                    className={`text-center md:text-${
                      index % 2 === 1 ? "left" : "right"
                    } md:px-10`}
                  >
                    <div className="inline-block text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                <div className="relative md:w-0">
                  <div className="w-12 h-12 rounded-full bg-white border-4 border-purple-500 z-10 relative flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-blue-600"></div>
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
