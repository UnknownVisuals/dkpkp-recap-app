import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Login to your account"
      subtitle="Welcome back! Please enter your details."
      imagePosition="right"
    >
      <LoginForm />
    </AuthLayout>
  );
}
