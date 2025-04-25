import React, { useState } from 'react';

interface CollaborationFeaturesProps {
  websiteId?: string;
}

export default function CollaborationFeatures({ websiteId }: CollaborationFeaturesProps) {
  const [collaborators, setCollaborators] = useState<any[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'editor', status: 'active' }
  ]);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('viewer');
  const [isInviting, setIsInviting] = useState(false);
  
  const inviteCollaborator = () => {
    if (!newEmail) return;
    
    setIsInviting(true);
    
    // In a real implementation, this would send an invitation email
    // For now, we'll simulate a delay and add the collaborator
    setTimeout(() => {
      const newCollaborator = {
        id: collaborators.length + 2,
        name: newEmail.split('@')[0],
        email: newEmail,
        role: newRole,
        status: 'pending'
      };
      
      setCollaborators([...collaborators, newCollaborator]);
      setNewEmail('');
      setIsInviting(false);
    }, 1500);
  };
  
  const removeCollaborator = (id: number) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
  };
  
  const changeRole = (id: number, role: string) => {
    setCollaborators(collaborators.map(c => 
      c.id === id ? { ...c, role } : c
    ));
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">CO</span>
        </div>
        <h2 className="text-xl font-heading font-bold">Collaboration Features</h2>
      </div>
      
      <p className="mb-6">
        Invite team members to collaborate on your website. Assign different roles to control what they can edit.
      </p>
      
      <div className="space-y-6">
        <div className="bg-black rounded-lg p-4">
          <h3 className="font-heading font-bold mb-4">Invite Collaborators</h3>
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mb-4">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
            />
            
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="md:w-1/4 p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            
            <button
              onClick={inviteCollaborator}
              disabled={!newEmail || isInviting}
              className="md:w-1/4 py-3 bg-neon-blue text-black rounded-md font-bold"
            >
              {isInviting ? 'Sending...' : 'Invite'}
            </button>
          </div>
          
          <div className="text-xs text-gray-400 space-y-1">
            <p>• Admin: Full access to edit and publish</p>
            <p>• Editor: Can edit content but not publish</p>
            <p>• Viewer: Can view but not edit</p>
          </div>
        </div>
        
        <div className="bg-black rounded-lg p-4">
          <h3 className="font-heading font-bold mb-4">Current Collaborators</h3>
          
          {collaborators.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-dark-purple">
                    <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Name</th>
                    <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Email</th>
                    <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Role</th>
                    <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Status</th>
                    <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {collaborators.map(collaborator => (
                    <tr key={collaborator.id} className="border-b border-dark-purple">
                      <td className="py-3 text-sm">{collaborator.name}</td>
                      <td className="py-3 text-sm">{collaborator.email}</td>
                      <td className="py-3 text-sm">
                        <select
                          value={collaborator.role}
                          onChange={(e) => changeRole(collaborator.id, e.target.value)}
                          className="bg-dark-purple border border-dark-purple rounded p-1 text-xs"
                        >
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </td>
                      <td className="py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          collaborator.status === 'active' 
                            ? 'bg-green-900 text-green-500' 
                            : 'bg-yellow-900 text-yellow-500'
                        }`}>
                          {collaborator.status === 'active' ? 'Active' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 text-sm">
                        <button
                          onClick={() => removeCollaborator(collaborator.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">No collaborators yet</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">Activity Log</h3>
            
            <div className="space-y-3">
              <div className="border-l-2 border-neon-blue pl-3">
                <p className="text-sm">John edited the homepage</p>
                <p className="text-xs text-gray-400">Today, 2:30 PM</p>
              </div>
              
              <div className="border-l-2 border-dark-purple pl-3">
                <p className="text-sm">You updated the about section</p>
                <p className="text-xs text-gray-400">Today, 11:15 AM</p>
              </div>
              
              <div className="border-l-2 border-dark-purple pl-3">
                <p className="text-sm">You invited john@example.com</p>
                <p className="text-xs text-gray-400">Yesterday, 4:45 PM</p>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 bg-dark-purple rounded text-sm">
              View All Activity
            </button>
          </div>
          
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">Version History</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 hover:bg-dark-purple rounded cursor-pointer">
                <div>
                  <p className="text-sm">Current Version</p>
                  <p className="text-xs text-gray-400">Today, 2:30 PM</p>
                </div>
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">
                  Current
                </button>
              </div>
              
              <div className="flex justify-between items-center p-2 hover:bg-dark-purple rounded cursor-pointer">
                <div>
                  <p className="text-sm">Version 2</p>
                  <p className="text-xs text-gray-400">Today, 11:15 AM</p>
                </div>
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">
                  Restore
                </button>
              </div>
              
              <div className="flex justify-between items-center p-2 hover:bg-dark-purple rounded cursor-pointer">
                <div>
                  <p className="text-sm">Version 1</p>
                  <p className="text-xs text-gray-400">Yesterday, 4:45 PM</p>
                </div>
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">
                  Restore
                </button>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 bg-dark-purple rounded text-sm">
              View All Versions
            </button>
          </div>
        </div>
        
        <div className="bg-dark-purple rounded-lg p-4">
          <h3 className="font-heading font-bold mb-2">Collaboration Settings</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Enable real-time collaboration</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-black rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Show edit history</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-black rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Auto-save changes</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-black rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Email notifications for changes</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-black rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
