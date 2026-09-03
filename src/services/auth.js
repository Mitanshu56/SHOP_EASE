const API_URL = "http://localhost:4000/users";

export async function signup({ name, email, password }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to sign up");
  }

  return data;
}

export async function login(email, password) {
  const response = await fetch(
    `${API_URL}?email=${email}&password=${password}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to log in");
  }

  if (data.length === 0) {
    throw new Error("Invalid email or password");
  }
  return data[0];
}