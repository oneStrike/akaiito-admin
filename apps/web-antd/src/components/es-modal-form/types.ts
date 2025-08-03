export interface EsModalFormProps {
  title?: string;
  record?: Record<string, any>;
  schema: FormSchema;
  onSubmit?: (values: Record<string, any>) => Promise<void> | void;
}
