import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const examModes = [
  {
    name: "IELTS",
    subtitle: "Academic & General Training",
    score: "Band 0-9",
    color: "primary",
    features: [
      "Split-screen Reading layout",
      "Task 1 & Task 2 Writing with word counter",
      "One-time play Listening tests",
      "4 criteria grading (Task Achievement, Coherence, Lexical, Grammar)",
      "Band Score breakdown per skill",
    ],
  },
  {
    name: "TOEFL",
    subtitle: "ITP & iBT Formats",
    score: "Scale 0-30 / 310-677",
    color: "accent",
    features: [
      "Structure & Written Expression MCQ",
      "Reading Comprehension with highlighting",
      "Integrated & Independent Writing tasks",
      "3 criteria grading (Development, Organization, Language)",
      "Section-wise score breakdown",
    ],
  },
];

const ExamModes = () => {
  return (
    <section id="exams" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Exam Modes
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Choose Your Exam Type
          </h2>
          <p className="text-muted-foreground text-lg">
            Authentic simulation interfaces designed to match the real exam experience.
          </p>
        </div>

        {/* Exam Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {examModes.map((exam, index) => (
            <div
              key={exam.name}
              className={`relative overflow-hidden rounded-3xl border-2 p-8 lg:p-10 transition-all duration-300 hover:shadow-xl animate-fade-up ${
                exam.color === "primary"
                  ? "border-primary/20 hover:border-primary/50"
                  : "border-accent/20 hover:border-accent/50"
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Background Gradient */}
              <div
                className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 ${
                  exam.color === "primary" ? "bg-primary" : "bg-accent"
                }`}
              />

              <div className="relative">
                {/* Header */}
                <div className="mb-6">
                  <h3
                    className={`text-3xl font-bold mb-1 ${
                      exam.color === "primary" ? "text-primary" : "text-accent"
                    }`}
                  >
                    {exam.name}
                  </h3>
                  <p className="text-muted-foreground">{exam.subtitle}</p>
                </div>

                {/* Score */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary mb-6">
                  <span className="text-sm text-muted-foreground">Score Range:</span>
                  <span className="font-semibold">{exam.score}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {exam.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          exam.color === "primary"
                            ? "bg-primary/10 text-primary"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={exam.color === "primary" ? "default" : "hero"}
                  className="w-full group"
                >
                  Start {exam.name} Practice
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamModes;
