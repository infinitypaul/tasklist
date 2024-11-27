'use client';

import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">

        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-blue-500">TaskList</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            TaskList is your one-stop solution for managing your tasks efficiently and collaborating seamlessly.
            Start organizing your life with ease.
          </p>
        </header>


        <div className="flex space-x-6">
          <button
              onClick={() => handleNavigate('/login')}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Sign In
          </button>
          <button
              onClick={() => handleNavigate('/register')}
              className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Register
          </button>
        </div>


        <section className="mt-20 max-w-4xl text-center">
          <h2 className="text-3xl font-semibold mb-8">Why Choose TaskList?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Easy to Use</h3>
              <p className="text-gray-300">
                Manage your tasks with a user-friendly interface and effortless navigation.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Collaboration</h3>
              <p className="text-gray-300">
                Share tasks with your team and work together effectively in real time.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Secure</h3>
              <p className="text-gray-300">
                Your data is encrypted and protected with top-notch security protocols.
              </p>
            </div>
          </div>
        </section>


        <footer className="mt-16 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} TaskList. All rights reserved @infinitypaul.
        </footer>
      </div>
  );
};

export default LandingPage;
