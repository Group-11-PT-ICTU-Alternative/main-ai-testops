import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, QrCode, Clock, AlertTriangle, CheckCircle, RefreshCw, Smartphone, Webhook, Shield } from 'lucide-react';

const QRPayment = ({ onNavigate, debugMode }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, success, failed
  const [webhookStatus, setWebhookStatus] = useState('idle'); // idle, processing, received

  const paymentInfo = {
    transactionId: 'TXN202401150001',
    studentId: '2021001234',
    studentName: 'Nguyễn Văn A',
    amount: 5000000,
    description: 'Thanh toán học phí HK1 2023-2024',
    qrCode: 'HCE-FMS-QR|TXN202401150001|2021001234|5000000|VND'
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleRefreshQR = () => {
    setTimeLeft(900);
    setIsExpired(false);
    setPaymentStatus('pending');
  };

  const handleSimulatePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        onNavigate('payment-receipt');
        navigate('/payment-receipt');
      }, 2000);
    }, 3000);
  };

  const handleWebhookSimulation = async () => {
    setWebhookStatus('processing');
    
    // Simulate webhook from bank
    setTimeout(() => {
      setWebhookStatus('received');
      setPaymentStatus('success');
      
      // Show success notification with reconciliation confirmation
      setTimeout(() => {
        alert('Đã ghi nợ thành công!\n\nĐã liệu đã được lưu vào Nhật ký giao dịch để đối soát ngân hàng');
        onNavigate('payment-receipt');
        navigate('/payment-receipt');
      }, 1500);
    }, 2000);
  };

  const getTimeColor = () => {
    if (timeLeft <= 60) return 'text-red-600';
    if (timeLeft <= 300) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (paymentStatus === 'success') {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-600 mb-2">Thanh toán thành công!</h2>
          <p className="text-gray-600">Đang chuyển đến trang biên lai...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/debt-details')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại Chi tiết công nợ
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Thanh toán QR Code
        </h1>
        <p className="text-gray-600">Quét mã QR để thanh toán học phí</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Payment Info Card */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin thanh toán</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Mã giao dịch:</span>
              <span className="font-medium">{paymentInfo.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">MSSV:</span>
              <span className="font-medium">{paymentInfo.studentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Họ tên:</span>
              <span className="font-medium">{paymentInfo.studentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nội dung:</span>
              <span className="font-medium">{paymentInfo.description}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Số tiền:</span>
              <span className="text-primary-600">{formatCurrency(paymentInfo.amount)}</span>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="card mb-6">
          <div className="text-center">
            <div className="mb-4">
              <QrCode className="w-32 h-32 text-gray-800 mx-auto" />
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Mã QR thanh toán</p>
              <div className="bg-gray-100 p-3 rounded font-mono text-xs break-all">
                {paymentInfo.qrCode}
              </div>
            </div>

            {/* Payment Gateway Connection Status */}
            <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center justify-center space-x-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <div className="text-center">
                  <span className="text-sm font-bold text-green-800">
                    Cổng thanh toán: 🟢 Sẵn sàng (SSL/TLS mã hóa)
                  </span>
                </div>
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="mt-2 text-xs text-green-700 text-center">
                Kết nối an toàn • Endpoint: https://api.payment.hce-fms.edu.vn • Uptime: 99.9%
              </div>
            </div>

            {/* SSL/TLS Security Badge */}
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Mã hóa SSL/TLS 256-bit Secure
                </span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className={`mb-4 ${isExpired ? 'text-red-600' : ''}`}>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">
                  {isExpired ? 'Đã hết hạn' : `Thời gian còn lại: ${formatTime(timeLeft)}`}
                </span>
              </div>
              {!isExpired && (
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      timeLeft <= 60 ? 'bg-red-500' : 
                      timeLeft <= 300 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(timeLeft / 900) * 100}%` }}
                  />
                </div>
              )}
            </div>

            {isExpired && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800 font-medium">Mã QR đã hết hạn</span>
                </div>
                <p className="text-red-700 text-sm mt-1">
                  Vui lòng làm mới mã QR để tiếp tục thanh toán.
                </p>
              </div>
            )}

            {paymentStatus === 'processing' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                  <span className="text-blue-800 font-medium">Đang xử lý thanh toán...</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {isExpired ? (
                <button
                  onClick={handleRefreshQR}
                  className="btn-primary flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Làm mới mã QR
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSimulatePayment}
                    className="btn-primary flex items-center"
                    disabled={paymentStatus === 'processing'}
                  >
                    {paymentStatus === 'processing' ? 'Đang xử lý...' : 'Giả lập thanh toán'}
                  </button>
                  
                  <button
                    onClick={handleWebhookSimulation}
                    className="btn-secondary flex items-center"
                    disabled={webhookStatus === 'processing'}
                  >
                    <Webhook className="w-4 h-4 mr-2" />
                    {webhookStatus === 'processing' ? 'Đang nhận webhook...' : 'Giả lập Webhook'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Hướng dẫn thanh toán</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Mở ứng dụng ngân hàng trên điện thoại</li>
            <li>Chọn tính năng "Quét mã QR" hoặc "Scan QR"</li>
            <li>Đưa camera vào mã QR trên màn hình</li>
            <li>Kiểm tra thông tin thanh toán và xác nhận</li>
            <li>Chờ thông báo thanh toán thành công</li>
          </ol>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Lưu ý:</strong> Mã QR có hiệu lực trong 15 phút kể từ khi tạo. 
              Sau khi hết hạn, bạn cần tạo lại mã QR mới.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRPayment;
