import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { UserContext } from '../contexts/UserContext';
import { useUser } from '../custom-hooks/useUser';

import { TasksContext } from '../contexts/TasksContext';
import { useTasks } from '../custom-hooks/useTasks';

function MyApp({ Component, pageProps }: AppProps) {
  const { username, setUsername } = useUser();

  const { tasks, setTasks, getAndSetTasks } = useTasks(username);

  console.log(tasks);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <TasksContext.Provider value={{ tasks, setTasks, getAndSetTasks }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TasksContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
