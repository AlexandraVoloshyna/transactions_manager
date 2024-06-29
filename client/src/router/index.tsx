import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { paths } from './paths.const';
import { Layout } from '@/components/layout';
import { LoginPage } from '@/pages/login';
import { RegistrationPage } from '@/pages/registration';

const routes = [
  { path: paths.HOME, element: <HomePage /> },
  { path: paths.REGISTER, element: <RegistrationPage /> },
  { path: paths.LOGIN, element: <LoginPage /> },
];
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: routes,
  },
]);
