import { useState, useCallback } from 'react';
import type { HttpError } from '@/services/httpClient';

interface AsyncState<T> {
  data: T | undefined;
  isLoading: boolean;
  error: HttpError | null;
  isError: boolean;
  isSuccess: boolean;
}

interface UseAsyncReturn<T, P extends any[]> extends AsyncState<T> {
  execute: (...params: P) => Promise<T | undefined>;
  reset: () => void;
  mutate: (...params: P) => Promise<T | undefined>; 
}

export const useAsync = <T, P extends any[]>(
  asyncFunction: (...params: P) => Promise<T>
): UseAsyncReturn<T, P> => {
  const [state, setState] = useState<AsyncState<T>>({
    data: undefined,
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: false
  });

  const execute = useCallback(async (...params: P): Promise<T | undefined> => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      isError: false,
      isSuccess: false
    }));

    try {
      const result = await asyncFunction(...params);
      setState({
        data: result,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true
      });
      return result;
    } catch (error) {
      const httpError = error as HttpError;
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: httpError,
        isError: true,
        isSuccess: false
      }));
      return undefined;
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setState({
      data: undefined,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: false
    });
  }, []);

  return {
    ...state,
    execute,
    mutate: execute,
    reset
  };
}; 