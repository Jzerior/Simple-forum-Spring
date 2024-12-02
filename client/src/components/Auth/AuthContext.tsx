import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
type AuthContextType = {
  isLoggedIn: boolean;
  username: string;
  role:string;
  logIn: () => void;
  logOut: () => void;
};
type jwtPayload = {
  login: string;
  role: string;
  exp: number;
}
export const AuthContext = createContext<AuthContextType | null>(null);
AuthContext.displayName = "AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error(
      "Komponent nie został umieszczony w AuthContext"
    );
  }
  return context;
};


const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setuserName ] = useState ("");
    const [role,setRole]= useState("");
    const [expiration, setExpiration] = useState(0);
    const logIn = () => {
      const token= localStorage.getItem('jwtToken');
      if(token != null){
        setIsLoggedIn(true);
        const parsedToken=jwtDecode<jwtPayload>(token)
        setuserName(parsedToken.login)
        setRole(parsedToken.role)
        setExpiration(parsedToken.exp)
      }
    }
    const logOut = () => {
      setIsLoggedIn(false);
      setuserName("");
      setExpiration(0)
      localStorage.removeItem('jwtToken');
      window.location.href = '/';
    }
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token != null) {
          setIsLoggedIn(true);
          console.log(token)
          const parsedToken=jwtDecode<jwtPayload>(token)
          console.log(parsedToken)
          setuserName(parsedToken.login)
          setRole(parsedToken.role)
          setExpiration(parsedToken.exp)
        }
    }, []);
    useEffect(() => {
      const interval = setInterval(() => {
        if(expiration != 0){
         if(( expiration < Math.floor(Date.now() / 1000))){
          console.log("Automatyczne wylogowanie")
          logOut()
         }
        }
      }, 6000);

      return () => clearInterval(interval);
    }, [expiration]);
    return { isLoggedIn, username,role,logIn, logOut };
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoggedIn, username,role, logIn, logOut } = useAuth();
  return (
    <AuthContext.Provider value={{ isLoggedIn,username,role, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

