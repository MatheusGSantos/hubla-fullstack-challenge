"use client";

import * as React from "react";
import clsx from "clsx";

export interface LoaderProps {
  sizeClassName?: string;
  colorClassName?: string;
  fullscreen?: boolean;
  backdropClassName?: string;
  className?: string;
}

export function Loader({
  sizeClassName = "h-10 w-10",
  colorClassName = "border-green-primary",
  fullscreen = false,
  backdropClassName = "bg-black-primary/70",
  className,
}: Readonly<LoaderProps>) {
  if (fullscreen) {
    return (
      <div
        className={clsx(
          "fixed inset-0 z-50 flex items-center justify-center",
          backdropClassName,
        )}
      >
        <output
          className={clsx(
            "animate-spin rounded-full border-2 border-t-transparent",
            sizeClassName,
            colorClassName,
          )}
          aria-label="Loading"
        />
      </div>
    );
  }

  return (
    <div className={clsx("flex items-center justify-center", className)}>
      <output
        className={clsx(
          "animate-spin rounded-full border-2 border-t-transparent",
          sizeClassName,
          colorClassName,
        )}
        aria-label="Loading"
      />
    </div>
  );
}
