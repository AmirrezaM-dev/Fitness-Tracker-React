import { Container, Form, Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../Components/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const LoginForm = () => {
	const {
		firstLogin,
		handleFormData,
		formData,
		validator,
		loadingLogin,
		onLoginSubmit,
	} = useAuth()

	return (
		<div className="login-container">
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} md={6} lg={4}>
						<div className="login-form">
							<h2 className="text-center mb-4">Login</h2>
							<Form onSubmit={onLoginSubmit}>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type="email"
										name="email"
										placeholder="Enter email"
										value={formData.email}
										onChange={(e) => handleFormData(e)}
										disabled={!firstLogin}
										isInvalid={validator.email === false}
										isValid={validator.email}
									/>
									<Form.Control.Feedback type="invalid">
										{validator?.emailFeedback
											? validator?.emailFeedback
											: "Please enter your email address"}
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										name="password"
										placeholder="Password"
										value={formData.password}
										onChange={(e) => handleFormData(e)}
										disabled={!firstLogin}
										isInvalid={validator.password === false}
										isValid={validator.password}
									/>
									<Form.Control.Feedback type="invalid">
										{validator?.passwordFeedback
											? validator?.passwordFeedback
											: "Please enter your password"}
									</Form.Control.Feedback>
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
										"Sign In"
									)}
								</Button>
							</Form>
							<div className="mt-3 text-center">
								<p>
									Don't have an account?{" "}
									<Link to="/signup">Sign up</Link>
								</p>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default LoginForm
