import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} style={{width: '40%', borderRadius: '30px'}}/>
        <h6 style={{color: 'white'}}>{user.name}</h6>
        {/* <p>{user.email}</p> */}
      </div>
    )
  );
};

export default Profile;