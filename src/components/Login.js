import axios from "axios";
import { useState } from "react";

export default function Login({ setLoggedIn, client }) {
  const [userID, setUserID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/token", { user_id: userID })
      // .then((res) => client.connectUser({ id: userID }, res.data))
      .then((res) => client.connectUser(
        {
          id: userID,
          name: userID,
          image:
            "https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14044.jpg",
        },
        // userToken
        res.data
      ))
      .then(() => setLoggedIn(true))
      .catch((err) => console.error("ERROR", err));
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <label>Enter a UserID: </label>
        <input
          autoFocus
          type="text"
          name="userID"
          value={userID}
          placeholder="Enter a UserID..."
          onChange={(e) => setUserID(e.target.value)}
        />
      </form>
    </div>
  );
}
