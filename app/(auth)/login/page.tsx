import LoginForm from '@/components/auth/login-form'

const LoginPage = () => {
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <LoginForm />
    </div>
  )
}

export default LoginPage