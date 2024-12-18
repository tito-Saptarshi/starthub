import OnboardingForm from "./OnboardingForm";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome to Our Platform
        </h1>
        <OnboardingForm />
      </div>
    </div>
  );
}
