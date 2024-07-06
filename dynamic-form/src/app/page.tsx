

// Page.tsx


"use client";

import { useState } from 'react';
import DynamicForm from '../app/components/DynamicForm';
import FormSelection from '../app/components/FormSelection';
import { FormConfig } from '../app/types';

// Define multiple forms (for demonstration, you can add more forms here)
const forms: FormConfig[] = [
  {
    name: "Form 3",
    formId: 3,
    steps: [
      {
        label: "Phyllodes Tumor Margins",
        controls: [
          {
            type: "checkbox-group",
            controlName: "phyllodesTumorStatus",
            label: " ",
            options: [
              {
                label: "All margins negative for phyllodes tumor",
                value: "allMarginsNegative",
                children: [
                  {
                    type: "checkbox-group",
                    controlName: "closestMargins",
                    label: "Closest Margin(s) to Phyllodes Tumor (select all that apply)",
                    options: [
                      {
                        label: "Anterior",
                        value: "anterior",
                        children: []
                      },
                      {
                        label: "Posterior",
                        value: "posterior",
                        children: []
                      },
                      {
                        label: "Other (specify):",
                        value: "other",
                        type: "input",
                        controlName: "otherClosestMargin",
                        inputLabel: "Please specify",
                        children: []
                      },
                      {
                        label: "Cannot be determined (explain):",
                        value: "cannotDetermine",
                        type: "input",
                        controlName: "cannotDetermineClosestMargin",
                        inputLabel: "Please explain",
                        children: []
                      }
                    ]
                  },
                  {
                    type: "radio-group",
                    controlName: "distanceToClosestMargin",
                    label: "Distance from Phyllodes Tumor to Closest Margin. Specify in Millimeters (mm)",
                    options: [
                      {
                        label: "Exact distance:",
                        value: "exactDistance",
                        type: "input",
                        controlName: "exactDistanceInput",
                        inputLabel: "Enter exact distance (in mm)",
                        children: []
                      },
                      {
                        label: "Less than:",
                        value: "lessThan",
                        type: "input",
                        controlName: "lessThanInput",
                        inputLabel: "Enter value (in mm)",
                        children: []
                      },
                      {
                        label: "Greater than:",
                        value: "greaterThan",
                        type: "input",
                        controlName: "greaterThanInput",
                        inputLabel: "Enter value (in mm)",
                        children: []
                      },
                      {
                        label: "Other (specify):",
                        value: "otherDistance",
                        type: "input",
                        controlName: "otherDistanceInput",
                        inputLabel: "Please specify distance (in mm)",
                        children: []
                      },
                      {
                        label: "Cannot be determined (explain):",
                        value: "cannotDetermineDistance",
                        type: "input",
                        controlName: "cannotDetermineDistanceInput",
                        inputLabel: "Please explain",
                        children: []
                      }
                    ]
                  }
                ]
              },
              {
                label: "Phyllodes tumor present at margin",
                value: "tumorPresentAtMargin",
                children: [
                  {
                    type: "checkbox-group",
                    controlName: "marginsInvolved",
                    label: "Margin(s) Involved by Phyllodes Tumor (select all that apply)",
                    options: [
                      {
                        label: "Medial",
                        value: "medial",
                        children: []
                      },
                      {
                        label: "Lateral",
                        value: "lateral",
                        children: []
                      },
                      {
                        label: "Other (specify):",
                        value: "otherInvolved",
                        type: "input",
                        controlName: "otherInvolvedInput",
                        inputLabel: "Please specify",
                        children: []
                      },
                      {
                        label: "Cannot be determined (explain):",
                        value: "cannotDetermineInvolved",
                        type: "input",
                        controlName: "cannotDetermineInvolvedInput",
                        inputLabel: "Please explain",
                        children: []
                      }
                    ]
                  }
                ]
              },
              {
                label: "Other (specify):",
                value: "otherInvolved",
                type: "input",
                controlName: "otherInvolvedInput",
                inputLabel: "Please specify",
                children: []
              },
              {
                label: "Cannot be determined (explain):",
                value: "cannotDetermineInvolved",
                type: "input",
                controlName: "cannotDetermineInvolvedInput",
                inputLabel: "Please explain", 
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
];

export default function Home() {
  const [selectedForm, setSelectedForm] = useState<FormConfig | null>(null);

  const handleFormSelected = (formId: string) => {
    const form = forms.find(f => f.formId === parseInt(formId));
    setSelectedForm(form || null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FormSelection forms={forms} onFormSelected={handleFormSelected} />
      {selectedForm && <DynamicForm formConfig={selectedForm} />}
    </div>
  );
}


