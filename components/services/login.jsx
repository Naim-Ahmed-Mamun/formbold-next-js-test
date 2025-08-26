import axios from "axios";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";

export const openAuthModal = ({ setShowModal }) => {
  setShowModal(true);
};
export const closeAuthModal = ({ setShowModal }) => {
  setShowModal(false);
};

export const handleLogout = async () => {
  try {
    // API session logout
    await axios.delete('/api/auth/session');
    
    // Next-auth session logout
    await signOut({ 
      redirect: true,
      callbackUrl: "/"
    });

    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("access_token");
    Cookies.remove("user_info");
    
    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("Could not complete logout");
  }
};

export const handleSessionLogout = async () => {
  try {
    // Call the signOut function to sign the user out
    const response = await signOut({ redirect: false, callbackUrl: "/" });
    // window.location.href = response?.url;
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
