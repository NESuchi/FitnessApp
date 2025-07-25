import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axiosURL";

export const fetchFoods = createAsyncThunk('/foods/fetchFoods', async () => {
    const res = await axios.get('/fitness/food');
    return res.data;
});

export const addFood = createAsyncThunk('/foods/addFood', async (foodData) => {
    const res = await axios.post('/fitness/food', foodData);
    return res.data;
});

export const updateFood = createAsyncThunk('/foods/updateFood', async (foodData) => {
    const payload = { ...foodData, foodId: foodData._id };
    delete payload._id;

    await axios.put('/fitness/food/', payload);
    return foodData;
});

export const deleteFood = createAsyncThunk('/foods/deleteFood', async (foodId) => {
    await axios.delete(`/fitness/food/${foodId}`);
    return foodId;
});

const foodSlice = createSlice({ 
    name: 'foods',
    initialState: {
        items: [], 
        status: 'idle', 
        error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFoods.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFoods.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; 
            })
            .addCase(fetchFoods.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addFood.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateFood.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteFood.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export default foodSlice.reducer;