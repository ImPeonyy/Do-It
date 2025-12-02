"use client";

import { Controller, FieldValues, useForm } from "react-hook-form";
import { Input, Button } from "@/components/ui";

export default function Form() {
    const { control, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            default: "",
            warning: "",
            success: "",
            error: "",
        },
    });

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="default"
                render={({ field }) => (
                    <Input
                        {...field}
                        id="default"
                        label="Default"
                        typeStyle="pill"
                        type="text"
                        variant="default"
                        helperText="This is a default input"
                        disabled={true}
                    />
                )}
            />
            <Controller
                control={control}
                name="warning"
                render={({ field }) => (
                    <Input
                        {...field}
                        id="warning"
                        label="Warning"
                        typeStyle="pill"
                        type="text"
                        variant="warning"
                        helperText="This is a warning input"
                    />
                )}
            />
            <Controller
                control={control}
                name="success"
                render={({ field }) => (
                    <Input
                        {...field}
                        id="success"
                        label="Success"
                        typeStyle="pill"
                        type="text"
                        variant="success"
                        helperText="This is a success input"
                    />
                )}
            />
            <Controller
                control={control}
                name="error"
                render={({ field }) => (
                    <Input
                        {...field}
                        id="error"
                        label="Error"
                        typeStyle="pill"
                        type="text"
                        variant="error"
                        helperText="This is an error input"
                    />
                )}
            />
            <Button type="submit">Submit</Button>
        </form>
    );
}
