import { FileSearch } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-[100vh] justify-center space-y-8">
      <div className="flex flex-col items-center space-y-4 justify-center">
        <div className="flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-900/40 text-amber-600 rounded-full">
          <FileSearch className="h-5 w-5" />
        </div>
        <div className="space-y-3 text-center">
          <h1 className="text-xl font-semibold tracking-tighter sm:text-xl">
            Page Not Found
          </h1>
          <p className="text-muted-foreground">
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
      <a className={buttonVariants({ variant: "default" })} href="/">
        Go back to the homepage
      </a>
    </div>
  );
}
