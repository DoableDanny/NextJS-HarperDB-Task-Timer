import { harperFetch } from './harperFetch';

export const harperGetTasks = async (username: string) => {
  const data = {
    operation: 'sql',
    sql: `SELECT * FROM productivity_timer.tasks WHERE username = '${username}' ORDER BY __updatedtime__ DESC`,
  };

  const { result } = await harperFetch(data);
  return result;
};
