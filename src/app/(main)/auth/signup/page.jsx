import React from 'react'
import AuthForm from 'src\components\AuthForm.jsx'

export default function RegisterPage() {
  const handleRegister = (form) => {
    console.log('Registering:', form)
    // TODO: Integrate with Firebase/Auth API
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  )
}


