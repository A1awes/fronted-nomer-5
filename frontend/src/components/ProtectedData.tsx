import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { protected_api } from '../lib/api';

interface User {
  email: string;
}

const ProtectedData: React.FC = () => {
  const [data, setData] = useState<{ message: string; user: User } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await protected_api.getData();
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-indigo-600 mr-4" />
                <h3 className="text-lg leading-6 font-medium text-gray-900">Protected Data</h3>
              </div>
              
              <div className="mt-6">
                {error ? (
                  <div className="text-red-600">{error}</div>
                ) : data ? (
                  <div className="space-y-4">
                    <p className="text-gray-600">{data.message}</p>
                    <p className="text-sm text-gray-500">User: {data.user.email}</p>
                  </div>
                ) : (
                  <div className="text-gray-600">Loading...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedData;