import { Container, Form, Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../Components/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { GoogleLogin } from "@react-oauth/google"

const SignUpForm = () => {
	const {
		firstLogin,
		handleFormData,
		formData,
		validator,
		loadingLogin,
		onSignUpSubmit,
		onLoginSubmit,
	} = useAuth()

	return (
		<div className="signup-container">
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} md={6} lg={4}>
						<div className="signup-form">
							<h2 className="text-center mb-4">Sign Up</h2>
							<Form onSubmit={onSignUpSubmit}>
								<Form.Group controlId="formBasicName">
									<Form.Label>Fullname</Form.Label>
									<Form.Control
										type="text"
										name="fullname"
										placeholder="Enter your name"
										value={formData.fullname}
										onChange={(e) => handleFormData(e)}
										disabled={!firstLogin || loadingLogin}
										isInvalid={validator.fullname === false}
										isValid={validator.fullname}
									/>
								</Form.Group>

								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type="email"
										name="email"
										placeholder="Enter email"
										value={formData.email}
										onChange={(e) => handleFormData(e)}
										disabled={!firstLogin || loadingLogin}
										isInvalid={validator.email === false}
										isValid={validator.email}
									/>
								</Form.Group>

								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										name="password"
										placeholder="Password"
										value={formData.password}
										onChange={(e) => handleFormData(e)}
										disabled={!firstLogin || loadingLogin}
										isInvalid={validator.password === false}
										isValid={validator.password}
									/>
								</Form.Group>

								<Button
									variant="primary"
									type="submit"
									className="btn-block mt-3"
									disabled={!firstLogin || loadingLogin}
								>
									{!firstLogin || loadingLogin ? (
										<FontAwesomeIcon
											icon={faSpinner}
											spin
										/>
									) : (
										"Sign Up"
									)}
								</Button>
							</Form>
							<div className="mt-3 text-center">
								<p>
									Already have an account?{" "}
									<Link to="/signin">Log in</Link>
								</p>
							</div>
							<div
								className={`google-auth ${
									!firstLogin || loadingLogin ? "d-none" : ""
								}`}
							>
								<GoogleLogin
									onSuccess={
										onLoginSubmit /* (credentialResponse) => {
										console.log(credentialResponse)
										setLoadingLogin(true)
									} */
									}
									onError={() => {
										console.log("Login Failed")
									}}
								/>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default SignUpForm
