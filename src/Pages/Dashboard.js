import React, { useEffect, useState } from "react"
import {
	Container,
	Row,
	Col,
	Table,
	Form,
	DropdownButton,
	Dropdown,
	Pagination,
} from "react-bootstrap"
import { useAuth } from "../Components/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner, faX } from "@fortawesome/free-solid-svg-icons"
import "../assets/dashboard.css"

const Dashboard = () => {
	const { authApi } = useAuth()
	const [isDeleting, setIsDeleting] = useState([])
	const [workoutHistory, setWorkoutHistory] = useState([])
	const [searchTerm, setSearchTerm] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const [totalItems, setTotalItems] = useState(0)
	const [itemsPerPage, setItemsPerPage] = useState(10) // Number of items per page

	useEffect(() => {
		authApi
			.post("/api/workoutLogs/get", {
				searchTerm,
				numColumns: itemsPerPage,
				currentPage,
			})
			.then((response) => {
				setWorkoutHistory(response.data.workoutLogs)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm, itemsPerPage, currentPage])
	useEffect(() => {
		authApi
			.post("/api/workoutLogs/getCount", {
				searchTerm,
			})
			.then((response) => {
				setTotalItems(response.data.count)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm, itemsPerPage])

	const handleSearch = (e) => {
		const term = e.target.value
		setSearchTerm(term)
	}

	const handleColumnSelect = (num) => {
		setItemsPerPage(num)
	}

	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	return (
		<Container className="mt-5 pt-5">
			<h1>Fitness Dashboard</h1>
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
										title={`Columns per row: ${itemsPerPage}`}
										variant={"light"}
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
									<th>Weight</th>
									<th>Reps</th>
									<th>Duration</th>
									<th>Date</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{workoutHistory.map((workout, index) => (
									<tr key={index}>
										<td>{workout.selectedWorkout}</td>
										<td>{workout.weight}</td>
										<td>{workout.reps}</td>
										<td>{workout.duration}</td>
										<td>
											{workout.selectedDate.split("T")[0]}
										</td>
										<td className="text-center">
											<FontAwesomeIcon
												onClick={() => {
													if (
														!isDeleting.indexOf(
															workout._id
														) > -1
													) {
														setIsDeleting(
															(isDeleting) => {
																return [
																	...isDeleting,
																	workout._id,
																]
															}
														)
														authApi
															.post(
																"/api/workoutLogs/delete",
																{
																	id: workout._id,
																}
															)
															.then(() => {
																setTotalItems(
																	(
																		totalItems
																	) =>
																		totalItems -
																		1
																)
																setWorkoutHistory(
																	(
																		workoutLogs
																	) => {
																		return [
																			...workoutLogs.filter(
																				(
																					val
																				) =>
																					val._id !==
																					workout._id
																			),
																		]
																	}
																)
															})
													}
												}}
												disabled={
													isDeleting.indexOf(
														workout._id
													) > -1
												}
												icon={
													isDeleting.indexOf(
														workout._id
													) > -1
														? faSpinner
														: faX
												}
												spin={
													isDeleting.indexOf(
														workout._id
													) > -1
														? true
														: false
												}
												className={`mx-1 ${
													isDeleting.indexOf(
														workout._id
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

						{/* Pagination */}
						<div className="d-flex justify-content-center">
							<Pagination>
								{Array(Math.ceil(totalItems / itemsPerPage))
									.fill()
									.map((_, index) => (
										<Pagination.Item
											key={index + 1}
											active={index + 1 === currentPage}
											onClick={() => paginate(index + 1)}
										>
											{index + 1}
										</Pagination.Item>
									))}
							</Pagination>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default Dashboard
