import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axiosURL";

// Alle Foods fetchen
export const fetchFoods = createAsyncThunk('foods/fetchFoods', async () => {
    const res = await axios.get('/fitness/food');
    return res.data;
});

// Food hinzufügen
export const addFood = createAsyncThunk('/foods/addFood', async (foodData) => {
    const res = await axios.post('/fitness/food', foodData);
    return res.data;
});

// Food aktualisieren
export const updateFood = createAsyncThunk('/foods/updateFood', async (foodData) => {
    const res = await axios.put(`/fitness/food/${foodData.id}`, foodData);
    return res.data;
});

// Food löschen
export const deleteFood = createAsyncThunk('/foods/deleteFood', async (foodId) => {
    const res = axios.delete(`/fitness/food/${foodId}`);
    return res.data;
});

// Slice erstellen ("unterbereich" des stores) der den reducer, ActionCreators und ActionTypes erstellt
const foodSlice = createSlice({ 
    name: 'foods',
    // Initialwerte wenn die App gestartet wird
    initialState: {
        items: [], // Array das Food Objekte speichert
        status: 'idle', // Statusanzeige (bspw. loading, succeeded etc)
        error: null // Fehlermeldung
    },
    // synchrone Aktionen
    reducers: {},
    // asynchrone Aktionen
    extraReducers: (builder) => {
        builder
            // Case für fetch
            .addCase(fetchFoods.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFoods.fulfilled, (state, action) => {
                state.status = 'succeded';
                // item Array die Daten aus dem payload zuweisen
                state.items = action.payload; // payload enthaält daten die von createAsyncThunk zurückgegeben wurden
            })
            .addCase(fetchFoods.rejected, (state, action) => {
                state.status = 'faliled';
                // lesbare fehlermeldung in state.error speichern
                state.error = action.error.message;
            })
            // Case für hinzufügen
            .addCase(addFood.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Case für Aktualisieren
            .addCase(updateFood.fulfilled, (state, action) => {
                // index für das Objekt speichern, dessen id mit der id aus dem payload übereinstimmt 
                const index = state.items.findIndex(item => item.id === action.payload.id);
                // Sicherheitsabfrage falls nichts gefunden wurde
                if (index !== -1) {
                    // Altes Objekt austauschen
                    state.items[index] = action.payload;
                }
            })
            // Case für löschen
            .addCase(deleteFood.fulfilled, (state, action) => {
                // neues Array erstellen, das alle Objekte enthält, deren id nicht der gelöschten id entspricht
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    },
});

export default foodSlice.reducer;