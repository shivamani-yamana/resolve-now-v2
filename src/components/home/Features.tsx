import { IconType } from "react-icons";
import { FaChartLine, FaRegClock, FaShieldAlt } from "react-icons/fa";
import {
  MdNotificationsActive,
  MdOutlineIntegrationInstructions,
} from "react-icons/md";

interface FeatureProps {
  title: string;
  description: string;
  icon: IconType;
}

function Feature({ title, description, icon: Icon }: FeatureProps) {
  return (
    <div className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl dark:bg-stone-900 dark:border-stone-800 hover:shadow-md">
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default function Features() {
  const features: FeatureProps[] = [
    {
      title: "AI-Powered Resolution",
      description:
        "Our AI analyzes complaints and suggests solutions based on historical data and best practices.",
      icon: FaChartLine,
    },
    {
      title: "Real-time Analytics",
      description:
        "Get actionable insights with comprehensive dashboards showing trends and resolution metrics.",
      icon: FaChartLine,
    },
    {
      title: "Automated Workflows",
      description:
        "Set up custom workflows to automatically route and escalate complaints to the right teams.",
      icon: FaRegClock,
    },
    {
      title: "Smart Notifications",
      description:
        "Keep all stakeholders informed with timely updates on complaint status and resolution progress.",
      icon: MdNotificationsActive,
    },
    {
      title: "Seamless Integrations",
      description:
        "Connect with your existing tools like CRM, support desk, or email systems for a unified workflow.",
      icon: MdOutlineIntegrationInstructions,
    },
    {
      title: "Data Security",
      description:
        "Enterprise-grade security ensures all grievance data is encrypted and handled with compliance.",
      icon: FaShieldAlt,
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-stone-950">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Powerful Features for Effective Resolution
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Our platform comes packed with everything you need to efficiently
            manage and resolve complaints.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
