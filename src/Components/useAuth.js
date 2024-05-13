import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import { useMain } from "./useMain"
import { googleLogout } from "@react-oauth/google"

const AuthContent = React.createContext()

export function useAuth() {
	return useContext(AuthContent)
}

const AuthProvider = ({ children }) => {
	const [workoutLogs, setWorkoutLogs] = useState([])
	const cookies = new Cookies(null, { path: "/" })
	const [temporaryAuthCookie, setTemporaryAuthCookie] = useState()

	const { setShowPreloader, Toast } = useMain()
	const pathname = useLocation().pathname
	const [firstLogin, setFirstLogin] = useState(false)
	const defaultFormData = {
		fullname: "",
		email: "",
		password: "",
		rePassword: "",
	}
	const [formData, setFormData] = useState(defaultFormData)
	const [validator, setValidator] = useState(defaultFormData)
	const regExEmail =
		/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
	const handleFormData = (e) => {
		setFormData((formData) => {
			return { ...formData, [e.target.name]: e.target.value }
		})
		if (
			(e.target.name === "email" && regExEmail.test(e.target.value)) ||
			(e.target.name !== "email" && e?.target.value)
		)
			setValidator((validator) => {
				return { ...validator, [e.target.name]: true }
			})
		else
			setValidator((validator) => {
				return { ...validator, [e.target.name]: undefined }
			})
	}
	const navigate = useNavigate()
	const [user, setUser] = useState({})
	const [loadingLogin, setLoadingLogin] = useState(false)
	const [loggedIn, setLoggedIn] = useState()
	const authApi = axios.create({
		baseURL: process.env.REACT_APP_ENV_SERVER_URL,
		withCredentials: true,
		headers:
			cookies.get("cs") || temporaryAuthCookie
				? {
						Authorization: `Bearer ${
							cookies.get("cs")
								? cookies.get("cs")
								: temporaryAuthCookie
						}`,
				  }
				: {},
	})
	const loginHandler = (response) => {
		if (response?.data) {
			if (response.data?.csrfToken) {
				cookies.set("cs", response.data.csrfToken, {
					path: "/",
					sameSite: "Strict",
					// secure: true,
				})
			}

			setUser(response.data)
			setLoggedIn(true)
			setFormData(defaultFormData)
			setValidator({})
			if (
				pathname.indexOf("signin") !== -1 ||
				pathname.indexOf("signup") !== -1
			)
				navigate("/", { replace: true })
		} else
			Toast.fire({
				icon: "error",
				title: "Something went wrong",
			})
	}
	const loginCatchHandler = (e) => {
		if (e.config.url !== "/api/users/get/") {
			if (e?.response?.data?.message)
				Toast.fire({
					icon: "error",
					title: e.response.data.message,
				})
			else
				Toast.fire({
					icon: "error",
					title: "Something went wrong",
				})
			setLoggedIn(false)
			setValidator((validator) => {
				return {
					...validator,
					email: false,
					emailFeedback:
						e?.response?.data?.message &&
						e.response.data.message === "Email already exists"
							? e.response.data.message
							: "Invalid Credentials",
					password:
						e?.response?.data?.message &&
						e.response.data.message !== "Email already exists"
							? false
							: undefined,
					passwordFeedback:
						e?.response?.data?.message &&
						e.response.data.message !== "Email already exists"
							? "Invalid Credentials"
							: "",
				}
			})
		} else {
			if (
				pathname.indexOf("forgot") === -1 &&
				pathname.indexOf("signin") === -1 &&
				pathname.indexOf("signup") === -1
			)
				navigate("/signin")
		}
	}
	const login = (formData) => {
		if (!loadingLogin) {
			setLoadingLogin(true)
			authApi
				.post(`/api/users/login/`, formData)
				.then(loginHandler)
				.catch(loginCatchHandler)
				.finally(() => {
					setLoadingLogin(false)
				})
		}
	}
	const resetPassword = (formData) => {
		// if (!loadingLogin) {
		// 	setLoadingLogin(true)
		// 	authApi
		// 		.post(`/api/users/resetPassword/`, formData)
		// 		.then((response) => {
		// 			console.log(response)
		// 		})
		// 		.catch(loginCatchHandler)
		// 		.finally(() => {
		// 			setLoadingLogin(false)
		// 		})
		// }
		Toast.fire({
			icon: "warning",
			title: "Unfortunately, the service is currently unavailable.",
		})
	}
	const register = (formData) => {
		if (!loadingLogin) {
			setLoadingLogin(true)
			authApi
				.post(`/api/users/register/`, formData)
				.then(loginHandler)
				.catch(loginCatchHandler)
				.finally(() => {
					setLoadingLogin(false)
				})
		}
	}
	const logout = () => {
		if (!loadingLogin) {
			setShowPreloader(true)
			setLoadingLogin(true)
			authApi
				.get(`/api/users/logout/`)
				.then(() => {
					googleLogout()
					setUser({})
					setLoggedIn(false)
					cookies.remove("cs")
					setTemporaryAuthCookie(undefined)
					navigate("/signin")
				})
				.catch(() => {
					Toast.fire({
						icon: "error",
						title: "Something went wrong.",
					})
				})
				.finally(() => {
					setShowPreloader(false)
					setLoadingLogin(false)
				})
		}
	}

	useEffect(() => {
		if (loggedIn === undefined) {
			if (cookies.get("cs")) setTemporaryAuthCookie(cookies.get("cs"))

			authApi
				.get(`/api/users/get/`)
				.then(loginHandler)
				.catch(loginCatchHandler)
				.finally(() => {
					setFirstLogin(true)
					cookies.set("serverStarted", true, {
						path: "/",
						expires: new Date(Date.now() + 900000),
					})
				})
		}
		setValidator({})
		// if (!loggedIn && !loadingLogin) setValidator({})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingLogin, loggedIn, pathname, user])

	const onLoginSubmit = (e) => {
		if (e.credential) {
			setLoadingLogin(true)
			authApi
				.post(`/api/users/googleLogin/`, e)
				.then(loginHandler)
				.catch(loginCatchHandler)
				.finally(() => {
					setLoadingLogin(false)
					setFirstLogin(true)
				})
		} else {
			e.preventDefault()
			if (
				formData?.email &&
				regExEmail.test(formData.email) &&
				formData?.password
			) {
				setValidator((validator) => {
					return {
						...validator,
						email: true,
						password: true,
					}
				})
				login(formData)
			} else {
				!formData?.email
					? setValidator((validator) => {
							return {
								...validator,
								email: false,
							}
					  })
					: regExEmail.test(formData.email)
					? setValidator((validator) => {
							return {
								...validator,
								email: true,
							}
					  })
					: setValidator((validator) => {
							return {
								...validator,
								email: false,
								emailFeedback:
									"Please enter a valid email address",
							}
					  })
				!formData?.password
					? setValidator((validator) => {
							return {
								...validator,
								password: false,
							}
					  })
					: setValidator((validator) => {
							return {
								...validator,
								password: true,
							}
					  })
			}
		}
	}

	const onSignUpSubmit = (e) => {
		e.preventDefault()
		if (
			formData?.email &&
			regExEmail.test(formData.email) &&
			formData?.fullname &&
			formData?.password
		) {
			setValidator((validator) => {
				return {
					...validator,
					fullname: true,
					email: true,
					password: true,
				}
			})
			register(formData)
		} else {
			!formData?.fullname
				? setValidator((validator) => {
						return {
							...validator,
							fullname: false,
						}
				  })
				: setValidator((validator) => {
						return {
							...validator,
							fullname: true,
						}
				  })
			!formData?.email
				? setValidator((validator) => {
						return {
							...validator,
							email: false,
						}
				  })
				: regExEmail.test(formData.email)
				? setValidator((validator) => {
						return { ...validator, email: true }
				  })
				: setValidator((validator) => {
						return {
							...validator,
							email: false,
							emailFeedback: "Please enter a valid email address",
						}
				  })
			!formData?.password
				? setValidator((validator) => {
						return {
							...validator,
							password: false,
						}
				  })
				: setValidator((validator) => {
						return {
							...validator,
							password: true,
						}
				  })
		}
	}

	return (
		<AuthContent.Provider
			value={{
				authApi,
				login,
				resetPassword,
				register,
				logout,
				loggedIn,
				loadingLogin,
				user,
				setUser,
				defaultFormData,
				formData,
				setFormData,
				handleFormData,
				firstLogin,
				setFirstLogin,
				validator,
				setValidator,
				regExEmail,
				temporaryAuthCookie,
				onLoginSubmit,
				onSignUpSubmit,
				setLoadingLogin,
				workoutLogs,
				setWorkoutLogs,
			}}
		>
			{children}
		</AuthContent.Provider>
	)
}

export default AuthProvider
