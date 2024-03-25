import {createContext, useContext, useEffect, useState} from'react';
import { IContextType, IUser } from '@/types';
import {getCurrentUser} from "@/lib/appwrite/api";
import { useNavigate } from 'react-router-dom';

export const INITAIL_USER = {
    id: "",
    name: "",
    userName: "",
    email: "",
    imageUrl: "",
    bio: "",
}

const INITIAL_STATE = {
    user: INITAIL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser : ()=>{},
    setIsAuthenticated: ()=>{},
    checkAuthUser: ()=> false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);
const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUser>(INITAIL_USER);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();


    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser();
            if(currentAccount){
              setUser({
                  id: currentAccount.$id,
                  name: currentAccount.name,
                  username: currentAccount.username,
                  email: currentAccount.email,
                  imageUrl: currentAccount.imageUrl,
                  bio: currentAccount.bio,
              });

              setIsAuthenticated(true);
              return true;
            }
            return false;
        }catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }


    // localStorage.getItem('cookiFallback')===null)  navigate('/sign-in'
    useEffect(() => {
       if(localStorage.getItem('cookiFallback')==='[]')
        setTimeout(() => {
            checkAuthUser();
        }, 1000);
    }, []);

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);