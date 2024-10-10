import { ZodSchema } from "zod";

export const validateAndSubmitForm = <T>(schema: ZodSchema<T>, formData: T) => {
  const validationResult = schema.safeParse(formData);

  if (!validationResult.success) {
    const novosErros: Partial<Record<keyof T, string>> = {};
    const fieldErrors = validationResult.error.formErrors.fieldErrors;
    const errorKeys = Object.keys(fieldErrors) as Array<keyof T>;

    errorKeys.forEach((key) => {
      novosErros[key] = fieldErrors[key]?.[0];
    });

    return {
      success: false,
      error: novosErros,
    };
  }

  return {
    success: true,
    error: [],
  };
};
