import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { ErrorMessage, useField } from "formik";
import React from "react";

type InputFieldProps = {
  name: string;
  type: string;
  id: string;
  textArea?: boolean;
  placeholder: string;
  label: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  children,
  textArea = false,
  ...props
}) => {
  const [field, { error }] = useField(props);

  let InputArea = Input;
  if (textArea) {
    InputArea = Textarea as any;
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputArea {...props} {...field} />
      {error ? (
        <ErrorMessage name={props.name}>{() => error}</ErrorMessage>
      ) : null}
    </FormControl>
  );
};
