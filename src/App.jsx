import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import HomePage from "./pages/bookings/HomePage";
import CourtPage from "./pages/courts/CourtPage";
import RegisterPage from "./pages/register/RegisterPage";
import UsersListPage from "./pages/users/UsersListPage";
import UserEditPage from "./pages/users/UserEditPage";
import ChangePasswordPage from "./pages/users/ChangePasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import { isAdmin } from "./utils/auth.js";

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
			<main className="mx-auto max-w-7xl px-8 py-8">
				<Routes>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/register"
						element={<RegisterPage />}
					/>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					<Route
						path="/logout"
						element={<LogoutPage />}
					/>
					<Route
						path="/change-password"
						element={<ChangePasswordPage />}
					/>
					<Route
						path="/courts"
						element={<CourtPage />}
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
				</Routes>
			</main>
			<FooterComponent />
		</BrowserRouter>
	);
}
