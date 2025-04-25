import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 bg-grey border-r border-dark-purple">
        <div className="p-4 border-b border-dark-purple">
          <h1 className="text-xl font-heading font-bold text-neon-blue">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="block p-2 rounded hover:bg-dark-purple">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/templates" className="block p-2 rounded hover:bg-dark-purple">
                Templates
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="block p-2 rounded hover:bg-dark-purple">
                Users
              </Link>
            </li>
            <li>
              <Link href="/admin/payments" className="block p-2 rounded hover:bg-dark-purple">
                Payments
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="block p-2 rounded hover:bg-dark-purple">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-grey border-b border-dark-purple p-4 flex justify-between items-center">
          <h2 className="text-lg font-heading">Website Generator Admin</h2>
          <div className="flex items-center space-x-4">
            <span>Admin User</span>
            <button className="p-2 rounded hover:bg-dark-purple">Logout</button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}
