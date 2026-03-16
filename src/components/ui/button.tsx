"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-lg",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold",
        "hero-outline":
          "shadow-[inset_0_0_0_2px_white] bg-card/80 backdrop-blur-sm text-foreground rounded-full font-semibold hover:bg-white hover:text-primary transition-all",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  as?: React.ElementType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      as: Component = "button",
      onMouseEnter,
      ...props
    },
    ref
  ) => {
    const [ripple, setRipple] = React.useState<{
      x: number;
      y: number;
      size: number;
      active: boolean;
    }>({
      x: 0,
      y: 0,
      size: 0,
      active: false,
    });
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(ref, () => buttonRef.current!);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();

        const rippleSize = Math.max(rect.width, rect.height) * 2.5;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setRipple({ x, y, size: rippleSize, active: true });
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = () => {
      setRipple((prev) => ({ ...prev, active: false }));
    };

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }

    const customRippleColor = props["data-ripple-color"] as string | undefined;

    const getRippleColor = () => {
      if (customRippleColor === "white") return "bg-white";
      switch (variant) {
        case "hero":
          return "bg-primary-foreground/20";
        case "hero-outline":
          return "bg-primary";
        case "default":
          return "bg-primary-foreground/20";
        case "secondary":
          return "bg-secondary-foreground/20";
        case "outline":
          return "bg-accent";
        case "ghost":
          return "bg-accent";
        case "destructive":
          return "bg-destructive-foreground/20";
        default:
          return "bg-primary-foreground/20";
      }
    };

    const getTextColorOnHover = () => {
      if (customRippleColor === "white") return "group-hover:text-primary";
      if (variant === "hero-outline")
        return "group-hover:text-primary-foreground";
      return "";
    };

    return (
      <Component
        ref={buttonRef}
        className={cn(buttonVariants({ variant, size, className }), "group")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}>
        <span
          className={cn(
            "absolute rounded-full pointer-events-none transition-transform duration-500 ease-out will-change-transform",
            getRippleColor()
          )}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size, // Apply dynamic size
            height: ripple.size,
            transform: `translate(-50%, -50%) scale(${ripple.active ? 1 : 0})`,
          }}
        />
        <span
          className={cn(
            "relative z-10 flex items-center gap-2 transition-colors duration-300",
            getTextColorOnHover()
          )}>
          {props.children}
        </span>
      </Component>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
