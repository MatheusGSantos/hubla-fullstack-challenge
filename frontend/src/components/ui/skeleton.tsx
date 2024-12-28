import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-light/10 dark:bg-gray-light/10",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
