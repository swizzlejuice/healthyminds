import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      // Redirect the user to the sign-in page or any other page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <button className="logout" onClick={handleLogout}>Log Out</button>
  );
}


