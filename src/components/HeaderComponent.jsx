import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBarComponent from "./NavbarComponent.jsx";

import logo from "../assets/images/logo.png";
import { getUser, onAuthChange, doLogout } from "../utils/auth";

export default function HeaderComponent() {
	const nav = useNavigate();
	const [user, setUser] = useState(getUser());

	// Me suscribo a cambios de sesión sin meter lógica de auth en el componente
	useEffect(() => {
		const off = onAuthChange(setUser);
		return off;
	}, []);

	async function handleLogout() {
		await doLogout();
		nav("/login");
	}

	return (
		<header className="w-full bg-white shadow-md border-b border-primary-light">
			<div className="grid grid-cols-[auto_1fr_auto] items-center px-8 py-4">
				<Link
					to="/"
					className="group relative flex items-center gap-3 transition-transform motion-safe:hover:scale-[1.02]"
					aria-label="Ir al inicio">
					{/* contenedor del logo con pseudo-elemento de halo */}
					<span className="relative grid place-items-center h-12 w-12">
						{/* HALO */}
						<span className="pointer-events-none absolute -inset-6 -rotate-12 translate-x-[-120%] bg-white/30 blur-sm h-6 w-20 transition-transform duration-500 group-hover:translate-x-[120%]" />
						{/* LOGO */}
						<img
							src={logo}
							alt="Tenis"
							className="h-10 w-auto transition-transform duration-300 ease-out group-hover:rotate-[-3deg] motion-reduce:transition-none"
						/>
					</span>

					{/* Título */}
					<span className="text-2xl font-semibold text-primary-dark transition-colors duration-300 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-accent-dark">
						Club de Tenis
					</span>
				</Link>

				{/* CENTRO: Navbar */}
				<nav className="justify-self-center">
					<NavBarComponent />
				</nav>

				{/* DERECHA: Acciones Auth */}
				<div className="justify-self-end flex items-center gap-4">
					{user ? (
						<>
							<span className="flex items-center gap-1 text-gray-600">
								<span className="material-icons text-primary-dark">account_circle</span>
								Hola, {user.first_name} {user.last_name}
							</span>
							<button
								onClick={handleLogout}
								className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-accent-dark/30 text-accent-dark hover:bg-accent-light/40 transition">
								<span className="material-icons text-base">logout</span>
								Logout
							</button>
						</>
					) : (
						<>
							<Link
								to="/register"
								className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-primary-dark/30 text-primary-dark hover:bg-primary-light/40 transition">
								<span className="material-icons text-base">person_add</span>
								Registro
							</Link>
							<Link
								to="/login"
								className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-accent-dark/30 text-accent-dark hover:bg-accent-light/40 transition">
								<span className="material-icons text-base">login</span>
								Login
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
