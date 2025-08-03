import React, { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push('at least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('an uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('a lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('a number');
    if (!/[^A-Za-z0-9]/.test(password)) errors.push('a special character');
    
    return errors;
  };

  const handleSubmit = () => {
    const newErrors = {
      password: '',
      confirmPassword: ''
    };

    // Validate password
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = `Password must contain ${passwordErrors.join(', ')}.`;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Check if passwords are empty
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    }

    setErrors(newErrors);

    // If no errors, proceed
    if (!newErrors.password && !newErrors.confirmPassword) {
      console.log('Password reset submitted:', formData);
      // Add your password reset logic here
      // Example: call your reset password API
      
      // Show success message
      setIsSuccess(true);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login')
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { score: 0, text: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { score, text: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score, text: 'Fair', color: 'bg-yellow-500' };
    if (score <= 4) return { score, text: 'Good', color: 'bg-blue-500' };
    return { score, text: 'Strong', color: 'bg-green-500' };
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-md">
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">Password Reset Successful!</h1>
            <p className="text-gray-400 mb-8">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>

            <button
              onClick={handleBackToLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-gray-400">
              Create a new secure password for your account
            </p>
          </div>

          <div className="space-y-6">
            {/* New Password field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-500' : 'border-gray-600/50'
                  }`}
                  placeholder="Enter your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Password strength indicator */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Password strength</span>
                  <span className={`font-medium ${
                    passwordStrength.score <= 2 ? 'text-red-400' :
                    passwordStrength.score <= 3 ? 'text-yellow-400' :
                    passwordStrength.score <= 4 ? 'text-blue-400' : 'text-green-400'
                  }`}>
                    {passwordStrength.text}
                  </span>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div
                      key={index}
                      className={`h-1 w-1/5 rounded ${
                        index <= passwordStrength.score ? passwordStrength.color : 'bg-gray-600'
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  Use 8+ characters with uppercase, lowercase, numbers, and symbols
                </div>
              </div>
            )}

            {/* Confirm Password field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-600/50'
                  }`}
                  placeholder="Confirm your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
                </div>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="flex items-center text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Passwords match
                </div>
              )}
            </div>

            {/* Security tips */}
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
              <h3 className="text-white font-medium mb-2 text-sm">Security Tips:</h3>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Use a unique password you haven't used before</li>
                <li>• Avoid personal information like names or birthdays</li>
                <li>• Consider using a password manager</li>
                <li>• Don't share your password with anyone</li>
              </ul>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Update Password
            </button>

            {/* Back to login */}
            <div className="text-center">
              <button
                onClick={handleBackToLogin}
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;