import React, { useEffect, useState } from "react"
import {
	Container,
	Row,
	Col,
	ButtonGroup,
	ToggleButton,
	Card,
	Form,
	Button,
	Table,
	Pagination,
} from "react-bootstrap"

import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useMain } from "../Components/useMain"
import { useAuth } from "../Components/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

const SetLogs = () => {
	const [workoutLogs, setWorkoutLogs] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 5
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = workoutLogs.slice(indexOfFirstItem, indexOfLastItem)
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}
	useEffect(() => {
		if (Math.ceil(workoutLogs.length / itemsPerPage) < currentPage)
			setCurrentPage(Math.ceil(workoutLogs.length / itemsPerPage))
	}, [workoutLogs, currentPage])

	const {
		selectedDate,
		selectedMuscle,
		selectedWorkout,
		handleDateChange,
		handleMuscleSelect,
		handleWorkoutSelect,
		Toast,
	} = useMain()
	const { authApi } = useAuth()
	const [weight, setWeight] = useState("")
	const [reps, setReps] = useState("")
	const [duration, setDuration] = useState("")

	const handleSubmit = (event) => {
		event.preventDefault()
		authApi
			.post("/api/workoutLogs/save", {
				selectedDate,
				selectedWorkout,
				weight,
				reps,
				duration,
			})
			.then((response) => {
				setWorkoutLogs((workoutLogs) => {
					return [
						...workoutLogs,
						{ id: response.data.id, weight, reps, duration },
					]
				})
				Toast.fire({
					icon: "success",
					title: "The action was completed successfully.",
				})
			})
			.catch(() => {
				Toast.fire({
					icon: "error",
					title: "Something went wrong.",
				})
			})
			.finally(() => {
				setWeight("")
				setReps("")
				setDuration("")
			})
	}

	useEffect(() => {
		if (selectedDate && selectedWorkout)
			authApi
				.post("/api/workoutLogs/get", {
					selectedDate,
					selectedWorkout,
				})
				.then((response) => {
					if (response.data.workoutLogs) {
						setWorkoutLogs(response.data.workoutLogs)
					}
				})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDate, selectedWorkout])

	const muscles = ["Chest", "Back", "Shoulders", "Legs", "Arms"]
	const workoutsByMuscle = {
		Chest: [
			{
				name: "Flat Bench Press",
				image: require("../images/bench_press.jpg"),
			},
			{
				name: "Incline Bench Press",
				image: require("../images/inclined_bench_press.jpg"),
			},
			{
				name: "Decline Bench Press",
				image: require("../images/declined_bench_press.jpg"),
			},
			{
				name: "Cable Crossover",
				image: require("../images/cable_crossover.jpg"),
			},
			{ name: "Chest Fly", image: require("../images/chest_fly.jpg") },
		],
		Back: [
			{ name: "Pull-ups" },
			{ name: "Deadlifts" },
			{ name: "Rows" },
			{
				name: "Lat Pulldowns",
			},
			{ name: "T-Bar Row" },
			{ name: "Chin-ups" },
		],
		Shoulders: [
			{
				name: "Shoulder Press",
			},
			{
				name: "Lateral Raises",
			},
			{
				name: "Front Raises",
			},
			{
				name: "Reverse Fly",
			},
			{
				name: "Upright Rows",
			},
			{
				name: "Arnold Press",
			},
		],
		Legs: [
			{ name: "Squats" },
			{ name: "Lunges" },
			{ name: "Leg Press" },
			{
				name: "Deadlifts",
			},
			{ name: "Leg Curls" },
			{
				name: "Calf Raises",
			},
		],
		Arms: [
			{
				name: "Bicep Curls",
			},
			{
				name: "Tricep Extensions",
			},
			{
				name: "Hammer Curls",
			},
			{
				name: "Skull Crushers",
			},
			{
				name: "Preacher Curls",
			},
			{
				name: "Tricep Dips",
			},
		],
	}

	return (
		<div>
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
					{selectedDate && (
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
										onClick={() =>
											handleMuscleSelect(muscle)
										}
									>
										{muscle}
									</ToggleButton>
								))}
							</ButtonGroup>
						</Col>
					)}
				</Row>
				{selectedMuscle && (
					<Row className="mt-4">
						<Col className="text-center">
							<h2>Choose a Workout:</h2>
							<div className="d-flex flex-wrap">
								{workoutsByMuscle[selectedMuscle].map(
									(workout) => (
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
												handleWorkoutSelect(
													workout.name
												)
											}
										>
											<Card.Img
												variant="top"
												src={workout.image}
											/>
											<Card.Body>
												<Card.Title>
													{workout.name}
												</Card.Title>
											</Card.Body>
										</Card>
									)
								)}
							</div>
						</Col>
					</Row>
				)}
			</Container>
			{selectedWorkout && (
				<>
					<Container className="mt-4 text-center">
						<h3>Selected Workout: {selectedWorkout}</h3>
						<Container className="my-5">
							<h2 className="mb-4">Submit Workout Details</h2>
							<Form onSubmit={handleSubmit}>
								<Row className="mb-3">
									<Col sm={6} className="mx-auto my-3">
										<Form.Group controlId="weight">
											<Form.Label>
												Weight (lbs)
											</Form.Label>
											<Form.Control
												type="number"
												placeholder="Enter weight used"
												value={weight}
												onChange={(e) =>
													setWeight(e.target.value)
												}
												required
											/>
										</Form.Group>
									</Col>
									<Col sm={6} className="mx-auto my-3">
										<Form.Group controlId="reps">
											<Form.Label>
												Number of Reps
											</Form.Label>
											<Form.Control
												type="number"
												placeholder="Enter number of reps"
												value={reps}
												onChange={(e) =>
													setReps(e.target.value)
												}
												required
											/>
										</Form.Group>
									</Col>
									<Col sm={6} className="mx-auto my-3">
										<Form.Group controlId="duration">
											<Form.Label>
												Duration (minutes)
											</Form.Label>
											<Form.Control
												type="number"
												placeholder="Enter duration of set (in minutes)"
												value={duration}
												onChange={(e) =>
													setDuration(e.target.value)
												}
												required
											/>
										</Form.Group>
									</Col>
								</Row>

								<Button
									variant="primary"
									type="submit"
									className="w-100"
								>
									Submit
								</Button>
							</Form>
						</Container>
					</Container>
					<Container className="mt-4 text-center">
						<Table striped bordered hover responsive>
							<thead>
								<tr>
									<th>Weight</th>
									<th>Reps</th>
									<th>Duration</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{currentItems.map((item, index) => (
									<tr key={index}>
										<td>{item.weight}</td>
										<td>{item.reps}</td>
										<td>{item.duration}</td>
										<td>
											<FontAwesomeIcon
												onClick={() => {
													authApi
														.post(
															"/api/workoutLogs/delete",
															{ id: item._id }
														)
														.then(() => {
															setWorkoutLogs(
																(
																	workoutLogs
																) => {
																	return [
																		...workoutLogs.filter(
																			(
																				val
																			) =>
																				val._id !==
																				item._id
																		),
																	]
																}
															)
														})
												}}
												icon={faX}
												className="mx-1 cursor-pointer"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						{/* Pagination component */}
						<div className="d-flex justify-content-center">
							<Pagination>
								{Array(
									Math.ceil(workoutLogs.length / itemsPerPage)
								)
									.fill()
									.map((_, index) => (
										<Pagination.Item
											key={index + 1}
											active={index + 1 === currentPage}
											onClick={() =>
												handlePageChange(index + 1)
											}
										>
											{index + 1}
										</Pagination.Item>
									))}
							</Pagination>
						</div>
					</Container>
				</>
			)}
		</div>
	)
}

export default SetLogs
