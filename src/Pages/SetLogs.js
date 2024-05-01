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
import { faSpinner, faX } from "@fortawesome/free-solid-svg-icons"

const SetLogs = () => {
	const {
		selectedDate,
		selectedMuscle,
		selectedWorkout,
		handleDateChange,
		handleMuscleSelect,
		handleWorkoutSelect,
		Toast,
	} = useMain()
	const [isLoading, setIsLoading] = useState(false)
	const [isDeleting, setIsDeleting] = useState([])
	const { authApi, workoutLogs, setWorkoutLogs } = useAuth()
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
			setCurrentPage(Math.ceil(workoutLogs.length / itemsPerPage) + 1)
	}, [workoutLogs, currentPage])

	const [weight, setWeight] = useState("")
	const [reps, setReps] = useState("")
	const [duration, setDuration] = useState("")

	const handleSubmit = (event) => {
		event.preventDefault()
		setIsLoading(true)
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
						{ _id: response.data.id, weight, reps, duration },
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
				setIsLoading(false)
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
			{
				name: "Flat Dumbbell Press",
				image: require("../images/flat_bench.jpg"),
			},
			{
				name: "Incline Dumbbell Press",
				image: require("../images/inclined_bench.jpg"),
			},
			{
				name: "Dumbbell Flies",
				image: require("../images/flat_bench.jpg"),
			},
			{
				name: "Pure Chest Press",
				image: require("../images/pure_chest.jpg"),
			},
			{
				name: "Pure Inclined Chest Press",
				image: require("../images/pure_inclinechest.jpg"),
			},
			{
				name: "Pure Wide Chest Press",
				image: require("../images/pure_widechest.jpg"),
			},
		],
		Back: [
			{
				name: "Lat Pulldowns",
				image: require("../images/wide_lat.jpg"),
			},
			{
				name: "Pure Lat Pulldowns",
				image: require("../images/pure_lat.jpg"),
			},
			{
				name: "Pull-ups",
				image: require("../images/assisted_calisthenics.jpg"),
			},
			{
				name: "Chin-ups",
				image: require("../images/assisted_calisthenics.jpg"),
			},
			{
				name: "Pure Rows",
				image: require("../images/pure_row.jpg"),
			},
			{
				name: "Pure Low Rows",
				image: require("../images/pure_lowrow.jpg"),
			},
			{ name: "T-Bar Row", image: require("../images/tbar_row.jpg") },
			{ name: "Dumbbell Rows", image: require("../images/dumbbell.jpg") },
			{ name: "Barbell Rows", image: require("../images/barbell.jpg") },
			{ name: "Deadlifts", image: require("../images/barbell.jpg") },
		],
		Shoulders: [
			{
				name: "Shoulder Press",
				image: require("../images/shoulder_press.jpg"),
			},
			{
				name: "Military Press",
				image: require("../images/barbell.jpg"),
			},
			{
				name: "Lateral Raises",
				image: require("../images/dumbbell.jpg"),
			},
			{
				name: "Front Raises",
				image: require("../images/dumbbell.jpg"),
			},
			{
				name: "Reverse Fly",
				image: require("../images/dumbbell.jpg"),
			},
		],
		Legs: [
			{
				name: "Leg Press",
				image: require("../images/legpress.jpg"),
			},
			{ name: "Leg Curls", image: require("../images/leg_curl.jpg") },
			{
				name: "Leg Extensions",
				image: require("../images/leg_ext.jpg"),
			},
			{
				name: "Hip Abductor",
				image: require("../images/hip_abductor.jpg"),
			},
			{
				name: "Hip Adductor",
				image: require("../images/hip_adductor.jpg"),
			},
			{
				name: "Deadlifts",
				image: require("../images/barbell.jpg"),
			},
			{ name: "Squats", image: require("../images/barbell.jpg") },
			{ name: "Lunges", image: require("../images/dumbbell.jpg") },
			{
				name: "Calf Raises",
				image: require("../images/dumbbell.jpg"),
			},
		],
		Arms: [
			{
				name: "Dumbbell Bicep Curls",
				image: require("../images/dumbbell.jpg"),
			},
			{
				name: "Barbell Bicep Curls",
				image: require("../images/barbell.jpg"),
			},
			{
				name: "Tricep Rope Extensions",
				image: require("../images/cable.jpg"),
			},
			{
				name: "Tricep Stright Bar Extensions",
				image: require("../images/cable.jpg"),
			},
			{
				name: "Tricep V-Shaped Bar Extensions",
				image: require("../images/cable.jpg"),
			},
			{
				name: "Dumbbell Hammer Curls",
				image: require("../images/dumbbell.jpg"),
			},
			{
				name: "Skull Crushers",
				image: require("../images/ez_bar.jpg"),
			},
			{
				name: "Preacher Curls",
				image: require("../images/scottbench.jpg"),
			},
			{
				name: "Tricep Dips",
				image: require("../images/assisted_calisthenics.jpg"),
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
											<Form.Label>Weight</Form.Label>
											<Form.Control
												type="number"
												placeholder="Enter weight used"
												value={weight}
												disabled={isLoading}
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
												disabled={isLoading}
												onChange={(e) =>
													setReps(e.target.value)
												}
												required
											/>
										</Form.Group>
									</Col>
									<Col sm={6} className="mx-auto my-3">
										<Form.Group controlId="duration">
											<Form.Label>Duration</Form.Label>
											<Form.Control
												type="number"
												placeholder="Enter duration of set"
												value={duration}
												disabled={isLoading}
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
									disabled={isLoading} // Disable button while loading
								>
									{isLoading ? (
										<FontAwesomeIcon
											icon={faSpinner}
											spin
										/>
									) : (
										"Submit"
									)}
								</Button>
							</Form>
						</Container>
					</Container>
					{currentItems.length && (
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
														if (
															!isDeleting.indexOf(
																item._id
															) > -1
														) {
															setIsDeleting(
																(
																	isDeleting
																) => {
																	return [
																		...isDeleting,
																		item._id,
																	]
																}
															)
															authApi
																.post(
																	"/api/workoutLogs/delete",
																	{
																		id: item._id,
																	}
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
														}
													}}
													disabled={
														isDeleting.indexOf(
															item._id
														) > -1
													}
													icon={
														isDeleting.indexOf(
															item._id
														) > -1
															? faSpinner
															: faX
													}
													spin={
														isDeleting.indexOf(
															item._id
														) > -1
															? true
															: false
													}
													className={`mx-1 ${
														isDeleting.indexOf(
															item._id
														) > -1
															? ""
															: "cursor-pointer"
													}`}
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
										Math.ceil(
											workoutLogs.length / itemsPerPage
										)
									)
										.fill()
										.map((_, index) => (
											<Pagination.Item
												key={index + 1}
												active={
													index + 1 === currentPage
												}
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
					)}
				</>
			)}
		</div>
	)
}

export default SetLogs
