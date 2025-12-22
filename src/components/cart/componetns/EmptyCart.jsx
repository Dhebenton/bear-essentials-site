import { useCart } from "../cartContext";

export default function EmptyCart() {
  const { increment } = useCart();

  return (
    <div className="f-col cart-empty j-c a-c g12">
      <h3 className="cen">
        No items added. Start with our new moisturiser.
      </h3>
      <button className="button-main" onClick={increment}>
        Add To Cart
      </button>
    </div>
  );
}
