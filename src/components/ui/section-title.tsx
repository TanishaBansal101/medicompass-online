
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  alignment?: "left" | "center" | "right";
  className?: string;
}

export const SectionTitle = ({
  subtitle,
  title,
  description,
  alignment = "center",
  className,
}: SectionTitleProps) => {
  return (
    <div
      className={cn(
        "space-y-3", 
        {
          "text-left": alignment === "left",
          "text-center mx-auto": alignment === "center",
          "text-right ml-auto": alignment === "right",
        },
        className
      )}
    >
      {subtitle && (
        <p className="text-sm font-medium uppercase tracking-wider text-health-600">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">{title}</h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mt-2">
          {description}
        </p>
      )}
    </div>
  );
};
