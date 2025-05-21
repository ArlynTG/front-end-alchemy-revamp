
// Age options for students (8-16 years)
export const studentAgeOptions = Array.from({ length: 9 }, (_, i) => {
  const age = i + 8;
  return { value: age.toString(), label: `${age} years` };
});

// Learning difference options that match Supabase enum exactly
export const learningDifferenceOptions = [
  { value: "ADHD", label: "ADHD" },
  { value: "Dyslexia", label: "Dyslexia" },
  { value: "Dyscalculia", label: "Dyscalculia" },
  { value: "Auditory Processing", label: "Auditory Processing" },
  { value: "Executive_Functioning", label: "Executive Function" },
  { value: "Other", label: "Other" },
];
