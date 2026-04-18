import React, { useState } from 'react';
import { Settings, Plus, Edit, Trash2, Search, Filter } from 'lucide-react';

const FeeManagement = ({ debugMode }) => {
  const [feeItems] = useState([
    {
      id: 'HP001',
      name: 'Học phí chính quy',
      unitPrice: 12000000,
      description: 'Học phí chính quy cho 1 học kỳ',
      category: 'Học phí',
      status: 'Active'
    },
    {
      id: 'BHYT001',
      name: 'Bảo hiểm y tế',
      unitPrice: 800000,
      description: 'Phí bảo hiểm y tế năm học',
      category: 'Phí bắt buộc',
      status: 'Active'
    },
    {
      id: 'TL001',
      name: 'Lệ phí thi lại',
      unitPrice: 200000,
      description: 'Phí thi lại cho môn học',
      category: 'Phí thi',
      status: 'Active'
    },
    {
      id: 'KTX001',
      name: 'Tiền ký túc xá',
      unitPrice: 1500000,
      description: 'Phí ở trú ký túc xá 1 tháng',
      category: 'Phí ở trú',
      status: 'Active'
    },
    {
      id: 'HLM001',
      name: 'Phí học liệu',
      unitPrice: 300000,
      description: 'Phí tài liệu, sách giáo khoa',
      category: 'Học phí',
      status: 'Active'
    },
    {
      id: 'DV001',
      name: 'Phí dịch vụ sinh viên',
      unitPrice: 500000,
      description: 'Phí dịch vụ tài chính, thể thao',
      category: 'Phí dịch vụ',
      status: 'Active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tâyt câ');

  const categories = ['Tất cả', 'Học phí', 'Phí bắt buộc', 'Phí thi', 'Phí ở trú', 'Phí dịch vụ'];

  const filteredItems = feeItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tâyt câ' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Hoc phi': return 'bg-blue-100 text-blue-800';
      case 'Phi bat buoc': return 'bg-green-100 text-green-800';
      case 'Phi thi': return 'bg-yellow-100 text-yellow-800';
      case 'Phi ô trú': return 'bg-purple-100 text-purple-800';
      case 'Phi dich vu': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-teal-900 mb-2">
        Quản lý khoản thu
      </h1>
      <p className="text-teal-600">Quản lý danh mục các loại phí và khoản thu</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng số khoản thu</p>
              <p className="text-xl font-bold text-teal-900">{feeItems.length}</p>
              <p className="text-sm text-green-600">Hoạt động</p>
            </div>
            <Settings className="w-8 h-8 text-teal-500" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gia trung bình</p>
              <p className="text-xl font-bold text-teal-900">
                {formatVND(feeItems.reduce((sum, item) => sum + item.unitPrice, 0) / feeItems.length)}
              </p>
              <p className="text-sm text-blue-600">Moi khoan</p>
            </div>
            <Filter className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng giá trị</p>
              <p className="text-xl font-bold text-teal-900">
                {formatVND(feeItems.reduce((sum, item) => sum + item.unitPrice, 0))}
              </p>
              <p className="text-sm text-purple-600">Tat ca khoan</p>
            </div>
            <Plus className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-teal-900">
            Danh sach khoan thu
          </h2>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Thêm khoan thu moi
          </button>
        </div>
        
        <div className="card mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiêm theo tên hoac mã khoan thu..."
                  className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-teal-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-teal-900">Mã khoản thu</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-teal-900">Tên khoản thu</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-teal-900">Mô tả</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-teal-900">Danh mục</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-teal-900">Đơn giá</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-teal-900">Trạng thái</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-teal-900">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-teal-100 hover:bg-teal-50">
                  <td className="py-3 px-4 text-sm font-medium text-teal-900">{item.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 font-medium">
                    <div className="flex items-center space-x-2">
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{item.description}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-medium text-teal-900">
                    {formatVND(item.unitPrice)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Hiên thi {filteredItems.length} / {feeItems.length} khoan thu
          </p>
          <div className="flex gap-2">
            <button className="btn-secondary">
              <Filter className="w-4 h-4 mr-2" />
              Xuât danh sach
            </button>
            <button className="btn-secondary">
              <Settings className="w-4 h-4 mr-2" />
              Cài dât chung
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeManagement;
