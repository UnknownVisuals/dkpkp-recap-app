import { AuthLayout } from "@/components/auth/auth-layout";
import { SignUpForm } from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Sign up to access the SIPANGAN system."
      imagePosition="left"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
