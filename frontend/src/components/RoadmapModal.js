import React from 'react';
import { X, AlertTriangle, Calendar } from 'lucide-react';

const RoadmapModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-2 max-h-[50vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-3 h-3 text-yellow-600" />
            </div>
            <h3 className="text-xs font-bold text-gray-900">Thông tin lộ trình phát triển</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-2">
          <div className="flex items-start space-x-1.5">
            <Calendar className="w-3 h-3 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-0.5 text-[10px]">Phase v1.1</h4>
              <p className="text-yellow-700 text-[9px]">
                🚧 Tính năng đang trong lộ trình phát triển cho Phase v1.1. 
                Hiện tại hệ thống đang tập trung cho MVP v1.0.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="bg-gray-50 rounded p-2">
            <h5 className="font-medium text-gray-900 mb-1 text-[10px]">Tính năng dự kiến v1.1:</h5>
            <ul className="text-[9px] text-gray-600 space-y-0.5">
              <li>• Hỗ trợ tài chính / Vay vốn sinh viên</li>
              <li>• Tích hợp cổng thanh toán đa dạng</li>
              <li>• Báo cáo phân tích chi tiết</li>
              <li>• Ứng dụng di động</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded p-2">
            <h5 className="font-medium text-blue-900 mb-1 text-[10px]">MVP v1.0 (Hiện tại):</h5>
            <ul className="text-[9px] text-blue-700 space-y-0.5">
              <li>**Student Role:**</li>
              <li>  - Thanh toán học phí qua QR Code</li>
              <li>  - Tra cứu công nợ</li>
              <li>  - Lịch sử giao dịch</li>
              <li>  - Dashboard sinh viên</li>
              <li>**Accountant Role:**</li>
              <li>  - Dashboard báo cáo</li>
              <li>  - Quản lý khoản thu</li>
              <li>  - Xuất báo cáo PDF theo khoa/lớp</li>
              <li>  - Learning Curve &lt; 2 giờ</li>
              <li>**CTSV Role:**</li>
              <li>  - Dashboard CTSV</li>
              <li>  - Hỗ trợ sinh viên</li>
              <li>**BGH Role:**</li>
              <li>  - Dashboard Ban giám hiệu</li>
              <li>  - AI Risk Prediction</li>
              <li>  - AI Scoring & Phân tích rủi ro</li>
              <li>**AI Integration:**</li>
              <li>  - AI dự báo rủi ro tài chính</li>
              <li>  - AI Scoring model</li>
              <li>  - Phân tích xu hướng</li>
              <li>**Security:**</li>
              <li>  - SSL/TLS mã hóa</li>
              <li>  - Payment Gateway status</li>
              <li>  - Webhook integration</li>
            </ul>
          </div>
        </div>

        <div className="mt-2 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary px-3 py-1 text-xs"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapModal;
