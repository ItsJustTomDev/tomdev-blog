import React from "react"
import { TextField as MuiTextfield } from "@mui/material"

import { useField } from "formik"
import type { FieldHookConfig } from "formik"

type TextFieldProps = {
    label: string;
    filled?: boolean;
    isPostTitle?: boolean;
    isPostContent?: boolean;
    isPostAbout?: boolean;
    placeholder?: string;
}

const TextField = (props: TextFieldProps & FieldHookConfig<string>) => {
    const [field, meta, { setValue, setTouched }] = useField(props.name)
    return (
        <MuiTextfield
            InputLabelProps={!props.filled ? {
                style: {
                    color: "white"
                }
            } : undefined}
            InputProps={!props.filled ? {
                style: {
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "white"
                }
            } : {
                sx: props.isPostTitle ? {
                    "& input::placeholder": {
                        fontStyle: "italic",
                        fontSize: "1.3rem"
                    }
                } : {
                    "& textArea::placeholder": {
                        fontStyle: "italic"
                    }
                }
            }}
            variant="filled" placeholder={props.placeholder} type={props.type} color="primary" multiline={props.isPostContent ? props.isPostContent : props.isPostAbout && props.isPostAbout} minRows={props.isPostContent ? 10 : props.isPostAbout ? 5 : 0} className={props.className} error={meta.error !== undefined} helperText={meta.error} label={props.label} value={meta.value} onChange={(event) => setValue(event.target.value)} onBlur={(event) => setTouched(!meta.touched)} />
    )
}

export default TextField;