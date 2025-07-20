import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import foodReducer from './slices/foodSlice';
import exerciseReducer from './slices/exerciseSlice';
import profileReducer from './slices/profileSlice';
import dayReducer from './slices/daySlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        food: foodReducer,
        exercise: exerciseReducer,
        profile: profileReducer,
        day: dayReducer
    },
});

export default store;