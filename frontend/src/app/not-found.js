import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="container-tight py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Error 404
      </p>
      <h1 className="font-display mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">
        This page seems to be off-duty.
      </h1>
      <p className="mt-4 text-muted-foreground">
        The page you’re looking for doesn’t exist or has moved. Head back home
        for the latest notifications.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild data-testid="notfound-home-button">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline" data-testid="notfound-jobs-button">
          <Link href="/category/jobs">Browse Jobs</Link>
        </Button>
      </div>
    </section>
  );
}
