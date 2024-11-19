'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react'; // Updated import for NextAuth
import Image from 'next/image';

function Signin() {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGithubLogin = async () => {
        await signIn("github")
      }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false, // Prevent automatic redirection
            email,
            password,
        });

        if (result?.error) {
            // Redirect to error page with query parameter
            toast.error('Invalid email or password. Please try again.');
            router.push(`/auth/error?error=${encodeURIComponent(result.error)}`);
        } else {
            // Redirect on successful sign-in
            toast.success('Login successful!');
           router.push("/")
        }
    };

    return (
        <>
            <div
                id="login-popup"
                tabIndex={-1}
                className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
            >
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="p-5">
                            <h3 className="text-2xl mb-0.5 font-medium"></h3>
                            <p className="mb-4 text-sm font-normal text-gray-800"></p>
                            <div className="text-center">
                                <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                                    Login to your account
                                </p>
                            </div>
                            <div className="mt-7 flex flex-col gap-2">
                                <button
                                onClick={handleGithubLogin}
                                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Image
                                        height={18}
                                        width={18}
                                        src="https://www.svgrepo.com/show/512317/github-142.svg"
                                        alt="GitHub"
                                        className="h-[18px] w-[18px] "
                                    />
                                    Continue with GitHub
                                </button>
                            </div>

                            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                                <div className="h-px w-full bg-slate-200"></div>
                                OR
                                <div className="h-px w-full bg-slate-200"></div>
                            </div>

                            <form onSubmit={handleSubmit} className="w-full">
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                    placeholder="Email Address"
                                />
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                    className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                    placeholder="Password"
                                />
                                <p className="mb-3 mt-2 text-sm text-gray-500">
                                    <a
                                        href="/forgot-password"
                                        className="text-blue-800 hover:text-blue-600"
                                    >
                                        Reset your password?
                                    </a>
                                </p>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                                >
                                    Continue
                                </button>
                            </form>
                            <div className="mt-6 text-center text-sm text-slate-600">
                                Don't have an account?
                                <a href="/auth/signup" className="font-medium text-[#4285f4]">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signin;
