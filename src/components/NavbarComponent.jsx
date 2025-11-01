import { Link } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function NavBarComponent() {
	const user = getUser();
	return (
		<nav className="nav">
			<Link to="/">
				<span className="material-icons">event</span> Reservas del día
			</Link>

			<Link to="/courts">
				<span className="material-icons">sports_tennis</span> Canchas
			</Link>

			<Link to="/register">
				<span className="material-icons">person_add</span> Registro
			</Link>

			{user ? (
				<>
					<span>
						<span className="material-icons">account_circle</span> Hola, {user.first_name} {user.last_name}
					</span>
					<Link to="/logout">
						<span className="material-icons">logout</span> Logout
					</Link>
				</>
			) : (
				<Link to="/login">
					<span className="material-icons">login</span> Login
				</Link>
			)}
		</nav>
	);
}
