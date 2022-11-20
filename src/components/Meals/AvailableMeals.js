import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

function AvailableMeals() {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [fetchError, setFetchError] = useState();

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				"https://food-order-8b7a9-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const responseData = await response.json();

			const loadedMeals = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals().catch((error) => {
			setIsLoading(false);
			setFetchError(error.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={classes.MealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	if (fetchError) {
		return (
			<section className={classes.MealsError}>
				<p>{fetchError}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			mealName={meal.name}
			mealDescription={meal.description}
			mealPrice={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
