import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'

import { fetchSingleDay, addDay, updateDay } from "@/reducer/slices/daySlice";
import { fetchFoods } from '@/reducer/slices/foodSlice';
import { fetchExercises } from '@/reducer/slices/exerciseSlice';

import DayDetails from "./dayDetails/DayDetails";
import AddItemTable from "./addItemTable/AddItemTable";

import styles from './DayTracker.module.css';

const toLocalISOString = (date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
}

const DayTracker = ({ profile }) => {
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();
    
    const { selectedDay, status: dayStatus } = useSelector((state) => state.day);
    const { items: allFoods } = useSelector((state) => state.food);
    const { items: allExercises } = useSelector((state) => state.exercise);

    useEffect(() => {
        dispatch(fetchFoods());
        dispatch(fetchExercises());
    }, [dispatch]);

    const handleDayClick = useCallback((clickedDate) => {
        setDate(clickedDate);
        const formattedDate = toLocalISOString(clickedDate);
        dispatch(fetchSingleDay({ profileId: profile._id, date: formattedDate }));
    }, [dispatch, profile]);

    useEffect(() => {
        handleDayClick(new Date());
    }, [handleDayClick]);

    const handleAddItem = (item, itemType, amount) => {
        if (selectedDay) {
            const updatedDay = { ...selectedDay };
            if (itemType === 'food') {
                updatedDay.food = [...updatedDay.food, { foodId: item._id, amount}];
            } else {
                updatedDay.exercise = [...updatedDay.exercise, { exerciseId: item._id, timeInMinutes: amount }];
            }
            dispatch(updateDay(updatedDay));
        } else {
            const newDayData = {
                profileId: profile._id,
                date: toLocalISOString(date),
                food: itemType === 'food' ? [{ foodId: item._id, amount }] : [],
                exercise: itemType === 'exercise' ? [{ exerciseId: item._id, timeInMinutes: amount}] : [],
            };
            dispatch(addDay(newDayData));
        }
    };

    const handleRemoveItem = (subItemId, itemType) => {
        if (!selectedDay) return;

        const updatedDay = { ...selectedDay };
        if (itemType === 'food') {
            updatedDay.food = updatedDay.food.filter(f => f._id !== subItemId);
        } else {
            updatedDay.exercise = updatedDay.exercise.filter(e => e._id !== subItemId);
        }
        dispatch(updateDay(updatedDay));
    };

    return (
        <div className={styles.Wrapper}>
            <div className={styles.CalendarWrapper}>
                <Calendar
                    onChange={setDate}
                    value={date}
                    onClickDay={handleDayClick}
                    locale="de-DE"
                />
            </div>

            <div className={styles.DetailsWrapper}>
                <DayDetails
                    day={selectedDay}
                    status={dayStatus}
                    onRemove={handleRemoveItem}
                    allFoods={allFoods}
                    allExercises={allExercises}
                />
            </div>

            <div className={styles.TableWrapper}>
                <AddItemTable
                    allFoods={allFoods}
                    allExercises={allExercises}
                    onAddItem={handleAddItem}
                />
            </div>
        </div>
    )
}

export default DayTracker;