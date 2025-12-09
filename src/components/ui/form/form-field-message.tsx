import * as React from "react";
import { cn } from "@/utils/index";
import { cva, type VariantProps } from "class-variance-authority";

const formFieldMessageVariants = cva("text-sm", {
    variants: {
        variant: {
            default: "text-(--primary)",
            warning: "text-(--warning)",
            success: "text-(--success)",
            error: "text-(--error)",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface FormFieldMessageProps
    extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof formFieldMessageVariants> {
    children: React.ReactNode;
    variant: "default" | "warning" | "success" | "error";
}

const FormFieldMessage = ({ children, className, variant = "default", ...props }: FormFieldMessageProps) => {
    return (
        <span className={cn(formFieldMessageVariants({ variant }), className)} {...props}>
            {children}
        </span>
    );
};

export default FormFieldMessage;
