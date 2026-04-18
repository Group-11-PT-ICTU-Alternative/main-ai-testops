import React from 'react';
import { GraduationCap, TrendingUp, Shield, Heart } from 'lucide-react';

const Introduction = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Giới thiệu trường
        </h1>
        <p className="text-gray-600">Chào mừng bạn đến với HCE-FMS!</p>
      </div>

      {/* Main Introduction Card */}
      <div className="card mb-6 bg-gradient-to-r from-teal-50 to-blue-50 border-l-4 border-teal-500">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Trường Cao đẳng Kinh tế Thành phố Hồ Chí Minh (HCE)</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Chào mừng bạn đến với hệ thống HCE-FMS của Trường Cao đẳng Kinh tế Thành phố Hồ Chí Minh (HCE) - ngôi trường đi đầu trong đào tạo kinh tế và đang mạnh mẽ chuyển đổi số. HCE-FMS là niềm tự hào công nghệ của trường, được xây dựng để giúp bạn quản lý tài chính cá nhân, học phí và các khoản vay một cách minh bạch, hiện đại nhờ công nghệ AI. Chúng tôi cam kết luôn đồng hành và hỗ trợ bạn thông qua các tính năng như dự báo tài chính và tự động hóa đối soát, giúp bạn tập trung vào việc học tập và phát triển bản thân. Chúc bạn có một trải nghiệm học tập và quản lý tài chính hiệu quả cùng HCE!
            </p>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Chuyển đổi số</h3>
            <p className="text-sm text-gray-600">
              HCE đi đầu trong chuyển đổi số, mang lại trải nghiệm hiện đại cho sinh viên
            </p>
          </div>
        </div>

        <div className="card">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Minh bạch & AI</h3>
            <p className="text-sm text-gray-600">
              Quản lý tài chính minh bạch, hiện đại nhờ công nghệ AI tiên tiến
            </p>
          </div>
        </div>

        <div className="card">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Đồng hành cùng bạn</h3>
            <p className="text-sm text-gray-600">
              Dự báo tài chính và tự động hóa đối soát để hỗ trợ bạn tốt nhất
            </p>
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Cam kết của chúng tôi</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
            <p>Hệ thống HCE-FMS được xây dựng để giúp sinh viên quản lý tài chính cá nhân, học phí và các khoản vay một cách minh bạch</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
            <p>Công nghệ AI giúp dự báo tài chính và tự động hóa đối soát, mang lại trải nghiệm hiện đại</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
            <p>Trường luôn đồng hành và hỗ trợ sinh viên trong suốt quá trình học tập</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
            <p>Mục tiêu tự động hóa 95% đối soát, giúp sinh viên tập trung vào việc học tập</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
