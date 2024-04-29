import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const Navigation = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg" fixed="top">
			<Navbar.Brand as={Link} to="#">
				Fitness Tracker
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<Nav.Link as={Link} to="/">
						Dashboard
					</Nav.Link>
					<Nav.Link as={Link} to="/set">
						Set workout
					</Nav.Link>
					<Nav.Link as={Link} to="/history">
						Workout History
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Navigation
