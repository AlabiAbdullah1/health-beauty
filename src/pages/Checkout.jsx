import Header from "../components/Header";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  return (
    <div>
      <Header />
      <h2 className="text-center">Checkout</h2>
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
