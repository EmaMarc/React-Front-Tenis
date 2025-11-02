import { useState } from "react";
import { loginAndLoadUser } from "../../utils/auth";
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
			await loginAndLoadUser({ email, password });
			nav("/");
		} catch (e) {
			setErr(e?.response?.data?.error || e.message || "Error de login");
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
