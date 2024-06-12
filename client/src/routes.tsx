import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { LoginFormPage,  HomePage,RegistrationFormPage } from './components/Pages'

export const routes = {
  HOME: {
    path: "/",
    // title:
  },
  REGISTRATIONFORM: {
    path: "/register",
  },
  LOGINFORM: {
    path: "/login",
  }
};

export const router = createBrowserRouter([
  {
    path: routes.HOME.path,
    element: <Layout />,
    children: [
      {
        path: routes.HOME.path,
        element: <HomePage />,
      },
      {
        path: routes.REGISTRATIONFORM.path,
        element: <RegistrationFormPage />,
      },
      {
        path: routes.LOGINFORM.path,
        element: <LoginFormPage />,
      },
    ],
  },
]);