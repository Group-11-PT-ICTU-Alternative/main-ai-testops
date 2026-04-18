import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, CheckCircle, Calendar, FileText, CreditCard, User, DollarSign, Home } from 'lucide-react';

const PaymentReceipt = ({ onNavigate, debugMode }) => {
  const navigate = useNavigate();

  const receiptData = {
    transactionId: 'TXN202401150001',
    paymentDate: '2024-01-15 14:30:25',
    studentInfo: {
      studentId: '2021001234',
      name: 'Nguyễn Văn A',
      class: 'CNTT-K61',
      email: 'nguyenvana@student.hce.edu.vn'
    },
    paymentDetails: {
      description: 'Thanh toán học phí HK1 2023-2024',
      amount: 5000000,
      method: 'QR Code',
      gatewayTransactionId: 'VNP202401151430251234',
      status: 'Thành công'
    },
    breakdown: [
      {
        item: 'Học phí chính quy (thanh toán một phần)',
        amount: 2000000
      },
      {
        item: 'Phí học liệu',
        amount: 3000000
      }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleDownload = () => {
    // Simulate download
    const receiptContent = `
HCE-FMS - BIÊN LAI THANH TOÁN
================================
Mã giao dịch: ${receiptData.transactionId}
Ngày thanh toán: ${receiptData.paymentDate}

THÔNG TIN SINH VIÊN
MSSV: ${receiptData.studentInfo.studentId}
Họ tên: ${receiptData.studentInfo.name}
Lớp: ${receiptData.studentInfo.class}
Email: ${receiptData.studentInfo.email}

CHI TIẾT THANH TOÁN
Nội dung: ${receiptData.paymentDetails.description}
Phương thức: ${receiptData.paymentDetails.method}
Mã giao dịch cổng thanh toán: ${receiptData.gatewayTransactionId}
Trạng thái: ${receiptData.paymentDetails.status}
Số tiền: ${formatCurrency(receiptData.paymentDetails.amount)}

CHI TIẾT CÁC KHOẢN
${receiptData.breakdown.map(item => `${item.item}: ${formatCurrency(item.amount)}`).join('\n')}

TỔNG CỘNG: ${formatCurrency(receiptData.paymentDetails.amount)}

================================
Biên lai được tạo tự động từ hệ thống HCE-FMS
Đây là biên lai điện tử có giá trị pháp lý.
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bien_lai_${receiptData.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBackToDashboard = () => {
    onNavigate('dashboard');
    navigate('/dashboard');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/qr-payment')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại thanh toán
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Biên lai thanh toán
            </h1>
            <p className="text-gray-600">Xác nhận giao dịch thành công</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-green-600 font-semibold">Thanh toán thành công</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Receipt Header */}
        <div className="card mb-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">BIÊN LAI THANH TOÁN</h2>
            <p className="text-gray-600">Hệ thống Quản lý tài chính - học phí tích hợp AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Thông tin giao dịch</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã giao dịch:</span>
                  <span className="font-medium">{receiptData.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày thanh toán:</span>
                  <span className="font-medium">{receiptData.paymentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức:</span>
                  <span className="font-medium">{receiptData.paymentDetails.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã GD cổng thanh toán:</span>
                  <span className="font-medium">{receiptData.gatewayTransactionId}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Thông tin sinh viên</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">MSSV:</span>
                  <span className="font-medium">{receiptData.studentInfo.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Họ tên:</span>
                  <span className="font-medium">{receiptData.studentInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lớp:</span>
                  <span className="font-medium">{receiptData.studentInfo.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{receiptData.studentInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="card mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Chi tiết thanh toán</h3>
          
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Nội dung:</p>
            <p className="font-medium">{receiptData.paymentDetails.description}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mb-4">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Hạng mục</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-700">Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {receiptData.breakdown.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 text-sm">{item.item}</td>
                    <td className="py-2 text-sm text-right font-medium">
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="py-3 text-sm">Tổng cộng</td>
                  <td className="py-3 text-sm text-right text-primary-600">
                    {formatCurrency(receiptData.paymentDetails.amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Trạng thái: {receiptData.paymentDetails.status}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleDownload}
            className="btn-secondary flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Tải về biên lai
          </button>
          
          <button
            onClick={handlePrint}
            className="btn-secondary flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            In biên lai
          </button>
          
          <button
            onClick={handleBackToDashboard}
            className="btn-primary flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Về Dashboard
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Biên lai được tạo tự động từ hệ thống HCE-FMS</p>
          <p>Đây là biên lai điện tử có giá trị pháp lý. Nếu có thắc mắc, vui lòng liên phòng kế toán.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
