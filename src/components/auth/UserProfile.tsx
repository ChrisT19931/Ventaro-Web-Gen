import React, { useState, useEffect } from 'react';

interface UserProfileProps {
  userId?: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  // Mock user data
  const [user, setUser] = useState({
    id: userId || 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    profileImage: '/assets/profile-placeholder.jpg',
    createdAt: '2025-01-15',
    websites: 3,
    role: 'user'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  useEffect(() => {
    // Reset form data when user changes or edit mode toggles
    setFormData({
      name: user.name,
      email: user.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, [user, isEditing]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    // Validate form
    if (!formData.name || !formData.email) {
      setMessage({
        type: 'error',
        text: 'Name and email are required'
      });
      return;
    }
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real implementation, this would call an API to update the user profile
    // For now, we'll simulate a delay and successful update
    setTimeout(() => {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email
      });
      
      setIsSubmitting(false);
      setIsEditing(false);
      setMessage({
        type: 'success',
        text: 'Profile updated successfully'
      });
    }, 1500);
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading font-bold">My Profile</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80"
          >
            Edit Profile
          </button>
        )}
      </div>
      
      {message && (
        <div className={`p-3 rounded-lg mb-4 ${
          message.type === 'success' 
            ? 'bg-green-900 bg-opacity-30 border border-green-500 text-green-500' 
            : 'bg-red-900 bg-opacity-30 border border-red-500 text-red-500'
        }`}>
          <p className="text-sm">{message.text}</p>
        </div>
      )}
      
      {!isEditing ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-dark-purple flex items-center justify-center">
              <span className="text-2xl font-bold">{user.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg">{user.name}</h3>
              <p className="text-sm text-gray-400">{user.email}</p>
              <p className="text-xs text-gray-400">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-neon-blue">{user.websites}</p>
              <p className="text-sm">Websites</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-neon-blue">Premium</p>
              <p className="text-sm">Account Type</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-neon-blue">Active</p>
              <p className="text-sm">Status</p>
            </div>
          </div>
          
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">Account Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Password:</span>
                <span>••••••••</span>
              </div>
            </div>
          </div>
          
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">Preferences</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Email notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <span>Two-factor authentication</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-dark-purple flex items-center justify-center">
              <span className="text-2xl font-bold">{formData.name.charAt(0)}</span>
            </div>
            <div>
              <button className="px-3 py-1 bg-dark-purple rounded text-sm">
                Change Photo
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
              />
            </div>
          </div>
          
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-neon-blue text-black rounded font-bold"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
