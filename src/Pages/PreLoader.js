import React, { useEffect, useState } from "react"
import { Container, Spinner, ProgressBar, Row, Col } from "react-bootstrap"
import "../assets/preloader.css"
import Cookies from "universal-cookie"

const Preloader = () => {
	const cookies = new Cookies(null, { path: "/" })
	const [progress, setProgress] = useState(0)
	const serverStarted = cookies.get("serverStarted")

	useEffect(() => {
		const interval = setInterval(() => {
			// Simulate loading progress
			if (progress < 100) {
				setProgress((prevProgress) => prevProgress + 1)
			} else {
				cookies.set("serverStarted", true, {
					path: "/",
					expires: new Date(Date.now() + 900000),
				})
			}
		}, 1051) // Update progress every second

		return () => clearInterval(interval)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [progress])

	return (
		<div className="preloader-container">
			<Container>
				<Row className="justify-content-center">
					<Col>
						<Container className="d-flex justify-content-center align-items-center">
							<Spinner animation="grow" variant="primary" />
							<h4 className="ml-3">Loading...</h4>
						</Container>
						{!serverStarted ? (
							<ProgressBar
								className="mt-5"
								now={progress}
								label={`${progress}%`}
							/>
						) : (
							<></>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Preloader
