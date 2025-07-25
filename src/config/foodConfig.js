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

export const foodTableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'baseAmount', label: 'Menge (g/ml)' },
  { key: 'energy', label: 'Energie (kcal)' },
  { key: 'drink', label: 'Getränk?', render: (item) => (item.drink ? 'Ja' : 'Nein') },
]

export const foodInitialValues = {
  name: '',
  baseAmount: '',
  energy: '',
  fat: '',
  carbohydrates: '',
  protein: '',
  salt: '',
  fiber: '',
  drink: false
}

export const foodPanelColumns = [
  { key: 'name', label: 'Mahlzeit' },
  { key: 'energy', label: 'Energie (kcal)' }
]