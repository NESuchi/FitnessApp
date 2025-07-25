import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "@/axiosURL";

export const checkAuthStatus = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
    try {
        await axios.get('/fitness/profiles'); 
        return true;
    } catch {
        return rejectWithValue(false);
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (loginData) => {
    await axios.post('/login', loginData);
    localStorage.setItem('userAuthData', JSON.stringify({ email: loginData.email })); 
    return { email: loginData.email };
});

export const signupUser = createAsyncThunk('auth/signupUser', async (signupData) => {
    await axios.post('/signup', signupData);
    localStorage.setItem('userAuthData', JSON.stringify({ email: signupData.email })); 
    return { email: signupData.email };
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await axios.post('/logout');
    localStorage.removeItem('userAuthData'); 
    return false;
});

// PERSÖNLICHE NOTIZ: Später eigenständige route im backend einbauen, um ein vorbereitetes user Objekt zu bekommen (LocalStorage nur kurzfristige Lösung)
const storedAuthData = JSON.parse(localStorage.getItem('userAuthData')); 

const authSlice = createSlice({
    name: 'auth',

    initialState: {
        isLoggedIn: !!storedAuthData, 
        user: storedAuthData || null, 
        status: 'idle', 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthStatus.fulfilled, (state) => {
                state.isLoggedIn = true;
                state.status = 'succeeded';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null,
                state.status = 'idle';
            })
            .addCase(loginUser.rejected, (state) => {
                state.status = 'failed';
                state.error = "Login Fehlgeschlagen. Bitte überprüfen Sie ihre Anmeldedaten";
            })
            .addCase(signupUser.rejected, (state) => {
                state.status = 'failed';
                state.error = "Registrierung fehlgeschlagen. Die Mail existiert möglicherwerise bereits";
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.isLoggedIn = false;
                state.status = 'idle';
            })
            .addMatcher(
                isAnyOf(loginUser.fulfilled, signupUser.fulfilled),
                (state, action) => {
                    state.isLoggedIn = true;
                    state.user = action.payload;
                    state.status = 'succeeded'
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => { state.status = 'loading'; }
            )
    },
});

export default authSlice.reducer;