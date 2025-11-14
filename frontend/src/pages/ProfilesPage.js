import React, { useEffect } from 'react';
import ProfileForm from '../components/ProfileForm';
import useProfileStore from '../store/profileStore';

const ProfilesPage = () => {
    const { profile, getProfile, loading, error } = useProfileStore();

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="profiles-page">
            <h1>User Profile</h1>
            <ProfileForm />
            {profile && (
                <div className="profile-details">
                    <h3>Your Current Profile</h3>
                    <p><strong>Bio:</strong> {profile.bio}</p>
                    <p><strong>Website:</strong> <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a></p>
                    {profile.social && (
                        <div>
                            <h4>Social Links:</h4>
                            {profile.social.youtube && <p>YouTube: <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">{profile.social.youtube}</a></p>}
                            {profile.social.twitter && <p>Twitter: <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">{profile.social.twitter}</a></p>}
                            {profile.social.facebook && <p>Facebook: <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">{profile.social.facebook}</a></p>}
                            {profile.social.linkedin && <p>LinkedIn: <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">{profile.social.linkedin}</a></p>}
                            {profile.social.instagram && <p>Instagram: <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">{profile.social.instagram}</a></p>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfilesPage;
