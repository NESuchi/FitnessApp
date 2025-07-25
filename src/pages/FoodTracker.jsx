import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { foodFormSchema, foodTableColumns, foodInitialValues } from '../config/foodConfig';
import { fetchFoods, addFood, updateFood, deleteFood } from '../reducer/slices/foodSlice'

import Form from '../components/form/form';
import Table from '../components/table/Table';

const FoodTracker = () => {
    const [isEditing, setIsEditing ] = useState(null);

    const dispatch = useDispatch();

    const foods = useSelector((state) => state.food.items);
    const foodStatus = useSelector((state) => state.food.status);
    const foodError = useSelector((state) => state.food.error);

    useEffect(() => {
        if (foodStatus === 'idle') { 
            dispatch(fetchFoods());
        }
    }, [foodStatus, dispatch]); 

    const handleSubmit = (formData) => {
        if (isEditing) {
            dispatch(updateFood({ ...formData, _id: isEditing._id })); 
        } else {
            dispatch(addFood(formData)); 
        }
        setIsEditing(null); 
    };

    const handleCancel = () => {
        setIsEditing(null);
    };

    const handleEdit = (food) => {
        setIsEditing(food);
        scrollToSection("Form");
    }

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDelete = (food) => {
        dispatch(deleteFood(food._id)); 
        setIsEditing(null);
    }

    let content;
    if (foodStatus === 'loading') {
        content = <p className="StandardParagraph">Lade Lebensmittel...</p>;
    } else if (foodStatus === 'succeeded') {
        if (foods && foods.length > 0) {
            content = <Table data={foods} columns={foodTableColumns} onEdit={handleEdit} onDelete={handleDelete} buttonName="Bearbeiten" />;
        } else {
            content = <p className="StandardParagraph">Noch keine Lebensmittel hinzugefügt.</p>;
        }
    } else if (foodStatus === 'failed') {
        content = <p className="ErrorParagraph">{foodError}</p>
    }

    return (
        <div>
            <section id="Form">
                <h2 className="StandardParagraph">{isEditing ? 'Mahlzeit bearbeiten' : 'Mahlzeit hinzufügen'}</h2>
                <Form
                    key={isEditing ? 'editForm': 'addForm'}
                    schema={foodFormSchema}
                    initialValues={isEditing || foodInitialValues}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    name="Speichern"
                />
            </section>
            <h2 className="StandardParagraph">Deine gespeicherten Mahlzeiten</h2>
            {content}
        </div>
    )
}

export default FoodTracker;