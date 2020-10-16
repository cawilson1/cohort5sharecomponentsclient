import React from "react";
import S3ImageUpload from "../components/S3ImageUpload";
import axios from "axios";

export default function Profile({ signedIn }) {
  const [s3Url, setS3Url] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState(undefined);
  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post("http://localhost:4000/user", {
          token,
        });
        setCurrentUser(response.data);
        console.log("this is the response", response);
        console.log("current user log", currentUser);
        const avatar = await axios.post("http://localhost:4000/get-s3-pic", {
          token,
        });
        console.log(avatar);
        setS3Url(avatar.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <img src={s3Url} alt="avatar" />
      <S3ImageUpload signedIn={signedIn} />
    </div>
  );
}