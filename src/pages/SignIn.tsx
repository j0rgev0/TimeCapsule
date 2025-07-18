import LoginForm from '@/components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { request } from '@/axios_helper';
import Particle from '@/components/layout/Background';
import { useState } from 'react';
import { useAuth } from '@/hooks/AuthContext';

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const onLogin = async (e: React.FormEvent, email: string, password: string) => {
    e.preventDefault();
    try {
      await request(
        'POST',
        '/login',
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      ).then((response) => {
        login((response.data as { accessToken: string }).accessToken);
      });

      navigate('/dashboard/my-capsules');
    } catch (error: unknown) {
      setShowError(true);
      console.log(showError);
      // @ts-expect-error: axios error
      setErrorMessage(error.response.data.message);
      // @ts-expect-error: axios error
      console.log('Error response:', error.response.data.message);
    }
  };

  const onRegister = async (e: React.FormEvent, name: string, email: string, password: string) => {
    e.preventDefault();
    try {
      await request(
        'POST',
        '/register',
        {
          name: name,
          email: email,
          password: password,
        },
        { withCredentials: true }
      ).then((response) => {
        login((response.data as { accessToken: string }).accessToken);
      });

      navigate('/');
    } catch (error: unknown) {
      setShowError(true);
      console.log(showError);
      // @ts-expect-error: axios error
      setErrorMessage(error.response.data.message);
      // @ts-expect-error: axios error
      console.log('Error response:', error.response.data.message);
    }
  };

  return (
    <>
      <div className=" inset-0  bg-gradient-to-br from-black to-blue-900">
        <Particle />
      <LoginForm
        onLogin={onLogin}
        onRegister={onRegister}
        errorMessage={errorMessage}
        showError={showError}
        onCloseError={() => setShowError(false)}
        />
        </div>
    </>
  );
}

export default SignIn;
