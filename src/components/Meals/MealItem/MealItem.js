import { useContext } from "react";

import CartContext from "../../../store/cart-context";
import MealItemForm from "./MealItemForm";

import classes from "./MealItem.module.css";

function MealItem(props) {
	const context = useContext(CartContext);

	const price = `$${props.mealPrice.toFixed(2)}`;

	function addToCartHandler(amount) {
		context.addItem({
			id: props.id,
			name: props.mealName,
			amount: amount,
			price: props.mealPrice,
		});
	};

	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.mealName}</h3>
				<div className={classes.description}>{props.mealDescription}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm id={props.id} onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
};

export default MealItem;
