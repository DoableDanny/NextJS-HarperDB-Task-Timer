import { useState, useEffect } from 'react';
import { harperGetUsername } from '../utils/harperdb/getUsername';

export const useUser = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // User is logged in
    if (username) return;

    // Check for access token and try to log user in
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      tryLogUserIn(accessToken);
    }

    async function tryLogUserIn(accessToken: string) {
      const username = await harperGetUsername(accessToken);
      if (username) {
        setUsername(username);
      }
    }
  });

  return { username, setUsername };
};
