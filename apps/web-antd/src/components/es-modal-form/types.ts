import type { EsFormSchema } from '#/global';

export interface EsModalFormProps {
  title?: string;
  record?: Record<string, any>;
  schema: EsFormSchema;
  onSubmit?: (values: Record<string, any>) => Promise<void> | void;
}
