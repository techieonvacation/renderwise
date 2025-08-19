import { Building2, Code, Layers, Rocket, Smartphone, Zap } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import Tagline from "../../ui/Tagline";

export default function FlutterSolutions() {
  const solutions = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "MVPs & Prototypes",
      description:
        "Quick development of minimum viable products to validate your ideas and get to market faster.",
      features: ["Rapid prototyping", "Cost-effective", "Quick validation"],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Enterprise Solutions",
      description:
        "Scalable applications for large organizations with complex requirements and existing systems.",
      features: ["System integration", "Scalability", "Enterprise security"],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "High-End Mobile Platforms",
      description:
        "Premium applications with advanced features, stunning UI, and exceptional performance.",
      features: ["Premium UI/UX", "Advanced features", "High performance"],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Legacy App Refashioning",
      description:
        "Modernize your existing applications with Flutter's cutting-edge technology and design.",
      features: ["Modern UI", "Performance boost", "Cross-platform"],
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Tagline variant="center">Solutions</Tagline>
          <h2 className="title">
            Tailor-Made&nbsp;
            <span className="highlight">Flutter Solutions</span>
          </h2>
          <p className="mt-2 max-w-3xl mx-auto text-base font-thin lg:text-lg text-foreground text-center mb-8">
            From MVPs and prototypes to high-end mobile platforms, our Flutter
            development offerings are customized to your specific requirements.
            Whether you're a startup looking for quick go-to-market solutions or
            an enterprise seeking to refashion old applications, we create
            pixel-perfect UI, stunning speed, and seamless user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {solutions.map((solution, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${solution.gradient} text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="text-sm text-foreground/80 flex items-center justify-center gap-2"
                    >
                      <Zap className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Benefits Section */}
        <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Built for Business, Designed for Users
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our Flutter solutions deliver exceptional value with no compromise
              on quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Accelerated Development
              </h4>
              <p className="text-muted-foreground">
                Build and deploy faster with Flutter's efficient development
                cycle
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Cost Savings
              </h4>
              <p className="text-muted-foreground">
                Single codebase for multiple platforms reduces development costs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Native Feel
              </h4>
              <p className="text-muted-foreground">
                Engaging UIs that feel truly native on every platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
