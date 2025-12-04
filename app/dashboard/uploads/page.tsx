'use client';

import { useEffect, useState } from 'react';
import { Check, X, Eye, Filter, Search } from 'lucide-react';
import { uploadsApi } from '@/lib/api';
import { Upload } from '@/lib/types';
import { formatDateTime, formatFileSize, getStatusColor } from '@/lib/utils';

export default function UploadsPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [filteredUploads, setFilteredUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedUpload, setSelectedUpload] = useState<Upload | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUploads();
  }, []);

  useEffect(() => {
    filterUploads();
  }, [uploads, statusFilter, searchQuery]);

  const fetchUploads = async () => {
    try {
      setError('');
      const data = await uploadsApi.getAll();
      const sortedUploads = (data.uploads || []).sort(
        (a: Upload, b: Upload) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setUploads(sortedUploads);
    } catch (error: any) {
      console.error('Error fetching uploads:', error);
      setError(error.response?.data?.message || 'Failed to load uploads. The backend may still be deploying.');
    } finally {
      setLoading(false);
    }
  };

  const filterUploads = () => {
    let filtered = [...uploads];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((u) => u.status === statusFilter.toUpperCase());
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (u) =>
          u.user?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.campaign?.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUploads(filtered);
  };

  const handleApprove = async (upload: Upload) => {
    try {
      await uploadsApi.approve(upload.id, {
        qualityScore: 85,
        bonusAmount: 0.25,
      });
      await fetchUploads();
      setSelectedUpload(null);
    } catch (error) {
      console.error('Error approving upload:', error);
      alert('Failed to approve upload');
    }
  };

  const handleReject = async (upload: Upload) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    try {
      await uploadsApi.reject(upload.id, { reason });
      await fetchUploads();
      setSelectedUpload(null);
    } catch (error) {
      console.error('Error rejecting upload:', error);
      alert('Failed to reject upload');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Management</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <p className="text-yellow-800 mb-4">{error}</p>
          <p className="text-sm text-yellow-600 mb-4">
            The backend API is being deployed with new features. This usually takes 2-5 minutes.
          </p>
          <button
            onClick={() => {
              setLoading(true);
              fetchUploads();
            }}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Management</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by user or campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm">
            <span className="text-gray-600">Total: </span>
            <span className="font-medium text-gray-900">{uploads.length}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Pending: </span>
            <span className="font-medium text-yellow-600">
              {uploads.filter((u) => u.status === 'PENDING').length}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Approved: </span>
            <span className="font-medium text-green-600">
              {uploads.filter((u) => u.status === 'APPROVED').length}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Rejected: </span>
            <span className="font-medium text-red-600">
              {uploads.filter((u) => u.status === 'REJECTED').length}
            </span>
          </div>
        </div>
      </div>

      {/* Uploads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUploads.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No uploads found</p>
          </div>
        ) : (
          filteredUploads.map((upload) => (
            <div key={upload.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              {/* Image */}
              <div className="relative aspect-video bg-gray-100">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>Image Preview</span>
                </div>
                <span
                  className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    upload.status
                  )}`}
                >
                  {upload.status}
                </span>
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 truncate">{upload.campaign?.title || 'Unknown Campaign'}</h3>

                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>
                    <span className="font-medium">User:</span> {upload.user?.fullName || 'N/A'}
                  </p>
                  {upload.width && upload.height && (
                    <p>
                      <span className="font-medium">Size:</span> {upload.width} × {upload.height}
                    </p>
                  )}
                  {upload.fileSizeBytes && (
                    <p>
                      <span className="font-medium">File:</span> {formatFileSize(upload.fileSizeBytes)}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Date:</span> {formatDateTime(upload.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedUpload(upload)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  {upload.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleApprove(upload)}
                        className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => handleReject(upload)}
                        className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <X size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Detail Modal */}
      {selectedUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Upload Details</h2>
                <button
                  onClick={() => setSelectedUpload(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image */}
                <div>
                  <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Image Preview</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <span
                      className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                        selectedUpload.status
                      )}`}
                    >
                      {selectedUpload.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Campaign</h3>
                    <p className="text-gray-900">{selectedUpload.campaign?.title || 'N/A'}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">User</h3>
                    <p className="text-gray-900">{selectedUpload.user?.fullName || 'N/A'}</p>
                    <p className="text-sm text-gray-600">{selectedUpload.user?.email || 'N/A'}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Image Details</h3>
                    <div className="mt-1 space-y-1 text-sm text-gray-900">
                      {selectedUpload.width && selectedUpload.height && (
                        <p>Dimensions: {selectedUpload.width} × {selectedUpload.height}</p>
                      )}
                      {selectedUpload.mimeType && <p>Format: {selectedUpload.mimeType}</p>}
                      {selectedUpload.fileSizeBytes && <p>Size: {formatFileSize(selectedUpload.fileSizeBytes)}</p>}
                      {selectedUpload.originalFilename && <p>Filename: {selectedUpload.originalFilename}</p>}
                    </div>
                  </div>

                  {selectedUpload.exifData && selectedUpload.exifData.gps && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p className="text-sm text-gray-900">
                        {selectedUpload.exifData.gps.latitude}, {selectedUpload.exifData.gps.longitude}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Upload Date</h3>
                    <p className="text-gray-900">{formatDateTime(selectedUpload.createdAt)}</p>
                  </div>

                  {selectedUpload.aiQualityScore !== null && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Quality Score</h3>
                      <p className="text-gray-900">{selectedUpload.aiQualityScore}/100</p>
                    </div>
                  )}

                  {selectedUpload.status === 'PENDING' && (
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => handleApprove(selectedUpload)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        <Check size={20} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(selectedUpload)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        <X size={20} />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
