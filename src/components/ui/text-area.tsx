"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn, countWords } from "@/utils/index";
import { Label } from "@/components/ui";
import { WORD_BUFFER } from "@/constants/index";

const textareaVariants = cva(
    "flex min-h-12 w-full gap-2 rounded bg-white resize-none py-2 pl-4 pr-2 text-lg text-(--primary) placeholder:text-gray-300 focus:outline-none disabled:pointer-events-none disabled:bg-gray-700 disabled:text-black disabled:opacity-15 disabled:placeholder:text-black",
    {
        variants: {
            variant: {
                default: "border border-(--primary) hover:border-(--primary)/50",
                warning: "border border-(--warning) hover:border-(--warning)/50",
                success: "border border-(--success) hover:border-(--success)/50",
                error: "border border-(--error) hover:border-(--error)/50",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
        label?: string;
        helperText?: string;
        variant?: "default" | "warning" | "success";
        maxWords?: number;
    }
>(({ className, onChange, value, helperText, variant, maxWords, ...props }, ref) => {
    const [wordCount, setWordCount] = React.useState(0);
    const [wordCountColor, setWordCountColor] = React.useState("");

    React.useEffect(() => {
        if (!maxWords) return;

        let color = "text-(--error)";

        if (wordCount === 0) {
            color = "text-(--primary)";
        } else if (wordCount === maxWords) {
            color = "text-(--success)";
        } else if (Math.abs(wordCount - maxWords) <= WORD_BUFFER) {
            color = "text-(--warning)";
        }

        setWordCountColor(color);
    }, [wordCount, maxWords]);

    const getHelperTextColor = () => {
        if (variant === "warning") return "text-(--warning)";
        if (variant === "success") return "text-(--success)";
        if (props.disabled) return "text-gray-400";
        return "text-(--primary)";
    };

    return (
        <div className="flex flex-col items-start gap-1 text-(--primary)">
            <Label htmlFor={props.id} disabled={props.disabled}>
                {props.label}
            </Label>
            <textarea
                className={cn(textareaVariants({ variant }), className)}
                ref={ref}
                onChange={(e) => {
                    const content = e.target.value;
                    setWordCount(countWords(content));

                    if (onChange) onChange(e);
                }}
                onPaste={(e) => e.preventDefault()}
                value={value}
                {...props}
            />
            <div className={cn("flex w-full items-center", helperText ? "justify-between" : "justify-end")}>
                {helperText && <p className={cn("text-md", getHelperTextColor())}>{helperText}</p>}
                {maxWords && (
                    <span className={cn("text-sm font-medium", wordCountColor)}>
                        {wordCount}/{maxWords}
                    </span>
                )}
            </div>
        </div>
    );
});
Textarea.displayName = "Textarea";

export default Textarea;
