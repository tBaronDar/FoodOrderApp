import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../stored/cart-context";
import CartItem from "./CartItem";
import React, { useContext, useState } from "react";
import OrderForm from "./OrderForm";

const Cart = (props) => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submited, setSubmited] = useState(false);
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

  const submitOrderHandler = async (userData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        "https://mealsapp-e50cf-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload...");
      }
      setIsSubmitting(false);
      setSubmited(true);
      cartCtx.clearCart();
    } catch (error) {
      console.log(error);
    }
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

  const modalContent = (
    <React.Fragment>
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
    </React.Fragment>
  );

  const modalSubmitting = <p>Uploading your order. Please wait...</p>;
  const modalSubmited = (
    <React.Fragment>
      <p>Your order has been uploaded!</p>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !submited && modalContent}
      {isSubmitting && modalSubmitting}
      {!isSubmitting && submited && modalSubmited}
    </Modal>
  );
};

export default Cart;
