'use client';

import { useEffect, useState } from 'react';
import { Users, Image, Megaphone, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { uploadsApi, campaignsApi } from '@/lib/api';
import { Upload, Campaign } from '@/lib/types';
import { formatCurrency, formatDateTime, getStatusColor } from '@/lib/utils';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalUploads: 0,
    pendingUploads: 0,
    approvedUploads: 0,
    rejectedUploads: 0,
    totalEarnings: 0,
  });
  const [recentUploads, setRecentUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch campaigns
      const campaignsData = await campaignsApi.getAll();
      const campaigns = campaignsData.campaigns || [];
      const activeCampaigns = campaigns.filter((c: Campaign) => c.status === 'ACTIVE');

      // Fetch all uploads to calculate stats
      let uploads: Upload[] = [];
      try {
        const uploadsData = await uploadsApi.getAll();
        uploads = uploadsData.uploads || [];
      } catch (uploadError) {
        console.error('Error fetching uploads:', uploadError);
        // Continue with empty uploads array if endpoint fails
      }

      const pending = uploads.filter((u: Upload) => u.status === 'PENDING');
      const approved = uploads.filter((u: Upload) => u.status === 'APPROVED');
      const rejected = uploads.filter((u: Upload) => u.status === 'REJECTED');

      const totalEarnings = approved.reduce((sum: number, u: Upload) => sum + (u.payoutAmount || 0), 0);

      setStats({
        totalCampaigns: campaigns.length,
        activeCampaigns: activeCampaigns.length,
        totalUploads: uploads.length,
        pendingUploads: pending.length,
        approvedUploads: approved.length,
        rejectedUploads: rejected.length,
        totalEarnings,
      });

      // Get recent uploads (latest 5)
      const recent = [...uploads]
        .sort((a: Upload, b: Upload) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
      setRecentUploads(recent);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Campaigns"
          value={stats.totalCampaigns}
          icon={Megaphone}
          color="blue"
        />
        <StatCard
          title="Active Campaigns"
          value={stats.activeCampaigns}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Total Uploads"
          value={stats.totalUploads}
          icon={Image}
          color="blue"
        />
        <StatCard
          title="Total Earnings"
          value={formatCurrency(stats.totalEarnings)}
          icon={DollarSign}
          color="green"
        />
      </div>

      {/* Upload Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Pending Review"
          value={stats.pendingUploads}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Approved"
          value={stats.approvedUploads}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Rejected"
          value={stats.rejectedUploads}
          icon={XCircle}
          color="red"
        />
      </div>

      {/* Recent Uploads */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Uploads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUploads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No uploads yet
                  </td>
                </tr>
              ) : (
                recentUploads.map((upload) => (
                  <tr key={upload.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {upload.campaign?.title || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {upload.user?.fullName || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(upload.status)}`}>
                        {upload.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDateTime(upload.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
