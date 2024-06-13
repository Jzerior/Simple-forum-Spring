import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { LoginFormPage,  HomePage,RegistrationFormPage, NewPostPage, PostPage } from './components/Pages'

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
  },
  NEWPOST: {
    path: "/newpost"
  },
  POSTDETAILS: {
    path: "/post/:id"
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
      {
        path: routes.NEWPOST.path,
        element: <NewPostPage />,
      },
      {
        path: routes.POSTDETAILS.path,
        element: <PostPage />,
      },
    ],
  },
]);