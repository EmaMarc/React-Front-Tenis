export function saveSession({ token, user }) {
	localStorage.setItem("token", token);
	localStorage.setItem("user", JSON.stringify(user));
}
export function getUser() {
	const u = localStorage.getItem("user");
	return u ? JSON.parse(u) : null;
}
export function isAdmin() {
	return getUser()?.is_admin === 1 || getUser()?.is_admin === true;
}
export function logoutSession() {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
}
