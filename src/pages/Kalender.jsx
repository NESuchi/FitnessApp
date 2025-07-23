import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfiles } from '@/reducer/slices/profileSlice';
import DayTracker from '@/components/dayTracker/DayTracker';

import styles from '@/components/Kalender.module.css';

const Kalender = () => {
    const [activeProfile, setActiveProfile] = useState(null);
    const dispatch = useDispatch();
    
    const { items: profiles, status } = useSelector((state) => state.profile);
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn && status === 'idle') {
            dispatch(fetchProfiles());
        }
    }, [isLoggedIn, status, dispatch]);

    useEffect(() => {
        if (profiles && profiles.length > 0 && !activeProfile) {
            setActiveProfile(profiles[0]);
        }
    }, [profiles, activeProfile]);

    if (!isLoggedIn) {
        return (
            <p style={{ height: "60vh" }} className="ErrorParagraph">Bitte melden Sie sich an, um den Kalender zu nutzen</p>
        );
    }

    if (status === 'loading') {
        return (
            <p className="StandardParagraph">Lade Profile...</p>
        );
    }
    return (
        <div className={styles.Wrapper}>
            <h1 className="StandardParagraph">Mein Kalender</h1>

            {profiles && profiles.length > 0 ? (
                <>
                    <div className={styles.ProfileSelect}>
                        <label htmlFor="profile-select">
                            Aktives Profil
                        </label>
                        <select
                            className={styles.Select}
                            id="profile-select"
                            value={activeProfile?._id || ''}
                            onChange={(e) => setActiveProfile(profiles.find(p => p._id === e.target.value))}
                        >
                            {profiles.map(profile => (
                                <option key={profile._id} value={profile._id}>
                                    {profile.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {activeProfile && <DayTracker profile={activeProfile} />}
                </>
            ) : (
                <p style={{ height: "60vh"}} className="ErrorParagraph">Bitte erstellen sie zuerst ein Profil, um den Kalender zu nutzen</p>
            )}
        </div>
    );
};

export default Kalender;