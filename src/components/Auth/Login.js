import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Style.css";
function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
      });
  }, []);
  const handleSubmit = (e) => {
    const loginInfo = { name, password };
    e.preventDefault();
    const data = () => {
      return user.filter(
        (pr) =>
          pr.username === loginInfo.name && pr.password === loginInfo.password
      );
    };
    const info = data()[0];
    console.log(info);
    if (info) {
      localStorage.setItem("user-info", info.userid);
      window.location = "/";
    } else {
      window.location = "/login";
    }
  };
  return (
    <div className="login-body">
      <div className="login">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              required
              placeholder="Username ..."
            />
            <input
              onChange={(e) => setPassword(e.target.value.trim())}
              type="text"
              value={password}
              required
              placeholder="Password ..."
            />
            <button>Login</button>
          </form>
          <span className="reigster">
            you don't hav any account? <Link to="/signup">Register</Link>
          </span>
        </div>
      </div>
      <div className="login-sidebar"></div>
    </div>
  );
}

export default Login;
