import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
  }, []);

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const removeFromCart = (id) => {
    try {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="cart mt-4">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <Link to="/" className="text-decoration-none text-black">
          <h2>Health&Beauty</h2>
        </Link>
        <Link to="/">
          <Button style={{ width: "150px" }}>Continue Shopping</Button>
        </Link>
      </div>
      <h2 className="text-center mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-red">Your cart is empty</p>
      ) : (
        <>
          {cart.map((product, index) => (
            <Card key={index} className="mb-3">
              <Row className="align-items-center">
                <Col md={3}>
                  <img
                    src={product.images[1]}
                    alt={product.name}
                    className="img-fluid"
                  />
                </Col>
                <Col md={6}>
                  <h4>{product.name}</h4>
                  <p>Quantity: {product.quantity}</p>
                  <p>Total: #{product.price * product.quantity}</p>
                </Col>
                <Col md={3} className="text-right">
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
          <div className="text-right ">
            <h3>Total: #{totalPrice}</h3>
            <Link to="/checkout">
              <Button variant="success">Proceed to Checkout</Button>
            </Link>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
