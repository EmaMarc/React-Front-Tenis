import { useState } from "react";
import axios from "../../utils/axiosClient";
import { saveSession } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const nav = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");

	async function submit(e) {
		e.preventDefault();
		setErr("");
		try {
			const { data } = await axios.post("/login", { email, password });
			// asumimos que backend devuelve { token, user: {id, first_name, last_name, is_admin} }
			saveSession({ token: data.token, user: data.user });
			nav("/");
		} catch (e) {
			setErr(e?.response?.data?.error || "Error de login");
		}
	}

	return (
		<form onSubmit={submit}>
			<input
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Clave"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{err && <p style={{ color: "red" }}>{err}</p>}
			<button>Ingresar</button>
		</form>
	);
}
