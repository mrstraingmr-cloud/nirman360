import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Home, SearchX } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div
      className="container py-24 flex flex-col items-center gap-6 text-center"
      data-ocid="notfound.page"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-10 w-10 text-muted-foreground" />
      </div>
      <div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          Page Not Found
        </h1>
        <p className="text-muted-foreground max-w-sm">
          The page you're looking for doesn't exist. It may have been moved or
          removed.
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild>
          <Link to="/" data-ocid="notfound.home.link">
            <Home className="h-4 w-4 mr-2" /> Go Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/browse" data-ocid="notfound.browse.link">
            Browse Designs
          </Link>
        </Button>
      </div>
    </div>
  );
}
