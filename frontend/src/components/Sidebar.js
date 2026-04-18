import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  CreditCard, 
  History, 
  BarChart3, 
  Settings, 
  LogOut,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Users,
  Bell,
  Target,
  AlertTriangle,
  Brain
} from 'lucide-react';

const Sidebar = ({ userRole, currentScreen, onNavigate, onLogout, onShowRoadmap, setUserRole, debugMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log('Sidebar props:', { userRole, setUserRole: typeof setUserRole });

  const studentMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'debt-details', label: 'Tra cứu công nợ', icon: FileText, path: '/debt-details' },
    { id: 'payment', label: 'Thanh toán', icon: CreditCard, path: '/qr-payment' },
    { id: 'payment-history', label: 'Lịch sử thanh toán', icon: History, path: '/payment-history' },
    { id: 'fee-waiver-request', label: 'Gửi yêu cầu hoàn phí', icon: FileText, path: '/fee-waiver-request' },
    { id: 'introduction', label: 'Giới thiệu', icon: Target, path: '/introduction' }
  ];

  const ctsvMenuItems = [
    { id: 'dashboard', label: 'Dashboard CTSV', icon: Home, path: '/ctsv-dashboard' }
  ];

  const accountantMenuItems = [
    { id: 'dashboard', label: 'Dashboard Báo cáo', icon: BarChart3, path: '/dashboard' },
    { id: 'fee-management', label: 'Quản lý khoản thu', icon: Settings, path: '/fee-management' },
    { id: 'reminder-settings', label: 'Cài đặt Nhắc nợ', icon: Bell, path: '/reminder-settings' },
  ];

  const commonMenuItems = [
    { id: 'financial-support', label: 'Hỗ trợ tài chính & Vay vốn', icon: DollarSign, action: 'roadmap' },
    { id: 'fee-waiver', label: 'Hoàn phí & Miễn giảm', icon: AlertTriangle, action: 'roadmap' },
  ];

  const bghMenuItems = [
    { id: 'dashboard', label: 'Dashboard BGH', icon: BarChart3, path: '/bgh-dashboard' },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain, path: '/ai-insights' }
  ];

  const menuItems = userRole === 'STUDENT' ? studentMenuItems : 
                    userRole === 'CTSV' ? ctsvMenuItems : 
                    userRole === 'BGH' ? bghMenuItems : accountantMenuItems;

  const handleMenuItemClick = (item) => {
    if (item.action === 'roadmap') {
      onShowRoadmap();
    } else if (item.path) {
      onNavigate(item.id);
      navigate(item.path);
    }
  };

  const isActive = (itemId) => {
    const path = location.pathname;
    
    // Handle dashboard routes
    if (itemId === 'dashboard') {
      return path === '/dashboard' || path === '/' || path === '/ctsv-dashboard' || path === '/bgh-dashboard';
    }
    
    // Handle other routes
    if (path.includes(itemId)) {
      return true;
    }
    
    // Check exact match for some routes
    const routeMap = {
      'debt-details': '/debt-details',
      'payment': '/qr-payment',
      'payment-history': '/payment-history',
      'fee-waiver-request': '/fee-waiver-request',
      'introduction': '/introduction',
      'fee-management': '/fee-management',
      'reminder-settings': '/reminder-settings',
      'ai-insights': '/ai-insights'
    };
    
    if (routeMap[itemId] && path === routeMap[itemId]) {
      return true;
    }
    
    return currentScreen === itemId;
  };

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-teal-100">
      <div className="p-6 border-b border-teal-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 logo-hce flex items-center justify-center">
              <span className="text-xl">HCE</span>
            </div>
            <div>
              <h2 className="font-bold text-teal-900 text-lg">FMS</h2>
              <p className="text-xs text-teal-600">
                {userRole === 'STUDENT' ? 'Sinh viên' : 
                 userRole === 'CTSV' ? 'Chuyên viên CTSV' : 
                 userRole === 'BGH' ? 'Ban Giám hiệu' : 'Kế toán'}
              </p>
            </div>
          </div>
          
          {/* Role Switch Button */}
          <button
            onClick={() => {
              console.log('Switch role clicked, setUserRole type:', typeof setUserRole);
              if (typeof setUserRole === 'function') {
                if (userRole === 'STUDENT') {
                  setUserRole('ACCOUNTANT');
                } else if (userRole === 'ACCOUNTANT') {
                  setUserRole('CTSV');
                } else if (userRole === 'CTSV') {
                  setUserRole('BGH');
                } else {
                  setUserRole('STUDENT');
                }
              } else {
                console.error('setUserRole is not a function!');
              }
            }}
            className="flex items-center gap-2 px-3 py-2 bg-teal-100 text-teal-700 text-sm rounded-lg hover:bg-teal-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Switch Role
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuItemClick(item)}
                className={`sidebar-item w-full text-left ${isActive(item.id) ? 'active' : ''}`}
              >
                <item.icon className="w-5 h-5 mr-3 text-teal-600" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
          
          <li className="pt-4 mt-4 border-t border-teal-100">
            {commonMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item)}
                className={`sidebar-item w-full text-left ${isActive(item.id) ? 'active' : ''}`}
              >
                <item.icon className="w-5 h-5 mr-3 text-teal-600" />
                <span>{item.label}</span>
              </button>
            ))}
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        {/* Learning Curve Indicator for Accountant/Admin */}
        {(userRole === 'ACCOUNTANT' || userRole === 'BGH') && (
          <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-800">
                Learning Curve: &lt; 2 Hours
              </span>
            </div>
          </div>
        )}
        
        <button
          onClick={onLogout}
          className="sidebar-item w-full text-left text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
