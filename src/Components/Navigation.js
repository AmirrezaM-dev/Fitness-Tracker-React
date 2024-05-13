import React from "react"
import { Navbar, Nav, Container } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "./useAuth"

const Navigation = () => {
	const { loggedIn, logout } = useAuth()
	const pathname = useLocation().pathname
	return (
		loggedIn && (
			<Navbar bg="dark" variant="dark" expand="lg" className="py-3">
				<Container>
					<Navbar.Brand as={Link} to="/">
						Fitness Tracker
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link
								active={pathname === "/"}
								as={Link}
								to="/"
							>
								Dashboard
							</Nav.Link>
							<Nav.Link
								as={Link}
								to="/set"
								active={pathname === "/set"}
							>
								Set workout
							</Nav.Link>
							<Nav.Link onClick={logout}>Logout</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		)
	)
}

export default Navigation
