import Input from "./input"
import Select from "./select"
import Button from "./button"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable }from "@fullcalendar/interaction"; // needed for dayClick
import { getAgendaAction } from "../actions/agendaActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminCalendar = () => {
	const dispatch = useDispatch();


	const agenda = useSelector((state) => state.agenda.agenda);
	
	const [calendar, setCalendar] = useState({
		id: "",
		tipo_agenda: "",
		descripcion: "",
		departamento_id: "",
		newDate: "",
		newTime: ""
	})

	const agendaCalendario = agenda.map((item) => ({
		id: item.id, date: item.fecha, title: `Dpto: ${item.departamentos.folio}`, color: item.tipo_agenda === 1 ? "blue" : item.tipo_agenda === 2 ? "red" : "yellow", description: item.descripcion, tipo_agenda: item.tipo_agenda
	}))

	useEffect(() => {
		dispatch(getAgendaAction());

	}, []);



	const handleDateClick = (e) => {
		// Fecha para asignar cita
		console.log(e.dateStr);
	};

	const handleEventClick = (e) => {
		// ID para buscar evento
		console.log(e.event.id);
	};

	const handleEventReceive = (eventInfo) => {
		const { start, end } = eventInfo.oldEvent._instance.range;
		const { start: newStart, end: newEnd } = eventInfo.event._instance.range;
		if (new Date(start).getDate() === new Date(newStart).getDate()) {
			eventInfo.revert();
		}
	}

	return (
		<>
		<div className="grid grid-cols-12 gap-x-10">

			<div className="col-span-9 font-mulish" >
			<FullCalendar
				locale={"es"}
				height={800}
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
				headerToolbar={{
					left: "prev,next today",
					center: "title",
					right: 'dayGridMonth,timeGridWeek,listWeek',
					
				}}
				buttonText={{
					today:    'Hoy',
					month:    'Mes',
					week:     'Semana',
					list:     'Lista'
				}}
				initialView="dayGridMonth"
				events={agendaCalendario}
				dateClick={(e) => handleDateClick(e)}
				eventClick={(e) => handleEventClick(e)}
				droppable={true}
				editable={true}
				eventDrop={(e) => handleEventReceive(e)}
			/>
			</div>
			<div className="col-span-3">
				<h1 className="text-center text-2xl font-bold font-mulish py-3"> Modificar Fecha </h1>
				<div>
					<label className="block" htmlFor="departamento_id">Departamento</label>
					<Select id="departamento_id" className="w-full" name="departamento_id" value="" > 
						<option value="">-- Selecciona una opcion --</option>
					</Select>
				</div>
				<div>
					<label className="block" htmlFor="fecha"fecha>Fecha</label>
					<Input type="date" id="fecha" className="rounded-md px-3 py-2 shadow-md my-2 w-full"></Input>
				</div>
				<div>
					<label className="block" htmlFor="hora"fecha>Hora</label>
					<Input type="time" id="hora" className="rounded-md px-3 py-2 shadow-md my-2 w-full"></Input>
				</div>
				<div>
					<label className="block" htmlFor="estatus">Agendar</label>
					<Select id="estatus" className="w-full" name="" value="" > 
						<option value="">-- Selecciona una opcion --</option>
					</Select>
				</div>
				<div>
					<label htmlFor="descripcion" className="block">Comentarios</label>
					<textarea name="descripcion" id="descripcion" className="rounded-md px-3 py-2 shadow-md my-2 w-full"></textarea>
				</div>
				<div className="flex justify-between">
					<Button className="bg-devarana-blue text-white"> Guardar </Button>
					<Button className="bg-devarana-graph text-white"> Cancelar </Button>
					<Button className="bg-red-500 text-white"> Eliminar </Button>
				</div>
			</div>
		</div>
		</>
	);
};

export default AdminCalendar;
