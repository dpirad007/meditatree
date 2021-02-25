import { createContext, useState, useEffect, useContext } from 'react';
import useSWR from 'swr';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { data, error, mutate, revalidate } = useSWR('auth/me');

  const [value, setValue] = useState({
    loading: !data && !error,
    loggedOut: data?.error === 'not authenticated',
    userData: data,
    userError: error ? error : data?.error,
    userRevalidate: mutate,
    userMutate: revalidate,
  });

  useEffect(() => {
    setValue(v => ({
      ...v,
      loading: !data && !error,
      loggedOut: data?.error === 'not authenticated',
      userData: data?.data,
      userError: error ? error : data?.error,
    }));
  }, [data, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
