import React, { useState, useEffect } from 'react';
import { Bell, Mail, MessageSquare, Save, Settings, Users, Calendar, Clock, AlertTriangle } from 'lucide-react';

const ReminderSettings = ({ debugMode }) => {
  const [settings, setSettings] = useState({
    enabled: true,
    reminderFrequency: 'weekly',
    daysBeforeDue: 3,
    smsEnabled: true,
    emailEnabled: true,
    customMessage: '',
    sendTime: '09:00',
    includeOverdue: true,
    includeUpcoming: true,
    batchSize: 100,
    retryAttempts: 3
  });

  const [testResults, setTestResults] = useState([]);
  const [isTesting, setIsTesting] = useState(false);

  const reminderTemplates = [
    {
      id: 'overdue',
      name: 'Nhắc nợ quá hạn',
      template: 'THÔNG BÁO QUÁ HẠN: Quý phụ huynh/sinh viên {studentName} có công nợ học phí {amount} đã quá hạn {days} ngày. Vui lòng thanh toán ngay để tránh bị ảnh hưởng đến việc học.',
      type: 'urgent'
    },
    {
      id: 'upcoming',
      name: 'Nhắc nợ sắp đến hạn',
      template: 'NHẮC NỢ: Học phí {amount} của sinh viên {studentName} sẽ đến hạn vào {dueDate}. Vui lòng thanh toán trước hạn.',
      type: 'normal'
    },
    {
      id: 'warning',
      name: 'Cảnh báo cuối kỳ',
      template: 'CẢNH BÁO: Chỉ còn {days} ngày để thanh toán học phí {amount} của sinh viên {studentName}. Hạn chót: {finalDueDate}.',
      type: 'warning'
    }
  ];

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('reminderSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('reminderSettings', JSON.stringify(newSettings));
  };

  const testReminder = async (templateId) => {
    setIsTesting(true);
    setTestResults([]);

    try {
      // Simulate API calls for SMS and Email
      const template = reminderTemplates.find(t => t.id === templateId);
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      const results = [
        {
          channel: 'SMS',
          status: 'success',
          recipient: '09xxxxxxxx',
          message: template.template.replace('{studentName}', 'Nguyễn Văn A').replace('{amount}', '5.000.000 ₫'),
          sentAt: new Date().toLocaleString('vi-VN')
        },
        {
          channel: 'Email',
          status: 'success',
          recipient: 'student@hce.edu.vn',
          message: template.template.replace('{studentName}', 'Nguyễn Văn A').replace('{amount}', '5.000.000 ₫'),
          sentAt: new Date().toLocaleString('vi-VN')
        }
      ];

      setTestResults(results);
    } catch (error) {
      setTestResults([
        {
          channel: 'Error',
          status: 'failed',
          message: 'Không thể gửi tin nhắn thử nghiệm',
          sentAt: new Date().toLocaleString('vi-VN')
        }
      ]);
    } finally {
      setIsTesting(false);
    }
  };

  const saveSettings = () => {
    localStorage.setItem('reminderSettings', JSON.stringify(settings));
    alert('Cài đặt đã được lưu thành công!');
  };

  const getFrequencyText = (frequency) => {
    switch (frequency) {
      case 'daily': return 'Hàng ngày';
      case 'weekly': return 'Hàng tuần';
      case 'monthly': return 'Hàng tháng';
      default: return frequency;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Cài đặt Nhắc nợ Tự động
        </h1>
        <p className="text-gray-600">Thiết lập hệ thống gửi thông báo nhắc nợ qua SMS và Email</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Cài đặt cơ bản
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Bật nhắc nợ tự động</label>
                <button
                  onClick={() => handleSettingChange('enabled', !settings.enabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enabled ? 'bg-hce-blue' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tần suất gửi
                </label>
                <select
                  value={settings.reminderFrequency}
                  onChange={(e) => handleSettingChange('reminderFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
                  disabled={!settings.enabled}
                >
                  <option value="daily">Hàng ngày</option>
                  <option value="weekly">Hàng tuần</option>
                  <option value="monthly">Hàng tháng</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gửi trước hạn (ngày)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.daysBeforeDue}
                  onChange={(e) => handleSettingChange('daysBeforeDue', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
                  disabled={!settings.enabled}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ gửi
                </label>
                <input
                  type="time"
                  value={settings.sendTime}
                  onChange={(e) => handleSettingChange('sendTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
                  disabled={!settings.enabled}
                />
              </div>
            </div>
          </div>

          {/* Channel Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Kênh gửi
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <div>
                    <label className="text-sm font-medium text-gray-700">SMS</label>
                    <p className="text-xs text-gray-500">Gửi tin nhắn đến số điện thoại</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('smsEnabled', !settings.smsEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.smsEnabled ? 'bg-hce-blue' : 'bg-gray-200'
                  }`}
                  disabled={!settings.enabled}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.smsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-xs text-gray-500">Gửi email đến sinh viên</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('emailEnabled', !settings.emailEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailEnabled ? 'bg-hce-blue' : 'bg-gray-200'
                  }`}
                  disabled={!settings.enabled}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Message Templates */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Mẫu tin nhắn
            </h2>

            <div className="space-y-4">
              {reminderTemplates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{template.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      template.type === 'urgent' ? 'bg-red-100 text-red-800' :
                      template.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {template.type === 'urgent' ? 'Khẩn cấp' :
                       template.type === 'warning' ? 'Cảnh báo' : 'Bình thường'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.template}</p>
                  <button
                    onClick={() => testReminder(template.id)}
                    disabled={isTesting || !settings.enabled}
                    className="px-3 py-1 bg-hce-blue text-white text-sm rounded hover:bg-hce-blue-dark disabled:opacity-50"
                  >
                    {isTesting ? 'Đang thử nghiệm...' : 'Thử nghiệm'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Thống kê
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Trạng thái</span>
                <span className={`px-2 py-1 text-xs rounded ${
                  settings.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {settings.enabled ? 'Đang bật' : 'Đang tắt'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tần suất</span>
                <span className="text-sm font-medium">{getFrequencyText(settings.reminderFrequency)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Kênh hoạt động</span>
                <div className="flex gap-2">
                  {settings.smsEnabled && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">SMS</span>
                  )}
                  {settings.emailEnabled && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Email</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Số lần thử lại</span>
                <span className="text-sm font-medium">{settings.retryAttempts} lần</span>
              </div>
            </div>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Kết quả thử nghiệm
              </h2>

              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{result.channel}</span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        result.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {result.status === 'success' ? 'Thành công' : 'Thất bại'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div><strong>Người nhận:</strong> {result.recipient}</div>
                      <div><strong>Thời gian:</strong> {result.sentAt}</div>
                      <div><strong>Nội dung:</strong> {result.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={saveSettings}
            className="w-full px-4 py-3 bg-hce-blue text-white rounded-lg hover:bg-hce-blue-dark flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Lưu cài đặt
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Lưu ý quan trọng</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Hệ thống sẽ tự động quét sinh viên có công nợ theo lịch đã cài đặt</li>
              <li>• Tin nhắn được cá nhân hóa theo từng sinh viên</li>
              <li>• Chi phí SMS/Email sẽ được tính theo số lượng thực tế gửi</li>
              <li>• Lịch sử sử dụng được lưu lại để báo cáo và kiểm tra</li>
              <li>• Có thể bật/tắt từng kênh gửi riêng biệt</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderSettings;
