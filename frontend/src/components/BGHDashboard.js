import React, { useState } from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Users, 
  Activity,
  Shield,
  Eye,
  Target,
  BarChart3,
  Zap
} from 'lucide-react';

const BGHDashboard = ({ debugMode }) => {
  const [aiRiskScore, setAiRiskScore] = useState(5);
  const [showAIDetails, setShowAIDetails] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const executiveStats = [
    {
      title: 'Tổng tài sản',
      value: 125000000000,
      change: '+18.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Tổng sinh viên',
      value: 15420,
      change: '+12.3%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Tỷ lệ thu hồi',
      value: '94.2%',
      change: '+2.8%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Chỉ số AI',
      value: '87.5',
      change: '+5.2%',
      icon: Brain,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const aiRiskFactors = [
    { factor: 'Tỷ lệ nợ tăng', impact: 'High', trend: 'up' },
    { factor: 'Thanh toán chậm', impact: 'Medium', trend: 'stable' },
    { factor: 'Đăng ký giảm', impact: 'Low', trend: 'down' },
    { factor: 'Chi phí hoạt động', impact: 'Medium', trend: 'up' }
  ];

  const getRiskColor = (score) => {
    if (score <= 3) return 'bg-green-500';
    if (score <= 7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRiskTextColor = (score) => {
    if (score <= 3) return 'text-green-800';
    if (score <= 7) return 'text-yellow-800';
    return 'text-red-800';
  };

  const getRiskBgColor = (score) => {
    if (score <= 3) return 'bg-green-50';
    if (score <= 7) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  const getRiskLabel = (score) => {
    if (score <= 3) return 'Thấp';
    if (score <= 7) return 'Trung bình';
    return 'Cao';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Dashboard Ban Giám hiệu
              {debugMode && <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">[BGH]</span>}
            </h1>
            <p className="text-gray-600">Tổng quan chiến lược và dự báo AI</p>
          </div>
        </div>
      </div>

      {/* AI Risk Prediction Card - KILLER FEATURE */}
      <div className={`card mb-6 border-2 ${aiRiskScore > 7 ? 'border-red-300' : aiRiskScore > 3 ? 'border-yellow-300' : 'border-green-300'} ${getRiskBgColor(aiRiskScore)}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Dự báo Rủi ro Tài chính AI
                {debugMode && <span className="badge-traceability">FEAT07</span>}
              </h2>
              <p className="text-sm text-gray-600">Killer Feature - Tích hợp AI tiên tiến</p>
            </div>
          </div>
          <button
            onClick={() => setShowAIDetails(!showAIDetails)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm">Chi tiết</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Risk Score Display */}
          <div className="text-center">
            <div className="mb-4">
              <div className="text-4xl font-bold mb-2">
                <span className={getRiskTextColor(aiRiskScore)}>
                  AI Scoring: {aiRiskScore}% nguy cơ nợ xấu tiềm năng
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskBgColor(aiRiskScore)} ${getRiskTextColor(aiRiskScore)}`}>
                  Mức rủi ro: {getRiskLabel(aiRiskScore)}
                </span>
                {debugMode && <span className="badge-traceability">FEAT07</span>}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full transition-all duration-500 ${getRiskColor(aiRiskScore)}`}
                style={{ width: `${aiRiskScore}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-600">
              <span>0% (An toàn)</span>
              <span>50% (Cảnh báo)</span>
              <span>100% (Nguy hiểm)</span>
            </div>
          </div>

          {/* AI Risk Factors */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Các yếu tố rủi ro AI phân tích:</h3>
            <div className="space-y-2">
              {aiRiskFactors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-700">{factor.factor}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      factor.impact === 'High' ? 'bg-red-100 text-red-800' :
                      factor.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {factor.impact}
                    </span>
                    {factor.trend === 'up' && <TrendingUp className="w-3 h-3 text-red-500" />}
                    {factor.trend === 'down' && <TrendingUp className="w-3 h-3 text-green-500 rotate-180" />}
                    {factor.trend === 'stable' && <Activity className="w-3 h-3 text-yellow-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Details Section */}
        {showAIDetails && (
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Chi tiết phân tích AI:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700">Mô hình sử dụng:</p>
                <p className="text-gray-600">Deep Learning LSTM + Random Forest</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Độ chính xác:</p>
                <p className="text-gray-600">94.2% (cross-validation)</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Dữ liệu training:</p>
                <p className="text-gray-600">5 năm lịch sử tài chính</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Cập nhật cuối:</p>
                <p className="text-gray-600">15 phút trước</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Khuyến nghị AI:</strong> Cần tăng cường kiểm soát tín dụng và đẩy mạnh chiến dịch thu hồi nợ trong 30 ngày tới.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Executive Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {executiveStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {typeof stat.value === 'number' && stat.value > 1000000 ? formatCurrency(stat.value) : stat.value}
                  </p>
                  <p className={`text-sm ${stat.color}`}>
                    {stat.change} so với quý trước
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strategic Initiatives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
            <Zap className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Dự báo tăng trưởng</p>
              <p className="text-xs text-blue-700">AI dự phóng tăng 15% doanh thu Q2/2024</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-900">Cơ hội thị trường</p>
              <p className="text-xs text-green-700">Phân tích AI phát hiện 3 khu vực tiềm năng</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
              <p className="text-sm font-medium text-purple-900">Tối ưu hóa</p>
              <p className="text-xs text-purple-700">AI gợi ý giảm 8% chi phí vận hành</p>
            </div>
          </div>
        </div>

        {/* Risk Matrix */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ma trận Rủi ro</h2>
            <Shield className="w-5 h-5 text-red-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-900">Rủi ro cao</span>
              </div>
              <span className="text-sm text-red-700">3 yếu tố</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-900">Rủi ro trung bình</span>
              </div>
              <span className="text-sm text-yellow-700">5 yếu tố</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-900">Rủi ro thấp</span>
              </div>
              <span className="text-sm text-green-700">8 yếu tố</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center space-x-3">
        <button className="btn-primary flex items-center">
          <Brain className="w-4 h-4 mr-2" />
          Tải báo cáo AI
        </button>
        <button className="btn-secondary flex items-center">
          <Target className="w-4 h-4 mr-2" />
          Kế hoạch hành động
        </button>
      </div>
    </div>
  );
};

export default BGHDashboard;
