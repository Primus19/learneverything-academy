import React from 'react';
import Link from 'next/link';

export function Button({ children, className, asChild, variant = "default", size = "default", ...props }) {
  const Comp = asChild ? Link : "button";
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  };
  
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.default} ${className || ""}`;
  
  return (
    <Comp className={combinedClasses} {...props}>
      {children}
    </Comp>
  );
}

export function Card({ className, ...props }) {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ""}`} {...props} />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className || ""}`} {...props} />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className || ""}`} {...props} />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p className={`text-sm text-muted-foreground ${className || ""}`} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div className={`p-6 pt-0 ${className || ""}`} {...props} />
  );
}

export function CardFooter({ className, ...props }) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className || ""}`} {...props} />
  );
}
