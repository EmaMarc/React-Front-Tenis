import { useEffect, useState } from "react";
import axios from "../../utils/axiosClient";
import { isAdmin } from "../../utils/auth";

export default function CourtPage() {
	const [courts, setCourts] = useState([]);

	async function load() {
		const res = await axios.get("/courts");
		setCourts(res.data || []);
	}
	useEffect(() => {
		load().catch(console.error);
	}, []);

	async function save(c) {
		// PUT /court/{id} (solo admin)
		await axios.put(`/court/${c.id}`, { name: c.name, description: c.description });
		await load();
	}
	async function remove(id) {
		await axios.delete(`/court/${id}`);
		await load();
	}

	return (
		<section>
			<h2>Canchas</h2>
			<ul>
				{courts.map((c) => (
					<li key={c.id}>
						<input
							disabled={!isAdmin()}
							value={c.name}
							onChange={(e) => setCourts((cs) => cs.map((x) => (x.id === c.id ? { ...x, name: e.target.value } : x)))}
						/>
						<input
							disabled={!isAdmin()}
							value={c.description || ""}
							onChange={(e) => setCourts((cs) => cs.map((x) => (x.id === c.id ? { ...x, description: e.target.value } : x)))}
						/>
						{isAdmin() && (
							<>
								<button onClick={() => save(c)}>Actualizar</button>
								<button onClick={() => remove(c.id)}>Borrar</button>
							</>
						)}
					</li>
				))}
			</ul>
		</section>
	);
}
