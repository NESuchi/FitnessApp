export const loginFormSchema = [
    { name: 'email', label: 'E-Mail', type: 'email', required: true },
    { name: 'password', label: 'Passwort', type: 'password', required: true}
];

export const loginInitialValues = {
    email: '',
    password: '',
};

export const signupFormSchema = [
    { name: 'firstname', label: 'Vorname', type: 'text', required: true },
    { name: 'lastname', label: 'Nachname', type: 'text', required: true },
    { name: 'street', label: 'Straße & Hausnummer', type: 'text', required: true },
    { name: 'postcode', label: 'PLZ', type: 'text', required: true },
    { name: 'city', label: 'Stadt', type: 'text', required: true },
    { name: 'country', label: 'Land', type: 'text', required: true },
    { name: 'phone', label: 'Telefonnummer', type: 'text', required: true },
    { name: 'email', label: 'E-Mail', type: 'email', required: true },
    { name: 'password', label: 'Passwort', type: 'password', required: true },
];

export const signupInitialValues = {
    firstname: '',
    lastname: '',
    street: '',
    postcode: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    password: '',
};
