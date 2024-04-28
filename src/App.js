import {
	Routes,
	Route,
	useLocation,
	useNavigate,
	useRoutes,
} from "react-router-dom"

import { useEffect } from "react"
import { useMain } from "./Components/useMain"
import { useAuth } from "./Components/useAuth"
import PreLoader from "./Pages/PreLoader"
import LoginForm from "./Pages/LoginForm"
import SignUpForm from "./Pages/SignUpForm"

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
		<Routes>
			<Route path={"/signin"} element={<LoginForm />} />
			<Route path={"/signup"} element={<SignUpForm />} />
		</Routes>
	)
}

export default App
