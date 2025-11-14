import React, { useState, useEffect } from 'react';
import useProfileStore from '../store/profileStore';

const ProfileForm = () => {
    const { profile, createProfile, updateProfile, getProfile } = useProfileStore();
    const [formData, setFormData] = useState({
        bio: '',
        website: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: ''
    });

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    useEffect(() => {
        if (profile) {
            setFormData({
                bio: profile.bio || '',
                website: profile.website || '',
                youtube: profile.social?.youtube || '',
                twitter: profile.social?.twitter || '',
                facebook: profile.social?.facebook || '',
                linkedin: profile.social?.linkedin || '',
                instagram: profile.social?.instagram || ''
            });
        }
    }, [profile]);

    const { bio, website, youtube, twitter, facebook, linkedin, instagram } = formData;

    const onChange = e =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    const onSubmit = e => {
        e.preventDefault();
        if (profile) {
            updateProfile(formData);
        } else {
            createProfile(formData);
        }
    };

    return (
        <div className="profile-form">
            <h2>{profile ? 'Edit Your Profile' : 'Create Your Profile'}</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Bio:</label>
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
                </div>
                <div>
                    <label>Website:</label>
                    <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
                </div>
                <div>
                    <label>YouTube URL:</label>
                    <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
                </div>
                <div>
                    <label>Twitter URL:</label>
                    <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
                </div>
                <div>
                    <label>Facebook URL:</label>
                    <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
                </div>
                <div>
                    <label>LinkedIn URL:</label>
                    <input type="text" placeholder="LinkedIn URL" name="linkedin" value={linkedin} onChange={onChange} />
                </div>
                <div>
                    <label>Instagram URL:</label>
                    <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
                </div>
                <button type="submit">{profile ? 'Update Profile' : 'Create Profile'}</button>
            </form>
        </div>
    );
};

export default ProfileForm;
