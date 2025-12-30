import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/libs/utils";

function Label({
    className,
    required,
    ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }) {
    return (
        <LabelPrimitive.Root
            data-slot="label"
            data-required={required}
            className={cn(
                "flex items-center gap-1 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                required && "after:text-lg after:font-bold after:text-red-500 after:content-['*']",
                className
            )}
            {...props}
        />
    );
}

export { Label };
