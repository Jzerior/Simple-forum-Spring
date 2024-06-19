import { useEffect, useState } from 'react';
import { AddPost } from '../AddPost/AddPost';
import { useAuthContext } from "../Auth/AuthContext";

export const NewPostPage = () => {
  const { isLoggedIn } = useAuthContext();
  const [checkedLogin, setCheckedLogin] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckedLogin(true);
    }, 5);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (checkedLogin && !isLoggedIn) {
      window.location.href = '/';
    }
  }, [checkedLogin, isLoggedIn]);

  if (!checkedLogin) {
    return <div>Loading...</div>;
  }
    return <AddPost />;
  };