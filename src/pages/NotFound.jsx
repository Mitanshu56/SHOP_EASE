import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-gray-900">
        404
      </h1>

      <p className="text-gray-500">
        The page you're looking for doesn't exist.
      </p>

      <Button
        variant="primary"
        className="px-6 py-3"
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </main>
  );
}