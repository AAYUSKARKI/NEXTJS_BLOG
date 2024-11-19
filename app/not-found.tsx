import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center p-6">
            <div className="relative w-full max-w-lg mx-auto">
                <Image  
                    src="/images/nfnd.svg"
                    alt="Page Not Found"
                    width={500}
                    height={400}
                />
            </div>
            <h1 className="mt-8 text-4xl font-extrabold text-gray-800">
                Oops! Page Not Found
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
                The page you're looking for doesn’t exist. But don’t worry, we’ll help you get back on track.
            </p>
            <div className="mt-6 space-x-4">
                <Link
                    href="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Go to Home
                </Link>
                <Link
                    href="/contact"
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition"
                >
                    Contact Support
                </Link>
            </div>
        </div>
    );
}
