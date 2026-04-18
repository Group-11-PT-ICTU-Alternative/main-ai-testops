import React, { useState } from 'react';
import { FileText, Send, Clock, CheckCircle, AlertCircle, X } from 'lucide-react';

const FeeWaiverRequest = ({ onNavigate, debugMode }) => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([
    {
      id: 'FWR001',
      studentId: '2021001234',
      studentName: 'Nguyên Vân A',
      requestType: 'Hoàn phí',
      amount: 2000000,
      reason: 'Hoàn cân hoàn phí do hoàn thành khóa hoc',
      status: 'pending',
      submittedDate: '2024-01-15',
      processedDate: null
    },
    {
      id: 'FWR002',
      studentId: '2021005678',
      studentName: 'Trân Thi B',
      requestType: 'Miên giâm',
      amount: 5000000,
      reason: 'Miên giâm 50% do hoàn cân kinh khô',
      status: 'preliminary',
      submittedDate: '2024-01-14',
      processedDate: '2024-01-15'
    },
    {
      id: 'FWR003',
      studentId: '2021009012',
      studentName: 'Lê Vân C',
      requestType: 'Hoàn phí',
      amount: 3000000,
      reason: 'Hoàn phí do rút môn',
      status: 'completed',
      submittedDate: '2024-01-10',
      processedDate: '2024-01-12'
    }
  ]);

  const [formData, setFormData] = useState({
    requestType: 'refund',
    amount: '',
    reason: ''
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preliminary': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Chờ duyệt';
      case 'preliminary': return 'Duyệt sơ bộ (CCB)';
      case 'completed': return 'Hoàn tất';
      case 'rejected': return 'Từ chối';
      default: return 'Không xác định';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'preliminary': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: `FWR${String(requests.length + 1).padStart(3, '0')}`,
      studentId: '2021001234',
      studentName: 'Nguyên Vân A',
      requestType: formData.requestType === 'refund' ? 'Hoàn phí' : 'Miên giâm',
      amount: parseInt(formData.amount),
      reason: formData.reason,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
      processedDate: null
    };
    
    setRequests([newRequest, ...requests]);
    setFormData({ requestType: 'refund', amount: '', reason: '' });
    setShowForm(false);
    
    alert('Gûi yêu câu thành công!');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-teal-900 mb-2">
          Gửi yêu cầu hoàn phí/miễn giảm
        </h1>
        <p className="text-teal-600">Quản lý và theo dõi yêu cầu hoàn phí, miễn giảm học phí</p>
      </div>

      {/* New Request Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Gửi yêu cầu mới
        </button>
      </div>

      {/* Request Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-md max-h-[40vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-semibold text-gray-900">
                Tạo yêu cầu mới
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-1.5">
              <div>
                <label className="block text-[9px] font-medium text-gray-700 mb-0.5">
                  Loại yêu cầu
                </label>
                <select
                  value={formData.requestType}
                  onChange={(e) => setFormData({...formData, requestType: e.target.value})}
                  className="w-full border border-gray-300 rounded px-1.5 py-0.5 focus:ring-2 focus:ring-hce-blue focus:border-transparent text-[10px]"
                >
                  <option value="refund">Hoàn phí</option>
                  <option value="exemption">Miên giâm</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[9px] font-medium text-gray-700 mb-0.5">
                  Số tiền (VND)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="Nhâp sô tiên yêu câu"
                  className="w-full border border-gray-300 rounded px-1.5 py-0.5 focus:ring-2 focus:ring-hce-blue focus:border-transparent text-[10px]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[9px] font-medium text-gray-700 mb-0.5">
                  Lý do
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  placeholder="Mô ta ly do yêu câu"
                  rows={1.5}
                  className="w-full border border-gray-300 rounded px-1.5 py-0.5 focus:ring-2 focus:ring-hce-blue focus:border-transparent text-[10px]"
                  required
                />
              </div>
              
              <div className="flex gap-1.5 pt-1">
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-1 flex-1 px-1.5 py-0.5 text-[10px]"
                >
                  <Send className="w-2.5 h-2.5" />
                  Gửi yêu cầu
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex-1 text-[10px]"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Requests List */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Lịch sử yêu cầu
        </h2>
        
        <div className="space-y-3">
          {requests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{request.studentName}</h3>
                    </div>
                    <span className="text-sm text-gray-500">({request.studentId})</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        {getStatusText(request.status)}
                      </div>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Loại yêu cầu:</span>
                      <span className="ml-2 font-medium">{request.requestType}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Số tiền:</span>
                      <span className="ml-2 font-medium">{formatCurrency(request.amount)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Ngày gửi:</span>
                      <span className="ml-2">{request.submittedDate}</span>
                    </div>
                    {request.processedDate && (
                      <div>
                        <span className="text-gray-600">Ngày xử lý:</span>
                        <span className="ml-2">{request.processedDate}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3">
                    <span className="text-gray-600 text-sm">Lý do:</span>
                    <p className="text-gray-900 mt-1">{request.reason}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeeWaiverRequest;
