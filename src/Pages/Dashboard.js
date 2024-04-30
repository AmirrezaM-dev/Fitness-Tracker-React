import React, { useEffect, useState } from "react"
import {
	Container,
	Row,
	Col,
	// Card,
	Table,
	Form,
	DropdownButton,
	Dropdown,
} from "react-bootstrap"
import { useAuth } from "../Components/useAuth"

const Dashboard = () => {
	const { authApi } = useAuth()
	const [workoutHistory, setWorkoutHistory] = useState([])
	const [searchTerm, setSearchTerm] = useState("")
	const [numColumns, setNumColumns] = useState(10) // Default number of columns per row
	const [filteredWorkouts, setFilteredWorkouts] = useState([])

	useEffect(() => {
		authApi
			.post("/api/workoutLogs/get", { searchTerm, numColumns })
			.then((response) => {
				setWorkoutHistory(response.data.workoutLogs)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm, numColumns])

	useEffect(() => {
		setFilteredWorkouts(workoutHistory)
	}, [workoutHistory])

	const handleSearch = (e) => {
		const term = e.target.value
		setSearchTerm(term)
	}
	const handleColumnSelect = (num) => {
		setNumColumns(num)
	}

	return (
		<Container className="mt-5 pt-5">
			<h1>Fitness Dashboard</h1>
			{/* <Row className="mt-4">
				<Col>
					<Card>
						<Card.Body>
							<Card.Title>Today</Card.Title>
							<Card.Text>
								Sets Completed: This feature will be available
								soon <br />
								Calories Burned: This feature will be available
								soon <br />
								Calories Consumed: This feature will be
								available soon
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Body>
							<Card.Title>Last Week</Card.Title>
							<Card.Text>
								Sets Completed: This feature will be available
								soon <br />
								Calories Burned: This feature will be available
								soon <br />
								Calories Consumed: This feature will be
								available soon
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Body>
							<Card.Title>Last Month</Card.Title>
							<Card.Text>
								Sets Completed: This feature will be available
								soon <br />
								Calories Burned: This feature will be available
								soon <br />
								Calories Consumed: This feature will be
								available soon
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row> */}
			<Row>
				<Col>
					<div className="mt-4">
						<Form.Group controlId="search" className="mb-4">
							<Row className="mx-auto">
								<Col md={9}>
									<Form.Control
										type="text"
										placeholder="Search by workout name"
										value={searchTerm}
										onChange={handleSearch}
									/>
								</Col>
								<Col md={3} className="text-end">
									<DropdownButton
										id="dropdown-columns"
										title={`Columns per row: ${numColumns}`}
									>
										{[10, 25, 50, 100].map((num) => (
											<Dropdown.Item
												key={num}
												onClick={() =>
													handleColumnSelect(num)
												}
											>
												{num}
											</Dropdown.Item>
										))}
									</DropdownButton>
								</Col>
							</Row>
						</Form.Group>

						<Table striped bordered hover responsive>
							<thead>
								<tr>
									<th>Workout Name</th>
									<th>Weight (lbs)</th>
									<th>Reps</th>
									<th>Duration (minutes)</th>
									<th>Date</th>
								</tr>
							</thead>
							<tbody>
								{filteredWorkouts.map((workout, index) => (
									<tr key={index}>
										<td>{workout.selectedWorkout}</td>
										<td>{workout.weight}</td>
										<td>{workout.reps}</td>
										<td>{workout.duration}</td>
										<td>
											{workout.selectedDate.split("T")[0]}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default Dashboard
