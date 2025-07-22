import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "@/axiosURL";

export const fetchAllDays = createAsyncThunk('days/fetchAllDays', async (profileId) => {
    const res = await axios.get(`/fitness/days/${profileId}`);
    return res.data;
});

export const fetchSingleDay = createAsyncThunk('days/fetchSingleDay', async ({ profileId, date }) => {
    const res = await axios.get(`/fitness/day/${profileId}/${date}`);
    return res.data;
});

export const addDay = createAsyncThunk('days/addDay', async (dayData) => {
    const res = await axios.post('/fitness/day/', dayData);
    return res.data;
});

export const updateDay = createAsyncThunk('days/updateDay', async (dayData) => {
    const payload = { ...dayData, dayId: dayData._id };
    delete payload._id;

    await axios.put('/fitness/day/', payload);
    return dayData;
});

export const deleteDay = createAsyncThunk('days/deleteDay', async (dayId) => {
    await axios.delete(`/fitness/day/${dayId}`);
    return dayId;
});

const daySlice = createSlice({
    name: 'days',
    initialState: {
        items: [],
        selectedDay: null,
        status: 'idle',
        error: null, 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addDay.fulfilled, (state, action) => {
                state.selectedDay = action.payload;
                state.status = 'succeeded';
            })
            .addCase(updateDay.fulfilled, (state, action) => {
                state.selectedDay = action.payload;
                state.status = 'succeeded';
            })
            .addCase(deleteDay.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            })
            .addCase(fetchAllDays.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchSingleDay.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedDay = action.payload;
            })
            .addMatcher(
                isAnyOf(fetchAllDays.pending, fetchSingleDay.pending),
                (state) => {
                    state.status = 'loading';
                }
            )
            .addMatcher(
                isAnyOf(fetchAllDays.rejected, fetchSingleDay.rejected),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                }
            );
    }
})

export default daySlice.reducer;