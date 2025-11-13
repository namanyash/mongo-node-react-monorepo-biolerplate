import { useState, useEffect } from 'react';

interface HealthStatus {
  status: string;
  timestamp: string;
  port: string;
}

interface DbTestResult {
  success: boolean;
  message: string;
  details?: any;
}

function App() {
  const [backendStatus, setBackendStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [dbStatus, setDbStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [healthData, setHealthData] = useState<HealthStatus | null>(null);
  const [dbData, setDbData] = useState<DbTestResult | null>(null);
  const [error, setError] = useState<string>('');

  const testBackendConnection = async () => {
    try {
      setBackendStatus('loading');
      const response = await fetch('/api/health');
      if (response.ok) {
        const data = await response.json();
        setHealthData(data);
        setBackendStatus('connected');
      } else {
        setBackendStatus('error');
        setError('Backend health check failed');
      }
    } catch (err) {
      setBackendStatus('error');
      setError('Failed to connect to backend');
    }
  };

  const testDatabaseConnection = async () => {
    try {
      setDbStatus('loading');
      const response = await fetch('/api/db-test');
      const data = await response.json();
      setDbData(data);
      
      if (data.success) {
        setDbStatus('connected');
      } else {
        setDbStatus('error');
      }
    } catch (err) {
      setDbStatus('error');
      setDbData({
        success: false,
        message: 'Failed to test database connection',
        details: err instanceof Error ? err.message : String(err)
      });
    }
  };

  useEffect(() => {
    testBackendConnection();
    testDatabaseConnection();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'loading': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return '✓';
      case 'error': return '✗';
      case 'loading': return '⏳';
      default: return '?';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          DD App - Connection Status
        </h1>
        
        <div className="space-y-6">
          {/* Backend Status */}
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Backend Connection</h2>
              <span className={`text-2xl ${getStatusColor(backendStatus)}`}>
                {getStatusIcon(backendStatus)}
              </span>
            </div>
            
            <p className={`text-sm ${getStatusColor(backendStatus)} mb-3`}>
              Status: {backendStatus === 'loading' ? 'Testing...' : backendStatus === 'connected' ? 'Connected' : 'Error'}
            </p>
            
            {healthData && (
              <div className="bg-gray-50 p-3 rounded text-sm">
                <p><strong>Port:</strong> {healthData.port}</p>
                <p><strong>Timestamp:</strong> {new Date(healthData.timestamp).toLocaleString()}</p>
              </div>
            )}
            
            <button 
              onClick={testBackendConnection}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={backendStatus === 'loading'}
            >
              Test Backend
            </button>
          </div>

          {/* Database Status */}
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">MongoDB Connection</h2>
              <span className={`text-2xl ${getStatusColor(dbStatus)}`}>
                {getStatusIcon(dbStatus)}
              </span>
            </div>
            
            <p className={`text-sm ${getStatusColor(dbStatus)} mb-3`}>
              Status: {dbStatus === 'loading' ? 'Testing...' : dbStatus === 'connected' ? 'Connected' : 'Error'}
            </p>
            
            {dbData && (
              <div className="bg-gray-50 p-3 rounded text-sm">
                <p><strong>Message:</strong> {dbData.message}</p>
                {dbData.details && (
                  <div className="mt-2">
                    <strong>Details:</strong>
                    <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(dbData.details, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
            
            <button 
              onClick={testDatabaseConnection}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              disabled={dbStatus === 'loading'}
            >
              Test Database
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Summary */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded">
            <h3 className="font-semibold text-blue-800 mb-2">Connection Summary</h3>
            <p className="text-blue-700 text-sm">
              This page tests the full stack connectivity: Frontend → Backend → MongoDB
            </p>
            <div className="mt-2 text-sm text-blue-600">
              <p>• Frontend: React app served from backend</p>
              <p>• Backend: Express server on port {healthData?.port || '3031'}</p>
              <p>• Database: MongoDB Atlas cluster</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
