
import { z } from "zod";
import { ALL_LEARNING_DIFFERENCES, LearningDifference } from "@/components/onboarding/types";

// Base schema with common fields
export const baseSignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  studentName: z.string().min(1, "Student's name is required"),
});

// Extended schema with additional fields for detailed signup
export const detailedSignupSchema = baseSignupSchema.extend({
  phone: z.string().min(10, "Please enter a valid phone number"),
  studentAge: z.string().min(1, "Student's age is required"),
  primaryLearningDifference: z.enum(ALL_LEARNING_DIFFERENCES),
});

// Registration-specific schema with optional student name
export const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  studentName: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  studentAge: z.string().min(1, "Student's age is required"),
  primaryLearningDifference: z.enum(ALL_LEARNING_DIFFERENCES).optional(),
});

// Export types for use in components
export type BaseSignupFormValues = z.infer<typeof baseSignupSchema>;
export type DetailedSignupFormValues = z.infer<typeof detailedSignupSchema>;
export type RegistrationFormValues = z.infer<typeof registrationSchema>;
