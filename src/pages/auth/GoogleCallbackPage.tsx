import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { STORAGE_KEYS } from '@constants/api';
import { AuthService } from '@api/services/authService';

/**
 * Google OAuth Callback Handler
 *
 * This page handles the redirect from Google OAuth after successful authentication.
 * The backend should redirect here with token and userId as URL query parameters.
 *
 * Expected URL format: /auth/google/callback?token=xxx&userId=xxx
 */
const GoogleCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Extract token and userId from URL parameters
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');

    if (token && userId) {
      // Store authentication data in localStorage
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER_ID, userId);

      // Clear the password since Google users don't have one
      localStorage.removeItem(STORAGE_KEYS.USER_PASSWORD);

      // Fetch user data and save name and email
      AuthService.getUserById(userId, token)
        .then((userData) => {
          localStorage.setItem(STORAGE_KEYS.USER_NAME, userData?.data?.name || "");
          localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData?.data?.email || "");

          // Dispatch custom event to notify components about login
          window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: true } }));

          // Redirect to home page or pricing page
          navigate('/', { replace: true });
        })
        .catch((error) => {
          console.error('Failed to fetch user data:', error);
          // Still dispatch auth change and redirect even if fetching user data fails
          window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: true } }));
          navigate('/', { replace: true });
        });
    } else {
      // Handle error - missing token or userId
      console.error('Google OAuth callback failed: missing token or userId');
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate]);

  // Show loading while processing
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-950">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-6"></div>
        <p className="text-white text-lg">Completing Google sign-in...</p>
      </div>
    </div>
  );
};

export default GoogleCallbackPage;
