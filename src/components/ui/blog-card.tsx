
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  className?: string;
}

export const BlogCard = ({
  id,
  title,
  excerpt,
  category,
  image,
  date,
  author,
  className,
}: BlogCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, [image]);

  return (
    <Link 
      to={`/blogs/${id}`}
      className={cn(
        "group glass-panel overflow-hidden flex flex-col transition-all duration-300",
        "hover:shadow-glass-lg transform hover:-translate-y-1",
        className
      )}
    >
      <div className="relative">
        <div className={cn(
          "aspect-video w-full bg-muted",
          !imageLoaded && "animate-pulse"
        )}>
          {imageLoaded && (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-opacity"
            />
          )}
        </div>
        
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/80 hover:bg-white text-xs font-medium">
            {category}
          </Badge>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="space-y-2 flex-grow">
          <h3 className="font-medium text-lg group-hover:text-health-600 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">{excerpt}</p>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="rounded-full w-8 h-8 object-cover"
            />
            <span className="text-sm font-medium">{author.name}</span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {date}
          </div>
        </div>
      </div>
    </Link>
  );
};
