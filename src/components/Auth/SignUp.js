import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Style.css";
function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (userData) {
      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then(() => {
          setEmail("");
          setUsername("");
          setPassword("");
          setUserData(null);
          window.location = "/login";
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [userData]);

  const handleRegister = (e) => {
    e.preventDefault();
    const userid = Math.floor(Date.now() / 1000) + 60 * 60;
    const userdata = { username, email, password,userid };
    setUserData(userdata);
  };
  return (
    <div className="login-body">
      <div className="login">
        <div className="form">
          <form onSubmit={handleRegister}>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              value={username}
              required
              placeholder="Username ..."
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              value={email}
              required
              placeholder="Email ..."
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              value={password}
              required
              placeholder="Password ..."
            />
            <button>Register</button>
          </form>
          <span className="reigster">
            You Already have account ? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
      <div className="login-sidebar"></div>
    </div>
  );
}

export default SignUp;
