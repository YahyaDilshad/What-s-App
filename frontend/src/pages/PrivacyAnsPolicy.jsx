import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from "lucide-react";

const PrivacyAnsPolicy = () => {
    const navigate = useNavigate();

useEffect(() => {
  const handlePopState = () => navigate("/signin");
  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, [navigate]);

    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
        <button onClick={() => navigate('/signin')} className="absolute top-4 left-4">
          <X className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-200" />
        </button>
        <div className="max-w-3xl w-full bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-purple-400 mb-6">
            Privacy Policy
          </h1>

        <p className="mb-4">
          Your privacy is very important to us. This Privacy Policy explains how
          we collect, use, and protect your personal information when you use
          our services.
        </p>

        <h2 className="text-xl font-semibold text-purple-300 mb-2">
          Information We Collect
        </h2>
        <p className="mb-4">
          We may collect information such as your name, email address, profile
          picture, and usage data when you create an account or use our
          platform.
        </p>

        <h2 className="text-xl font-semibold text-purple-300 mb-2">
          How We Use Your Information
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>To provide and improve our services.</li>
          <li>To communicate with you about updates and support.</li>
          <li>To ensure security and prevent fraud.</li>
        </ul>

        <h2 className="text-xl font-semibold text-purple-300 mb-2">
          Sharing of Information
        </h2>
        <p className="mb-4">
          We do not sell your personal information to third parties. We may
          share data only when required by law or to protect our services.
        </p>

        <h2 className="text-xl font-semibold text-purple-300 mb-2">
          Your Rights
        </h2>
        <p className="mb-4">
          You can access, update, or delete your account information at any
          time. If you have questions, please contact us.
        </p>

        <h2 className="text-xl font-semibold text-purple-300 mb-2">
          Changes to Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Please review it
          periodically for changes.
        </p>

        <p className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
    );
}

export default PrivacyAnsPolicy