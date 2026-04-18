import React, { useState, useEffect } from 'react';
import { Bug, Settings } from 'lucide-react';

const DebugMode = ({ debugMode, setDebugMode }) => {
  const [traceabilityMap, setTraceabilityMap] = useState({});
  const [isDebugMode, setIsDebugMode] = useState(debugMode);

  useEffect(() => {
    // Define traceability mapping
    const mapping = {
      'Thanh toán': 'UC05',
      'Đếm ngược': 'TC04',
      'Gạch nợ': 'SUPL07',
      'Dashboard': 'UC01',
      'Tra cứu công nợ': 'UC02',
      'Lịch sử nộp tiền': 'UC03',
      'Dự báo Doanh thu AI': 'UC08',
      'Đối soát Webhook': 'TC11',
      'QR Code': 'UC05',
      'Biên lai': 'UC06',
    };
    setTraceabilityMap(mapping);

    // Load debug mode preference from localStorage
    const savedDebugMode = localStorage.getItem('debugMode') === 'true';
    if (savedDebugMode !== debugMode) {
      setDebugMode(savedDebugMode);
    }
  }, [debugMode, setDebugMode]);

  const toggleDebugMode = () => {
    const newMode = !isDebugMode;
    setIsDebugMode(newMode);
    setDebugMode(newMode);
    localStorage.setItem('debugMode', newMode.toString());
  };

  // Removed automatic traceability badges to make UI more natural
  // Users can still manually add badges if needed for testing

  // Removed automatic traceability badges to make UI more natural
  // Debug mode toggle still available for manual testing

  if (!isDebugMode) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleDebugMode}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          title="Bật Debug Mode"
        >
          <Bug className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50 bg-yellow-100 border border-yellow-400 rounded-lg p-3 max-w-xs">
        <div className="flex items-center space-x-2 mb-2">
          <Bug className="w-5 h-5 text-yellow-800" />
          <span className="font-semibold text-yellow-800">Debug Mode</span>
          <button
            onClick={toggleDebugMode}
            className="ml-auto text-yellow-600 hover:text-yellow-800"
          >
            ×
          </button>
        </div>
        <div className="text-xs text-yellow-700">
          <div>Traceability badges: ON</div>
          <div>Console logging: ON</div>
          <div>Component borders: ON</div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleDebugMode}
          className="bg-yellow-600 text-white p-3 rounded-full shadow-lg hover:bg-yellow-700 transition-colors"
          title="Tắt Debug Mode"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <style jsx>{`
        .traceability-badge {
          margin-left: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
          background-color: #fef3c7;
          color: #92400e;
          border: 1px solid #f59e0b;
        }
        
        ${isDebugMode ? `
          * {
            outline: 1px solid rgba(239, 68, 68, 0.3) !important;
          }
          
          *:hover {
            outline: 1px solid rgba(239, 68, 68, 0.8) !important;
          }
        ` : ''}
      `}</style>
    </>
  );
};

export default DebugMode;
