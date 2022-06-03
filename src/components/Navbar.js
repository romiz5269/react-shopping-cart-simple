import { Link } from "react-router-dom";
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";
const Navbar = ({ cartNumber, Signin,handleLogOut }) => {

  return (
    <div className="container">
      <div className="site-title">
        <h1>Shopping</h1>
      </div>
      <div className="menu">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="ext-menu">
        <nav>
          <ul>
            <li>
              <Link to="/cart">
                <FaShoppingCart />
                <span className="cart-badge">{cartNumber}</span>
              </Link>
            </li>
            <li>
              {Signin ? (
                <button onClick={handleLogOut}>
                  <FaSignInAlt /> &nbsp; Logout
                </button>
              ) : (
                <Link to="/login">
                  <FaSignInAlt /> &nbsp; Login / Register
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
