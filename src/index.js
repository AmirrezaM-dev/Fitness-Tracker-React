import ReactDOM from "react-dom/client"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App"
import { HashRouter as Router } from "react-router-dom"
import MainComponent from "./Components/useMain"
import AuthProvider from "./Components/useAuth"
import { GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	//<React.StrictMode>
	<GoogleOAuthProvider clientId={process.env.REACT_APP_ENV_GOOGLE_CLIENT_ID}>
		<Router>
			<MainComponent>
				<AuthProvider>
					<App />
				</AuthProvider>
			</MainComponent>
		</Router>
	</GoogleOAuthProvider>
	//</React.StrictMode>
)
