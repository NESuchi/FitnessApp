import styles from './DayDetails.module.css';

const DayDetails = ({ day, status, onRemove, allFoods, allExercises }) => {

    const currentDay = day;

    const findItemDetail = (id, list) => {
        return list.find(item => item._id === id);
    }

    if (status === 'loading') {
        return (
            <p>Lade Tagesdaten...</p>
        );
    }

    if (!currentDay) {
        return (
            <div className={styles.Wrapper}>
                <h3>Heutige Einträge</h3>
                <p>Für diesen Tag sind keine Datenvorhanden</p>
            </div>
        );
    }

    return (
        <div className={styles.Wrapper}>
            <h3>Heutige Einträge</h3>

            <h4>Mahlzeiten</h4>
            {currentDay.food && currentDay.food.length > 0 ? (
                <ul className={styles.List}>
                    {currentDay.food.map(foodEntry => {
                        const foodDetails = findItemDetail(foodEntry.foodId, allFoods);
                        return (
                            <li key={foodEntry._id}>
                                <span>{foodDetails ? foodDetails.name : 'Unbekannt'} ({foodEntry.amount} g/ml)</span>
                                <button className={styles.Button} onClick={() => onRemove(foodEntry._id, 'food')}>Löschen</button>
                            </li>
                        );
                    })}
                </ul>
            ) : <p>Keine Mahlzeiten hinzugefügt</p>}

            <h4>Übungen</h4>
            {currentDay.exercise && currentDay.exercise.length > 0 ? (
                <ul>
                    {currentDay.exercise.map(exerciseEntry => {
                        const exerciseDetail = findItemDetail(exerciseEntry.exerciseId, allExercises);
                        return (
                            <li key={exerciseEntry._id}>
                                <span>{exerciseDetail ? exerciseDetail.name : 'Unbekannt'} ({exerciseEntry.timeInMinutes} Minuten)</span>
                                <button className={styles.Button} onClick={() => onRemove(exerciseEntry._id, 'exercise')}>Löschen</button>
                            </li>
                        );
                    })}
                </ul>
            ) : <p>Keine Übungen hinzugefügt</p>}
        </div>
    )
}

export default DayDetails;