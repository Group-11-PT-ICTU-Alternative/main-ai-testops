import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, DollarSign, AlertCircle, CreditCard, Loader2 } from 'lucide-react';

const DebtDetails = ({ onNavigate, debugMode }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [responseTime] = useState(0.2);

  const tuitionFees = [
    {
      id: 1,
      feeType: 'Học phí chính quy',
      semester: 'HK1 - Năm học 2023-2024',
      amount: 12000000,
      dueDate: '2024-01-30',
      status: 'PARTIALLY_PAID',
      paidAmount: 10000000,
      remainingAmount: 2000000
    },
    {
      id: 2,
      feeType: 'Phí học liệu',
      semester: 'HK1 - Năm học 2023-2024',
      amount: 3000000,
      dueDate: '2024-01-30',
      status: 'PENDING',
      paidAmount: 0,
      remainingAmount: 3000000
    },
    {
      id: 3,
      feeType: 'Phí bảo hiểm y tế',
      semester: 'HK1 - Năm học 2023-2024',
      amount: 800000,
      dueDate: '2023-12-15',
      status: 'OVERDUE',
      paidAmount: 0,
      remainingAmount: 800000
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PARTIALLY_PAID':
        return 'bg-yellow-100 text-yellow-800';
      case 'PENDING':
        return 'bg-blue-100 text-blue-800';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PAID':
        return 'Đã thanh toán';
      case 'PARTIALLY_PAID':
        return 'Thanh toán một phần';
      case 'PENDING':
        return 'Chưa thanh toán';
      case 'OVERDUE':
        return 'Quá hạn';
      default:
        return 'Không xác định';
    }
  };

  // Simulate loading and performance metrics
  useEffect(() => {
    const simulateDataFetch = async () => {
      setIsLoading(true);
      setShowPerformance(false);
      
      // Simulate network delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setIsLoading(false);
      setShowPerformance(true);
      
      // Hide performance message after 3 seconds
      setTimeout(() => setShowPerformance(false), 3000);
    };

    simulateDataFetch();
  }, []);

  const handlePayment = () => {
    onNavigate('qr-payment');
    navigate('/qr-payment');
  };

  const totalAmount = tuitionFees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = tuitionFees.reduce((sum, fee) => sum + fee.paidAmount, 0);
  const totalRemaining = totalAmount - totalPaid;

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại Dashboard
        </button>
        
        <h1 className="text-2xl font-bold text-teal-900 mb-2">
          Chi tiết công nợ
        </h1>
        <p className="text-teal-600">Xem và quản lý các khoản học phí cần thanh toán</p>
        
        {/* Performance Message */}
        {showPerformance && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg animate-pulse">
            <div className="flex items-center space-x-2">
              <span className="text-green-600 text-lg">⚡️</span>
              <span className="text-green-800 text-sm font-medium">
                Phân hệ hệ thống: {responseTime}s
              </span>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {isLoading && (
          <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
              <span className="text-teal-700">Đang tải dữ liệu...</span>
            </div>
          </div>
        )}
      </div>

      {/* Summary Card */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan công nợ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Tổng số tiền</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Đã thanh toán</p>
            <p className="text-xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Còn nợ</p>
            <p className="text-xl font-bold text-red-600">{formatCurrency(totalRemaining)}</p>
          </div>
        </div>
      </div>

      {/* Tuition Fees List */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Chi tiết các khoản phí</h2>
          <button
            onClick={handlePayment}
            className="btn-primary flex items-center"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Thanh toán
          </button>
        </div>

        <div className="space-y-4">
          {tuitionFees.map((fee) => (
            <div key={fee.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FileText className="w-5 h-5 text-primary-600" />
                    <h3 className="font-medium text-gray-900">{fee.feeType}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(fee.status)}`}>
                      {getStatusText(fee.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Học kỳ:</span>
                      <span className="font-medium">{fee.semester}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Hạn thanh toán:</span>
                      <span className={`font-medium ${fee.status === 'OVERDUE' ? 'text-red-600' : ''}`}>
                        {fee.dueDate}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Tổng tiền</p>
                      <p className="font-medium">{formatCurrency(fee.amount)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Đã thanh toán</p>
                      <p className="font-medium text-green-600">{formatCurrency(fee.paidAmount)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Còn lại</p>
                      <p className="font-medium text-red-600">{formatCurrency(fee.remainingAmount)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning for overdue fees */}
      {tuitionFees.some(fee => fee.status === 'OVERDUE') && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800">Cảnh báo công nợ quá hạn</h4>
              <p className="text-red-700 text-sm mt-1">
                Bạn có các khoản phí đã quá hạn thanh toán. Vui lòng thanh toán sớm để tránh bị ảnh hưởng đến việc học tập.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebtDetails;
