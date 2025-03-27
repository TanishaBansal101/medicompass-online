
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "glass-panel p-6 hover-scale transition-all",
        className
      )}
    >
      <div className="bg-health-50 text-health-600 p-3 rounded-xl w-fit mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
