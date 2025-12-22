import { useCart } from "../cartContext";
import RewardMeter from "./RewardMeter";

const TIERS = [
  { label: "Free Shipping", threshold: 35 },
  { label: "5% Off", threshold: 50 },
  { label: "10% Off", threshold: 75 },
];

export default function CartTopBlock({OpenCart}) {
  const { subtotal } = useCart();

  const maxTier = TIERS[TIERS.length - 1];
  const isTopTier = subtotal >= maxTier.threshold;

  const nextTier = TIERS.find((t) => subtotal < t.threshold);
  const away = nextTier ? Math.max(0, nextTier.threshold - subtotal) : 0;

  return (
    <div className="cart-top-block">
      <div className="f-row j-s-b">
          <p className="cart-top-block-promotional-label">
            {isTopTier ? (
              <span>Fully loaded. Every reward applied.</span>
            ) : (
              <>
                You are <span>£{away.toFixed(2)}</span> away from{" "}
                <span>{nextTier.label}</span>
              </>
            )}
          </p>
          <button className="close-cart f-row j-c" onClick={OpenCart}>
            <svg  viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.23431 0.234315C8.54673 -0.0781048 9.05275 -0.0781047 9.36517 0.234315C9.67759 0.546734 9.67759 1.05275 9.36517 1.36517L5.9306 4.79974L9.36517 8.23431C9.67759 8.54673 9.67759 9.05275 9.36517 9.36517C9.05275 9.67759 8.54673 9.67759 8.23431 9.36517L4.79974 5.9306L1.36517 9.36517C1.05275 9.67759 0.546734 9.67759 0.234315 9.36517C-0.0781047 9.05275 -0.0781048 8.54673 0.234315 8.23431L3.66888 4.79974L0.234315 1.36517C-0.0781049 1.05275 -0.0781049 0.546734 0.234315 0.234315C0.546734 -0.0781049 1.05275 -0.0781049 1.36517 0.234315L4.79974 3.66888L8.23431 0.234315Z"/>
            </svg>
          </button>
      </div>

      <div className="cart-top-block-metric-wrap f-row">
        <RewardMeter orderValue={subtotal} tiers={TIERS} />
      </div>
    </div>
  );
}
