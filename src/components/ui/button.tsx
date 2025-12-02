import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/index";

const buttonVariants = cva(
    `inline-flex w-fit items-center justify-center gap-2 whitespace-nowrap transition-colors cursor-pointer disabled:pointer-events-none`,
    {
        variants: {
            variant: {
                default: "bg-(--primary) text-white hover:bg-opacity-80 disabled:bg-gray-100 disabled:text-gray-500 ",
                outline:
                    "border border-(--primary) text-(--primary) hover:bg-opacity-80 disabled:text-gray-400 disabled:border-gray-200",
            },
            typeStyle: {
                default: "",
                pill: "rounded-full",
            },
            size: {
                sm: "px-4 py-[3px] text-body-sm [&_svg]:w-4 [&_svg]:h-4 rounded-sm",
                md: "px-5 py-[5.5px] text-body-md [&_svg]:w-[18px] [&_svg]:h-[18px] rounded-md",
                lg: "px-6 py-2 text-body-lg [&_svg]:w-5 [&_svg]:h-5 rounded-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            typeStyle: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, typeStyle, children, ...props }, ref) => {
        return (
            <button className={cn(buttonVariants({ variant, size, typeStyle, className }))} ref={ref} {...props}>
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export default Button;
