import "./Cart.css";
import CartBottomBlock from "./componetns/CartBottomBlock";
import CartTopBlock from "./componetns/CartTopBlock";
import ProductTile from "./componetns/ProductTile";
import { CartProvider } from "./cartContext";
import EmptyCart from "./componetns/EmptyCart";
import { useCart } from "./cartContext";

function CartContent({OpenCart, showCart}) {
  const { qty } = useCart();

  return (
    <div className={`cart-popup-wrap tra ${showCart ? '' : 'hide'}`}>
      <CartTopBlock OpenCart={OpenCart}/>

      <div className="f-col">
        {qty === 0 ? <EmptyCart /> : <ProductTile />}
      </div>

      {qty > 0 && <CartBottomBlock />}
    </div>
  );
}

export default function Cart({OpenCart, showCart, renderCart}) {
  return (
    <>
        {renderCart &&
         <CartProvider>
          <CartContent OpenCart={OpenCart} showCart={showCart} />
        </CartProvider>}
    </>
  );
}
