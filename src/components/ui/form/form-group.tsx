import * as React from "react";

export interface FormGroupProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
}

const FormGroup: React.ForwardRefExoticComponent<FormGroupProps> = React.forwardRef<HTMLElement, FormGroupProps>(
    ({ as: Component = "div", ...props }, ref) => {
        return <Component {...props} ref={ref} />;
    }
);

FormGroup.displayName = "FormGroup";

export default FormGroup;
