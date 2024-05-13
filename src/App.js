import {
	Routes,
	Route,
	useLocation,
	useNavigate,
	// useRoutes,
} from "react-router-dom"

import { useEffect } from "react"
import { useMain } from "./Components/useMain"
import { useAuth } from "./Components/useAuth"
import PreLoader from "./Pages/PreLoader"
import LoginForm from "./Pages/LoginForm"
import SignUpForm from "./Pages/SignUpForm"
import Dashboard from "./Pages/Dashboard"
import SetLogs from "./Pages/SetLogs"
import Navigation from "./Components/Navigation"

const App = () => {
	const { showPreloader } = useMain()
	const { loggedIn, firstLogin } = useAuth()
	const pathname = useLocation().pathname
	const navigate = useNavigate()
	useEffect(() => {
		if (
			loggedIn &&
			(pathname.indexOf("signin") !== -1 ||
				pathname.indexOf("signup") !== -1)
		)
			navigate("/")

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedIn, pathname])
	return !firstLogin || showPreloader ? (
		<PreLoader />
	) : (
		<>
			<Navigation />
			<main className={loggedIn ? "pt-5" : ""}>
				<Routes>
					<Route path={"/signin"} element={<LoginForm />} />
					<Route path={"/signup"} element={<SignUpForm />} />
					<Route path={"/"} element={<Dashboard />} />
					<Route path={"/set"} element={<SetLogs />} />
				</Routes>
			</main>
		</>
	)
}

export default App
