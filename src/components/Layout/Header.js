import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";

import mealsIMG from "../../assets/meals.jpg";

import classes from "./Header.module.css";

function Header(props) {
	return (
		<Fragment>
			<header className={classes.header}>
				<h1>ReactMeals</h1>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={classes["main-image"]}>
				<img src={mealsIMG} alt="A table full of food" />
			</div>
		</Fragment>
	);
};

export default Header;
