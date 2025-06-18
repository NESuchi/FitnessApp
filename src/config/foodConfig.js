export const foodFormSchema = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'baseAmount', label: 'Menge (g/ml)', type: 'number', required: true },
    { name: 'energy', label: 'Energie (kcal)', type: 'number', required: true },
    { name: 'fat', label: 'Fett (g)', type: 'number', required: true },
    { name: 'carbohydrates', label: 'Kohlenhydrate (g)', type: 'number', required: true },
    { name: 'protein', label: 'Protein (g)', type: 'number', required: true },
    { name: 'salt', label: 'Salz (g)', type: 'number', required: true },
    { name: 'fiber', label: 'Ballaststoffe (g)', type: 'number', required: true },
    { name: 'drink', label: 'Getränk?', type: 'checkbox', required: true },
  ];

  export const foodTableColumns = foodFormSchema.map(field => ({
    key: field.name,
    label: field.label,
  }));
  
  export const foodInitialValues = foodFormSchema.reduce((acc, field) => {
    acc[field.name] = field.type === 'checkbox' ? false : '';
    return acc;
  }, {});