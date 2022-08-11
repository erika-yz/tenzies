import React from "react";
import Style from "../styles/dice.css"
export default function Die(props) {
	const styles = {
		backgroundColor: props.dice.isHeld ? "#59E391" : "#FFFFFF"
	};

	const face_style = "face-"+ props.value;

	function printFace(value) {
		const faces = [];
		for (let i = 0; i < value; i++) {
			faces.push(
				<span key={i} className="dot"></span>
			);
		}
		return faces;
	}

	return (
		<div
			className="dice"
			style={styles}
			onClick={props.holdDice}
		>
			{printFace(props.dice.value)}
		</div>
	);
}
