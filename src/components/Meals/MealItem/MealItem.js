import classes from "./MealItem.module.css";

const MealItem = ({ mealName, mealDescription, mealPrice }) => {
	const price = `$${mealPrice.toFixed(2)}`;

	return (
		<li className={classes.meal}>
			<div>
				<h3>{mealName}</h3>
				<div className={classes.description}>{mealDescription}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div></div>
		</li>
	);
};

export default MealItem;
