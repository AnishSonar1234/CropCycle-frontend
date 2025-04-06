import React from 'react';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
          <div className="flex flex-col items-center mb-6">
            <h2 className="mt-6 text-2xl font-semibold text-gray-800">Welcome to CropCycle</h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Connect farmers directly with buyers for fresher produce and fairer prices
            </p>
          </div>
          
          <AuthForm />
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>By using our service, you agree to our</p>
            <div className="flex justify-center gap-1 mt-1">
              <a href="#" className="text-green-600 hover:text-green-800">Terms of Service</a>
              <span>&</span>
              <a href="#" className="text-green-600 hover:text-green-800">Privacy Policy</a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} CropCycle - All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Login;