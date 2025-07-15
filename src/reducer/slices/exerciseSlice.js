import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axiosURL";

// Alle Exercises fetchen
export const fetchExercises = createAsyncThunk('/exercises/fetchExercises', async () => {
    const res = await axios.get('/fitness/exercises');
    return res.data;
});

// Exercise hinzufügen
export const addExercise = createAsyncThunk('/exercises/addExercise', async (exerciseData) => {
    const res = await axios.post('/fitness/exercise/', exerciseData);
    return res.data;
});

// Exercise aktualisieren
export const updateExercise = createAsyncThunk('/exercises/updateExercise', async (exerciseData) => {
    const payload = { ...exerciseData, exerciseId: exerciseData._id };
    delete payload._id;

    await axios.put('/fitness/exercise/', payload);
    return exerciseData;
});

// Exercise löschen
export const deletExercise = createAsyncThunk('/exercises/deleteExercise', async (exerciseId) => {
    await axios.delete(`/fitness/exercise/${exerciseId}`);
    return exerciseId;
});

// Slice erstellen ("unterbereich" des stores) der den reducer, ActionCreators und ActionTypes erstellt
const exerciseSlice = createSlice({ 
    name: 'exercises',
    // Initialwerte wenn die App gestartet wird
    initialState: {
        items: [], // Array das Exercise Objekte speichert
        status: 'idle', // Statusanzeige (bspw. loading, succeeded etc)
        error: null // Fehlermeldung
    },
    // synchrone Aktionen
    reducers: {},
    // asynchrone Aktionen
    extraReducers: (builder) => {
        builder
            // Case für fetch
            .addCase(fetchExercises.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExercises.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // item Array die Daten aus dem payload zuweisen
                state.items = action.payload; // payload enthaält daten die von createAsyncThunk zurückgegeben wurden
            })
            .addCase(fetchExercises.rejected, (state, action) => {
                state.status = 'failed';
                // lesbare fehlermeldung in state.error speichern
                state.error = action.error.message;
            })
            // Case für hinzufügen
            .addCase(addExercise.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Case für Aktualisieren
            .addCase(updateExercise.fulfilled, (state, action) => {
                // index für das Objekt speichern, dessen id mit der id aus dem payload übereinstimmt 
                const index = state.items.findIndex(item => item._id === action.payload._id);
                // Sicherheitsabfrage falls nichts gefunden wurde
                if (index !== -1) {
                    // Altes Objekt austauschen
                    state.items[index] = action.payload;
                }
            })
            // Case für löschen
            .addCase(deletExercise.fulfilled, (state, action) => {
                // neues Array erstellen, das alle Objekte enthält, deren id nicht der gelöschten id entspricht
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export default exerciseSlice.reducer;