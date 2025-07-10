import { useState, useEffect } from 'react';
import * as api from '../services/api';

export const useApi = (apiCall, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (...args) => {
    try {
      setLoading(true);
      const response = await apiCall(...args);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof apiCall === 'function') {
      fetchData();
    }
  }, []);

  return { data, loading, error, fetchData };
};