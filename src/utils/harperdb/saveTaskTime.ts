import { harperFetch } from './harperFetch';

export const harperSaveTaskTime = async (
  taskId: string,
  newSeconds: number
) => {
  const data = {
    operation: 'sql',
    sql: `UPDATE productivity_timer.tasks SET time_in_seconds = '${newSeconds}' WHERE id = '${taskId}'`,
  };

  const responseAndResult = await harperFetch(data);
  return responseAndResult;
};
