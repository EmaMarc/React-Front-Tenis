import { useEffect, useMemo, useState } from "react";
import axios from "../../utils/axiosClient";
import { format, addMinutes, setHours, setMinutes } from "date-fns";

const START_H = 8; // 08:00
const END_H = 22; // 22:00
const BLOCK = 30; // minutos

function timeSlots() {
	const slots = [];
	let t = setMinutes(setHours(new Date(), START_H), 0);
	while (t <= setMinutes(setHours(new Date(), END_H), 0)) {
		slots.push(format(t, "HH:mm"));
		t = addMinutes(t, BLOCK);
	}
	return slots;
}

export default function HomePage() {
	const [date, setDate] = useState(() => format(new Date(), "yyyy-MM-dd"));
	const [bookings, setBookings] = useState([]); // API GET /booking?date=YYYY-MM-DD
	const [courts, setCourts] = useState([]); // API GET /courts (si lo tenés)

	const slots = useMemo(() => timeSlots(), []);

	useEffect(() => {
		async function load() {
			const [bksRes, crtsRes] = await Promise.all([
				axios.get(`/booking`, { params: { date } }),
				axios.get(`/courts`), // o tu endpoint real
			]);
			setBookings(bksRes.data || []);
			setCourts(crtsRes.data || []);
		}
		load().catch(console.error);
	}, [date]);

	// Mapa: { court_id -> { "HH:mm" -> {names, blocks} } }
	const grid = useMemo(() => {
		const map = {};
		for (const c of courts) map[c.id] = {};
		for (const b of bookings) {
			const start = new Date(b.booking_datetime);
			const startKey = format(start, "HH:mm");
			// acá podrías haber resuelto en backend los nombres; o hace otro fetch participants
			const names = (b.participants || b.players || []).map((p) => `${p.first_name} ${p.last_name}`).join(" / ");
			map[b.court_id][startKey] = { names, blocks: b.duration_blocks };
		}
		return map;
	}, [bookings, courts]);

	function renderCell(courtId, slot) {
		const cell = grid[courtId]?.[slot];
		if (!cell) return "";
		return cell.names; // y opcionalmente onClick para ir a modificar participantes si es creador
	}

	return (
		<section>
			<h2>Reservas del día – {format(new Date(date), "dd/MM/yyyy")} 📅</h2>
			<input
				type="date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
			<table className="grid">
				<thead>
					<tr>
						<th>Hora</th>
						{courts.map((c) => (
							<th key={c.id}>{c.name}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{slots.map((s) => (
						<tr key={s}>
							<td>{s}</td>
							{courts.map((c) => (
								<td key={c.id + s}>{renderCell(c.id, s)}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}
