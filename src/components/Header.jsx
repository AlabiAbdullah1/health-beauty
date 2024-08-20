import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center mb-5">
      <Link to="/" className="text-decoration-none text-black">
        <h2>Health&Beauty</h2>
      </Link>
      <Link to="/cart">
        <Button style={{ width: "100px" }}>Cart</Button>
      </Link>
    </div>
  );
}
