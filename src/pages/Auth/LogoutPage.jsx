import axios from "../../utils/axiosClient";
import { useEffect } from "react";
import { logoutSession } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
	const nav = useNavigate();
	useEffect(() => {
		(async () => {
			try {
				await axios.post("/logout");
			} catch (e) {
				//
			}
			logoutSession();
			nav("/");
		})();
	}, [nav]);
	return <p>Saliendo...</p>;
}
