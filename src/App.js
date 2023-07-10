import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./stored/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart onClose={hideCartHandler} />}
      <div>
        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
