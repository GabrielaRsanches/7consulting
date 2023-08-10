import React, { useState } from "react";
import { User, UserDetailsProps } from "../shared/user";

export const CreateChategorieForm: React.FC = () => {
  const [user, setUser] = useState<User>({ id: "x", name: "", email: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created successfully:", data);
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={user.name}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const UserDetails: React.FC<UserDetailsProps> = ({ user, onUpdateUser }) => {
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [deleting, setDeleting] = useState(false);
  const [deletedUser, setDeletedUser] = useState<User>(user);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/getUserById?id=${user.id}`);
      const data = await response.json();

      if (response.ok) {
        onUpdateUser(data);
        setEditing(false);
      } else {
        console.error("Error retrieving updated user");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleDeleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedUser({ ...deletedUser, [name]: value });
  };

  return (
    <div>
      <h2>User Details</h2>
      {editing || deleting ? (
        <div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => setDeleting(true)}>Delete</button>
        </div>
      )}
    </div>
  );
};



