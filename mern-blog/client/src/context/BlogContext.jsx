import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';
import jwtDecode from 'jwt-decode';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // ... existing post and category functions ...

  const login = async (email, password) => {
    try {
      const response = await api.login({ email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, username: decoded.username });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await api.register({ username, email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, username: decoded.username });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, username: decoded.username });
    }
  }, [token]);

  return (
    <BlogContext.Provider value={{
      posts,
      categories,
      loading,
      error,
      user,
      token,
      fetchPosts,
      fetchCategories,
      addPost,
      updatePostInList,
      removePost,
      login,
      register,
      logout
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);