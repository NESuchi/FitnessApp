export const exerciseFormSchema = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'baseTime', label: 'Zeit (Minuten)', type: 'number', required: true },
  { name: 'energyBurned', label: 'Energie verbrannt (kcal)', type: 'number', required: true },
];

export const exerciseTableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'baseTime', label: 'Zeit (Minuten)' },
  { key: 'energyBurned', label: 'Energie verbrannt (kcal)' },
]

export const exerciseInitialValues = {
  name: '',
  baseTime: '',
  energyBurned: '',
}

export const exercisePanelColumns = [
  { key: 'name', label: 'Übung' },
  { key: 'energyBurned', label: 'Energie verbrannt (kcal/h)' }
]