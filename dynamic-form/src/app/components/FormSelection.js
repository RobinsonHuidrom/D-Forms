

// FormSelection.js


import { useState } from 'react';

const FormSelection = ({ forms, onFormSelected }) => {
  const [selectedFormId, setSelectedFormId] = useState('');

  const handleChange = (event) => {
    const formId = event.target.value;
    setSelectedFormId(formId);
    onFormSelected(formId);
  };

  return (
    <div className="mb-4">
      <label htmlFor="formSelect" className="block text-sm font-medium text-gray-700">Select a Form</label>
      <select
        id="formSelect"
        value={selectedFormId}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="" disabled>Please select a form</option>
        {forms.map((form) => (
          <option key={form.formId} value={form.formId}>
            {form.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelection;
