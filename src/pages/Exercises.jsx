import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { exerciseFormSchema, exerciseTableColumns, exerciseInitialValues } from '../config/exerciseConfig';
import { fetchExercises, addExercise, updateExercise, deletExercise } from '../reducer/slices/exerciseSlice'

import Form from '../components/form/Form';
import Table from '../components/table/Table';

const Exercises = () => {
    const [isEditing, setIsEditing ] = useState(null);

    const dispatch = useDispatch();

    // Items, Status und Error aus dem slice holen
    const exercises = useSelector((state) => state.exercise.items);
    const exerciseStatus = useSelector((state) => state.exercise.status);
    const exerciseError = useSelector((state) => state.exercise.error);

    // exercises aus der Datenbank holen 
    useEffect(() => {
        if (exerciseStatus === 'idle') { // Aber nur wenn status auf idle ist, heißt noch nichts passiert ist -> verhindert immer neue Anfragen
            dispatch(fetchExercises());
        }
    }, [exerciseStatus, dispatch]); // Oder wenn sich exerciseStatus ändert 

    // Funktion um die im Formular eingetragenen Daten zu verarbeiten, je nachdem ob gerade editiert oder hinzugefügt wurde
    const handleSubmit = (formData) => {
        if (isEditing) {
            dispatch(updateExercise({ ...formData, _id: isEditing._id })); // Übernimmt die geänderten Daten + die Id die man aus isEditing bekommt wenn man auf den Knopf drückt
        } else {
            dispatch(addExercise(formData)); // Fügt exercises der Datenbank hinzu
        }
        setIsEditing(null); // State zurücksetzen
    };

    // Funktion um state zurückzusetzen falls man auf "abbrechen drückt"
    const handleCancel = () => {
        setIsEditing(null);
    };

    // Speichert das exercise item in isEditing
    const handleEdit = (exercise) => {
        setIsEditing(exercise);
        scrollToSection("Form");
    }

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    // Funktion um ein exerrcise wieder zu löschen
    const handleDelete = (exercise) => {
        dispatch(deletExercise(exercise._id)); //löscht das explizite exercise aus der Datenbank
        setIsEditing(null);
    }

    // Tabelle dynamisch anzeigen lassen mithilfe des state aus dem slice
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