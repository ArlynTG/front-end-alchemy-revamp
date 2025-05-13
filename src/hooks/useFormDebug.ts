
import { useEffect } from 'react';

/**
 * A hook for debugging form data in development
 * @param data The form data to debug
 * @param label Optional label to identify the form data in logs
 */
export const useFormDebug = (data: any, label = 'Form Data') => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && data) {
      console.group(`🔍 ${label}`);
      console.log(data);
      console.groupEnd();
    }
  }, [data, label]);
};
