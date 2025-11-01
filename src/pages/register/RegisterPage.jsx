import { useState } from "react";
import axios from "../../utils/axiosClient";

const passOk = (p) => /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) && /[^A-Za-z0-9]/.test(p) && p.length >= 8;

export default function RegisterPage() {
	const [form, setForm] = useState({ email: "", first_name: "", last_name: "", password: "" });
	const [err, setErr] = useState("");

	async function submit(e) {
		e.preventDefault();
		setErr("");
		if (!form.email.includes("@")) return setErr("Email inválido");
		if (!passOk(form.password)) return setErr("Clave débil (8+ con mayúsc, minúsc, número y especial)");
		await axios.post("/user", form);
		alert("Usuario creado");
	}
	return (
		<form onSubmit={submit}>
			<input
				placeholder="Email"
				value={form.email}
				onChange={(e) => setForm({ ...form, email: e.target.value })}
			/>
			<input
				placeholder="Nombre"
				value={form.first_name}
				onChange={(e) => setForm({ ...form, first_name: e.target.value })}
			/>
			<input
				placeholder="Apellido"
				value={form.last_name}
				onChange={(e) => setForm({ ...form, last_name: e.target.value })}
			/>
			<input
				type="password"
				placeholder="Clave"
				value={form.password}
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>
			{err && <p style={{ color: "red" }}>{err}</p>}
			<button>Registrarme</button>
		</form>
	);
}
