import {useEffect, useState} from "react";
import {getUser, updateUser} from "../services/UserService";
import styles from "../styles/User.module.css";

let USER_ID = null;

function Profile() {
    const [profile, setProfile] = useState(null);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({name: "", email: "", password: "", role: "USER"});
    const [error, setError] = useState("");

    // Traer datos del perfil al montar
    useEffect(() => {
        const fetchUser = async () => {
            try {
                USER_ID = localStorage.getItem("userId");
                const user = await getUser(USER_ID);
                setProfile(user);
                setForm((prev) => ({
                    ...prev,
                    name: user.name,
                    email: user.email,
                    // Si user.role existe, úsalo; si no, mantén "USER"
                    role: user.role || prev.role
                }));
            } catch (err) {
                setError("Could not fetch the profile: ");
                console.error(err);
            }
        };
        fetchUser();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    // Guardar cambios
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const updated = await updateUser(USER_ID, form);
            setProfile(updated);
            setEdit(false);
        } catch (err) {
            setError("Couldn't update the profile: ");
            console.error(err);
        }
    };

    if (error) return <div>{error}</div>;
    if (!profile) return <div>Loading...</div>;

    return (
        <div className={styles.profileBoard}>
            {!edit ? (
                <div>
                    <h2>Profile</h2>
                    <p>
                        <b>Name:</b> {profile.name}
                    </p>
                    <p>
                        <b>Email:</b> {profile.email}
                    </p>
                    <button onClick={() => setEdit(true)}>Edit</button>
                </div>
            ) : (
                <form onSubmit={handleSave}>
                    <h2>Edit Profile</h2>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            type="email"
                        />
                        <label>
                            Password:
                            <input
                                type="text"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </label>
                    <br/>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEdit(false)}>
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}

export default Profile;
