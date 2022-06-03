import CartList from "./CartList";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
const Home = () => {
  const { cartProduct, setCartProduct } = useState(null);
  const [mahsool, setMahsool] = useState(null);
  const [cartNumber, setCartNumber] = useState(0);
  const [maindata, setMainData] = useState(null);
  const [addCart, setAddCart] = useState(false);
  const [Signin, setSignin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  //   const [logout, setLogOut] = useState(false);
  useEffect(() => {
    const userID = localStorage.getItem("user-info");
    console.log(userID);
    if (userID) {
      setSignin(true);
      setUserInfo(userID);
      fetch(`http://localhost:8000/cart/?userid=${userID}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setCartNumber(data.length);
        });
    } else {
      setUserInfo(null);
      setCartNumber(0);
      setSignin(false);
    }
    fetch("http://localhost:8000/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMahsool(data);
        console.log(data);
      });

    if (addCart) {
      fetch("http://localhost:8000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(maindata),
      }).then(() => {
        setCartNumber((e) => e + 1);
      });
    }
  }, [addCart, maindata, userInfo]);

  const handleAddCart = (e, product) => {
    if (Signin) {
      const data = () => {
        return mahsool
          .filter((pr) => pr.id === product)
          .map((cart) => ({ ...cart, userid: userInfo }));
      };
      setMainData(data()[0]);
      setAddCart(true);
    } else {
      window.location = "/login";
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("user-info");
    window.location = "/";
  };

  return (
    <div className="homepage">
      <div className="navbar">
        <Navbar
          cartNumber={cartNumber}
          Signin={Signin}
          handleLogOut={handleLogOut}
        />
      </div>
      <div className="content">
        {mahsool && (
          <CartList mahsool={mahsool} handleAddCart={handleAddCart} />
        )}
      </div>
    </div>
  );
};

export default Home;
