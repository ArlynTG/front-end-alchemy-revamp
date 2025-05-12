
import React from 'react';
import { motion } from 'framer-motion';

interface SupabaseStatusProps {
  isLoading: boolean;
  supabaseError: string | null;
}

const SupabaseStatus: React.FC<SupabaseStatusProps> = ({ 
  isLoading, 
  supabaseError 
}) => {
  return (
    <motion.div 
      className={`w-full rounded-lg p-4 mb-4 md:mb-6 ${supabaseError ? 'bg-red-100' : 'bg-green-100'}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <p className="text-center font-medium">
        {isLoading ? (
          "Loading data from Supabase..."
        ) : supabaseError ? (
          `Supabase Error: ${supabaseError}`
        ) : (
          `Connected to Supabase for UUID: 62987ca7-4aeb-40cf-92b2-b78a9a36c264`
        )}
      </p>
    </motion.div>
  );
};

export default SupabaseStatus;
