import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, CreditCard, History, AlertCircle, TrendingUp } from 'lucide-react';

const StudentDashboard = ({ onNavigate, debugMode }) => {
  const navigate = useNavigate();

  const studentInfo = {
    name: 'Nguyễn Văn A',
    studentId: '2021001234',
    class: 'CNTT-K61',
    email: 'nguyenvana@student.hce.edu.vn'
  };

  const debtSummary = {
    totalDebt: 15000000,
    paidAmount: 10000000,
    remainingDebt: 5000000,
    overdueAmount: 2000000,
    nextDueDate: '2024-01-30'
  };

  const recentTransactions = [
    {
      id: 'TXN001',
      date: '2024-01-15',
      amount: 5000000,
      status: 'Thành công',
      method: 'QR Code'
    },
    {
      id: 'TXN002',
      date: '2024-01-10',
      amount: 5000000,
      status: 'Thành công',
      method: 'Chuyển khoản'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleNavigation = (screen) => {
    onNavigate(screen);
    navigate(`/${screen}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard Sinh viên
        </h1>
        <p className="text-gray-600">Chào mừng bạn trở lại, {studentInfo.name}!</p>
      </div>

      {/* Student Info Card */}
      <div className="card mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{studentInfo.name}</h3>
            <p className="text-sm text-gray-600">MSSV: {studentInfo.studentId}</p>
            <p className="text-sm text-gray-600">Lớp: {studentInfo.class}</p>
          </div>
        </div>
      </div>

      {/* Debt Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng công nợ</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(debtSummary.totalDebt)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã thanh toán</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(debtSummary.paidAmount)}</p>
            </div>
            <History className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Còn nợ</p>
              <p className="text-xl font-bold text-orange-600">{formatCurrency(debtSummary.remainingDebt)}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Quá hạn</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(debtSummary.overdueAmount)}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Pie Chart - Debt Distribution */}
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Phân bổ công nợ</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="67, 100" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="20, 100" strokeDashoffset="-67" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="13, 100" strokeDashoffset="-87" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">100%</span>
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Đã thanh toán</span>
              </div>
              <span className="font-medium">67%</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span>Còn nợ</span>
              </div>
              <span className="font-medium">20%</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span>Quá hạn</span>
              </div>
              <span className="font-medium">13%</span>
            </div>
          </div>
        </div>

        {/* Bar Chart - Payment Trends */}
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Xu hướng thanh toán</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 w-12">T1</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{width: '60%'}} />
              </div>
              <span className="text-[10px] font-medium">60%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 w-12">T2</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{width: '75%'}} />
              </div>
              <span className="text-[10px] font-medium">75%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 w-12">T3</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{width: '85%'}} />
              </div>
              <span className="text-[10px] font-medium">85%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 w-12">T4</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{width: '90%'}} />
              </div>
              <span className="text-[10px] font-medium">90%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 w-12">T5</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{width: '95%'}} />
              </div>
              <span className="text-[10px] font-medium">95%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleNavigation('debt-details')}
            className="card hover:shadow-lg transition-shadow cursor-pointer text-left"
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-primary-600" />
              <div>
                <h3 className="font-medium text-gray-900">Tra cứu công nợ</h3>
                <p className="text-sm text-gray-600">Xem chi tiết các khoản phí</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleNavigation('qr-payment')}
            className="card hover:shadow-lg transition-shadow cursor-pointer text-left"
          >
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-primary-600" />
              <div>
                <h3 className="font-medium text-gray-900">Thanh toán</h3>
                <p className="text-sm text-gray-600">Thanh toán học phí online</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleNavigation('payment-history')}
            className="card hover:shadow-lg transition-shadow cursor-pointer text-left"
          >
            <div className="flex items-center space-x-3">
              <History className="w-6 h-6 text-primary-600" />
              <div>
                <h3 className="font-medium text-gray-900">Lịch sử nộp tiền</h3>
                <p className="text-sm text-gray-600">Xem các giao dịch đã thực hiện</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Giao dịch gần đây</h2>
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Mã GD</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Ngày</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Số tiền</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Phương thức</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-2 text-sm">{transaction.id}</td>
                    <td className="py-2 text-sm">{transaction.date}</td>
                    <td className="py-2 text-sm font-medium">{formatCurrency(transaction.amount)}</td>
                    <td className="py-2 text-sm">{transaction.method}</td>
                    <td className="py-2 text-sm">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
