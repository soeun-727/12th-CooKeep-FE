// src/components/auth/Signup.tsx

import { useState } from "react";
import AuthHeader from "../AuthHeader";
import SignupForm from "./SignupForm";

const Signup = () => {
  const [hideHeader, setHideHeader] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {!hideHeader && <AuthHeader />}

      <SignupForm setHideHeader={setHideHeader} />
    </div>
  );
};

export default Signup;
