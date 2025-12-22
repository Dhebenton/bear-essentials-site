import { useCart } from "../cartContext";

const TIERS = [
  { threshold: 35, discount: 0 },
  { threshold: 50, discount: 0.05 },
  { threshold: 75, discount: 0.1 },
];

export default function ProductTile() {
  const { qty, increment, decrement, remove, unitPrice } = useCart();

  if (qty === 0) return null;

  const lineTotal = unitPrice * qty;

  let appliedDiscount = 0;
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (lineTotal >= TIERS[i].threshold) {
      appliedDiscount = TIERS[i].discount;
      break;
    }
  }

  const discountedTotal =
    appliedDiscount > 0
      ? Number((lineTotal * (1 - appliedDiscount)).toFixed(2))
      : null;

  return (
    <div className="product-tile f-row a-f-s">
      <img src="../../../../assets/cart/cart-jar-photo-tallow.webp" />

      <div className="flex f-col g16">
        <div className="f-row a-f-s j-s-b">
          <p className="product-tile-name gant">
            Tallow & Honey <br /> moisturiser
          </p>

          <div
            key={`${qty}-${appliedDiscount}`}
            className="product-tile-price-wrap f-col a-end price-anim"
          >
            {discountedTotal !== null && (
              <p className="product-tile-price gant strike">
                £{lineTotal.toFixed(2)}
              </p>
            )}

            <p
              className={`product-tile-price gant ${
                discountedTotal !== null ? "combo discount" : ""
              }`}
            >
              £{(discountedTotal ?? lineTotal).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="f-row j-s-b">
          <div className="product-tile-counter f-row">
            <button type="button" onClick={decrement}>
              <p>-</p>
            </button>

            <div className="flex">
              <p className="quantity">{qty}</p>
            </div>

            <button type="button" onClick={increment}>
              <p>+</p>
            </button>
          </div>

          <button
            className="product-tile-bin-button f-row j-v"
            type="button"
            aria-label="Remove"
            onClick={remove}
          >
              <svg
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.82659 5.00023L7.59593 11.0001M4.40402 11.0001L4.17336 5.00023M10.8185 2.86028C11.0465 2.89495 11.2732 2.93162 11.4998 2.97095M10.8185 2.86028L10.1065 12.1154C10.0775 12.4922 9.90725 12.8441 9.62989 13.1008C9.35254 13.3576 8.9885 13.5001 8.61057 13.5H3.38938C3.01145 13.5001 2.64741 13.3576 2.37006 13.1008C2.0927 12.8441 1.92248 12.4922 1.89342 12.1154L1.18144 2.86028M10.8185 2.86028C10.0491 2.74397 9.27573 2.65569 8.49991 2.59562M1.18144 2.86028C0.953443 2.89428 0.726783 2.93095 0.500122 2.97028M1.18144 2.86028C1.95084 2.74397 2.72422 2.65569 3.50004 2.59562M8.49991 2.59562V1.98497C8.49991 1.19833 7.89326 0.542346 7.10661 0.51768C6.36904 0.494107 5.63091 0.494107 4.89334 0.51768C4.10669 0.542346 3.50004 1.199 3.50004 1.98497V2.59562M8.49991 2.59562C6.83577 2.46701 5.16418 2.46701 3.50004 2.59562"
                strokeWidth="0.999973"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
