'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { campaignsApi } from '@/lib/api';
import { Campaign } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import CampaignForm from '@/components/dashboard/CampaignForm';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const data = await campaignsApi.getAll();
      setCampaigns(data.campaigns || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
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
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Create Campaign
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No campaigns yet. Create your first campaign!</p>
          </div>
        ) : (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{campaign.title}</h3>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        campaign.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {campaign.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress:</span>
                    <span className="font-medium text-gray-900">
                      {campaign.totalCollected} / {campaign.targetQuantity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min((campaign.totalCollected / campaign.targetQuantity) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Payout:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(Number(campaign.basePayout))}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bonus:</span>
                    <span className="font-medium text-gray-900">
                      {campaign.bonusPayout ? formatCurrency(Number(campaign.bonusPayout)) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-medium text-gray-900">
                      {campaign.endsAt ? formatDate(campaign.endsAt) : 'No end date'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setEditingCampaign(campaign)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Campaign Form Modal */}
      {showCreateModal && (
        <CampaignForm
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            fetchCampaigns();
          }}
        />
      )}

      {editingCampaign && (
        <CampaignForm
          campaign={editingCampaign}
          onClose={() => setEditingCampaign(null)}
          onSuccess={() => {
            fetchCampaigns();
          }}
        />
      )}
    </div>
  );
}
