// src/components/auth/find.tsx

import AuthHeader from "../AuthHeader";
import FindForm from "./FindForm";

const Find = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <AuthHeader />
      <FindForm />
    </div>
  );
};

export default Find;
