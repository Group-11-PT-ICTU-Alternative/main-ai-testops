import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

const TraceabilityMatrix = ({ debugMode }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState(true);

  const traceabilityData = [
    {
      id: 1,
      strq: 'STRQ01 - Yêu cầu tra cứu công nợ',
      feat: 'FEAT01 - Quản lý công nợ',
      uc: 'UC02 - Tra cứu công nợ',
      supl: 'SUPL01 - Student Access',
      tc: ['TC01 - Hiển thị chi tiết nợ', 'TC02 - Lọc theo kỳ học'],
      description: 'Sinh viên có thể xem chi tiết các khoản nợ học phí',
      status: 'completed',
      testCoverage: '95%',
      role: 'Student'
    },
    {
      id: 2,
      strq: 'STRQ02 - Yêu cầu thanh toán online',
      feat: 'FEAT02 - Thanh toán QR Code',
      uc: 'UC05 - Thanh toán online',
      supl: 'SUPL08 - Payment Security',
      tc: ['TC03 - Tạo mã QR', 'TC04 - Hết hạn 15 phút', 'TC05 - Xác nhận thanh toán'],
      description: 'Sinh viên thanh toán học phí qua mã QR',
      status: 'completed',
      testCoverage: '100%',
      role: 'Student'
    },
    {
      id: 3,
      strq: 'STRQ03 - Yêu cầu webhook ngân hàng',
      feat: 'FEAT03 - Tích hợp thanh toán',
      uc: 'UC05 - Thanh toán online',
      supl: 'SUPL08 - Payment Security',
      tc: ['TC06 - Nhận webhook', 'TC07 - Cập nhật trạng thái'],
      description: 'Hệ thống nhận xác nhận từ ngân hàng',
      status: 'completed',
      testCoverage: '88%',
      role: 'Accountant'
    },
    {
      id: 4,
      strq: 'STRQ04 - Yêu cầu báo cáo PDF',
      feat: 'FEAT03 - Xuất báo cáo tự động',
      uc: 'UC03 - Quản lý báo cáo',
      supl: 'SUPL02 - Learning Curve',
      tc: ['TC13 - Lọc theo khoa', 'TC14 - Lọc theo lớp', 'TC15 - Xuất PDF'],
      description: 'Kế toán xuất báo cáo theo khoa/lớp',
      status: 'completed',
      testCoverage: '90%',
      role: 'Accountant'
    },
    {
      id: 5,
      strq: 'STRQ05 - Yêu cầu AI dự báo',
      feat: 'FEAT07 - AI Risk Prediction',
      uc: 'UC09 - AI Analytics',
      supl: 'SUPL07 - AI Integration',
      tc: ['TC16 - AI Scoring', 'TC17 - Risk Analysis', 'TC18 - Prediction Model'],
      description: 'AI dự báo rủi ro tài chính cho BGH',
      status: 'completed',
      testCoverage: '85%',
      role: 'BGH'
    },
    {
      id: 6,
      strq: 'SUPL02 - Learning Curve',
      feat: 'FEAT06 - Usability',
      uc: 'UC01 - User Training',
      supl: 'SUPL02 - Learning Curve',
      tc: ['TC19 - Quick Guide', 'TC20 - System Help'],
      description: 'Thời gian học < 2 giờ cho kế toán',
      status: 'completed',
      testCoverage: '95%',
      role: 'Accountant'
    },
    {
      id: 7,
      strq: 'SUPL08 - Payment Gateway',
      feat: 'FEAT02 - Security',
      uc: 'UC05 - Thanh toán online',
      supl: 'SUPL08 - Payment Security',
      tc: ['TC21 - SSL/TLS', 'TC22 - Gateway Status'],
      description: 'Trạng thái kết nối cổng thanh toán',
      status: 'completed',
      testCoverage: '100%',
      role: 'Student'
    },
    {
      id: 8,
      strq: 'SUPL10 - CTSV Support',
      feat: 'FEAT05 - Student Support',
      uc: 'UC06 - Hỗ trợ sinh viên',
      supl: 'SUPL10 - CTSV Support',
      tc: ['TC23 - Dashboard CTSV', 'TC24 - Student Management'],
      description: 'Chuyên viên CTSV quản lý sinh viên',
      status: 'completed',
      testCoverage: '80%',
      role: 'CTSV'
    }
  ];

  const toggleRow = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredData = traceabilityData.filter(item => 
    item.strq.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.feat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.uc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCoverageColor = (coverage) => {
    const num = parseInt(coverage);
    if (num >= 90) return 'text-green-600';
    if (num >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Ma trận Dấu vết (Traceability Matrix)
        </h1>
        <p className="text-gray-600">Theo dõi mapping từ yêu cầu stakeholder đến test case</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm yêu cầu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hce-blue focus:border-transparent"
          />
        </div>
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showDetails ? 'Ẩn chi tiết' : 'Hiện chi tiết'}
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng yêu cầu</p>
              <p className="text-2xl font-bold text-gray-900">{traceabilityData.length}</p>
            </div>
            <div className="w-12 h-12 bg-hce-blue rounded-lg flex items-center justify-center">
              <Filter className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã hoàn thành</p>
              <p className="text-2xl font-bold text-green-600">
                {traceabilityData.filter(item => item.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Filter className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang triển khai</p>
              <p className="text-2xl font-bold text-yellow-600">
                {traceabilityData.filter(item => item.status === 'in-progress').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Filter className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Test Coverage</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(traceabilityData.reduce((acc, item) => acc + parseInt(item.testCoverage), 0) / traceabilityData.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Filter className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Traceability Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stakeholder Request</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplementary Requirements</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Use Case</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Cases</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      #{item.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{item.strq}</div>
                        {showDetails && (
                          <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.feat}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.uc}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.supl || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="space-y-1">
                        {item.tc.map((testCase, index) => (
                          <div key={index} className="text-xs">
                            {testCase}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`font-semibold ${getCoverageColor(item.testCoverage)}`}>
                        {item.testCoverage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                        {item.status === 'completed' ? 'Hoàn thành' : 
                         item.status === 'in-progress' ? 'Đang triển khai' : 'Lên kế hoạch'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => toggleRow(item.id)}
                        className="text-hce-blue hover:text-hce-blue-dark flex items-center gap-1"
                      >
                        {expandedRows[item.id] ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                  
                  {expandedRows[item.id] && (
                    <tr className="bg-gray-50">
                      <td colSpan="8" className="px-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Thông tin chi tiết</h4>
                            <div className="space-y-2 text-sm">
                              <div><strong>Mô tả:</strong> {item.description}</div>
                              <div><strong>Test Coverage:</strong> {item.testCoverage}</div>
                              <div><strong>Trạng thái:</strong> 
                                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                                  {item.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Test Cases</h4>
                            <div className="space-y-1">
                              {item.tc.map((testCase, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  {testCase}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Button */}
      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 bg-hce-blue text-white rounded-lg hover:bg-hce-blue-dark flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Xuất báo cáo traceability
        </button>
      </div>
    </div>
  );
};

export default TraceabilityMatrix;
