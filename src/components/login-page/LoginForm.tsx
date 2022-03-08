import { useState, useContext } from 'react';
import { LabelAndInput } from '../Form';
import Button from '../Button';
import Alert from '../Alert';

import { UserContext } from '../../contexts/UserContext';
import { harperFetchJWTTokens } from '../../utils/harperdb/fetchJWTTokens';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const user = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Username and password required');
      return;
    }

    try {
      const { response, result } = await harperFetchJWTTokens(
        username,
        password
      );
      const { status } = response;
      const accessToken = result.operation_token;
      if (status === 200 && accessToken) {
        authenticateUser(username, accessToken);
      } else if (status === 401) {
        setError('Check your username and password are correct');
      } else {
        setError('Whoops, something went wrong :(');
      }
    } catch (err) {
      console.log(err);
      setError('Whoops, something went wrong :(');
    }
  };

  const authenticateUser = (username: string, accessToken: string) => {
    user.setUsername(username);
    localStorage.setItem('access_token', accessToken);
  };

  return (
    <form className='w-full sm:w-96' onSubmit={handleSubmit}>
      <LabelAndInput
        label='Username'
        inputType='text'
        inputName='username'
        handleChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <LabelAndInput
        label='Password'
        inputType='password'
        inputName='password'
        handleChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button color='success' extraClasses='w-full mt-3 py-3 font-semibold'>
        Login
      </Button>

      {error && <Alert type='danger'>{error}</Alert>}
    </form>
  );
};

export default LoginForm;
