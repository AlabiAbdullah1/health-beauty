import { Link, useParams } from "react-router-dom";
import products from "../data/products.json";
import { useState } from "react";
import { Button, Carousel } from "react-bootstrap";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < product.unit) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
      if (existingProduct.quantity > product.unit) {
        existingProduct.quantity = product.unit; // Don't allow more than available stock
      }
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  return (
    <div className="product-detail container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <Link to="/" className="text-decoration-none text-black">
          <h2>Health&Beauty</h2>
        </Link>
        <Link to="/cart">
          <Button style={{ width: "100px" }}>Cart</Button>
        </Link>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Carousel>
            {product.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  style={{ height: "400px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>#{product.price}</p>
          <div className="quantity-selector d-flex align-items-center mb-3">
            <button
              className="btn btn-secondary"
              onClick={handleDecrement}
              disabled={quantity === 1}
            >
              -
            </button>
            <span className="mx-3">{quantity}</span>
            <button
              className="btn btn-secondary"
              onClick={handleIncrement}
              disabled={quantity === product.unit}
            >
              +
            </button>
          </div>
          <button className="btn btn-primary" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
