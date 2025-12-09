import * as React from "react";
import FormField from "./form-field";
import FormLabel from "./form-label";
import FormGroup from "./form-group";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    as?: React.ElementType;
}

const Form: React.ForwardRefExoticComponent<FormProps> = React.forwardRef<HTMLFormElement, FormProps>(
    ({ className, as: Component = "form", ...props }, ref) => <Component {...props} ref={ref} className={className} />
);

Form.displayName = "Form";

export default Object.assign(Form, {
    Group: FormGroup,
    Field: FormField,
    Label: FormLabel,
});
