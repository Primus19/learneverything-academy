'use client';

import React from "react";

export function Button({ className, variant = "default", size = "default", asChild = false, children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary"
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10"
  };
  
  const variantStyle = variants[variant] || variants.default;
  const sizeStyle = sizes[size] || sizes.default;
  const combinedClassName = `${baseStyles} ${variantStyle} ${sizeStyle} ${className || ''}`;
  
  const Comp = asChild ? React.Children.only(children).type : "button";
  const childProps = asChild ? React.Children.only(children).props : {};
  
  return (
    <Comp className={combinedClassName} {...props} {...childProps}>
      {asChild ? null : children}
    </Comp>
  );
}

export function Card({ className, children, ...props }) {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className || ''}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className || ''}`} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={`text-sm text-muted-foreground ${className || ''}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={`p-6 pt-0 ${className || ''}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className || ''}`} {...props}>
      {children}
    </div>
  );
}

export function Tabs({ defaultValue, value, onValueChange, className, children, ...props }) {
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue);
  
  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };
  
  return (
    <div className={`w-full ${className || ''}`} {...props}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        
        if (child.type === TabsList || child.type === TabsContent) {
          return React.cloneElement(child, {
            selectedValue,
            onValueChange: handleValueChange
          });
        }
        
        return child;
      })}
    </div>
  );
}

export function TabsList({ className, children, selectedValue, onValueChange, ...props }) {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className || ''}`} {...props}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        
        if (child.type === TabsTrigger) {
          return React.cloneElement(child, {
            selectedValue,
            onValueChange
          });
        }
        
        return child;
      })}
    </div>
  );
}

export function TabsTrigger({ className, value, children, selectedValue, onValueChange, ...props }) {
  const isSelected = selectedValue === value;
  
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isSelected ? 'bg-background text-foreground shadow-sm' : 'hover:bg-background/50 hover:text-foreground'} ${className || ''}`}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ className, value, children, selectedValue, ...props }) {
  if (selectedValue !== value) return null;
  
  return (
    <div className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className || ''}`} {...props}>
      {children}
    </div>
  );
}
