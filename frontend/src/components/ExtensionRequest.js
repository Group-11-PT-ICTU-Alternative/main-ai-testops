import React, { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw, Send, Save, AlertCircle, CheckCircle } from 'lucide-react';

const ExtensionRequest = ({ debugMode }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    email: '',
    phone: '',
    currentSemester: '',
    reason: '',
    extensionPeriod: '1 tháng',
    supportingDocuments: '',
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [savedData, setSavedData] = useState(null);

  // Auto-save form data to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('extensionRequestDraft');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSavedData(parsed);
      setFormData(parsed);
    }
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem('extensionRequestDraft', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNetworkError = () => {
    // Simulate network error - but DON'T clear form data
    setNetworkError(true);
    setIsSubmitting(false);
    
    // After 3 seconds, hide error
    setTimeout(() => {
      setNetworkError(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNetworkError(false);
    setSubmitSuccess(false);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setSubmitSuccess(true);
      setIsSubmitting(false);
      
      // Clear form after successful submission
      setTimeout(() => {
        setFormData({
          studentId: '',
          studentName: '',
          email: '',
          phone: '',
          currentSemester: '',
          reason: '',
          extensionPeriod: '1 tháng',
          supportingDocuments: '',
          additionalNotes: ''
        });
        localStorage.removeItem('extensionRequestDraft');
        setSavedData(null);
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      handleNetworkError();
    }
  };

  const restoreFromSaved = () => {
    if (savedData) {
      setFormData(savedData);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Yêu cầu Gia hạn Học phí
        </h1>
        <p className="text-gray-600">Điền thông tin để yêu cầu gia hạn thời hạn thanh toán học phí</p>
      </div>

      {/* Network Error Alert */}
      {networkError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800">LỖI MẠNG</h3>
              <p className="text-red-700 text-sm mt-1">
                Không thể kết nối đến máy chủ. Dữ liệu của bạn đã được lưu tự động và sẽ không bị mất.
                Vui lòng thử lại sau.
              </p>
              <div className="mt-2 p-2 bg-red-100 rounded text-xs text-red-800">
                <strong>Zero Tolerance:</strong> Dữ liệu người dùng đã nhập được bảo toàn, không bị xóa trắng khi xảy ra lỗi kết nối.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-800">✅ GỬI THÀNH CÔNG</h3>
              <p className="text-green-700 text-sm mt-1">
                Yêu cầu gia hạn đã được gửi thành công. Chúng tôi sẽ phản hồi trong 24 giờ.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Data Recovery Notice */}
      {savedData && !submitSuccess && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-800">📝 Dữ liệu đã tự động lưu</h3>
              <p className="text-blue-700 text-sm mt-1">
                Chúng tôi đã tìm thấy bản nháp yêu cầu của bạn. Bạn có thể khôi phục hoặc tiếp tục chỉnh sửa.
              </p>
              <button
                onClick={restoreFromSaved}
                className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Khôi phục bản nháp
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã sinh viên *
                {debugMode && <span className="ml-1 text-xs text-orange-600">[REQ01]</span>}
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
                placeholder="VD: 2024001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên *
                {debugMode && <span className="ml-1 text-xs text-orange-600">[REQ02]</span>}
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
                {debugMode && <span className="ml-1 text-xs text-orange-600">[REQ03]</span>}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
                placeholder="student@hce.edu.vn"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại *
                {debugMode && <span className="ml-1 text-xs text-orange-600">[REQ04]</span>}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
                placeholder="09xxxxxxxx"
              />
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Học kỳ hiện tại *
              {debugMode && <span className="ml-1 text-xs text-orange-600">[REQ05]</span>}
            </label>
            <select
              name="currentSemester"
              value={formData.currentSemester}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
            >
              <option value="">Chọn học kỳ</option>
              <option value="2024.1">Học kỳ 1 - 2024</option>
              <option value="2024.2">Học kỳ 2 - 2024</option>
              <option value="2024.3">Học kỳ hè - 2024</option>
            </select>
          </div>

          {/* Extension Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thời gian gia hạn mong muốn *
              {debugMode && <span className="ml-1 text-xs text-orange-600">[REQ06]</span>}
            </label>
            <select
              name="extensionPeriod"
              value={formData.extensionPeriod}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
            >
              <option value="1 tuần">1 tuần</option>
              <option value="2 tuần">2 tuần</option>
              <option value="1 tháng">1 tháng</option>
              <option value="2 tháng">2 tháng</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lý do gia hạn *
              {debugMode && <span className="ml-1 text-xs text-orange-600">[REQ07]</span>}
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
              placeholder="Vui lòng mô tả lý do bạn cần gia hạn thời hạn thanh toán..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tài liệu đính kèm (nếu có)
              {debugMode && <span className="ml-1 text-xs text-orange-600">[REQ08]</span>}
            </label>
            <textarea
              name="supportingDocuments"
              value={formData.supportingDocuments}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
              placeholder="Liệt kê các tài liệu bạn có thể cung cấp (giấy xác nhận, văn bản, etc.)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghi chú bổ sung
              {debugMode && <span className="ml-1 text-xs text-orange-600">[REQ09]</span>}
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
              placeholder="Bất kỳ thông tin nào khác bạn muốn chia sẻ..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-hce-blue text-white rounded-lg hover:bg-hce-blue-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Gửi yêu cầu
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleNetworkError}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Giả lập lỗi mạng
            </button>

            <button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Lưu nháp
            </button>
          </div>
        </form>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Hướng dẫn</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Các trường có dấu (*) là bắt buộc</li>
          <li>• Dữ liệu của bạn được tự động lưu mỗi khi bạn nhập</li>
          <li>• Trong trường hợp lỗi mạng, dữ liệu sẽ không bị mất (Zero Tolerance)</li>
          <li>• Yêu cầu sẽ được xử lý trong vòng 24 giờ</li>
          <li>• Bạn sẽ nhận được phản hồi qua email và SMS</li>
        </ul>
      </div>
    </div>
  );
};

export default ExtensionRequest;
