/* src/common/scripts/calendar-loader.js */

document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
});

function initCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    
    // Si esta página no tiene calendario, nos detenemos aquí para no causar errores
    if (!calendarGrid) return;

    const monthDisplay = document.getElementById('currentMonthDisplay');
    const selectedDateText = document.getElementById('selectedDateText');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    let currentDate = new Date(); 
    let currYear = currentDate.getFullYear();
    let currMonth = currentDate.getMonth();

    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const renderCalendar = () => {
        calendarGrid.innerHTML = "";
        monthDisplay.innerText = `${months[currMonth]} ${currYear}`;

        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); 
        let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); 
        
        // Cabeceras de días
        const daysOfWeek = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];
        daysOfWeek.forEach(day => {
            const li = document.createElement("div");
            li.classList.add("day-name");
            li.innerText = day;
            calendarGrid.appendChild(li);
        });

        // Espacios vacíos
        for (let i = 0; i < firstDayofMonth; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("calendar-day", "empty");
            calendarGrid.appendChild(emptyDiv);
        }

        // Días reales
        for (let i = 1; i <= lastDateofMonth; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("calendar-day");
            dayDiv.innerText = i;

            const today = new Date();
            const checkDate = new Date(currYear, currMonth, i);
            
            // Bloquear días pasados
            if (checkDate.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
                dayDiv.classList.add("disabled");
            } else {
                dayDiv.addEventListener("click", () => {
                    document.querySelectorAll(".calendar-day.selected").forEach(el => el.classList.remove("selected"));
                    dayDiv.classList.add("selected");
                    if(selectedDateText) selectedDateText.innerText = `${i} de ${months[currMonth]}`;
                });
            }

            // Marcar hoy
            if (i === today.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()) {
                dayDiv.style.border = "1px solid #0ea5e9"; 
            }

            calendarGrid.appendChild(dayDiv);
        }
    };

    // Eventos de botones (Navegación)
    if(prevBtn) prevBtn.addEventListener("click", () => {
        currMonth--;
        if (currMonth < 0) { currMonth = 11; currYear--; }
        renderCalendar();
    });

    if(nextBtn) nextBtn.addEventListener("click", () => {
        currMonth++;
        if (currMonth > 11) { currMonth = 0; currYear++; }
        renderCalendar();
    });

    // Iniciar
    renderCalendar();
    initTimeSlots(); // Iniciamos también los botones de hora
}

// Lógica extra para los botones de hora (si existen)
function initTimeSlots() {
    const timeBtns = document.querySelectorAll('.time-btn');
    if(timeBtns.length === 0) return;

    timeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            timeBtns.forEach(b => {
                b.style.background = 'white';
                b.style.color = '#0ea5e9';
            });
            this.style.background = '#0ea5e9';
            this.style.color = 'white';
        });
    });
}
"Añadir validacion en las hora del dia "