import React from "react";

const Home = ({user}) => {
  return (
    <>
    {user?<p>Welcome, {user.username}</p>:null}
    
      <h1>This is home</h1>
    </>
  );
};

export default Home;
