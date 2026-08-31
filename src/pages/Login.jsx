import Button from '../components/Button';

// Static markup only — controlled inputs + Firebase Auth wiring happen in Phase 7.
export default function Login() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Log In</h1>

      <form className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6">
        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Email
          <input
            type="email"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Password
          <input
            type="password"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <Button type="submit" variant="primary" className="mt-2 w-full py-3">
          Log In
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <a href="#" className="font-medium text-indigo-600 hover:underline">
          Sign up
        </a>
      </p>
    </main>
  );
}
