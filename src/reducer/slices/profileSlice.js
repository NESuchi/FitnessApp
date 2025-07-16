import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axiosURL";

// Alle Profile fetchen
export const fetchProfiles = createAsyncThunk('/profiles/fetchProfiles', async () => {
    const res = await axios.get('/fitness/profiles');
    return res.data;
});

// Profil hinzufügen
export const addProfile = createAsyncThunk('/profiles/addProfile', async (profileData) => {
    const res = await axios.post('/fitness/profile/', profileData);
    return res.data;
});

// Profil aktualisieren
export const updateProfile = createAsyncThunk('/profiles/updateProfile', async (profileData) => {
    const payload = { ...profileData, profileId: profileData._id };
    delete payload._id;

    await axios.put('/fitness/profile/', payload);
    return profileData;
});

// Profil löschen
export const deleteProfile = createAsyncThunk('/profiles/deleteProfile', async (profileId) => {
    await axios.delete(`/fitness/profile/${profileId}`);
    return profileId;
});

// Slice erstellen ("unterbereich" des stores) der den reducer, ActionCreators und ActionTypes erstellt
const profileSlice = createSlice({ 
    name: 'profiles',
    // Initialwerte wenn die App gestartet wird
    initialState: {
        items: [], // Array das Profile Objekte speichert
        status: 'idle', // Statusanzeige (bspw. loading, succeeded etc)
        error: null // Fehlermeldung
    },
    // synchrone Aktionen
    reducers: {},
    // asynchrone Aktionen
    extraReducers: (builder) => {
        builder
            // Case für fetch
            .addCase(fetchProfiles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // item Array die Daten aus dem payload zuweisen
                state.items = action.payload; // payload enthaält daten die von createAsyncThunk zurückgegeben wurden
            })
            .addCase(fetchProfiles.rejected, (state, action) => {
                state.status = 'failed';
                // lesbare fehlermeldung in state.error speichern
                state.error = action.error.message;
            })
            // Case für hinzufügen
            .addCase(addProfile.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Case für Aktualisieren
            .addCase(updateProfile.fulfilled, (state, action) => {
                // index für das Objekt speichern, dessen id mit der id aus dem payload übereinstimmt 
                const index = state.items.findIndex(item => item._id === action.payload._id);
                // Sicherheitsabfrage falls nichts gefunden wurde
                if (index !== -1) {
                    // Altes Objekt austauschen
                    state.items[index] = action.payload;
                }
            })
            // Case für löschen
            .addCase(deleteProfile.fulfilled, (state, action) => {
                // neues Array erstellen, das alle Objekte enthält, deren id nicht der gelöschten id entspricht
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export default profileSlice.reducer;