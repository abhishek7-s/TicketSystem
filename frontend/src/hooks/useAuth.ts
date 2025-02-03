import { useState, useEffect } from 'react';
import axios from 'axios';
import { saveToken, removeToken, fetchUser, getToken } from '../utils/Auth';
import axiosInstance from '../api/axios';

interface User {
  id: number;
  email: string;
  isAdmin: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const userData = await fetchUser();
      setUser(userData);
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post<{ token: string }>('/auth/signin', { email, password });
      saveToken(response.data.token);

      const userData = await fetchUser();
      setUser(userData);
    } catch (error) {
      console.error('Signin failed:', error);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post<{ token: string }>('/auth/signup', { name, email, password });
      saveToken(response.data.token);

      const userData = await fetchUser();
      setUser(userData);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return { user, loading, signin, signup, logout };
};
