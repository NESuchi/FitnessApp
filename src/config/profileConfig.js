export const profileFormSchema = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'age', label: 'Alter', type: 'number', required: true },
  { name: 'height', label: 'Größe (cm)', type: 'number', required: true },
  { name: 'weight', label: 'Gewicht (Kg)', type: 'number', required: true },
  {
    name: 'sex',
    label: 'Geschlecht',
    type: 'select',
    required: true,
    options: [
        { value: '', label: 'Bitte auswählen...' },
        { value: 0, label: 'Weiblich' },
        { value: 1, label: 'Männlich' }
    ]
  },
];

export const profileTableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Alter' },
  { key: 'height', label: 'Größe (cm)' },
  { key: 'weight', label: 'Gewicht (Kg)' },
]

export const profileInitialValues = {
  name: '',
  age: '',
  height: '',
  weigth: '',
  sex: ''
}