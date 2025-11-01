import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import NavBarComponent from "./components/NavBarComponent";
import HomePage from "./pages/bookings/HomePage";
import CourtPage from "./pages/courts/CourtPage";
import RegisterPage from "./pages/register/RegisterPage";
import UsersListPage from "./pages/users/UsersListPage";
import UserEditPage from "./pages/users/UserEditPage";
import ChangePasswordPage from "./pages/users/ChangePasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import { isAdmin } from "./utils/auth.js";
import "./App.css";

function AdminRoute({ children }) {
	return isAdmin() ? (
		children
	) : (
		<Navigate
			to="/"
			replace
		/>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<HeaderComponent />
			<NavBarComponent />
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/courts"
					element={<CourtPage />}
				/>
				<Route
					path="/register"
					element={<RegisterPage />}
				/>
				<Route
					path="/users"
					element={
						<AdminRoute>
							<UsersListPage />
						</AdminRoute>
					}
				/>
				<Route
					path="/users/:id/edit"
					element={<UserEditPage />}
				/>
				<Route
					path="/change-password"
					element={<ChangePasswordPage />}
				/>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/logout"
					element={<LogoutPage />}
				/>
			</Routes>
			<FooterComponent />
		</BrowserRouter>
	);
}
