import RegisterForm from "@/components/auth/register-form";

const RegisterPage = () => {
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;