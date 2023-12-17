// Profile.js
import React from 'react';
import { Container } from 'react-bootstrap';
import { useUser } from '../Context/UserContext';

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    // Redirect to the login page if the user is not logged in
    // You can use useNavigate or Redirect from react-router-dom here
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <Container>
      <h2>Your Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Add more user information as needed */}
    </Container>
  );
};

export default Profile;
