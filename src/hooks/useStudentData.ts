import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface StudentData {
  name: string;
  totalLessons: number;
  averageSessionDuration: number;
  longTermPlan: string;
}

export const useStudentData = (studentId: string) => {
  const [studentData, setStudentData] = useState<StudentData>({
    name: "Loading...",
    totalLessons: 0,
    averageSessionDuration: 0,
    longTermPlan: "Loading..."
  });
  const [isLoading, setIsLoading] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  const fetchStudentFromSupabase = async () => {
    setIsLoading(true);
    setSupabaseError(null);

    try {
      // Get registration data for the specified UUID
      const { data, error } = await supabase
        .from('beta_registrations')
        .select('*')
        .eq('id', studentId)
        .single();

      if (error) {
        console.error("Error fetching student data:", error);
        setSupabaseError(error.message);
        toast({
          title: "Error fetching data",
          description: error.message,
          variant: "destructive"
        });
      } else if (data) {
        console.log("Retrieved student data:", data);
        
        // Update student data with values from Supabase
        setStudentData(prevData => ({
          ...prevData,
          name: data.student_name || `${data.first_name} ${data.last_name}`,
          // Keep existing values for totalLessons and averageSessionDuration
          longTermPlan: data.goals_summary || prevData.longTermPlan
        }));
        
        toast({
          title: "Connection successful",
          description: "Successfully retrieved data from Supabase",
          variant: "default"
        });
      }
    } catch (err) {
      console.error("Exception during fetch:", err);
      setSupabaseError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching student data for ID:", studentId);
    if (studentId) {
      fetchStudentFromSupabase();
    }
  }, [studentId]);

  return {
    studentData,
    isLoading,
    supabaseError
  };
};
