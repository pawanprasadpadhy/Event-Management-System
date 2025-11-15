import React, { useState } from 'react';
import useProfileStore from '../store/profileStore';

const ProfileForm = () => {
    const { createProfile, loading, error } = useProfileStore();
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        await createProfile({ name });
        setName('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1500);
    };

    return (
        <div className="profile-form">
            <h2>Create New Profile</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Profile name:</label>
                    <input
                        type="text"
                        placeholder="Profile name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Add Profile'}
                </button>
            </form>
            {success && <p style={{ color: 'green', marginTop: 10 }}>Profile created!</p>}
            {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        </div>
    );
};

export default ProfileForm;
