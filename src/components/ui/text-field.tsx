import React from "react"
import { TextField as MuiTextfield, TextFieldProps } from "@mui/material"

import { useField } from "formik"
import type { FieldHookConfig } from "formik"

const TextField = (props: FieldHookConfig<string> & TextFieldProps) => {
    const [field, meta, { setValue, setTouched }] = useField(props.name)
    return (
        <MuiTextfield
            {...props}
            variant="filled"
            placeholder={props.placeholder}
            type={props.type}
            color="primary"
            className={props.className} error={meta.error !== undefined}
            helperText={meta.error} label={props.label} value={meta.value}
            onChange={(event) => setValue(event.target.value)}
            onBlur={() => setTouched(!meta.touched)}
        />
    )
}

export default TextField;