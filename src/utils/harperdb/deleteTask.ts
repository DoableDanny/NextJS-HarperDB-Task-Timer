import { harperFetch } from './harperFetch';

export const harperDeleteTask = async (taskId: string) => {
  const data = {
    operation: 'delete',
    schema: 'productivity_timer',
    table: 'tasks',
    hash_values: [taskId],
  };

  const responseAndResult = await harperFetch(data);
  return responseAndResult;
};
