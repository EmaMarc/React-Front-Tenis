// /src/utils/auth.js
import axios from "./axiosClient";

/** --- Estado & suscripción simple (sin React) --- */
let _user = null;
const listeners = new Set();
function notify() {
	listeners.forEach((cb) => cb(_user));
}

export function onAuthChange(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}

/** --- Helpers de Storage --- */
function setToken(token) {
	if (token) localStorage.setItem("token", token);
}
function clearStorage() {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	localStorage.removeItem("user_id");
}
function setUser(user) {
	_user = user || null;
	if (user) {
		localStorage.setItem("user", JSON.stringify(user));
		if (user.id) localStorage.setItem("user_id", String(user.id));
	} else {
		localStorage.removeItem("user");
	}
	notify();
}
export function getUser() {
	if (_user) return _user;
	const raw = localStorage.getItem("user");
	if (!raw || raw === "undefined" || raw === "null") return null;
	try {
		_user = JSON.parse(raw);
		return _user;
	} catch {
		return null;
	}
}
export function isAdmin() {
	const u = getUser();
	return u?.is_admin === 1 || u?.is_admin === true;
}

/** --- Flujo principal: login -> token -> fetch user by id -> guardar --- */
export async function loginAndLoadUser({ email, password }) {
	// /login debería devolver al menos { token } y ojalá también { id } o { user }
	const { data } = await axios.post("/login", { email, password });

	if (!data?.token) throw new Error("Login sin token");
	setToken(data.token); // Habilita el interceptor Authorization

	// 1) Si vino user completo
	if (data.user) {
		setUser(data.user);
		return data.user;
	}

	// 2) Si vino suelto el id + campos
	if (data.id && (data.first_name || data.last_name || data.is_admin !== undefined)) {
		const user = {
			id: data.id,
			first_name: data.first_name,
			last_name: data.last_name,
			is_admin: data.is_admin,
			email: data.email, // por si también viene
		};
		setUser(user);
		return user;
	}

	// 3) Si vino sólo el id, buscamos al usuario
	if (data.id) {
		const { data: user } = await axios.get(`/user/${data.id}`);
		setUser(user);
		return user;
	}

	// 4) No vino id: último recurso, guardo solo el token y fallo elegante
	// (sin /me no puedo inferir el id del usuario de forma segura)
	clearStorage(); // evitar sesión inconsistente
	throw new Error("El backend no devolvió id del usuario. No se puede cargar el perfil.");
}

/** --- Logout completo (opcionalmente notifica al backend) --- */
export async function doLogout() {
	try {
		await axios.post("/logout");
	} catch {
		/* ignore */
	}
	clearStorage();
	setUser(null);
}

/** --- Hidratar en arranque: si hay token y hay user en LS, cargar a memoria --- */
export function hydrateAuthFromStorage() {
	const token = localStorage.getItem("token");
	const rawUser = localStorage.getItem("user");
	if (token && rawUser) {
		try {
			_user = JSON.parse(rawUser);
		} catch {
			_user = null;
		}
	} else {
		_user = null;
	}
	notify();
}
