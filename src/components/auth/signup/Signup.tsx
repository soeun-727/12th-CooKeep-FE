// src/components/auth/Signup.tsx

import AuthHeader from "../AuthHeader";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <AuthHeader />
      <SignupForm />
    </div>
  );
};

export default Signup;
