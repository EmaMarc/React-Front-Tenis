// /src/pages/auth/LogoutPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../utils/auth";

export default function LogoutPage() {
	const nav = useNavigate();

	useEffect(() => {
		(async () => {
			await doLogout(); // hace POST /logout y limpia storage + notifica
			nav("/");
		})();
	}, [nav]);

	return <p>Saliendo...</p>;
}
