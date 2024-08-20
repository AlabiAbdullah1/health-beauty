import { useState } from "react";
import products from "../data/products.json";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? product.category === filterCategory : true)
  );

  return (
    <div className="container">
      <Link to="/" className="text-decoration-none text-black">
        <h2>Health & Beauty</h2>
      </Link>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control mr-1"
          style={{ width: "50%" }}
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Health">Health</option>
          <option value="Beauty">Beauty</option>
        </select>
        <Link to="/cart" className="text-decoration-none text-white">
          <Button className="ml-3" style={{ width: "120px" }}>
            {" "}
            Cart
          </Button>
        </Link>
      </div>

      <div className="row">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <Card className="h-100">
                <Link
                  to={`/product/${product.id}`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src={product.images[0]}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="font-size-25px">
                      #{product.price}
                    </Card.Text>
                    <Card.Text>{product.unit} items left</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </div>
          ))
        ) : (
          <p>No Results found for this product</p>
        )}
      </div>
    </div>
  );
};

export default Home;
