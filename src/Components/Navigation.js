import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "./useAuth"

const Navigation = () => {
	const { loggedIn, logout } = useAuth()
	return (
		loggedIn && (
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
						<Nav.Link onClick={logout}>Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	)
}

export default Navigation
