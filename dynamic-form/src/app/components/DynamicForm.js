import { useFormik, FieldArray, Field, Formik, Form } from 'formik';

const DynamicForm = ({ formConfig }) => {
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

  const initialValues = formConfig.steps.reduce((acc, step) => {
    step.controls.forEach(control => {
      initializeControlValues(control, acc);
    });
    return acc;
  }, {});

  const renderControl = (control, values, parentControlName = '', level = 0) => {
    const controlName = parentControlName ? `${parentControlName}.${control.controlName}` : control.controlName;
    const paddingLeft = level > 0 ? `${level * 20}px` : '0px';

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
                      />
                      <label className="ml-2 text-sm text-gray-900">
                        {option.label || option.value}
                      </label>
                    </div>
                    {values[control.controlName][index].checked && option.type === 'input' && (
                      <div className="ml-6 mt-1">
                        <Field
                          type="text"
                          name={`${controlName}[${index}].input`}
                          placeholder={option.inputLabel}
                          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    )}
                    {option.children && option.children.length > 0 && (
                      <div className="ml-6 mt-2">
                        {option.children.map(child => renderControl(child, values[control.controlName][index], `${controlName}[${index}]`, level + 1))}
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
                  />
                  <label className="ml-2 text-sm text-gray-900">{option.label || option.value}</label>
                </div>
                {values[control.controlName].selected === option.value && option.type === 'input' && (
                  <div className="mt-2">
                    <Field
                      type="text"
                      name={`${controlName}.inputs.${option.controlName}`}
                      placeholder={option.inputLabel}
                      className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            />
            <label className="ml-2 text-sm text-gray-900">{control.label}</label>
          </div>
          {values[control.controlName].isChecked && (
            <div className="ml-6 mt-1">
              <Field
                type="text"
                name={`${controlName}.inputText`}
                placeholder={control.inputLabel}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          <Field
            type="text"
            name={controlName}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form className="space-y-4">
          {formConfig.steps.map((step, stepIndex) => (
            <div key={stepIndex} className="border-b-2 pb-4 mb-4">
              <h2 className="text-lg font-medium text-gray-900">{step.label}</h2>
              {step.controls.map((control, controlIndex) => renderControl(control, values))}
            </div>
          ))}
          <button
            type="submit"
            className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
