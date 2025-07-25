import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileFormSchema, profileTableColumns, profileInitialValues } from '../config/profileConfig';
import { fetchProfiles, addProfile, updateProfile, deleteProfile } from '../reducer/slices/profileSlice'

import Form from '../components/form/form';
import Table from '../components/table/Table';

const Profile = () => {
    const [isEditing, setIsEditing ] = useState(null);

    const dispatch = useDispatch();

    const profiles = useSelector((state) => state.profile.items);
    const profileStatus = useSelector((state) => state.profile.status);
    const profileError = useSelector((state) => state.profile.error);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn && profileStatus === 'idle') { 
            dispatch(fetchProfiles());
        }
    }, [isLoggedIn, profileStatus, dispatch]); 

    const handleSubmit = (formData) => {
        if (isEditing) {
            dispatch(updateProfile({ ...formData, _id: isEditing._id })); 
        } else {
            dispatch(addProfile(formData)); 
        }
        setIsEditing(null); 
    };

    const handleCancel = () => {
        setIsEditing(null);
    };

    const handleEdit = (profile) => {
        setIsEditing(profile);
        scrollToSection("Form");
    }

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDelete = (profile) => {
        dispatch(deleteProfile(profile._id)); 
        setIsEditing(null);
    }

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