
import { SignupButton } from "@/components/signup";

const SignupTest = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Tobey's Tutor Beta</h1>
        <p className="mb-8 text-gray-600 text-center">
          Join our exclusive beta program and be among the first 200 families to experience 
          our revolutionary AI-powered learning assistant.
        </p>
        
        <div className="flex justify-center">
          <SignupButton 
            label="Reserve Your Spot for $1" 
            className="bg-tobey-orange hover:bg-tobey-orange/90 text-white px-6 py-3"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupTest;
