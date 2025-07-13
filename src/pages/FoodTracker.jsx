import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { foodFormSchema, foodTableColumns, foodInitialValues } from '../config/foodConfig';
import { fetchFoods, addFood, updateFood, deleteFood } from '../reducer/slices/foodSlice'

import Form from '../components/form/form';
import Table from '../components/table/Table';

const FoodTracker = () => {
    const [isEditing, setIsEditing ] = useState(null);

    const dispatch = useDispatch();

    // Items, Status und Error aus dem slice holen
    const foods = useSelector((state) => state.food.items);
    const foodStatus = useSelector((state) => state.food.status);
    const foodError = useSelector((state) => state.food.error);

    // foods aus der Datenbank holen 
    useEffect(() => {
        if (foodStatus === 'idle') { // Aber nur wenn status auf idle ist, heißt noch nichts passiert ist -> verhindert immer neue Anfragen
            dispatch(fetchFoods());
        }
    }, [foodStatus, dispatch]); // Oder wenn sich foodStatus ändert 

    // Funktion um die im Formular eingetragenen Daten zu verarbeiten, je nachdem ob gerade editiert oder hinzugefügt wurde
    const handleSubmit = (formData) => {
        if (isEditing) {
            dispatch(updateFood({ ...formData, _id: isEditing._id })); // Übernimmt die geänderten Daten + die Id die man aus isEditing bekommt wenn man auf den Knopf drückt
        } else {
            dispatch(addFood(formData)); // Fügt food der Datenbank hinzu
        }
        setIsEditing(null); // State zurücksetzen
    };

    // Funktion um state zurückzusetzen falls man auf "abbrechen drückt"
    const handleCancel = () => {
        setIsEditing(null);
    };

    // Speichert das food item in isEditing
    const handleEdit = (food) => {
        setIsEditing(food);
    }

    // Funktion um ein food wieder zu löschen
    const handleDelete = (food) => {
        dispatch(deleteFood(food._id)); //löscht das explizite food aus der Datenbank
        setIsEditing(null);
    }

    // Tabelle dynamisch anzeigen lassen mithilfe des state aus dem slice
    let content;
    if (foodStatus === 'loading') {
        content = <p>Lade Lebensmittel...</p>;
    } else if (foodStatus === 'succeeded') {
        if (foods && foods.length > 0) {
            content = <Table data={foods} columns={foodTableColumns} onEdit={handleEdit} onDelete={handleDelete} />;
        } else {
            content = <p>Noch keine Lebensmittel hinzugefügt.</p>;
        }
    } else if (foodStatus === 'failed') {
        content = <p>{foodError}</p>
    }

    return (
        <div>
            <h2>{isEditing ? 'Mahlzeit bearbeiten' : 'Mahlzeit hinzufügen'}</h2>
            <Form
                key={isEditing ? 'editForm' : 'addForm'}
                schema={foodFormSchema}
                initialValues={isEditing || foodInitialValues}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
            <h2>Deine gespeicherten Mahlzeiten</h2>
            {content}
        </div>
    )
}

export default FoodTracker;