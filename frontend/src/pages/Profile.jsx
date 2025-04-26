// filepath: c:\Users\User\Desktop\Coding\projects\Daktari-Project\frontend\src\pages\Profile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/apiClient"; // Assuming apiClient handles profile fetching/updating
import LoadingButton from "../components/LoadingButton";
import Loader from "../components/Loader";

function Profile() {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    gender: "",
    // Add other profile fields as needed
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setIsLoading(true);
      setError(null);
      try {
        // Replace with your actual API call to get profile data
        // const response = await api.auth.getProfile(user.id);
        // Mock data for now:
        const mockProfile = {
          id: user.id,
          email: user.email || "user@example.com", // Get email from user object if available
          full_name: "Shadrack Kimaau",
          date_of_birth: "1992-05-15",
          gender: "male",
        };
        setProfileData(mockProfile);
        setFormData({
          full_name: mockProfile.full_name || "",
          date_of_birth: mockProfile.date_of_birth || "",
          gender: mockProfile.gender || "",
        });
      } catch (err) {
        setError("Failed to load profile data.");
        console.error("Profile fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Replace with your actual API call to update profile
      // const response = await api.auth.updateProfile(user.id, formData);
      // if (response.success) {
      //   setProfileData(response.data[0]); // Assuming API returns updated profile
      //   setIsEditing(false);
      // } else {
      //   throw new Error(response.error || 'Failed to update profile');
      // }
      console.log("Updating profile with:", formData); // Mock update
      // Simulate API delay and update local state
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProfileData((prev) => ({ ...prev, ...formData }));
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update profile.");
      console.error("Profile update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !profileData) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader size="large" />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="text-center py-10">
        Could not load profile. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">My Profile</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-8">
        {!isEditing ? (
          <div className="space-y-4">
            <p>
              <strong className="font-semibold text-gray-700">Email:</strong>{" "}
              {profileData.email}
            </p>
            <p>
              <strong className="font-semibold text-gray-700">
                Full Name:
              </strong>{" "}
              {profileData.full_name || "Not set"}
            </p>
            <p>
              <strong className="font-semibold text-gray-700">
                Date of Birth:
              </strong>{" "}
              {profileData.date_of_birth || "Not set"}
            </p>
            <p>
              <strong className="font-semibold text-gray-700">Gender:</strong>{" "}
              {profileData.gender || "Not set"}
            </p>
            {/* Display other profile fields */}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="date_of_birth"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                id="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">Select...</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
            {/* Add other form fields */}
            <div className="flex gap-4">
              <LoadingButton
                type="submit"
                isLoading={isLoading}
                className="bg-primary-600 hover:bg-primary-700"
              >
                Save Changes
              </LoadingButton>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 border-t pt-6">
          <button
            onClick={logout}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
