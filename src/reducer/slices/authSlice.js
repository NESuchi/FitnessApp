import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "@/axiosURL";

// Prüfen der Session beim Start der App
export const checkAuthStatus = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
    try {
        await axios.get('/fitness/profiles'); // geschützte route anpingen
        return true;
    } catch {
        return rejectWithValue(false);
    }
});

// Login 
export const loginUser = createAsyncThunk('auth/loginUser', async (loginData) => {
    await axios.post('/login', loginData);
    localStorage.setItem('userAuthData', JSON.stringify({ email: loginData.email })); // Mail in localStorage speichern, falls Seite neu geladen wird
    return { email: loginData.email };
});

// Registrierung 
export const signupUser = createAsyncThunk('auth/signupUser', async (signupData) => {
    await axios.post('/signup', signupData);
    localStorage.setItem('userAuthData', JSON.stringify({ email: signupData.email })); // Mail in localStorage speichern, falls Seite neu geladen wird
    return { email: signupData.email };
});

// Logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await axios.post('/logout');
    localStorage.removeItem('userAuthData'); // bei logout rauswerfen
    return false;
});

// PERSÖNLICHE NOTIZ: Später eigenständige route im backend einbauen, um ein vorbereitetes user Objekt zu bekommen (LocalStorage nur kurzfristige Lösung)
const storedAuthData = JSON.parse(localStorage.getItem('userAuthData')); // Item aus localStorage holen um damit initialValues zu definieren -> Wegen dynamischer Darstellung des Buttons und der Willkommensanzeige

// Slice erstellen ("unterbereich" des stores) der den reducer, ActionCreators und ActionTypes erstellt
const authSlice = createSlice({
    name: 'auth',
    // Initialwerte wenn die App gestartet wird
    initialState: {
        isLoggedIn: !!storedAuthData, // Wandelt das Objekt/null in true bzw falsle um
        user: storedAuthData || null, // Hier wird die email gespeichert für Willkommensanzeige, falls sie nicht existiert null
        status: 'idle', // Statusanzeige
    },
    // synchrone Aktionen
    reducers: {},
    // asynchrone Aktionen
    extraReducers: (builder) => {
        builder
            // case für den auth check
            .addCase(checkAuthStatus.fulfilled, (state) => {
                state.isLoggedIn = true;
                state.status = 'succeeded';
            })
            // case für logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null,
                state.status = 'idle';
            })
            // Case für fehlgeschlagener Login
            .addCase(loginUser.rejected, (state) => {
                state.status = 'failed';
                state.error = "Login Fehlgeschlagen. Bitte überprüfen Sie ihre Anmeldedaten";
            })
            // Case für fehlgeschlagene Regiustrierung
            .addCase(signupUser.rejected, (state) => {
                state.status = 'failed';
                state.error = "Registrierung fehlgeschlagen. Die Mail existiert möglicherwerise bereits";
            })
            // Case für Hintergrund Check
            .addCase(checkAuthStatus.rejected, (state) => {
                state.isLoggedIn = false;
                state.status = 'idle';
            })
            // Matcher für erfolgreichem login oder registrierung
            .addMatcher(
                isAnyOf(loginUser.fulfilled, signupUser.fulfilled),
                (state, action) => {
                    state.isLoggedIn = true;
                    state.user = action.payload;
                    state.status = 'succeeded'
                }
            )
            // Matcher um die gleiche logik für jede Aktion zu definieren
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => { state.status = 'loading'; }
            )
    },
});

export default authSlice.reducer;