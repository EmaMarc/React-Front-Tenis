// src/pages/register/RegisterPage.jsx
import { useState } from "react";
import axios from "../../utils/axiosClient";

// regex de password
const passOk = (p) =>
	/[A-Z]/.test(p) && // al menos 1 mayúscula
	/[a-z]/.test(p) && // al menos 1 minúscula
	/\d/.test(p) && // al menos 1 número
	/[^A-Za-z0-9]/.test(p) && // al menos 1 caracter especial
	p.length >= 8; // mínimo 8

export default function RegisterPage() {
	const [form, setForm] = useState({
		email: "",
		first_name: "",
		last_name: "",
		password: "",
		confirm: "",
	});
	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState("");
	const [err, setErr] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

	const fieldErrors = {
		email: submitted && !form.email.includes("@") ? "Email inválido." : "",
		password: submitted && !passOk(form.password) ? "La clave debe tener 8+ caracteres, mayúsculas, minúsculas, número y símbolo." : "",
		confirm: submitted && form.password !== form.confirm ? "Las contraseñas no coinciden." : "",
	};
	const hasClientErrors = !!(fieldErrors.email || fieldErrors.password || fieldErrors.confirm);

	async function submit(e) {
		e.preventDefault();
		setSubmitted(true);
		setErr("");
		setMsg("");

		if (hasClientErrors) return;

		try {
			setLoading(true);
			await axios.post("/user", {
				email: form.email.trim(),
				first_name: form.first_name.trim(),
				last_name: form.last_name.trim(),
				password: form.password,
			});
			setMsg("✅ Usuario creado. Ahora podés iniciar sesión.");
			setForm({ email: "", first_name: "", last_name: "", password: "", confirm: "" });
			setSubmitted(false);
		} catch (e) {
			const apiError = e?.response?.data?.error;
			setErr(apiError || "No se pudo registrar. Intenta nuevamente.");
		} finally {
			setLoading(false);
		}
	}

	const errorText = "text-sm text-red-400 mt-1";

	return (
		<section
			className="
        mx-auto w-full max-w-2xl
        p-12
        bg-neutral-950/70 rounded-3xl shadow-xl
        text-[18px]  /* agranda todo el contenido */
      ">
			<h2 className="text-3xl font-semibold mb-2 flex items-center gap-3">
				<span className="material-icons text-3xl">person_add</span>
				Registro
			</h2>
			<p className="text-neutral-400 mb-8">Creá tu cuenta para reservar canchas.</p>

			{msg && (
				<div className="mb-6 rounded-2xl border border-green-600/40 bg-green-900/30 p-4 text-green-300 flex gap-3">
					<span className="material-icons">check_circle</span>
					<span>{msg}</span>
				</div>
			)}
			{err && (
				<div className="mb-6 rounded-2xl border border-red-600/40 bg-red-900/30 p-4 text-red-300 flex gap-3">
					<span className="material-icons">error</span>
					<span>{err}</span>
				</div>
			)}

			<form
				onSubmit={submit}
				className="grid gap-2">
				{/* Email */}
				<div className="">
					<label className="">
						<span className="material-icons">mail</span>
						Email
					</label>
					<div className="relative">
						<span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">alternate_email</span>
						<input
							className=""
							value={form.email}
							onChange={onChange("email")}
							placeholder="tu@email.com"
							autoComplete="email"
						/>
					</div>
					{fieldErrors.email && <p className={errorText}>{fieldErrors.email}</p>}
				</div>

				{/* Nombre */}
				<div className="">
					<label className="">
						<span className="material-icons">badge</span>
						Nombre
					</label>
					<div className="relative">
						<span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">person</span>
						<input
							className=""
							value={form.first_name}
							onChange={onChange("first_name")}
							placeholder="Nombre"
							autoComplete="given-name"
						/>
					</div>
				</div>

				{/* Apellido */}
				<div className="">
					<label className="">
						<span className="material-icons">badge</span>
						Apellido
					</label>
					<div className="relative">
						<span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">person_outline</span>
						<input
							className=""
							value={form.last_name}
							onChange={onChange("last_name")}
							placeholder="Apellido"
							autoComplete="family-name"
						/>
					</div>
				</div>

				{/* Password */}
				<div className="">
					<label className="">
						<span className="material-icons">lock</span>
						Contraseña
					</label>
					<div className="relative">
						<span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">vpn_key</span>
						<input
							type="password"
							className=""
							value={form.password}
							onChange={onChange("password")}
							placeholder="••••••••"
							autoComplete="new-password"
						/>
					</div>
					{fieldErrors.password && <p className={errorText}>{fieldErrors.password}</p>}
				</div>

				{/* Confirm */}
				<div className="">
					<label className="">
						<span className="material-icons">verified_user</span>
						Confirmar contraseña
					</label>
					<div className="relative">
						<span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">check</span>
						<input
							type="password"
							className=""
							value={form.confirm}
							onChange={onChange("confirm")}
							placeholder="••••••••"
							autoComplete="new-password"
						/>
					</div>
					{fieldErrors.confirm && <p className={errorText}>{fieldErrors.confirm}</p>}
				</div>

				{/* Hints de password: solo si falló luego del submit */}
				{submitted && fieldErrors.password && (
					<ul className="text-sm text-neutral-400 -mt-2 mb-2 list-disc pl-6 space-y-0.5">
						<li>Mayúscula</li>
						<li>Minúscula</li>
						<li>Número</li>
						<li>Símbolo</li>
						<li>8+ caracteres</li>
					</ul>
				)}

				<button
					disabled={loading}
					className="
            mt-4 inline-flex items-center justify-center gap-3
            rounded-2xl bg-orange-500 hover:bg-orange-600
            disabled:opacity-60
            text-neutral-900 font-semibold
            px-8 py-4 text-lg
            focus:outline-none focus:ring-2 focus:ring-orange-300
          ">
					<span className="material-icons">how_to_reg</span>
					{loading ? "Creando..." : "Crear cuenta"}
				</button>
			</form>
		</section>
	);
}
