import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../stored/cart-context";
import CartItem from "./CartItem";
import React, { useContext, useState } from "react";
import OrderForm from "./OrderForm";

const Cart = (props) => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: item.amount + 1 }); //find the addItem fcn in the CartProvider.js
  };

  const removeCartItemHandler = (id) => {
    cartCtx.removeId(id);
  };

  const orderClickHandler = () => {
    setShowOrderForm(true);
  };

  const submitOrderHandler = (userData) => {
    fetch(
      "https://mealsapp-e50cf-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>

      {hasItems && (
        <button className={classes.button} onClick={orderClickHandler}>
          Check Out
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={removeCartItemHandler.bind(null, item.id)}
            onAdd={addCartItemHandler.bind(null, item)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {showOrderForm && (
        <OrderForm onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!showOrderForm && modalActions}
    </Modal>
  );
};

export default Cart;
