import { useState, useMemo } from 'react';
import { calculateActualValues, calculateMaxValues } from '@/utils/calculations';
import Display from './display/Display';

import styles from './Calculator.module.css';

const Calculator = ({ allFoods, allExercises, profile, day }) => {
    const [activeTab, setActiveTab] = useState('energy');

    const maxValues = useMemo(() => calculateMaxValues(profile), [profile]);
    const actualValues = useMemo(() => calculateActualValues(day, allFoods, allExercises), [day, allFoods, allExercises]);

    const deficit = maxValues.maxEnergy - actualValues.consumedEnergy + actualValues.burnedEnergy;

    const data = {
        energy: {
            label: 'Kalorien',
            unit: 'kcal',
            actual: actualValues.consumedEnergy,
            burned: actualValues.burnedEnergy,
            max: maxValues.maxEnergy,
            deficit: Math.round(deficit),
        },
        protein: {
            label: 'Protein',
            unit: 'g',
            actual: actualValues.consumedProtein,
            max: maxValues.maxProtein,
        },
        carbs: {
            label: 'Kohlenhydrate',
            unit: 'g',
            actual: actualValues.consumedCarbs,
            max: maxValues.maxCarbs,
        },
        fat: {
            label: 'Fett',
            unit: 'g',
            actual: actualValues.consumedFat,
            max: maxValues.maxFat,
        },
    };

    return (
        <div className={styles.Wrapper}>
            <h2>Tagesbilanz</h2>
            <div className={styles.Tabs}>
                <button onClick={() => setActiveTab('energy')} className={activeTab === 'energy' ? styles.Active : styles.Hidden}>Kalorien</button>
                <button onClick={() => setActiveTab('protein')} className={activeTab === 'protein' ? styles.Active : styles.Hidden}>Proteine</button>
                <button onClick={() => setActiveTab('carbs')} className={activeTab === 'carbs' ? styles.Active : styles.Hidden}>Kohlenhydrate</button>
                <button onClick={() => setActiveTab('fat')} className={activeTab === 'fat' ? styles.Active : styles.Hidden}>Fette</button>
            </div>
            <Display data={data[activeTab]} />
        </div>
    )
}

export default Calculator;