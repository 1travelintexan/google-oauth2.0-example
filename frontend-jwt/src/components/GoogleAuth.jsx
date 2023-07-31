import GoogleButton from "react-google-button";

export const GoogleAuth = () => {
  const handleGoogleLogin = async () => {
    console.log("google clicked");
    const googleLoginURL = "http://localhost:5005/auth/google";
    window.location.href = googleLoginURL;
  };
  return (
    <div>
      <GoogleButton onClick={handleGoogleLogin} />
    </div>
  );
};
