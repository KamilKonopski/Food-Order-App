import { Fragment, useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const context = useContext(CartContext);

	const totalAmount = `$${context.totalAmount.toFixed(2)}`;
	const hasItems = context.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		context.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		const cartItem = { ...item, amount: 1 };
		context.addItem(cartItem);
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			"https://food-order-8b7a9-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
			{
				method: "POST",
				body: JSON.stringify({
					user: userData,
					orderedItem: context.items,
				}),
			}
		);
		setIsSubmitting(false);
		setDidSubmit(true);
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{context.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes["button--alt"]} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
			)}
			{!isCheckout && modalActions}
		</Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;

	const setDidSubmitModalContent = (
		<Fragment>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && setDidSubmitModalContent}
		</Modal>
	);
};

export default Cart;
