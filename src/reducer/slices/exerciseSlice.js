import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axiosURL";

export const fetchExercises = createAsyncThunk('/exercises/fetchExercises', async () => {
    const res = await axios.get('/fitness/exercises');
    return res.data;
});

export const addExercise = createAsyncThunk('/exercises/addExercise', async (exerciseData) => {
    const res = await axios.post('/fitness/exercise/', exerciseData);
    return res.data;
});

export const updateExercise = createAsyncThunk('/exercises/updateExercise', async (exerciseData) => {
    const payload = { ...exerciseData, exerciseId: exerciseData._id };
    delete payload._id;

    await axios.put('/fitness/exercise/', payload);
    return exerciseData;
});

export const deletExercise = createAsyncThunk('/exercises/deleteExercise', async (exerciseId) => {
    await axios.delete(`/fitness/exercise/${exerciseId}`);
    return exerciseId;
});

const exerciseSlice = createSlice({ 
    name: 'exercises',
    initialState: {
        items: [], 
        status: 'idle', 
        error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExercises.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExercises.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; 
            })
            .addCase(fetchExercises.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addExercise.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateExercise.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deletExercise.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export default exerciseSlice.reducer;