"use client";

import React, { ReactNode, Suspense } from "react";
import { Button } from "../ui/button";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  suspenseFallback?: ReactNode;
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  handleTryAgainClick = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className={cn(
            "flex flex-col items-center w-full h-full gap-3 py-12",
            this.props.className
          )}
        >
          <div className="w-12 h-12 bg-destructive/30 text-red-600 rounded-full flex items-center justify-center">
            <TriangleAlert className="w-5 h-5" />
          </div>

          <h3 className="font-medium">Something went wrong!</h3>
          <p className="text-sm text-center max-w-[300px] text-muted-foreground">
            Please try again or reload the page.
          </p>

          <Button
            size="sm"
            variant="secondary"
            onClick={this.handleTryAgainClick}
          >
            Try again?
          </Button>
        </div>
      );
    }

    return (
      <Suspense fallback={this.props.suspenseFallback || "Loading..."}>
        {this.props.children}
      </Suspense>
    );
  }
}

export default ErrorBoundary;
