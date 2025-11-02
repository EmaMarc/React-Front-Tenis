import { Link, useLocation } from "react-router-dom";

const base =
	"relative flex items-center gap-2 text-gray-700 hover:text-primary-dark transition-colors " +
	"after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] " +
	"after:bg-gradient-to-r after:from-accent-dark after:to-primary-dark hover:after:w-full " +
	"after:transition-all after:duration-300 after:ease-out p-2";

export default function NavBarComponent() {
	const location = useLocation();
	const isActive = (path) => location.pathname === path;

	return (
		<ul className="flex items-center gap-16 text-gray-700">
			<li>
				<Link
					className={`${base} ${isActive("/") ? "after:w-full text-primary-dark" : "after:w-0 hover:after:w-full"}`}
					to="/">
					<span className="material-icons text-accent-dark scale-90">event</span>
					Reservas del día
				</Link>
			</li>
			<li>
				<Link
					className={`${base} ${isActive("/courts") ? "after:w-full text-primary-dark" : "after:w-0 hover:after:w-full"}`}
					to="/courts">
					<span className="material-icons text-accent-dark scale-90">sports_tennis</span>
					Canchas
				</Link>
			</li>
		</ul>
	);
}
