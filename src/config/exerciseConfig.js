// Konfiguration für Exercise in dem generischem Formular
export const exerciseFormSchema = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'baseTime', label: 'Zeit (Minuten)', type: 'number', required: true },
  { name: 'energyBurned', label: 'Energie verbrannt (kcal)', type: 'number', required: true },
];

// Konfiguration für Exercise in der generischem Tabelle
export const exerciseTableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'baseTime', label: 'Zeit (Minuten)' },
  { key: 'energyBurned', label: 'Energie verbrannt (kcal)' },
]

// Initialwerte für das Formular
export const exerciseInitialValues = {
  name: '',
  baseTime: '',
  energyBurned: '',
}

// Config für Exercises in der Kalendertabelle
export const exercisePanelColumns = [
  { key: 'name', label: 'Übung' },
  { key: 'energyBurned', label: 'Energie verbrannt (kcal/h)' }
]