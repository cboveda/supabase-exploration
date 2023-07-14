import { useContext } from "react";
import { UserContext } from "./App";
import { supaClient } from "./supa-client";

export default function UserMenu() {
  const { profile } = useContext(UserContext);

  return (
    <>
      <div className="flex flex-col">
        <h2>Welcome, {profile?.username || "friend"}.</h2>
        <button
          className="user-menu-logout-button"
          onClick={() => void supaClient.auth.signOut()}
        >
          Logout
        </button>
      </div>
    </>
  );
}
