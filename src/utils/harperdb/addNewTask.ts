import { harperFetch } from './harperFetch';

export const harperAddNewTask = async (username: string, taskName: string) => {
  const data = {
    operation: 'insert',
    schema: 'productivity_timer',
    table: 'tasks',
    records: [
      {
        username: username,
        task_name: taskName,
        time_in_seconds: 0,
      },
    ],
  };

  const responseAndResult = await harperFetch(data);
  return responseAndResult;
};
