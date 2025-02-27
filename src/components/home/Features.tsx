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
    <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
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
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Effective Resolution
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform comes packed with everything you need to efficiently
            manage and resolve complaints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
