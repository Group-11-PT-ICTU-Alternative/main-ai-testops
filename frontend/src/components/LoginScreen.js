import React, { useState } from 'react';
import { User, Lock, GraduationCap, Calculator, Users, Briefcase } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleLogin = () => {
    if (selectedRole) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-teal-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 logo-hce mb-6">
            <span className="text-3xl">HCE</span>
          </div>
          <h1 className="text-3xl font-bold text-teal-900 mb-2">HCE-FMS</h1>
          <p className="text-teal-600 text-lg">Hệ thống Quản lý tài chính - học phí tích hợp AI</p>
        </div>

        <div className="space-y-4 mb-6">
          <label className="block text-sm font-medium text-teal-600 mb-2">
            Chọn vai trò đăng nhập:
          </label>
          
          <button
            onClick={() => handleRoleSelect('STUDENT')}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedRole === 'STUDENT'
                ? 'border-teal-500 bg-teal-500 text-white shadow-lg'
                : 'border-teal-200 hover:border-teal-300 bg-white text-teal-700 hover:bg-teal-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              <User className="w-5 h-5 text-teal-600" />
              <span className="font-medium">Sinh viên</span>
            </div>
          </button>
          
          <button
            onClick={() => handleRoleSelect('ACCOUNTANT')}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedRole === 'ACCOUNTANT'
                ? 'border-teal-500 bg-teal-500 text-white shadow-lg'
                : 'border-teal-200 hover:border-teal-300 bg-white text-teal-700 hover:bg-teal-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              <Calculator className="w-5 h-5 text-teal-600" />
              <span className="font-medium text-center">Kế toán</span>
            </div>
          </button>
          
          <button
            onClick={() => handleRoleSelect('CTSV')}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedRole === 'CTSV'
                ? 'border-teal-500 bg-teal-500 text-white shadow-lg'
                : 'border-teal-200 hover:border-teal-300 bg-white text-teal-700 hover:bg-teal-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              <Users className="w-5 h-5 text-teal-600" />
              <span className="font-medium">Chuyên viên CTSV</span>
            </div>
          </button>
          
          <button
            onClick={() => handleRoleSelect('BGH')}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedRole === 'BGH'
                ? 'border-teal-500 bg-teal-500 text-white shadow-lg'
                : 'border-teal-200 hover:border-teal-300 bg-white text-teal-700 hover:bg-teal-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              <Briefcase className="w-5 h-5 text-teal-600" />
              <span className="font-medium">Ban giám hiệu</span>
            </div>
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={!selectedRole}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
            selectedRole
              ? 'btn-primary'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Đăng nhập
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          Demo: Chọn vai trò và nhấn đăng nhập để tiếp tục
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
