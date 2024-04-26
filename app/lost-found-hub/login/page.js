"use client";
import LoginForm from "app/ui/auth/login";
import "app/lost-found-hub/lost-found-hub.css";

const LoginPage = () => {
  return (
    <div className="p-10 mt-16">
      <LoginForm onLoginSuccess={() => {}} />
    </div>
  );
}
export default LoginPage;
