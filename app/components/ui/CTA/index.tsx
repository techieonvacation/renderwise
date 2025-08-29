import { ArrowRight, Star } from "lucide-react";
import { Button } from "../Button";
import { motion } from "framer-motion";

interface CTAProps {
  title: string;
  highlights?: string[];
  description?: string;
  primaryButton?: {
    text: string;
    onClick?: () => void;
    icon?: React.ComponentType<any>;
  };
  secondaryButton?: {
    text: string;
    onClick?: () => void;
    icon?: React.ComponentType<any>;
  };
  backgroundImage?: string;
  className?: string;
  variant?: "default" | "gradient" | "image";
  badge?: {
    text: string;
    icon?: React.ComponentType<any>;
  };
}

export const CTA: React.FC<CTAProps> = ({
  title,
  highlights = [],
  description,
  primaryButton,
  secondaryButton,
  backgroundImage,
  className = "",
  variant = "default",
  badge,
}) => {
  const renderTitle = () => {
    if (highlights.length === 0) {
      return <span>{title}</span>;
    }

    const parts = title.split(/(\{highlight\})/);
    return parts.map((part, index) => {
      if (part === "{highlight}") {
        const highlight = highlights.shift();
        return highlight ? (
          <span key={index} className="highlight">
            {highlight}
          </span>
        ) : null;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const getBackgroundStyle = () => {
    switch (variant) {
      case "image":
        return backgroundImage
          ? {
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : {};
      case "gradient":
        return {
          background:
            "linear-gradient(135deg, rgb(var(--primary-600)) 0%, rgb(var(--primary-700)) 100%)",
        };
      default:
        return {
          background:
            "linear-gradient(135deg, rgb(var(--primary-50)) 0%, rgb(var(--primary-100)) 100%)",
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "image":
        return "text-foreground";
      case "gradient":
        return "text-foreground";
      default:
        return "text-foreground";
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={getBackgroundStyle()}
    >
      <div className="relative z-10 px-8 py-12 text-center">
        <div className="container">
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Star className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                {badge?.text}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <h2 className={`title mb-4 ${getTextColor()}`}>{renderTitle()}</h2>

          {/* Description */}
          {description && (
            <p
              className={`text-lg lg:text-xl mb-8 max-w-3xl mx-auto leading-relaxed font-dm-sans ${
                variant === "image" || variant === "gradient"
                  ? "text-foreground/70"
                  : "text-foreground/70"
              }`}
            >
              {description}
            </p>
          )}

          {/* Buttons */}
          {(primaryButton || secondaryButton) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {primaryButton && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={primaryButton.onClick}
                  scrollToBottom={true}
                  scrollTarget="#get-in-touch"
                  rightIcon={
                    primaryButton.icon ? (
                      <primaryButton.icon className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )
                  }
                  className="group"
                >
                  <span className="flex items-center gap-2">
                    {primaryButton.text}
                  </span>
                </Button>
              )}

              {secondaryButton && (
                <Button
                  variant={
                    variant === "image" || variant === "gradient"
                      ? "secondary"
                      : "secondary"
                  }
                  size="lg"
                  onClick={secondaryButton.onClick}
                  scrollToBottom={true}
                  scrollTarget="#get-in-touch"
                  rightIcon={
                    secondaryButton.icon ? (
                      <secondaryButton.icon className="w-4 h-4" />
                    ) : (
                      ""
                    )
                  }
                >
                  <span className="flex items-center gap-2">
                    {secondaryButton.text}
                  </span>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Convenience components for common CTA patterns
export const CTASimple: React.FC<Omit<CTAProps, "variant">> = (props) => (
  <CTA {...props} variant="default" />
);

export const CTAGradient: React.FC<Omit<CTAProps, "variant">> = (props) => (
  <CTA {...props} variant="gradient" />
);

export const CTAImage: React.FC<Omit<CTAProps, "variant">> = (props) => (
  <CTA {...props} variant="image" />
);
