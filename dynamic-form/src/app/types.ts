

// type.ts


export interface FormOption {
  label: string;
  value: string;
  type?: string; // 'input' for text inputs
  controlName?: string; // Name for the input field in Formik
  inputLabel?: string; // Placeholder or label for the input field
  children?: FormControlConfig[]; // For nested controls
}

export interface FormControlConfig {
  type: string; // 'checkbox-group', 'radio-group', 'input', etc.
  controlName: string; // Unique name for the control in Formik
  label: string; // Label displayed to the user
  options?: FormOption[]; // Options for checkbox-group and radio-group
  children?: FormControlConfig[]; // For nested controls (optional)
  inputLabel?: string; // Placeholder or label for input fields (optional)
}

export interface FormStepConfig {
  label: string;
  controls: FormControlConfig[];
}

export interface FormConfig {
  name: string;
  formId: number;
  steps: FormStepConfig[];
}
