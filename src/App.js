import React from "react";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
function App() {

	const [dice, setDice] = React.useState(allNewDice());
	const [tenzies, setTenzies] = React.useState(false);
	const [counter, setCounter] = React.useState(0);
	const[time, setTime] = React.useState(0);
	const[bestTime, setBestTime] = React.useState(localStorage.getItem("bestTime") || 1000)

	/* Stopwatch */
	React.useEffect(()=>{
		let interval = null

		if(!tenzies){
			interval = setInterval(()=>{
				setTime((prevTime) => prevTime + 1)
			}, 1000)
		}
		else{
			clearInterval(interval)
		}
		return () => {
			clearInterval(interval)
		}
	}, [tenzies])

	React.useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const allSameValue = dice.every((die) => die.value === firstValue);
		if (allHeld && allSameValue) {
			setTenzies(true);
		}
	}, [dice]);

	function generateNewDice() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		const numbersArray = [];
		for (let i = 0; i < 10; i++) {
			numbersArray.push(generateNewDice());
		}
		return numbersArray;
	}

	function rollDice() {
		if (!tenzies) {
			setDice((oldDice) =>
				oldDice.map((die) => {
					return die.isHeld ? die : generateNewDice();
				})
			);
			setCounter(prevCounter => prevCounter + 1);
		} 
		else {
			setTenzies(false);
			setDice(allNewDice());
			if(time < bestTime){
				setBestTime(time);
				localStorage.setItem("bestTime", time);
			}
			setCounter(0);
			setTime(0);
		}
	}

	function holdDice(id) {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			})
		);
	}

	const diceElements = dice.map((dice) => (
		<Dice key={dice.id} dice={dice} holdDice={() => holdDice(dice.id)} />
	));

	return (
		<main>
			{tenzies && <Confetti />}
			<h2>Best Time: {bestTime}</h2>
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each dice to freeze it at its
				current value between rolls.
			</p>
			<div className="container">{diceElements}</div>
			
			<button className="roll-dice" onClick={rollDice}>
				{tenzies ? "New Game" : "Roll"}
			</button>
			<div className="statistics">
				<h2>Counter: <span>{counter}</span></h2>
				<h2>
					Time: &nbsp;
					<span className="minute">
						{("0" + Math.floor((time / 60) % 10)).slice(-2)}:
					</span>
					<span className="second">       
						 {("0" + Math.floor((time) % 60)).slice(-2)}
					</span>
				</h2>
			</div>
	</main>
	
	);
}

export default App;
