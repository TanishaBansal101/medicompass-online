
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoreVertical, Calendar } from "lucide-react";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: number;
  className?: string;
}

export const DoctorCard = ({
  id,
  name,
  specialty,
  image,
  rating,
  experience,
  className,
}: DoctorCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, [image]);

  return (
    <div 
      className={cn(
        "glass-panel overflow-hidden transition-all duration-300",
        "hover:shadow-glass-lg transform hover:-translate-y-1",
        className
      )}
    >
      <div className="relative">
        <div className={cn(
          "aspect-[4/3] w-full bg-muted",
          !imageLoaded && "animate-pulse"
        )}>
          {imageLoaded && (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-opacity"
            />
          )}
        </div>
        
        <div className="absolute top-3 right-3">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/80 hover:bg-white">
            <MoreVertical size={16} />
          </Button>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-medium text-lg">Dr. {name}</h3>
          <p className="text-muted-foreground text-sm">{specialty}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-health-50 text-health-500 p-1 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {experience} years exp.
          </div>
        </div>
        
        <Button className="w-full gap-2" size="sm">
          <Calendar size={16} />
          Book Appointment
        </Button>
      </div>
    </div>
  );
};
