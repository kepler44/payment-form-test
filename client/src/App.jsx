import "./App.scss";
import PaymentPage from "./pages/payment.page";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {
	useRoutes,
	Navigate,
	useLocation,
	Link,
	useNavigate,
} from "react-router-dom";
import OrderHistory from "./pages/orderHistory.page";
import Navbar from "./components/navbar";

function App() {
	const navigate = useNavigate();

	return (
		<React.Fragment>
			<Navbar />
			<br />
			<RenderRoutes />
		</React.Fragment>
	);
}

function RenderRoutes() {
	const routes = useRoutes([
		{
			index: "true",
			path: "/",
			element: <PaymentPage />,
		},
		{
			path: "/home",
			element: <Navigate to="/" replace="true" />,
		},
		{
			path: "/orders",
			element: <OrderHistory />,
		},
		{
			path: "*",
			//element: <Navigate to="/404" replace="true" />,
			element: <div>page not found</div>,
		},
	]);
	return <div>{routes}</div>;
}

export default App;

/*value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}*/
/*<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>*/
