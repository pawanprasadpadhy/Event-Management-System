import React, { useEffect } from 'react';
import ProfileForm from '../components/ProfileForm';
import useProfileStore from '../store/profileStore';

const ProfilesPage = () => {
    const { profiles, getProfiles, loading, error } = useProfileStore();

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <div className="profiles-page">
            <h1>Profiles Management</h1>
            <ProfileForm />
            <div className="profile-list">
                <h3>Existing Profiles</h3>
                {loading && <div>Loading profiles...</div>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {profiles.length === 0 && !loading ? (
                  <div>No profiles found.</div>
                ) : (
                  <ul>
                    {profiles.map((profile) => (
                      <li key={profile._id}>{profile.name}</li>
                    ))}
                  </ul>
                )}
            </div>
        </div>
    );
};

export default ProfilesPage;
