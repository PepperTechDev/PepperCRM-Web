import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../../../services/userService";
import Sidebar from "../../../components/sidebar/pages/Sidebar";
import Navbar from "../../../components/navbar/pages/Navbar";
import styles from"../style/UserProfile.module.css";	


const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setProfile(data);
                setFormData(data);
            } catch (error) {
                console.error("Error loading profile:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const updatedProfile = await updateUserProfile(formData);
            setProfile(updatedProfile);
            setEditMode(false);
            alert("profile updating successfully");
        } catch (error) {
            alert("Error updating profile: " + error.message);
        }
    };

    if (!profile) return <div>Cargando...</div>;

    return (

        <section className={styles.containerUserProfile}>
            <Sidebar />
            <div className={styles.flexUserProfile}>
                <Navbar />
                <div>
                    <h1> User Profile </h1>
                    {editMode ? (
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleInputChange}
                                placeholder="Nombre"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleInputChange}
                                placeholder="Correo electrónico"
                            />
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setEditMode(false)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p>Name: {profile.name}</p>
                            <p>Email: {profile.email}</p>
                            <button onClick={() => setEditMode(true)}>Edict</button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UserProfile;