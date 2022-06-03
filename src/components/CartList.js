const CartList = ({ mahsool, handleAddCart }) => {
  return (
    <>
      {mahsool.map((p) => (
        <div className="cart-box" key={p.id}>
          <img src={p.src} />
          <h2>{p.name}</h2>
          <p>{p.price} Dollar</p>
          <button onClick={(e) => handleAddCart(e, p.id)}>Add to Cart</button>
        </div>
      ))}
    </>
  );
};

export default CartList;
