import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"

const Dashboard = () => {
	const data = {
		today: {
			setsCompleted: 3,
			avgCalories: 150,
		},
		lastWeek: {
			setsCompleted: 20,
			avgCalories: 140,
		},
		lastMonth: {
			setsCompleted: 90,
			avgCalories: 130,
		},
	}

	const { today, lastWeek, lastMonth } = data

	return (
		<Container className="mt-5 pt-5">
			<h1>Fitness Dashboard</h1>
			<Row className="mt-4">
				<Col>
					<Card>
						<Card.Body>
							<Card.Title>Today</Card.Title>
							<Card.Text>
								Sets Completed: {today.setsCompleted} <br />
								Calories Burned: {today.avgCalories} <br />
								Calories Consumed: {today.avgCalories}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Body>
							<Card.Title>Last Week</Card.Title>
							<Card.Text>
								Sets Completed: {lastWeek.setsCompleted} <br />
								Average Calories: {lastWeek.avgCalories}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Body>
							<Card.Title>Last Month</Card.Title>
							<Card.Text>
								Sets Completed: {lastMonth.setsCompleted} <br />
								Average Calories: {lastMonth.avgCalories}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default Dashboard
