import { DB_URL } from '../../constants/constants';

// This function can only be ran on the backend as it requires a "super_user" password
export const harperCreateNewUser = async (
  username: string,
  password: string
) => {
  const DB_PW = process.env.HARPERDB_PW;
  if (!DB_URL || !DB_PW) {
    console.log('Error: .env variables are undefined');
    throw 'Internal server error';
  }
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', DB_PW);
  const raw = JSON.stringify({
    operation: 'add_user',
    role: 'standard_user',
    username: username.toLowerCase(),
    password: password,
    active: true,
  });
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const response = await fetch(DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};
