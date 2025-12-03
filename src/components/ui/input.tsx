import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/index";
import { Label } from "@/components/ui";

const inputVariants = cva(
    `flex min-h-12 w-full bg-white py-2 pl-4 pr-2 gap-2 text-lg text-(--primary) rounded-md placeholder:text-gray-300 focus:outline-none disabled:bg-gray-700 disabled:text-black disabled:placeholder:text-black disabled:opacity-15 disabled:pointer-events-none`,
    {
        variants: {
            variant: {
                default: "border border-(--primary) hover:border-(--primary)/50",
                warning: "border border-(--warning) hover:border-(--warning)/50",
                success: "border border-(--success) hover:border-(--success)/50",
                error: "border border-(--error) hover:border-(--error)/50",
            },
            typeStyle: {
                default: "",
                pill: "rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            typeStyle: "default",
        },
    }
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    label?: string;
    helperText?: string;
}

const helperTextVariants: Record<string, string> = {
    default: "text-(--primary)",
    warning: "text-(--warning)",
    success: "text-(--success)",
    error: "text-(--error)",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, typeStyle, label, helperText, id, ...props }, ref) => {
        const helperTextClass = helperTextVariants[variant ?? "default"] ?? helperTextVariants.default;

        return (
            <div className="flex flex-col gap-1">
                {label && (
                    <Label htmlFor={id} disabled={props.disabled} className="pl-2">
                        {label}
                    </Label>
                )}
                <input id={id} className={cn(inputVariants({ variant, typeStyle }), className)} ref={ref} {...props} />
                {helperText && (
                    <span
                        className={cn(
                            "pl-2 text-sm",
                            helperTextClass,
                            props.disabled ? "pointer-events-none opacity-15" : ""
                        )}
                    >
                        {helperText}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
export default Input;
