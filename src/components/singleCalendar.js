import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { getAgendaAction } from "../actions/agendaActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import 'moment/locale/es';

const SingleCalendar = ({programacion, setProgramacion}) => {
    
	moment().locale('es');
    const dispatch = useDispatch();
	const agenda = useSelector((state) => state.agenda.agenda);
	
	const agendaCalendario = agenda.map((item) => ({
		id: item.id, date: item.fecha, title: `Dpto: ${item.departamentos.folio}`, color: item.tipo_agenda === 1 ? "blue" : item.tipo_agenda === 2 ? "red" : "yellow", description: item.descripcion, tipo_agenda: item.tipo_agenda
	}))

	useEffect(() => {
		dispatch(getAgendaAction());
		// eslint-disable-next-line 
	}, []);

	const handleDateClick = (e) => {
		// Fecha para asignar cita
        console.log(e);
        setProgramacion({
            ...programacion, 
            datetime: e.dateStr,
            text: moment(e.date).locale('es').format("LLLL")
        })

	};
    

    return ( 
        <FullCalendar
				locale={"es"}
				height={600}
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
				headerToolbar={{
					left: "prev,next today",
					center: "title",
					right: 'timeGridWeek',
					
				}}
				buttonText={{
					today:    'Hoy',
					month:    'Mes',
                    week:     'Semana',
				}}
				initialView="timeGridWeek"
				events={agendaCalendario}
				dateClick={(e) => handleDateClick(e)}
                allDaySlot={false}
                slotMinTime="09:00:00"
                slotMaxTime="18:00:00"
                weekends={false}
			/>
    );
}
 
export default SingleCalendar;