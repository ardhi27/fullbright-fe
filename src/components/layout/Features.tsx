import { Monitor, ClipboardCheck, FileText, Volume2 } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Dual-Mode Interface",
    description: "Switch seamlessly between IELTS and TOEFL simulation modes with authentic exam layouts.",
    color: "primary",
  },
  {
    icon: ClipboardCheck,
    title: "Expert-Validated Grading",
    description: "Professional evaluators assess your responses using official IELTS Band Descriptors and TOEFL Rubrics.",
    color: "accent",
  },
  {
    icon: FileText,
    title: "Verified Score Reports",
    description: "Receive professional score reports with detailed breakdowns and personalized improvement tips.",
    color: "primary",
  },
  {
    icon: Volume2,
    title: "Authentic Audio",
    description: "Practice with realistic listening tests featuring one-time play policy, just like the real exam.",
    color: "accent",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground text-lg">
            Our hybrid assessment platform combines authentic simulation with expert validation for the most accurate preparation experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 ${
                  feature.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent"
                } group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
