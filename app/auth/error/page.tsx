"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ErrorPage() {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            setError(urlParams.get('error'));
        }
    }, []);

    const errorMessage = () => {
        switch (error) {
            case 'CredentialsSignin':
                return 'Invalid credentials. Please check your email and password.';
            case 'OAuthSignin':
                return 'Error signing in with the provider. Please try again or use another method.';
            case 'Incorrect password':
                return 'The password you entered is incorrect.';
            case 'Configuration':
                return 'Authentication configuration error. Please contact the site administrator.';
            default:
                return 'An unknown error occurred. Please try again or contact support.';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-2xl transform transition-all hover:scale-105">
                <h1 className="text-3xl font-extrabold text-red-500 mb-4">
                    🚨 Sign-In Error
                </h1>
                <p className="text-lg text-gray-600 font-medium mb-6 leading-relaxed">
                    {errorMessage()}
                </p>
                <div className="w-32 h-32 mx-auto mb-6 relative">
                    <Image
                        src="/images/error.svg"
                        alt="Error Illustration"
                        width={100}
                        height={100}
                        priority
                    />
                </div>
                <div className="space-y-4">
                    <Link href="/auth/signin">
                        <button className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow hover:shadow-xl hover:from-blue-600 hover:to-blue-800 focus:outline-none transition-all duration-200">
                            Back to Sign-In
                        </button>
                    </Link>
                    <Link href="/help">
                        <button className="block w-full bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow hover:shadow-lg hover:bg-gray-300 focus:outline-none transition-all duration-200">
                            Contact Support
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
