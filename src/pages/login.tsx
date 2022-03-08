import { useContext } from 'react';
import type { NextPage } from 'next';
import { UserContext } from '../contexts/UserContext';
import PageHeading from '../components/PageHeading';
import LoginForm from '../components/login-page/LoginForm';

const Login: NextPage = () => {
  const { username } = useContext(UserContext);

  return (
    <div className='grow flex flex-col items-center mt-20'>
      {username ? (
        <p>
          You are logged in as{' '}
          <span className='text-green-600 font-semibold'>{username}</span> 👋
        </p>
      ) : (
        <>
          <PageHeading extraClasses='text-center mb-8'>Log in</PageHeading>
          <LoginForm />
        </>
      )}
    </div>
  );
};

export default Login;
