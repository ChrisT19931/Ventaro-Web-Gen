export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button className="btn-primary px-4 py-2 rounded-md">Create New Template</button>
          <button className="bg-dark-purple px-4 py-2 rounded-md border border-neon-blue">View Analytics</button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-grey p-6 rounded-lg border-l-4 border-neon-blue">
          <h3 className="text-lg font-heading mb-2">Total Users</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-grey p-6 rounded-lg border-l-4 border-dark-purple">
          <h3 className="text-lg font-heading mb-2">Active Websites</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-grey p-6 rounded-lg border-l-4 border-neon-blue">
          <h3 className="text-lg font-heading mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">$0</p>
        </div>
        <div className="bg-grey p-6 rounded-lg border-l-4 border-dark-purple">
          <h3 className="text-lg font-heading mb-2">Templates</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-grey rounded-lg p-6">
        <h2 className="text-xl font-heading font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <p className="text-gray-400 italic">No recent activity</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-grey rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-dark-purple rounded-lg hover:bg-opacity-80 transition-all">
              <span className="block text-lg font-bold mb-2">Add Template</span>
              <span className="text-sm">Upload a new website template</span>
            </button>
            <button className="p-4 bg-dark-purple rounded-lg hover:bg-opacity-80 transition-all">
              <span className="block text-lg font-bold mb-2">User Management</span>
              <span className="text-sm">Manage user accounts</span>
            </button>
            <button className="p-4 bg-dark-purple rounded-lg hover:bg-opacity-80 transition-all">
              <span className="block text-lg font-bold mb-2">Site Settings</span>
              <span className="text-sm">Configure platform settings</span>
            </button>
            <button className="p-4 bg-dark-purple rounded-lg hover:bg-opacity-80 transition-all">
              <span className="block text-lg font-bold mb-2">View Reports</span>
              <span className="text-sm">Analytics and reporting</span>
            </button>
          </div>
        </div>
        
        <div className="bg-grey rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Server Status</span>
              <span className="px-2 py-1 bg-green-500 text-black rounded-full text-xs">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Database</span>
              <span className="px-2 py-1 bg-green-500 text-black rounded-full text-xs">Connected</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Storage</span>
              <span className="px-2 py-1 bg-green-500 text-black rounded-full text-xs">0% Used</span>
            </div>
            <div className="flex justify-between items-center">
              <span>API Services</span>
              <span className="px-2 py-1 bg-green-500 text-black rounded-full text-xs">Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="bg-dark-purple rounded-lg p-6 border border-neon-blue">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
            <span className="text-black font-bold">AI</span>
          </div>
          <h2 className="text-xl font-heading font-bold">AI Assistant</h2>
        </div>
        <p className="mb-4">Use our AI assistant to help manage your platform and generate content.</p>
        <div className="flex">
          <input 
            type="text" 
            placeholder="Ask the AI assistant..." 
            className="flex-1 p-3 rounded-l-md bg-grey border-0 focus:ring-2 focus:ring-neon-blue"
          />
          <button className="bg-neon-blue text-black px-4 py-2 rounded-r-md font-bold">Ask</button>
        </div>
      </div>
    </div>
  );
}
