import React, { useState } from 'react';
import { Users, DollarSign, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';

const CTSVDashboard = ({ debugMode }) => {
  const [loanRequests] = useState([
    {
      id: 'VY001',
      studentName: 'Nguyên Văn A',
      amount: 5000000,
      status: 'Chờ duyệt',
      requestDate: '2024-01-15',
      purpose: 'Học phí HK2'
    },
    {
      id: 'VY002',
      studentName: 'Trần Thị B',
      amount: 3000000,
      status: 'Chờ duyệt',
      requestDate: '2024-01-14',
      purpose: 'Phí tài liệu'
    },
    {
      id: 'VY003',
      studentName: 'Lê Văn C',
      amount: 7000000,
      status: 'Chờ duyệt',
      requestDate: '2024-01-13',
      purpose: 'Phí ký túc xá'
    },
    {
      id: 'VY004',
      studentName: 'Phạm Thị D',
      amount: 2000000,
      status: 'Chờ duyệt',
      requestDate: '2024-01-12',
      purpose: 'Phí thi lại'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Chờ duyệt': return 'bg-yellow-100 text-yellow-800';
      case 'Đã duyệt': return 'bg-green-100 text-green-800';
      case 'Từ chối': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Chờ duyệt': return <Clock className="w-4 h-4" />;
      case 'Đã duyệt': return <CheckCircle className="w-4 h-4" />;
      case 'Từ chối': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-teal-900 mb-2">
        Dashboard Chuyên viên CTSV
      </h1>
      <p className="text-teal-600">Quản lý các yêu cầu hỗ trợ sinh viên</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng đơn chờ duyệt</p>
              <p className="text-xl font-bold text-teal-900">{loanRequests.length}</p>
              <p className="text-sm text-yellow-600">Cần xử lý ngay</p>
            </div>
            <Users className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng tiền vay</p>
              <p className="text-xl font-bold text-teal-900">
                {loanRequests.reduce((sum, req) => sum + req.amount, 0).toLocaleString('vi-VN')} VND
              </p>
              <p className="text-sm text-blue-600">Trong tháng này</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã duyệt hôm nay</p>
              <p className="text-xl font-bold text-green-600">3</p>
              <p className="text-sm text-green-600">+25% so hôm qua</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Từ chối</p>
              <p className="text-xl font-bold text-red-600">1</p>
              <p className="text-sm text-red-600">Cần xem xét</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Pie Chart - Loan Status Distribution */}
        <div className="card">
          <h3 className="text-sm font-semibold text-teal-900 mb-3">Phân bổ trạng thái đơn vay</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="100, 100" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="0, 100" strokeDashoffset="0" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="0, 100" strokeDashoffset="0" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">100%</span>
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span>Chờ duyệt</span>
              </div>
              <span className="font-medium">100%</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Đã duyệt</span>
              </div>
              <span className="font-medium">0%</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span>Từ chối</span>
              </div>
              <span className="font-medium">0%</span>
            </div>
          </div>
        </div>

        {/* Bar Chart - Monthly Loan Trends */}
        <div className="card">
          <h3 className="text-sm font-semibold text-teal-900 mb-3">Xu hướng vay vốn theo tháng</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 w-12">T1</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{width: '45%'}} />
              </div>
              <span className="text-[10px] font-medium">45%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 w-12">T2</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{width: '55%'}} />
              </div>
              <span className="text-[10px] font-medium">55%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 w-12">T3</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{width: '70%'}} />
              </div>
              <span className="text-[10px] font-medium">70%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 w-12">T4</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{width: '65%'}} />
              </div>
              <span className="text-[10px] font-medium">65%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 w-12">T5</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{width: '80%'}} />
              </div>
              <span className="text-[10px] font-medium">80%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-teal-900">
            Đơn vay vốn online chờ duyệt
          </h2>
          <button className="btn-secondary">
            <FileText className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </button>
        </div>
        
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-teal-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-teal-900">Mã đơn</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-teal-900">Tên sinh viên</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-teal-900">Mục đích</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-teal-900">Số tiền vay</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-teal-900">Ngày yêu cầu</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-teal-900">Trạng thái</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-teal-900">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((request) => (
                <tr key={request.id} className="border-b border-teal-100 hover:bg-teal-50">
                  <td className="py-3 px-4 text-sm font-medium text-teal-900">{request.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <span>{request.studentName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{request.purpose}</td>
                  <td className="py-3 px-4 text-sm text-right font-medium text-teal-900">
                    {request.amount.toLocaleString('vi-VN')} VND
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{request.requestDate}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="text-teal-600 hover:text-teal-800 text-sm font-medium">
                        Xem chi tiết
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Phê duyệt
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold text-teal-900 mb-4">Thao tác nhanh</h3>
          <div className="space-y-2">
            <button className="w-full btn-secondary text-left">
              <Users className="w-4 h-4 mr-2 inline" />
              Xem tất cả đơn vay
            </button>
            <button className="w-full btn-secondary text-left">
              <CheckCircle className="w-4 h-4 mr-2 inline" />
              Phê duyệt hàng loạt
            </button>
            <button className="w-full btn-secondary text-left">
              <FileText className="w-4 h-4 mr-2 inline" />
              Báo cáo tháng
            </button>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-teal-900 mb-4">Thông báo</h3>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <p className="text-sm text-gray-700">
                4 đơn vay còn chờ duyệt trong hôm nay
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <p className="text-sm text-gray-700">
                3 đơn đã được phê duyệt thành công
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTSVDashboard;
