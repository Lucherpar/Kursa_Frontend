import { cn } from "../../lib/utils";

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) => {
  return (
    <div className={cn("rounded-xl border border-card bg-card text-card-foreground shadow-sm", className)} {...props} />
  );
};

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  );
};

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { className?: string }) => {
  return (
    <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  );
};

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) => {
  return (
    <div className={cn("p-6 pt-0", className)} {...props} />
  );
};
