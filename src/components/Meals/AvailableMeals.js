import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

function AvailableMeals() {
  const [incomingData, setIncomingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    async function getMeals() {
      const response = await fetch(
        "https://mealsapp-e50cf-default-rtdb.europe-west1.firebasedatabase.app/meals.json/"
      );
      if (!response.ok) {
        throw new Error("Loading has failed.");
      }
      const data = await response.json();

      let incomingArray;
      for (const key in data) {
        incomingArray = data[key];
      }

      setIncomingData(incomingArray);
      setIsLoading(false);
    }

    //getMeals retuns a promise. don't use try{}catch{}
    getMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <section className={classes.isLoading}>Loading...</section>;
  }

  if (httpError) {
    return <section className={classes.mealsError}>{httpError}</section>;
  }

  const mealsArray = incomingData.map((each) => (
    <MealItem
      id={each.id}
      key={each.id}
      name={each.name}
      description={each.description}
      price={each.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsArray}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
