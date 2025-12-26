import { Button } from "@/components/ui/button";
import { BookOpen, Award, FileCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(0_77%_47%_/_0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(0_0%_8%_/_0.05)_0%,_transparent_50%)]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_hsl(0_0%_0%_/_0.02)_1px,_transparent_1px),_linear-gradient(to_bottom,_hsl(0_0%_0%_/_0.02)_1px,_transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container relative mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-up">
            <Award className="w-4 h-4" />
            <span>Hybrid Assessment Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Master Your{" "}
            <span className="text-primary">TOEFL</span> &{" "}
            <span className="text-accent">IELTS</span>
            <br />
            With Confidence
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Experience realistic exam simulations with expert-validated grading and personalized feedback. 
            Prepare smarter, score higher.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button size="xl">
              Start Free Practice
            </Button>
            <Button variant="outline" size="xl">
              View Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Practice Tests</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-accent/10">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground">Expert</div>
              <div className="text-sm text-muted-foreground">Validated Grading</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground">Score Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
