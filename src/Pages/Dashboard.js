import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"

const Dashboard = () => {
	return (
		<Container className="mt-5 pt-5">
			<h1>Fitness Dashboard</h1>
			<Row className="mt-4">
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
			</Row>
		</Container>
	)
}

export default Dashboard
