import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight, CheckCircle, Shield, Zap } from "@workspace/ui/icons";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-display font-medium text-xl tracking-tight">
                Starter
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Pricing
              </a>
              <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Docs
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button variant="pill" size="pill-sm" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display font-medium text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] tracking-tight leading-[1] text-foreground mb-8">
              Build faster with
              {" "}
              <span className="text-revolut-blue">confidence</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A modern full-stack starter kit with TanStack Start, Tailwind CSS,
              and shadcn/ui. Ship your next project in record time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="pill" size="pill" className="w-full sm:w-auto">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="pill-outline" size="pill" className="w-full sm:w-auto">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-3xl sm:text-4xl tracking-tight text-foreground mb-4">
              Everything you need
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built with modern technologies and best practices. No configuration required.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-revolut-teal" />}
              title="Lightning Fast"
              description="Optimized build system with Vite for instant HMR and fast production builds."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-revolut-blue" />}
              title="Type Safe"
              description="Full TypeScript support with strict type checking configured out of the box."
            />
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6 text-revolut-pink" />}
              title="Production Ready"
              description="Pre-configured with ESLint, Prettier, and CI/CD workflows."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-primary rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl tracking-tight text-primary-foreground mb-6">
              Ready to get started?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
              Join thousands of developers building with this stack. Clone the repo and deploy in minutes.
            </p>
            <Button variant="pill-ghost" size="pill" className="border-white/30 hover:bg-white/20">
              Clone Repository
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">S</span>
              </div>
              <span className="font-display font-medium text-lg">Starter</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 Starter. Built with TanStack Start.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                GitHub
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background rounded-2xl p-8 border border-border hover:border-border/80 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-display font-medium text-xl tracking-tight text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
