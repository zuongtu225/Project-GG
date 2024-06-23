import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Router } from '@remix-run/router';
import DefaultLayout from '../layouts/DefaultLayout';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import { RegistrationTask } from '../pages/registration-task/RegistrationTask';
import TaskInformationPage from '../pages/task-list/TaskInformationPage';
import NotificationPage from '../pages/notification/NotificationPage';
import LogworkDetail from '../pages/LogworDetail/LogworkDetail';
import TaskTemplateRegistrationPage from '../pages/taskTemplateRegistrationPage/TaskTemplateRegistrationPage';
const routes: RouteObject[] = [
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    id: 'root',
    path: '/',
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: '/task/information',
        Component: TaskInformationPage,
      },
      {
        path: '/notification/registration',
        Component: NotificationPage,
      },
      {
        path: '/task-template',
        Component: TaskTemplateRegistrationPage,
      },
      {
        path: '/task-template/logwork_detail/:id',
        Component: LogworkDetail,
      },
      {
        path: '/task-list/registration',
        Component: RegistrationTask,
      },
    ],
  },
];

const router: Router = createBrowserRouter(routes);

export default router;
