import AuthForm from 'src\components\AuthForm.jsx'

export default function LoginPage() {
  const handleLogin = (form) => {
    console.log('Logging in:', form)
    // TODO: Integrate with Firebase/Auth API
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  )
}