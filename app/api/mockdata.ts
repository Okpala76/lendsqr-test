export type MockUser = {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
};

export const fetchAllUser = async () => {
  const response = await fetch(
    "https://697d2eee97386252a267b7c7.mockapi.io/users",
  );

  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return response.json();
};

export const fetchUserById = async (id: string) => {
  const response = await fetch(
    `https://697d2eee97386252a267b7c7.mockapi.io/users/${id}`,
  );

  if (!response.ok) {
    throw new Error("failed to fetch user");
  }

  return response.json() as Promise<MockUser>;
};
