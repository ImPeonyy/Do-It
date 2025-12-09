import * as React from "react";
import { HTMLInputTypeAttribute } from "react";
import FormFieldMessage from "./form-field-message";

type FormFieldElement = HTMLInputElement | HTMLTextAreaElement;

export interface FormFieldProps extends React.InputHTMLAttributes<FormFieldElement> {
    as?: React.ElementType;
    type?: HTMLInputTypeAttribute;
    value?: string | string[] | number | undefined;
    onChange?: React.ChangeEventHandler<FormFieldElement> | undefined;
    id?: string | undefined;
}

const FormControl: React.ForwardRefExoticComponent<FormFieldProps> = React.forwardRef<FormFieldElement, FormFieldProps>(
    ({ as: Component = "input", type, id, className, readOnly, ...props }, ref) => {
        return <Component {...props} type={type} ref={ref} readOnly={readOnly} id={id} className={className} />;
    }
);

FormControl.displayName = "FormControl";

export default Object.assign(FormControl, {
    msg: FormFieldMessage,
});
