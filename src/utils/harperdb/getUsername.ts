import { DB_URL } from '../../constants/constants';

export const harperGetUsername = async (accessToken: string) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + accessToken);

  const raw = JSON.stringify({
    operation: 'user_info',
  });

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  try {
    const response = await fetch(DB_URL, requestOptions);
    const result = await response.json();
    if (response.status === 200) {
      return result.username;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};
