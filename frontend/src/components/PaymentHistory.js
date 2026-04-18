import React, { useState, useEffect } from 'react';
import { Calendar, Download, Filter, Search, Eye, CreditCard, Smartphone, Building } from 'lucide-react';

const PaymentHistory = ({ debugMode, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Currency formatting function for Vietnamese Dong
  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const paymentData = [
    {
      id: 'TXN202401150001',
      date: '2024-01-15 14:30:00',
      amount: 5000000,
      method: 'VNPAY',
      status: 'success',
      description: 'Học phí HK1 2024',
      type: 'tuition',
      semester: '2024.1'
    },
    {
      id: 'REF202401150001',
      date: '2024-01-15 10:15:00',
      amount: 2000000,
      method: 'REFUND',
      status: 'pending_ccb',
      description: 'Đơn hoàn phí - Học phí HK1',
      type: 'refund',
      ccbStatus: 'Chờ duyệt',
      ccbStep: 1
    },
    {
      id: 'REF202401140001',
      date: '2024-01-14 16:45:00',
      amount: 1500000,
      method: 'REFUND',
      status: 'approved_ccb',
      description: 'Đơn hoàn phí - Phí học liệu',
      type: 'refund',
      ccbStatus: 'Đã phê duyệt sơ bộ (CCB)',
      ccbStep: 2
    },
    {
      id: 'REF202401130001',
      date: '2024-01-13 09:30:00',
      amount: 1000000,
      method: 'REFUND',
      status: 'completed',
      description: 'Đơn hoàn phí - Lệ phí thi lại',
      type: 'refund',
      ccbStatus: 'Hoàn tất',
      ccbStep: 3
    },
    {
      id: 'TXN202401100002',
      date: '2024-01-10 09:15:00',
      amount: 2000000,
      method: 'MoMo',
      status: 'success',
      description: 'Phí ký túc xá',
      type: 'accommodation',
      semester: '2024.1'
    },
    {
      id: 'TXN202401050003',
      date: '2024-01-05 16:45:00',
      amount: 1500000,
      method: 'Chuyển khoản',
      status: 'pending',
      description: 'Phí thư viện',
      type: 'library',
      semester: '2024.1'
    },
    {
      id: 'TXN202312280004',
      date: '2023-12-28 11:20:00',
      amount: 3000000,
      method: 'Tiền mặt',
      status: 'success',
      description: 'Học phí bổ sung HK2 2023',
      type: 'tuition',
      semester: '2023.2'
    }
  ];

  const [filteredData, setFilteredData] = useState(paymentData);

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending_ccb': return 'bg-orange-100 text-orange-800';
      case 'approved_ccb': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCCBStatusColor = (ccbStatus) => {
    switch(ccbStatus) {
      case 'Chờ duyệt': return 'bg-orange-100 text-orange-800';
      case 'Đã phê duyệt sơ bộ (CCB)': return 'bg-blue-100 text-blue-800';
      case 'Hoàn tất': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method) => {
    switch(method) {
      case 'VNPAY': return <CreditCard className="w-4 h-4" />;
      case 'MoMo': return <Smartphone className="w-4 h-4" />;
      case 'Chuyên khoan': return <Building className="w-4 h-4" />;
      case 'Tiên mât': return <Building className="w-4 h-4" />;
      case 'REFUND': return <Calendar className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    let filtered = paymentData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.method.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(payment => payment.status === filterStatus);
    }

    setFilteredData(filtered);
  }, [searchTerm, filterStatus]);

  const getStatusText = (status) => {
    switch (status) {
      case 'success':
        return 'Thành công';
      case 'pending':
        return 'Đang xử lý';
      case 'failed':
        return 'Thất bại';
      default:
        return 'Không xác định';
    }
  };

  const getTotalAmount = () => {
    return filteredData
      .filter(payment => payment.status === 'success')
      .reduce((total, payment) => total + payment.amount, 0);
  };

  const downloadReceipt = (paymentId) => {
    // Simulate download
    alert(`Đang tải biên lai cho giao dịch: ${paymentId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Lịch sử thanh toán
        </h1>
        <p className="text-gray-600">Xem và tải về biên lai các giao dịch đã thực hiện</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng giao dịch</p>
              <p className="text-2xl font-bold text-gray-900">{filteredData.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-gray-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Thành công</p>
              <p className="text-2xl font-bold text-green-600">
                {filteredData.filter(p => p.status === 'success').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Eye className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang xử lý</p>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredData.filter(p => p.status === 'pending').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng tiền</p>
              <p className="text-2xl font-bold text-hce-blue">{formatVND(getTotalAmount())}</p>
            </div>
            <div className="w-8 h-8 bg-hce-blue rounded-full flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã GD, mô tả, phương thức..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="success">Thành công</option>
            <option value="pending">Đang xử lý</option>
            <option value="failed">Thất bại</option>
          </select>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã giao dịch
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày giờ
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phương thức
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(payment.date).toLocaleString('vi-VN')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{payment.description}</div>
                      <div className="text-xs text-gray-500">HK: {payment.semester}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    {formatVND(payment.amount)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      {getMethodIcon(payment.method)}
                      <span>{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                      {getStatusText(payment.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="text-hce-blue hover:text-hce-blue-dark flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        Chi tiết
                      </button>
                      {payment.status === 'success' && (
                        <button
                          onClick={() => downloadReceipt(payment.id)}
                          className="text-green-600 hover:text-green-700 flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          Tải biên lai
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[45vh] overflow-y-auto p-2">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-sm font-bold text-gray-900">Chi tiết giao dịch</h2>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[9px] text-gray-600">Mã giao dịch</p>
                  <p className="font-semibold text-xs">{selectedPayment.id}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-600">Trạng thái</p>
                  <span className={`px-1 py-0.5 text-[9px] rounded-full ${getStatusColor(selectedPayment.status)}`}>
                    {getStatusText(selectedPayment.status)}
                  </span>
                </div>

                {selectedPayment.status === 'success' && (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => downloadReceipt(selectedPayment.id)}
                      className="flex-1 px-2 py-1 bg-hce-blue text-white rounded hover:bg-hce-blue-dark flex items-center justify-center gap-1 text-xs"
                    >
                      <Download className="w-2.5 h-2.5" />
                      Tải biên lai
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          ← Quay lại Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
