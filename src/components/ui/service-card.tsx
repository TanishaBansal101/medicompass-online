
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  className?: string;
}

export const ServiceCard = ({
  title,
  description,
  icon,
  link,
  className,
}: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        "glass-panel p-6 group transition-all",
        "hover:shadow-glass-lg cursor-pointer",
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="bg-health-50 text-health-600 p-3 rounded-xl">
          {icon}
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-health-50 text-health-600 group-hover:bg-health-100 transition-colors">
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
      
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <Button asChild variant="link" className="px-0 text-health-600">
        <Link to={link}>Learn more</Link>
      </Button>
    </div>
  );
};
