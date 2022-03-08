import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useRouter } from 'next/router';

import { LabelAndInput } from '../Form';
import Button from '../Button';
import Alert from '../Alert';
import { postFormData } from '../../utils/postFormData';

import { harperFetchJWTTokens } from '../../utils/harperdb/fetchJWTTokens';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState<string | string[]>('');

  const user = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors('');

    const formData = { username, password1, password2 };
    const { response, result } = await postFormData(formData, '/api/signup');

    // Account not created successfully
    if (response.status !== 200) {
      setErrors(result.error);
      return;
    }

    // Account created successfully; get JWTs
    try {
      const { response, result } = await harperFetchJWTTokens(
        username,
        password1
      );
      const accessToken = result.operation_token;
      if (response.status === 200 && accessToken) {
        authenticateUser(username, accessToken);
      } else {
        // Account created, but failed to get JWTs
        // Redirect to login page
        router.push('/login');
      }
    } catch (err) {
      console.log(err);
      setErrors('Whoops, something went wrong :(');
    }

    console.log({ response, result });
  };

  const authenticateUser = (username: string, accessToken: string) => {
    user.setUsername(username);
    localStorage.setItem('access_token', accessToken);
  };

  const displayErrors = () => {
    if (errors.length === 0) return;

    return typeof errors === 'string' ? (
      <Alert type='danger'>{errors}</Alert>
    ) : (
      errors.map((err, i) => (
        <Alert key={i} type='danger'>
          {err}
        </Alert>
      ))
    );
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
        inputName='password1'
        handleChange={(e) => setPassword1(e.target.value)}
        value={password1}
      />
      <LabelAndInput
        label='Confirm password'
        inputType='password'
        inputName='password2'
        handleChange={(e) => setPassword2(e.target.value)}
        value={password2}
      />
      <Button
        color='success'
        type='submit'
        extraClasses='w-full mt-3 py-3 font-semibold'
      >
        Create Account
      </Button>

      {displayErrors()}
    </form>
  );
};

export default SignupForm;
