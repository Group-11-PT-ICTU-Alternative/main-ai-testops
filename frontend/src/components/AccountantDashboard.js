import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  AlertTriangle,
  Calendar,
  RefreshCw,
  Download,
  Eye,
  BookOpen,
  HelpCircle,
  Filter,
  Shield,
  Target,
  Brain
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AccountantDashboard = ({ debugMode }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [showAIForecast, setShowAIForecast] = useState(false);
  const [managementFilter, setManagementFilter] = useState('all');
  const [showQuickGuide, setShowQuickGuide] = useState(false);
  const [reportFilter, setReportFilter] = useState('department');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');

  // Mock data for AI Revenue Forecast
  const revenueData = {
    labels: ['Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12', 'Tháng 1'],
    datasets: [
      {
        label: 'Doanh thu thực tế',
        data: [850000000, 920000000, 780000000, 1100000000, 1250000000, 950000000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Dự báo AI',
        data: [null, null, null, null, null, 1050000000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dự báo Doanh thu Học phí',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
    },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: 'Tổng doanh thu',
      value: 12500000000,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Số sinh viên đã nộp',
      value: 2847,
      change: '+8.2%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Giao dịch hôm nay',
      value: 156,
      change: '+24.7%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Đôí soát: Khớp 100%',
      value: 'Zero Tolerance',
      change: 'Zero Tolerance Policy',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Khả năng chịu tải',
      value: '5.000 CCU',
      change: 'High Capacity',
      icon: RefreshCw,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentTransactions = [
    {
      id: 'TXN001',
      studentId: '2021001234',
      studentName: 'Nguyễn Văn A',
      amount: 5000000,
      method: 'QR Code',
      status: 'Thành công',
      time: '14:30:25'
    },
    {
      id: 'TXN002',
      studentId: '2021005678',
      studentName: 'Trần Thị B',
      amount: 3000000,
      method: 'Chuyển khoản',
      status: 'Thành công',
      time: '14:28:15'
    },
    {
      id: 'TXN003',
      studentId: '2021009012',
      studentName: 'Lê Văn C',
      amount: 8000000,
      method: 'QR Code',
      status: 'Đang xử lý',
      time: '14:25:42'
    }
  ];

  const managementTasks = {
  quickWins: [
    {
      id: 'QW001',
      title: 'Cài dât auto-email nhac nô',
      priority: 'Must',
      difficulty: 'Low',
      estimatedTime: '2 hours',
      status: 'Ready',
      impact: 'Giâm 15% nô quá hân'
    },
    {
      id: 'QW002', 
      title: 'Tao báo cáo tuan auto',
      priority: 'Must',
      difficulty: 'Low',
      estimatedTime: '4 hours',
      status: 'Ready',
      impact: 'Tiêt kiêm 8h/tuan'
    },
    {
      id: 'QW003',
      title: 'Optimize dashboard load time',
      priority: 'Must',
      difficulty: 'Low',
      estimatedTime: '6 hours',
      status: 'Ready',
      impact: 'Tang 30% UX'
    }
  ],
  projectRisks: [
    {
      id: 'PR001',
      title: 'Migration database sang cloud',
      priority: 'Must',
      difficulty: 'High',
      stability: 'Low',
      estimatedTime: '3 weeks',
      status: 'Planning',
      risk: 'Data loss potential'
    },
    {
      id: 'PR002',
      title: 'Integrate payment gateway moi',
      priority: 'Must',
      difficulty: 'High',
      stability: 'Low',
      estimatedTime: '2 weeks',
      status: 'Planning',
      risk: 'Transaction failure'
    },
    {
      id: 'PR003',
      title: 'Upgrade security protocol',
      priority: 'Must',
      difficulty: 'High',
      stability: 'Low',
      estimatedTime: '1 week',
      status: 'Planning',
      risk: 'System downtime'
    }
  ]
};

const reconciliationLogs = [
    {
      id: 'WEB001',
      gateway: 'VNPAY',
      transactionCount: 1250,
      totalAmount: 6250000000,
      status: 'Thành công',
      processedAt: '2024-01-15 14:00:00'
    },
    {
      id: 'WEB002',
      gateway: 'MoMo',
      transactionCount: 890,
      totalAmount: 4450000000,
      status: 'Thành công',
      processedAt: '2024-01-15 13:30:00'
    }
  ];

  
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Dashboard Báo cáo
            </h1>
            <p className="text-gray-600">Tổng quan hệ thống quản lý tài chính</p>
          </div>
          
          {/* Quick Guide Button */}
          <button
            onClick={() => setShowQuickGuide(!showQuickGuide)}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Hướng dẫn nhanh</span>
          </button>
        </div>
        
        {/* Quick Guide Content */}
        {showQuickGuide && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <BookOpen className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">System Learning Curve: &lt; 2 Hours</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>1. Dashboard: Xem tổng quan và báo cáo</li>
                  <li>2. Quản lý khoản thu: Cài đặt các loại phí</li>
                  <li>3. Ma trận dấu vết: Theo dõi yêu cầu</li>
                  <li>4. Cài đặt nhắc nợ: Tự động thông báo</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Management Filter Bar */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Lọc Quản lý thông minh
              {debugMode && <span className="badge-traceability">[RMP]</span>}
            </h3>
            <p className="text-sm text-gray-600">Quản lý yêu cầu theo nguyên lý Chương VI</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setManagementFilter('quickWins')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                managementFilter === 'quickWins' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Quick Wins</span>
            </button>
            <button
              onClick={() => setManagementFilter('projectRisks')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                managementFilter === 'projectRisks' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Project Risks</span>
            </button>
            <button
              onClick={() => setManagementFilter('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                managementFilter === 'all' 
                  ? 'bg-gray-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">All Tasks</span>
            </button>
          </div>
        </div>
        
        {/* Management Filter Results */}
        {managementFilter === 'quickWins' && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-3">Quick Wins: [Priority: Must] & [Difficulty: Low]</h4>
            <div className="space-y-2">
              {managementTasks.quickWins.map(task => (
                <div key={task.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-blue-900">{task.title}</p>
                      <p className="text-sm text-blue-700 mt-1">{task.impact}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-800">{task.estimatedTime}</p>
                      <p className="text-xs text-blue-600">{task.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {managementFilter === 'projectRisks' && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-red-900 mb-3">Project Risks: [Priority: Must] & [Difficulty: High] & [Stability: Low]</h4>
            <div className="space-y-2">
              {managementTasks.projectRisks.map(task => (
                <div key={task.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-red-900">{task.title}</p>
                      <p className="text-sm text-red-700 mt-1">Risk: {task.risk}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-800">{task.estimatedTime}</p>
                      <p className="text-xs text-red-600">{task.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PDF Report Export Section [STRQ04/FEAT03] */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Công cụ Báo cáo Tự động
            </h2>
            <p className="text-sm text-gray-600">Xuất báo cáo theo Lớp/Khoa - Thay thế Excel thủ công</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bộ lọc</label>
            <select
              value={reportFilter}
              onChange={(e) => setReportFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="department">Lọc theo Khoa</option>
              <option value="class">Lọc theo Lớp</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {reportFilter === 'department' ? 'Khoa' : 'Lớp'}
            </label>
            <select
              value={reportFilter === 'department' ? selectedDepartment : selectedClass}
              onChange={(e) => reportFilter === 'department' ? setSelectedDepartment(e.target.value) : setSelectedClass(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">Tất cả</option>
              {reportFilter === 'department' ? (
                <>
                  <option value="cntt">Khoa Công nghệ Thông tin</option>
                  <option value="kt">Khoa Kế toán</option>
                  <option value="qtkd">Khoa Quản trị Kinh doanh</option>
                  <option value="nn">Khoa Ngoại ngữ</option>
                </>
              ) : (
                <>
                  <option value="dhcntt01">DH CNTT01</option>
                  <option value="dhcntt02">DH CNTT02</option>
                  <option value="dhkt01">DH KT01</option>
                  <option value="dhqtkd01">DH QTKD01</option>
                </>
              )}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                const filterType = reportFilter === 'department' ? 'Khoa' : 'Lớp';
                const filterValue = reportFilter === 'department' ? 
                  (selectedDepartment === 'all' ? 'Tất cả khoa' : selectedDepartment.toUpperCase()) :
                  (selectedClass === 'all' ? 'Tất cả lớp' : selectedClass.toUpperCase());
                alert(`Đang xuất báo cáo PDF...\n\nTiêu chí: ${filterType}\nGiá trị: ${filterValue}`);
              }}
              className="btn-primary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </button>
            <button className="btn-secondary flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Lên lịch báo cáo
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value}
                  </p>
                  <p className={`text-sm ${stat.color}`}>
                    {stat.change} so với tháng trước
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

      // AI Financial Forecasting & Risk Analysis Widget
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-2">
              Dự báo tài chính & Phân tích rủi ro AI
            </h2>
            <p className="text-blue-600">Công cụ hỗ trợ ra quyết định tài chính thông minh</p>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-blue-300 rounded-lg px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="3months">3 tháng</option>
            <option value="6months">6 tháng</option>
            <option value="1year">1 năm</option>
          </select>
        </div>

        {/* AI Revenue Forecast Chart */}
        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-900">So sánh doanh thu thực tế và dự báo AI</h3>
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <Brain className="w-4 h-4" />
              <span>AI Model v2.1</span>
            </div>
          </div>
          
          <div className="h-80">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>

        {/* Financial Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100 text-sm font-medium">Tổng công nợ hiện tại</span>
              <TrendingUp className="w-5 h-5 text-blue-200" />
            </div>
            <div className="text-2xl font-bold mb-1">1.2 tỷ VNĐ</div>
            <div className="text-blue-100 text-xs">
              <span className="text-red-200">+8.5%</span> so với tháng trước
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-100 text-sm font-medium">Tỷ lệ hoàn phí thành công</span>
              <Target className="w-5 h-5 text-green-200" />
            </div>
            <div className="text-2xl font-bold mb-1">94.8%</div>
            <div className="text-green-100 text-xs">
              Mục tiêu tự động hóa 95%
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-100 text-sm font-medium">AI Accuracy</span>
              <Brain className="w-5 h-5 text-purple-200" />
            </div>
            <div className="text-2xl font-bold mb-1">87.3%</div>
            <div className="text-purple-100 text-xs">
              Ðô tin cãy dù báo 6 tháng
            </div>
          </div>
        </div>

        {/* AI Risk Warning - Top 5 High Risk Students */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-800">Cảnh báo rủi ro AI</h3>
                <p className="text-red-600 text-sm">Top 5 sinh viên có nguy cơ nợ quá hạn</p>
              </div>
            </div>
            <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full">
              AI Risk Scoring
            </span>
          </div>
          
          <div className="space-y-3">
            {[
              { id: '2021001234', name: 'Nguyễn Văn A', risk: '92%', amount: '5.2M VND', reason: 'Trì hoãn thanh toán 3 tháng liên tiếp' },
              { id: '2021005678', name: 'Trần Thị B', risk: '87%', amount: '3.8M VND', reason: 'Công nợ lâu, không có lịch sử thanh toán' },
              { id: '2021009012', name: 'Lê Vân C', risk: '78%', amount: '4.1M VND', reason: 'Giao dịch không thành công liên tiếp' },
              { id: '2021013456', name: 'Phan Van D', risk: '71%', amount: '2.9M VND', reason: 'Hoàn thu 2 môn, công nợ tăng' },
              { id: '2021017890', name: 'Hoàng Thi E', risk: '65%', amount: '6.5M VND', reason: 'Dấu hiệu giao dịch bất thường' }
            ].map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-red-500' : 
                    index === 1 ? 'bg-orange-500' : 
                    index === 2 ? 'bg-yellow-500' : 
                    index === 3 ? 'bg-amber-500' : 'bg-lime-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.id}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      parseInt(student.risk) >= 90 ? 'bg-red-100 text-red-800' :
                      parseInt(student.risk) >= 80 ? 'bg-orange-100 text-orange-800' :
                      parseInt(student.risk) >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      Risk: {student.risk}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{student.amount}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{student.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Giao dịch gần đây</h2>
            <button className="text-primary-600 hover:text-primary-700">
              <Eye className="w-4 h-4" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-xs font-medium text-gray-700">Mã GD</th>
                  <th className="text-left py-2 text-xs font-medium text-gray-700">Sinh viên</th>
                  <th className="text-left py-2 text-xs font-medium text-gray-700">Số tiền</th>
                  <th className="text-left py-2 text-xs font-medium text-gray-700">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-2 text-xs">{transaction.id}</td>
                    <td className="py-2 text-xs">
                      <div>
                        <p className="font-medium">{transaction.studentName}</p>
                        <p className="text-gray-500">{transaction.studentId}</p>
                      </div>
                    </td>
                    <td className="py-2 text-xs font-medium">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="py-2 text-xs">
                      <span className={`px-2 py-1 rounded text-xs ${
                        transaction.status === 'Thành công' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reconciliation Logs */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Đối soát Webhook</h2>
              <p className="text-sm text-green-600 font-medium">
                Hệ thống đối soát: Khớp 100% (Zero Tolerance)
              </p>
            </div>
            <button className="text-primary-600 hover:text-primary-700">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {reconciliationLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">{log.gateway}</p>
                    <p className="text-xs text-gray-500">{log.processedAt}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    {log.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-600">Số giao dịch:</p>
                    <p className="font-medium">{log.transactionCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tổng tiền:</p>
                    <p className="font-medium">{formatCurrency(log.totalAmount)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center space-x-3">
        <button className="btn-primary flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Tải báo cáo
        </button>
        <button className="btn-secondary flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Lên lịch báo cáo
        </button>
      </div>
    </div>
  );
};

export default AccountantDashboard;
