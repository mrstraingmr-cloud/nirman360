import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { CategoryMeta } from "../types";

interface CategoryCardProps {
  category: CategoryMeta;
  index?: number;
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <Link
      to="/browse/$category"
      params={{ category: category.id }}
      data-ocid={`category.item.${index + 1}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-smooth hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={category.image}
          alt={category.label}
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-xs font-medium text-white/80 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {category.count}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{category.label}</h3>
          <ArrowRight
            className={cn(
              "h-4 w-4 text-muted-foreground transition-smooth",
              "group-hover:text-primary group-hover:translate-x-1",
            )}
          />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
