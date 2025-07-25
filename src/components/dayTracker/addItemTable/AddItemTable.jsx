import Table from '@/components/table/Table'
import { useState } from 'react';
import { foodPanelColumns } from '@/config/foodConfig';
import { exercisePanelColumns } from '@/config/exerciseConfig';

import styles from './AddItemTable.module.css'

const AddItemTable = ({ allFoods, allExercises, onAddItem }) => {
    const [activeTab, setActiveTab] = useState('food');
    const [amount, setAmount] = useState('');

    const handleAdd = (item, itemType) => {
        const parsedAmount = parseInt(amount, 10);
        if (!parsedAmount || parsedAmount <= 0) {
            alert("Bitte eine gültige Menge angeben");
            return;
        }
        onAddItem(item, itemType, parsedAmount);
        setAmount('');
    };

    return (
        <div className={styles.Wrapper}>
            <h3 className='StandardParagraph'>Eintrag hinzufügen</h3>
            <div className={styles.Tabs}>
                <button 
                    onClick={() => setActiveTab('food')} 
                    className={activeTab === 'food' ? styles.Active : styles.Hidden}
                >
                    Mahlzeiten
                </button>
                <button 
                    onClick={() => setActiveTab('exercise')} 
                    className={activeTab === 'exercise' ? styles.Active : styles.Hidden}
                >
                    Übungen
                </button>
            </div>

            <div className={styles.Input}>
                <label>{activeTab === 'food' ? "Menge" : "Zeit"}</label>
                <input 
                    type='number'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <div className={styles.TableWrapper}>
                {activeTab === 'food' ? (
                    <Table 
                        data={allFoods}
                        columns={foodPanelColumns}
                        onEdit={(item) => handleAdd(item, 'food')}
                        buttonName="Hinzufügen"
                    />
                ) : (
                    <Table 
                        data={allExercises}
                        columns={exercisePanelColumns}
                        onEdit={(item) => handleAdd(item, 'exercise')}
                        buttonName="Hinzufügen"
                    />
                )}
            </div>
        </div>
    )
}

export default AddItemTable;