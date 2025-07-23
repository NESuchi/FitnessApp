import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileFormSchema, profileTableColumns, profileInitialValues } from '../config/profileConfig';
import { fetchProfiles, addProfile, updateProfile, deleteProfile } from '../reducer/slices/profileSlice'

import Form from '../components/form/Form';
import Table from '../components/table/Table';

const Profile = () => {
    const [isEditing, setIsEditing ] = useState(null);

    const dispatch = useDispatch();

    // Items, Status und Error aus dem slice holen
    const profiles = useSelector((state) => state.profile.items);
    const profileStatus = useSelector((state) => state.profile.status);
    const profileError = useSelector((state) => state.profile.error);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    // Profiles aus der Datenbank holen 
    useEffect(() => {
        if (isLoggedIn && profileStatus === 'idle') { // Aber nur wenn status auf idle ist, heißt noch nichts passiert ist -> verhindert immer neue Anfragen
            dispatch(fetchProfiles());
        }
    }, [isLoggedIn, profileStatus, dispatch]); // Oder wenn sich profileStatus ändert 

    // Funktion um die im Formular eingetragenen Daten zu verarbeiten, je nachdem ob gerade editiert oder hinzugefügt wurde
    const handleSubmit = (formData) => {
        if (isEditing) {
            dispatch(updateProfile({ ...formData, _id: isEditing._id })); // Übernimmt die geänderten Daten + die Id die man aus isEditing bekommt wenn man auf den Knopf drückt
        } else {
            dispatch(addProfile(formData)); // Fügt Profile der Datenbank hinzu
        }
        setIsEditing(null); // State zurücksetzen
    };

    // Funktion um state zurückzusetzen falls man auf "abbrechen drückt"
    const handleCancel = () => {
        setIsEditing(null);
    };

    // Speichert das profile item in isEditing
    const handleEdit = (profile) => {
        setIsEditing(profile);
        scrollToSection("Form");
    }

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    // Funktion um ein profile wieder zu löschen
    const handleDelete = (profile) => {
        dispatch(deleteProfile(profile._id)); //löscht das explizite profile aus der Datenbank
        setIsEditing(null);
    }

    // Tabelle dynamisch anzeigen lassen mithilfe des state aus dem slice
    let content;
    if (!isLoggedIn) {
        content = <p className="ErrorParagraph">Melde dich an um Profile zu erstellen</p>;
    } else if (profileStatus === 'loading') {
        content = <p className="StandardParagraph">Lade Profile...</p>;
    } else if (profileStatus === 'succeeded') {
        if (profiles && profiles.length > 0) {
            content = <Table data={profiles} columns={profileTableColumns} onEdit={handleEdit} onDelete={handleDelete} buttonName="Bearbeiten" />;
        } else {
            content = <p className="StandardParagraph">Noch keine Profile hinzugefügt.</p>;
        }
    } else if (profileStatus === 'failed') {
        content = <p className="ErrorParagraph">{profileError}</p>
    }

    return (
        <div>
            <section id="Form">
                <h2 className="StandardParagraph">{isEditing ? 'Profil bearbeiten' : 'Profil hinzufügen'}</h2>
                <Form
                    key={isEditing ? 'editForm': 'addForm'}
                    schema={profileFormSchema}
                    initialValues={isEditing || profileInitialValues}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    name="Speichern"
                />
            </section>
            <h2 className="StandardParagraph">Deine gespeicherten Profile</h2>
            {content}
        </div>
    )
}

export default Profile;