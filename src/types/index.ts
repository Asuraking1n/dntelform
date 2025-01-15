export interface FormField {
  key: string;
  type: "text" | "boolean" | "select" | "date";
  label: string;
  options?: Array<{
    label: string;
    value: string | number;
  }>;
  colSpan?: 1 | 2;
  required?: boolean;
}

export interface FormSection {
  id: string;
  title: string;
  order: number;
  layout?: "full" | "right" | "left";
  fields: FormField[];
}

export interface FormConfig {
  sections: FormSection[];
}