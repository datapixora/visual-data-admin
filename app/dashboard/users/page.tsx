'use client';

import { useEffect, useState } from 'react';
import { Users as UsersIcon, Mail, Calendar, Shield } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
  _count?: {
    uploads: number;
  };
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Note: The backend doesn't have a /users endpoint yet
    // This is a placeholder that would fetch from /v1/admin/users
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Placeholder - backend endpoint needs to be created
      // const data = await usersApi.getAll();
      // setUsers(data.users || []);

      // Mock data for demo
      setUsers([
        {
          id: '1',
          email: 'admin@example.com',
          fullName: 'Admin User',
          role: 'ADMIN',
          createdAt: new Date().toISOString(),
          _count: { uploads: 0 },
        },
        {
          id: '2',
          email: 'test@example.com',
          fullName: 'Test User',
          role: 'USER',
          createdAt: new Date().toISOString(),
          _count: { uploads: 5 },
        },
      ]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <div className="text-sm text-gray-600">
          Total Users: <span className="font-medium text-gray-900">{users.length}</span>
        </div>
      </div>

      {/* Note about missing endpoint */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> The backend API doesn't have a users list endpoint yet. You'll need to add{' '}
          <code className="bg-yellow-100 px-1 py-0.5 rounded">GET /v1/admin/users</code> to fetch real user data.
        </p>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <UsersIcon size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user.fullName}</h3>
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                      user.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>Joined {formatDateTime(user.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={16} />
                <span>{user._count?.uploads || 0} uploads</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
