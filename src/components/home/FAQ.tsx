"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

// Define FAQ data structure
type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

// FAQs organized by category
const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "How do I submit a new grievance?",
    answer:
      "To submit a new grievance, navigate to the 'Submit Grievance' page from the dashboard. Fill in all required details like your contact information, grievance type, description, and any supporting documents. Click 'Submit' when you're done. You'll receive a unique tracking ID that can be used to check the status of your grievance.",
    category: "submission",
  },
  {
    id: "faq-2",
    question: "How can I track my grievance status?",
    answer:
      "You can track your grievance by clicking on 'Track Grievance' in the main navigation. Enter your grievance ID that was provided after submission. The system will display the current status, handling department, and expected resolution time.",
    category: "tracking",
  },
  {
    id: "faq-3",
    question: "Can I update my grievance after submission?",
    answer:
      "Yes, you can update your grievance by going to 'My Grievances' and selecting the specific grievance you wish to modify. Click on 'Update' and add any new information or documents. Note that major changes to the grievance type or core complaint might not be allowed once processing has begun.",
    category: "submission",
  },
  {
    id: "faq-4",
    question: "What do the different status indicators mean?",
    answer:
      "The different status indicators are: 'Submitted' - your grievance has been received but not yet assigned; 'Under Review' - your grievance is being evaluated; 'In Progress' - work has begun on resolving your grievance; 'Pending Information' - additional information is needed from you; 'Resolved' - your grievance has been addressed; and 'Closed' - the process is complete.",
    category: "tracking",
  },
  {
    id: "faq-5",
    question: "How long does it take to resolve a grievance?",
    answer:
      "Resolution time depends on the complexity and type of your grievance. Simple inquiries might be resolved within 3-5 business days, while complex issues could take 2-3 weeks. You can check the estimated resolution time on the tracking page of your specific grievance.",
    category: "resolution",
  },
  {
    id: "faq-6",
    question: "Can I provide feedback after my grievance is resolved?",
    answer:
      "Yes, once your grievance is marked as 'Resolved', you'll receive a notification with a link to provide feedback. Your feedback helps us improve our services and response quality. You can also access this feedback option from the 'My Grievances' section for any resolved cases.",
    category: "resolution",
  },
  {
    id: "faq-7",
    question: "What if I'm not satisfied with the resolution?",
    answer:
      "If you're not satisfied with the resolution, you can click on 'Appeal Resolution' within the details page of your resolved grievance. You'll need to provide a reason for the appeal and any additional information to support your case. Appeals are typically reviewed within 5 business days by a different team member.",
    category: "resolution",
  },
  {
    id: "faq-8",
    question: "How do I reset my password?",
    answer:
      "To reset your password, click on 'Forgot Password' on the login page. Enter your registered email address, and you'll receive a link to create a new password. For security reasons, this link expires after 24 hours.",
    category: "account",
  },
  {
    id: "faq-9",
    question: "Can I delete my account?",
    answer:
      "Yes, you can delete your account by going to 'Account Settings' and selecting 'Delete Account'. Note that this will permanently remove all your data and any ongoing grievances will be canceled. If you have active grievances, we recommend resolving them before deleting your account.",
    category: "account",
  },
  {
    id: "faq-10",
    question: "How do I contact support directly?",
    answer:
      "You can contact our support team by clicking on 'Contact Support' at the bottom of any page. You can also email us directly at support@resolve-now.com or call our helpline at +1-800-RESOLVE (736-5837) during business hours (Monday to Friday, 9 AM - 5 PM).",
    category: "support",
  },
  {
    id: "faq-11",
    question: "Are my personal details kept confidential?",
    answer:
      "Yes, your personal information is strictly confidential and protected under our Privacy Policy. We only share relevant details with the departments responsible for resolving your grievance. You can choose to submit anonymous grievances, but this may limit our ability to provide you with personalized updates or contact you for additional information.",
    category: "privacy",
  },
  {
    id: "faq-12",
    question: "Can I submit multiple grievances?",
    answer:
      "Yes, you can submit multiple grievances. Each grievance will be assigned a unique tracking ID and handled individually. From your dashboard, you can view and manage all your submitted grievances in one place.",
    category: "submission",
  },
];

// Categories for tabbed navigation
const categories = [
  { id: "all", name: "All FAQs" },
  { id: "submission", name: "Submission" },
  { id: "tracking", name: "Tracking" },
  { id: "resolution", name: "Resolution" },
  { id: "support", name: "Support" },
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter FAQs based on search query and active category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div id="faq" className="container max-w-4xl py-8 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Help Center</CardTitle>
          <CardDescription>
            Find answers to frequently asked questions about using our platform
          </CardDescription>

          <div className="relative mt-4">
            <Search className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search for help topics..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="mb-6"
          >
            <TabsList className="flex flex-wrap h-auto mb-4">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                {filteredFaqs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs
                      .filter(
                        (faq) =>
                          category.id === "all" || faq.category === category.id
                      )
                      .map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                ) : (
                  <div className="py-10 text-center">
                    <p className="text-muted-foreground">
                      No matching FAQs found. Try adjusting your search.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          <div className="p-4 mt-8 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="mb-2 font-semibold">Still need help?</h3>
            <p className="mb-4 text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Our support team is
              ready to assist you.
            </p>
            <div>
              <a
                href="mailto:support@resolve-now.com"
                className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Contact Support
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
