import React, { useState } from 'react';
import { FieldArray, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

// Reusable Input Component
const TextInput = ({ name, placeholder, disabled }) => (
  <Field
    type="text"
    name={name}
    placeholder={placeholder}
    disabled={disabled}
    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  />
);

const DynamicForm = ({ formConfig }) => {
  const [isPreview, setIsPreview] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const initializeControlValues = (control, acc) => {
    if (control.type === 'checkbox-group') {
      acc[control.controlName] = control.options.map(option => {
        const optionValue = { checked: false, input: '' };
        if (option.children) {
          option.children.forEach(child => initializeControlValues(child, optionValue));
        }
        return optionValue;
      });
    } else if (control.type === 'checkbox-input') {
      acc[control.controlName] = { isChecked: false, inputText: '' };
    } else if (control.type === 'input') {
      acc[control.controlName] = '';
    } else if (control.type === 'radio-group') {
      acc[control.controlName] = { selected: '', inputs: {} };
      control.options.forEach(option => {
        if (option.type === 'input') {
          acc[control.controlName].inputs[option.controlName] = '';
        }
      });
    } else {
      acc[control.controlName] = false;
    }
  };

  const resetControlValues = (control, setFieldValue, parentControlName = '') => {
    const controlName = parentControlName ? `${parentControlName}.${control.controlName}` : control.controlName;

    if (control.type === 'checkbox-group') {
      control.options.forEach((option, index) => {
        setFieldValue(`${controlName}[${index}].checked`, false);
        setFieldValue(`${controlName}[${index}].input`, '');
        if (option.children) {
          option.children.forEach(child => resetControlValues(child, setFieldValue, `${controlName}[${index}]`));
        }
      });
    } else if (control.type === 'checkbox-input') {
      setFieldValue(`${controlName}.isChecked`, false);
      setFieldValue(`${controlName}.inputText`, '');
    } else if (control.type === 'input') {
      setFieldValue(controlName, '');
    } else if (control.type === 'radio-group') {
      setFieldValue(`${controlName}.selected`, '');
      control.options.forEach(option => {
        if (option.type === 'input') {
          setFieldValue(`${controlName}.inputs.${option.controlName}`, '');
        }
      });
    }
  };

  const initialValues = React.useMemo(() => {
    return formConfig.steps.reduce((acc, step) => {
      step.controls.forEach(control => {
        initializeControlValues(control, acc);
      });
      return acc;
    }, {});
  }, [formConfig]);

  const validationSchema = Yup.object().shape({
    // Add your validation schema here
  });

  const filterFormData = (values, formConfig) => {
    const filteredData = {};

    const recursiveFilter = (data, controls) => {
      const result = {};

      controls.forEach(control => {
        if (control.type === 'checkbox-group') {
          const selectedOptions = data[control.controlName]
            .map((option, index) => {
              const optionConfig = control.options[index];
              if (option.checked || option.isChecked || option.selected || option.inputText || option.input) {
                const filteredOption = {
                  label: optionConfig.label,
                  value: optionConfig.value,
                };
                if (optionConfig.children && optionConfig.children.length > 0) {
                  const filteredChildren = recursiveFilter(option, optionConfig.children);
                  if (Object.keys(filteredChildren).length > 0) {
                    filteredOption.children = filteredChildren;
                  }
                }
                if (option.input) {
                  filteredOption.input = option.input;
                }
                if (option.inputText) {
                  filteredOption.inputText = option.inputText;
                }
                return filteredOption;
              }
              return null;
            })
            .filter(item => item !== null);
          if (selectedOptions.length > 0) {
            result[control.controlName] = selectedOptions;
          }
        } else if (control.type === 'radio-group') {
          if (data[control.controlName].selected) {
            result[control.controlName] = {
              label: control.label,
              value: data[control.controlName].selected,
              inputs: data[control.controlName].inputs
            };
          }
        } else if (control.type === 'checkbox-input') {
          if (data[control.controlName].isChecked) {
            result[control.controlName] = {
              label: control.label,
              value: data[control.controlName].inputText
            };
          }
        } else if (control.type === 'input') {
          if (data[control.controlName]) {
            result[control.controlName] = {
              label: control.label,
              value: data[control.controlName]
            };
          }
        }
      });

      return result;
    };

    formConfig.steps.forEach(step => {
      const filteredStepData = recursiveFilter(values, step.controls);
      if (Object.keys(filteredStepData).length > 0) {
        filteredData[step.label] = filteredStepData;
      }
    });

    return filteredData;
  };

  const handlePreview = (values) => {
    const filteredData = filterFormData(values, formConfig);
    setFormValues(filteredData);
    setIsPreview(true);
  };

  const handleFinalSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/saveFormData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formId: formConfig.formId, data: formValues }),
      });
      if (!response.ok) {
        throw new Error('Failed to save form data');
      }
      alert('Form data saved successfully!');
      setIsPreview(false);
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the form data');
    }
  };

  const renderControl = (control, values, setFieldValue, parentControlName = '', level = 0, parentChecked = true) => {
    const controlName = parentControlName ? `${parentControlName}.${control.controlName}` : control.controlName;
    const paddingLeft = level > 0 ? `${level * 20}px` : '0px';
    const isDisabled = !parentChecked;

    if (control.type === 'checkbox-group') {
      return (
        <div key={controlName} className="mb-4" style={{ paddingLeft }}>
          <label className="block text-sm font-medium text-gray-700">{control.label}</label>
          <FieldArray name={controlName}>
            {() => (
              <div className="border-l-2 pl-4">
                {control.options.map((option, index) => (
                  <div key={`${controlName}[${index}]`} className="mb-2">
                    <div className="flex items-center">
                      <Field
                        type="checkbox"
                        name={`${controlName}[${index}].checked`}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        disabled={isDisabled}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setFieldValue(`${controlName}[${index}].checked`, isChecked);
                          if (!isChecked) {
                            option.children?.forEach(child => resetControlValues(child, setFieldValue, `${controlName}[${index}]`));
                            if (option.type === 'input') {
                              setFieldValue(`${controlName}[${index}].input`, '');
                            }
                          }
                        }}
                      />
                      <label className="ml-2 text-sm text-gray-900">
                        {option.label || option.value}
                      </label>
                    </div>
                    {values[control.controlName][index].checked && option.type === 'input' && (
                      <div className="ml-6 mt-1">
                        <TextInput
                          name={`${controlName}[${index}].input`}
                          placeholder={option.inputLabel}
                          disabled={isDisabled}
                        />
                      </div>
                    )}
                    {option.children && option.children.length > 0 && (
                      <div className="ml-6 mt-2">
                        {option.children.map(child => renderControl(child, values[control.controlName][index], setFieldValue, `${controlName}[${index}]`, level + 1, values[control.controlName][index].checked))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </FieldArray>
        </div>
      );
    }

    if (control.type === 'radio-group') {
      return (
        <div key={controlName} className="mb-4" style={{ paddingLeft }}>
          <label className="block text-sm font-medium text-gray-700">{control.label}</label>
          <div className="border-l-2 pl-4">
            {control.options.map((option, index) => (
              <div key={`${controlName}[${index}]`} className="mb-2">
                <div className="flex items-center">
                  <Field
                    type="radio"
                    name={`${controlName}.selected`}
                    value={option.value}
                    className="h-4 w-4 text-indigo-600 border-gray-300"
                    disabled={isDisabled}
                    onChange={(e) => {
                      const isSelected = e.target.checked;
                      setFieldValue(`${controlName}.selected`, isSelected ? option.value : '');
                      if (!isSelected) {
                        if (option.type === 'input') {
                          setFieldValue(`${controlName}.inputs.${option.controlName}`, '');
                        }
                      }
                    }}
                  />
                  <label className="ml-2 text-sm text-gray-900">{option.label || option.value}</label>
                </div>
                {values[control.controlName].selected === option.value && option.type === 'input' && (
                  <div className="mt-2">
                    <TextInput
                      name={`${controlName}.inputs.${option.controlName}`}
                      placeholder={option.inputLabel}
                      disabled={isDisabled}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (control.type === 'checkbox-input') {
      return (
        <div key={controlName} className="mb-4" style={{ paddingLeft }}>
          <div className="flex items-center">
            <Field
              type="checkbox"
              name={`${controlName}.isChecked`}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              disabled={isDisabled}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setFieldValue(`${controlName}.isChecked`, isChecked);
                if (!isChecked) {
                  setFieldValue(`${controlName}.inputText`, '');
                }
              }}
            />
            <label className="ml-2 text-sm text-gray-900">{control.label}</label>
          </div>
          {values[control.controlName].isChecked && (
            <div className="ml-6 mt-1">
              <TextInput
                name={`${controlName}.inputText`}
                placeholder={control.inputLabel}
                disabled={isDisabled}
              />
            </div>
          )}
        </div>
      );
    }

    if (control.type === 'input') {
      return (
        <div key={controlName} className="mb-4" style={{ paddingLeft }}>
          <label className="block text-sm font-medium text-gray-700">{control.label}</label>
          <TextInput
            name={controlName}
            placeholder={control.label}
            disabled={isDisabled}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handlePreview}
    >
      {({ values, setFieldValue }) => (
        !isPreview ? (
          <Form className="space-y-4">
            {formConfig.steps.map((step, stepIndex) => (
              <div key={stepIndex} className="border-b-2 pb-4 mb-4">
                <h2 className="text-lg font-medium text-gray-900">{step.label}</h2>
                {step.controls.map((control, controlIndex) => renderControl(control, values, setFieldValue))}
              </div>
            ))}
            <button
              type="submit"
              className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Preview
            </button>
          </Form>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Preview</h2>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(formValues, null, 2)}</pre>
            <button
              onClick={() => setIsPreview(false)}
              className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Edit
            </button>
            <button
              onClick={handleFinalSubmit}
              className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        )
      )}
    </Formik>
  );
};

export default DynamicForm;
