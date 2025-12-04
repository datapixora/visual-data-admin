'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Campaign } from '@/lib/types';
import { campaignsApi } from '@/lib/api';

interface CampaignFormProps {
  campaign?: Campaign;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CampaignForm({ campaign, onClose, onSuccess }: CampaignFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    tags: '',
    optionalTags: '',
    targetQuantity: 1000,
    basePayout: '0.50',
    bonusPayout: '0.25',
    maxUploadsPerUser: 100,
    priority: 5,
    endsAt: '',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (campaign) {
      setFormData({
        title: campaign.title,
        description: campaign.description,
        instructions: campaign.instructions,
        tags: campaign.tags.join(', '),
        optionalTags: campaign.optionalTags?.join(', ') || '',
        targetQuantity: campaign.targetQuantity,
        basePayout: String(campaign.basePayout),
        bonusPayout: campaign.bonusPayout ? String(campaign.bonusPayout) : '',
        maxUploadsPerUser: campaign.maxUploadsPerUser,
        priority: campaign.priority,
        endsAt: campaign.endsAt ? campaign.endsAt.split('T')[0] : '',
        status: campaign.status,
      });
    }
  }, [campaign]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = {
        title: formData.title,
        description: formData.description,
        instructions: formData.instructions,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        optionalTags: formData.optionalTags ? formData.optionalTags.split(',').map(t => t.trim()).filter(Boolean) : null,
        targetQuantity: formData.targetQuantity,
        basePayout: parseFloat(formData.basePayout),
        bonusPayout: formData.bonusPayout ? parseFloat(formData.bonusPayout) : null,
        maxUploadsPerUser: formData.maxUploadsPerUser,
        priority: formData.priority,
        endsAt: formData.endsAt ? new Date(formData.endsAt).toISOString() : null,
        status: formData.status,
      };

      if (campaign) {
        await campaignsApi.update(campaign.id, data);
      } else {
        await campaignsApi.create(data);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {campaign ? 'Edit Campaign' : 'Create New Campaign'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Front View Cars - Urban Areas"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of what photos you need"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions *
            </label>
            <textarea
              required
              rows={4}
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed instructions for photographers"
            />
          </div>

          {/* Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Tags (comma-separated) *
              </label>
              <input
                type="text"
                required
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="car, front_view, urban"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Optional Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.optionalTags}
                onChange={(e) => setFormData({ ...formData, optionalTags: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="license_plate, brand"
              />
            </div>
          </div>

          {/* Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Photos *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.targetQuantity}
                onChange={(e) => setFormData({ ...formData, targetQuantity: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Payout ($) *
              </label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={formData.basePayout}
                onChange={(e) => setFormData({ ...formData, basePayout: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bonus Payout ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.bonusPayout}
                onChange={(e) => setFormData({ ...formData, bonusPayout: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Uploads per User *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.maxUploadsPerUser}
                onChange={(e) => setFormData({ ...formData, maxUploadsPerUser: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority (1-10) *
              </label>
              <input
                type="number"
                required
                min="1"
                max="10"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={formData.endsAt}
                onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ACTIVE' | 'INACTIVE' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Saving...' : campaign ? 'Update Campaign' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
