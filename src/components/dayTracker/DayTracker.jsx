import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'

import { fetchSingleDay, addDay, updateDay, fetchAllDays, deleteDay } from "@/reducer/slices/daySlice";
import { fetchFoods } from '@/reducer/slices/foodSlice';
import { fetchExercises } from '@/reducer/slices/exerciseSlice';

import DayDetails from "./dayDetails/DayDetails";
import AddItemTable from "./addItemTable/AddItemTable";

import styles from './DayTracker.module.css';
import Calculator from "./calculator/Calculator";

const toLocalISOString = (date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
}

const DayTracker = ({ profile }) => {
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();
    
    const { selectedDay, status: dayStatus } = useSelector((state) => state.day);
    const { items: allDaysWithEntries } = useSelector((state) => state.day);
    const { items: allFoods } = useSelector((state) => state.food);
    const { items: allExercises } = useSelector((state) => state.exercise);

    const markDaysWithEntries = ({ date, view }) => {
        const hasEntry = allDaysWithEntries.some(
            day => toLocalISOString(date) === day.date
        );

        if (view === 'month' && hasEntry) {
            return <div className={styles.EntryMarker}></div>
        }
        return null;
    }

    useEffect(() => {
        dispatch(fetchFoods());
        dispatch(fetchExercises());
        if (profile) {
            dispatch(fetchAllDays(profile._id));
        }
    }, [dispatch, profile]);

    const handleDayClick = useCallback((clickedDate) => {
        setDate(clickedDate);
        const formattedDate = toLocalISOString(clickedDate);
        dispatch(fetchSingleDay({ profileId: profile._id, date: formattedDate }));
    }, [dispatch, profile]);

    useEffect(() => {
        handleDayClick(new Date());
    }, [handleDayClick]);

    const handleAddItem = (item, itemType, amount) => {
        const actionCompleted = (action) => {
            dispatch(action).then(() => {
                dispatch(fetchAllDays(profile._id));
                handleDayClick(date);
            })
        }

        if (selectedDay) {
            const updatedDay = { ...selectedDay };
            if (itemType === 'food') {
                updatedDay.food = [...updatedDay.food, { foodId: item._id, amount}];
            } else {
                updatedDay.exercise = [...updatedDay.exercise, { exerciseId: item._id, timeInMinutes: amount }];
            }
            actionCompleted(updateDay(updatedDay));
        } else {
            const newDayData = {
                profileId: profile._id,
                date: toLocalISOString(date),
                food: itemType === 'food' ? [{ foodId: item._id, amount }] : [],
                exercise: itemType === 'exercise' ? [{ exerciseId: item._id, timeInMinutes: amount}] : [],
            };
            actionCompleted(addDay(newDayData));
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
        
        const isEmpty = updatedDay.food.length === 0 && updatedDay.exercise.length === 0;

        if (isEmpty) {
            dispatch(deleteDay(updatedDay._id)).then(() => {
                dispatch(fetchAllDays(profile._id));
                handleDayClick(date);
            });
        } else {
            dispatch(updateDay(updatedDay)).then(() => {
                dispatch(fetchAllDays(profile._id));
            })
        }
    };

    return (
        <div className={styles.Wrapper}>
            <div className={styles.CalendarWrapper}>
                <Calendar
                    tileContent={markDaysWithEntries}
                    onChange={setDate}
                    value={date}
                    onClickDay={handleDayClick}
                    locale="de-DE"
                />
            </div>

            <div className={styles.CalculatorWrapper}>
                <Calculator
                    allFoods={allFoods}
                    allExercises={allExercises}
                    profile={profile}
                    day={selectedDay}
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