import * as React from "react";
import { cn } from "@/utils/index";
import { cva, type VariantProps } from "class-variance-authority";

const formLabelVariants = cva("text-md font-bold flex-shrink-0", {
    variants: {
        disabled: {
            true: "opacity-15 pointer-events-none",
        },
    },
    defaultVariants: {
        disabled: false,
    },
});

export interface FormLabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof formLabelVariants> {
    children: React.ReactNode;
}

const FormLabel = ({ className, disabled, ...props }: FormLabelProps) => {
    return <label className={cn(formLabelVariants({ disabled }), className)} {...props} />;
};
FormLabel.displayName = "FormLabel";

export default FormLabel;
