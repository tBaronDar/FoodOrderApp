import classes from "./OrderForm.module.css";
import { useRef, useState } from "react";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const OrderForm = (props) => {
  const inputNameRef = useRef();
  const inputStreetRef = useRef();
  const inputPostalRef = useRef();
  const inputCityRef = useRef();
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredStreet = inputStreetRef.current.value;
    const enteredPostal = inputPostalRef.current.value;
    const enteredCity = inputCityRef.current.value;

    const nameIsValid = isNotEmpty(enteredName);
    const streetIsValid = isNotEmpty(enteredStreet);
    const postalIsValid = isFiveChars(enteredPostal);
    const cityIsValid = isNotEmpty(enteredCity);

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;

  const postalControlClasses = `${classes.control} ${
    formValidity.postal ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={inputNameRef} />
        {!formValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={inputStreetRef} />
        {!formValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={inputPostalRef} />
        {!formValidity.postal && (
          <p>Please enter a valid postal code (5 digits).</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={inputCityRef} />
        {!formValidity.city && <p>Please enter a valid city name.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default OrderForm;
