import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axiosURL";

export const fetchProfiles = createAsyncThunk('/profiles/fetchProfiles', async () => {
    const res = await axios.get('/fitness/profiles');
    return res.data;
});

export const addProfile = createAsyncThunk('/profiles/addProfile', async (profileData) => {
    const res = await axios.post('/fitness/profile/', profileData);
    return res.data;
});

export const updateProfile = createAsyncThunk('/profiles/updateProfile', async (profileData) => {
    const payload = { ...profileData, profileId: profileData._id };
    delete payload._id;

    await axios.put('/fitness/profile/', payload);
    return profileData;
});

export const deleteProfile = createAsyncThunk('/profiles/deleteProfile', async (profileId) => {
    await axios.delete(`/fitness/profile/${profileId}`);
    return profileId;
});

const profileSlice = createSlice({ 
    name: 'profiles',
    initialState: {
        items: [],
        status: 'idle', 
        error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfiles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; 
            })
            .addCase(fetchProfiles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProfile.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteProfile.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export default profileSlice.reducer;