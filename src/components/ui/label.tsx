"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import cn from "@/utils/cn.util";

const labelVariants = cva("text-md font-bold flex-shrink-0 text-(--primary)", {
    variants: {
        disabled: {
            true: "opacity-15 pointer-events-none",
        },
    },
    defaultVariants: {
        disabled: false,
    },
});

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {
    children: React.ReactNode;
}

const Label = ({ className, disabled, ...props }: LabelProps) => {
    return <label className={cn(labelVariants({ disabled }), className)} {...props} />;
};
Label.displayName = "Label";

export default Label;
