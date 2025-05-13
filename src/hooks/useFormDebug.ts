
import { useEffect } from 'react';

// A debugging hook to trace form submission issues
export function useFormDebug(formData: any, name: string = "Form") {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && formData) {
      console.group(`${name} Debug`);
      console.log('Current form data:', formData);
      
      // Check for potential enum mismatches with Supabase
      if (formData?.primaryLearningDifference) {
        console.log('Learning difference value:', formData.primaryLearningDifference);
        console.log('Learning difference type:', typeof formData.primaryLearningDifference);
      }
      
      console.groupEnd();
    }
  }, [formData, name]);
}
