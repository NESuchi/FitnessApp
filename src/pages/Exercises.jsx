import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { exerciseFormSchema, exerciseTableColumns, exerciseInitialValues } from '../config/exerciseConfig';
import { fetchExercises, addExercise, updateExercise, deletExercise } from '../reducer/slices/exerciseSlice'

import Form from '../components/form/form';
import Table from '../components/table/Table';

const Exercises = () => {
    const [isEditing, setIsEditing ] = useState(null);

    const dispatch = useDispatch();

    const exercises = useSelector((state) => state.exercise.items);
    const exerciseStatus = useSelector((state) => state.exercise.status);
    const exerciseError = useSelector((state) => state.exercise.error);

    useEffect(() => {
        if (exerciseStatus === 'idle') { 
            dispatch(fetchExercises());
        }
    }, [exerciseStatus, dispatch]);

    const handleSubmit = (formData) => {
        if (isEditing) {
            dispatch(updateExercise({ ...formData, _id: isEditing._id })); 
        } else {
            dispatch(addExercise(formData)); 
        }
        setIsEditing(null); 
    };

    const handleCancel = () => {
        setIsEditing(null);
    };

    const handleEdit = (exercise) => {
        setIsEditing(exercise);
        scrollToSection("Form");
    }

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDelete = (exercise) => {
        dispatch(deletExercise(exercise._id)); 
        setIsEditing(null);
    }

    let content;
    if (exerciseStatus === 'loading') {
        content = <p className="StandardParagraph">Lade Exercises...</p>;
    } else if (exerciseStatus === 'succeeded') {
        if (exercises && exercises.length > 0) {
            content = <Table data={exercises} columns={exerciseTableColumns} onEdit={handleEdit} onDelete={handleDelete} buttonName="Bearbeiten" />;
        } else {
            content = <p className="StandardParagraph">Noch keine Exercises hinzugefügt.</p>;
        }
    } else if (exerciseStatus === 'failed') {
        content = <p className="ErrorParagraph">{exerciseError}</p>
    }

    return (
        <div>
            <section id="Form">
                <h2 className="StandardParagraph">{isEditing ? 'Exercise bearbeiten' : 'Exercise hinzufügen'}</h2>
                <Form
                    key={isEditing ? 'editForm': 'addForm'}
                    schema={exerciseFormSchema}
                    initialValues={isEditing || exerciseInitialValues}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    name="Speichern"
                />
            </section>
            <h2 className="StandardParagraph">Deine gespeicherten Exercises</h2>
            {content}
        </div>
    )
}

export default Exercises;