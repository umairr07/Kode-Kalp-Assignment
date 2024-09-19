function ConfirmPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">WELCOME!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Please confirm your email address to complete the signup process.
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700">
            Confirm Your Email
          </h2>
          <p className="text-gray-500 mt-2">
            We’ve sent a confirmation link to your email. Please check your
            inbox and click on the link to verify your account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPage;
