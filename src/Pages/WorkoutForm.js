import React, { useState } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"

const WorkoutForm = () => {
	const [weight, setWeight] = useState("")
	const [reps, setReps] = useState("")
	const [duration, setDuration] = useState("")

	const handleSubmit = (event) => {
		event.preventDefault()

		// Here you can handle the submission of the workout data
		console.log("Submitting workout details:", { weight, reps, duration })

		// Reset the form fields after submission
		setWeight("")
		setReps("")
		setDuration("")
	}

	return (
		<Container className="my-5">
			<h2 className="mb-4">Submit Workout Details</h2>
			<Form onSubmit={handleSubmit}>
				<Row className="mb-3">
					<Col sm={6} className="mx-auto my-3">
						<Form.Group controlId="weight">
							<Form.Label>Weight (lbs)</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter weight used"
								value={weight}
								onChange={(e) => setWeight(e.target.value)}
								required
							/>
						</Form.Group>
					</Col>
					<Col sm={6} className="mx-auto my-3">
						<Form.Group controlId="reps">
							<Form.Label>Number of Reps</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter number of reps"
								value={reps}
								onChange={(e) => setReps(e.target.value)}
								required
							/>
						</Form.Group>
					</Col>
					<Col sm={6} className="mx-auto my-3">
						<Form.Group controlId="duration">
							<Form.Label>Duration (minutes)</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter duration of set (in minutes)"
								value={duration}
								onChange={(e) => setDuration(e.target.value)}
								required
							/>
						</Form.Group>
					</Col>
				</Row>

				<Button variant="primary" type="submit" className="w-100">
					Submit
				</Button>
			</Form>
		</Container>
	)
}

export default WorkoutForm
