import React from "react";
import MicrosoftLogin from "react-microsoft-login";
 
const Test=() => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };
 
  return (
    <MicrosoftLogin clientId={'5a038296-62c0-4ad5-ba49-8202a76dc2a7'} authCallback={authHandler} />
  );
};

export default Test