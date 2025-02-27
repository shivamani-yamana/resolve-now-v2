import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-12 text-center shadow-xl">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your grievance management?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Join now by using ResolveNow to streamline complaint resolution
              and improve customer satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="bg-white text-blue-700 hover:bg-blue-50"
                size="lg"
                href="/signup"
              >
                Start Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
