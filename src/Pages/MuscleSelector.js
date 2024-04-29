import React, { useState } from "react"
import {
	Container,
	Row,
	Col,
	ButtonGroup,
	ToggleButton,
	Card,
} from "react-bootstrap"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

// Import other workout images here...

const MuscleSelector = ({ onWorkoutSelect, selectedWorkout }) => {
	const [selectedMuscle, setSelectedMuscle] = useState(null)
	const [selectedDate, setSelectedDate] = useState(null)
	const handleDateChange = (date) => {
		setSelectedDate(date)
	}

	const muscles = ["Chest", "Back", "Shoulders", "Legs", "Arms"]
	const workoutsByMuscle = {
		Chest: [
			{
				name: "Bench Press",
				image: require("../images/bench_press.png"),
			},
			{ name: "Push-ups", image: require("../images/bench_press.png") },
			{ name: "Chest Fly", image: require("../images/bench_press.png") },
			{ name: "Dips", image: require("../images/bench_press.png") },
			{
				name: "Incline Bench Press",
				image: require("../images/bench_press.png"),
			},
			{
				name: "Cable Crossover",
				image: require("../images/bench_press.png"),
			},
		],
		Back: [
			{ name: "Pull-ups", image: require("../images/bench_press.png") },
			{ name: "Deadlifts", image: require("../images/bench_press.png") },
			{ name: "Rows", image: require("../images/bench_press.png") },
			{
				name: "Lat Pulldowns",
				image: require("../images/bench_press.png"),
			},
			{ name: "T-Bar Row", image: require("../images/bench_press.png") },
			{ name: "Chin-ups", image: require("../images/bench_press.png") },
		],
		Shoulders: [
			{
				name: "Shoulder Press",
				image: require("../images/bench_press.png"),
			},
			{
				name: "Lateral Raises",
				image: require("../images/bench_press.png"),
			},
			{
				name: "Front Raises",
				image: require("../images/bench_press.png"),
			},
			{
				name: "Reverse Fly",
				image: require("../images/bench_press.png"),
			},
			{
				name: "Upright Rows",
				image: require("../images/bench_press.png"),
			},
			{
				name: "Arnold Press",
				image: require("../images/bench_press.png"),
			},
		],
		Legs: [
			{ name: "Squats", image: require("../images/bench_press.png") },
			{ name: "Lunges", image: require("../images/bench_press.png") },
			{ name: "Leg Press", image: require("../images/bench_press.png") },
			{
				name: "Deadlifts",
				image: require("../images/bench_press.png"),
			},
			{ name: "Leg Curls", image: require("../images/bench_press.png") },
			{
				name: "Calf Raises",
				image: require("../images/bench_press.png"),
			},
		],
		Arms: [
			{
				name: "Bicep Curls",
				image: require("../images/bench_press.png"),
			},
			{
				name: "Tricep Extensions",
				image: require("../images/bench_press.png"),
			},
			{
				name: "Hammer Curls",
				image: require("../images/bench_press.png"),
			},
			{
				name: "Skull Crushers",
				image: require("../images/bench_press.png"),
			},
			{
				name: "Preacher Curls",
				image: require("../images/bench_press.png"),
			},
			{
				name: "Tricep Dips",
				image: require("../images/bench_press.png"),
			},
		],
	}

	const handleMuscleSelect = (muscle) => {
		setSelectedMuscle(muscle)
		onWorkoutSelect("") // Reset selected workout when a new muscle is selected
	}

	const handleWorkoutSelect = (workout) => {
		onWorkoutSelect(workout)
	}

	return (
		<Container className="mt-5">
			<Row>
				<Col className="text-center">
					<h2>Select a Date:</h2>
					<ReactDatePicker
						selected={selectedDate}
						onChange={handleDateChange}
						className="form-control mb-4"
					/>
				</Col>
				<Col className="text-center">
					<h2>Select a Muscle Group:</h2>
					<ButtonGroup toggle>
						{muscles.map((muscle) => (
							<ToggleButton
								key={muscle}
								type="radio"
								variant="outline-primary"
								checked={selectedMuscle === muscle}
								value={muscle}
								onClick={() => handleMuscleSelect(muscle)}
							>
								{muscle}
							</ToggleButton>
						))}
					</ButtonGroup>
				</Col>
			</Row>
			{selectedMuscle && (
				<Row className="mt-4">
					<Col className="text-center">
						<h2>Choose a Workout:</h2>
						<div className="d-flex flex-wrap">
							{workoutsByMuscle[selectedMuscle].map((workout) => (
								<Card
									key={workout.name}
									className={`m-2 workout-card mx-auto ${
										selectedWorkout === workout.name
											? "selected"
											: ""
									}`}
									style={{
										width: "200px",
										cursor: "pointer",
									}}
									onClick={() =>
										handleWorkoutSelect(workout.name)
									}
								>
									<Card.Img
										variant="top"
										src={workout.image}
									/>
									<Card.Body>
										<Card.Title>{workout.name}</Card.Title>
									</Card.Body>
								</Card>
							))}
						</div>
					</Col>
				</Row>
			)}
		</Container>
	)
}

export default MuscleSelector
