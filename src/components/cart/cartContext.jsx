import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "cart_qty";
const UNIT_PRICE = 26.95;

const TIERS = [
  { threshold: 35, discount: 0 },
  { threshold: 50, discount: 0.05 },
  { threshold: 75, discount: 0.1 },
];

const clampQty = (n) => {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(99, Math.floor(n)));
};

function getDiscount(subtotal) {
  let applied = 0;
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (subtotal >= TIERS[i].threshold) {
      applied = TIERS[i].discount;
      break;
    }
  }
  return applied;
}

export function CartProvider({ children }) {
  const [qty, setQty] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return clampQty(stored ? Number(stored) : 1);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(qty));
  }, [qty]);

  const increment = () => setQty((q) => clampQty(q + 1));
  const decrement = () => setQty((q) => clampQty(q - 1));
  const remove = () => setQty(0);

  const subtotal = Number((qty * UNIT_PRICE).toFixed(2));
  const discountRate = getDiscount(subtotal);
  const total = Number((subtotal * (1 - discountRate)).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        qty,
        unitPrice: UNIT_PRICE,
        subtotal,
        total,
        discountRate,
        increment,
        decrement,
        remove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
