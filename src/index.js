import ReactDOM from "react-dom/client"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App"
import { HashRouter as Router } from "react-router-dom"
import MainComponent from "./Components/useMain"
import AuthProvider from "./Components/useAuth"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	//<React.StrictMode>
	<Router>
		<MainComponent>
			<AuthProvider>
				<App />
			</AuthProvider>
		</MainComponent>
	</Router>
	//</React.StrictMode>
)
