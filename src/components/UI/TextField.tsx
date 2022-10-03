import React from "react"
import { TextField as MuiTextfield } from "@mui/material"

import { useField } from "formik"
import type { FieldHookConfig } from "formik"

type TextFieldProps = {
  label: string;
}

const TextField = (props: TextFieldProps & FieldHookConfig<string>) => {
  const [field, meta, { setValue, setTouched }] = useField(props.name)
  return (
    <MuiTextfield
      InputLabelProps={{
        style: {
          color: "white"
        }
      }}
      InputProps={{
        style: {
          background: "rgba(255, 255, 255, 0.1)",
          color: "white"
        }
      }}
      variant="filled" type={props.type} color="primary" className={props.className} error={meta.error !== undefined} helperText={meta.error} label={props.label} value={meta.value} onChange={(event) => setValue(event.target.value)} onBlur={(event) => setTouched(!meta.touched)} />
  )
}

export default TextField;