import { NextApiRequest, NextApiResponse } from "next";

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await fetch("YOUR_DOTNET_BACKEND_URL/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      if (response.ok) {
        const data = await response.json();
        res.status(201).json(data);
      } else {
        res.status(response.status).json({ error: "Error creating user" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export async function findAndUpdateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const userId = req.query.id as string;

      const response = await fetch(`localhost:3000L/api/users/${userId}`);
      const data = await response.json();

      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ error: "Error retrieving user" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export async function handleDeleteUser(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Handle the successful deletion, update UI or perform other actions
      console.log(`User with ID ${userId} deleted successfully`);
    } else {
      console.error(`Failed to delete user with ID ${userId}`);
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
}
