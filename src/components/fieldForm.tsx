import { Field, Text } from "@chakra-ui/react";

import { mainFormSchema } from "@/config/form-main-schema";

interface FieldFormProps {
  fieldLabel: string;
  errorMessage?: string;
  children: React.ReactNode;
}

export function FieldForm({
  fieldLabel,
  errorMessage,
  children,
}: FieldFormProps) {
  const { stylesForm } = mainFormSchema;

  return (
    <Field.Root>
      <Field.Label {...stylesForm.labelsStyles}>{fieldLabel}</Field.Label>
      {children}

      <Text color="red"> {errorMessage}</Text>
    </Field.Root>
  );
}
