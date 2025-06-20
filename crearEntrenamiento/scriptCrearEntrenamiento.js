        let currentDate = new Date(2025, 2, 1); // Marzo 2025
        let selectedDate = 27; // Día seleccionado por defecto
        let sessionCounter = 1;

        // Verificar autenticación al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            if (!auth.isLoggedIn()) {
                alert('Debes iniciar sesión para acceder a esta página');
                window.location.href = '../index.html';
                return;
            }

            if (!auth.isCoach()) {
                alert('Acceso no autorizado - Solo para entrenadores');
                window.location.href = '../index.html';
                return;
            }

            auth.updateNavigation();
            initializeCalendar();
        });

        // Inicializar calendario
        function initializeCalendar() {
            updateCalendarDisplay();
        }

        // Actualizar visualización del calendario
        function updateCalendarDisplay() {
            const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                               'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            
            document.getElementById('currentMonth').textContent = monthNames[currentDate.getMonth()];
            
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Ajustar para que lunes sea 0
            
            const calendarDays = document.getElementById('calendarDays');
            calendarDays.innerHTML = '';
            
            // Días del mes anterior (grises)
            for (let i = startingDayOfWeek - 1; i >= 0; i--) {
                const prevMonthDay = new Date(year, month, -i);
                const dayElement = createDayElement(prevMonthDay.getDate(), 'prev-month');
                calendarDays.appendChild(dayElement);
            }
            
            // Días del mes actual
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = createDayElement(day, 'current-month');
                
                // Marcar día seleccionado
                if (day === selectedDate) {
                    dayElement.classList.add('selected');
                }
                
                dayElement.addEventListener('click', () => selectDate(day));
                calendarDays.appendChild(dayElement);
            }
            
            // Días del mes siguiente (grises)
            const totalCells = calendarDays.children.length;
            const remainingCells = 42 - totalCells; // 6 semanas × 7 días
            for (let day = 1; day <= remainingCells; day++) {
                const dayElement = createDayElement(day, 'next-month');
                calendarDays.appendChild(dayElement);
            }
        }

        // Crear elemento de día
        function createDayElement(day, monthType) {
            const dayElement = document.createElement('div');
            dayElement.className = `calendar-day ${monthType}`;
            dayElement.textContent = day;
            return dayElement;
        }

        // Seleccionar fecha
        function selectDate(day) {
            // Remover selección anterior
            document.querySelectorAll('.calendar-day').forEach(dayEl => {
                dayEl.classList.remove('selected');
            });
            
            // Seleccionar nuevo día
            selectedDate = day;
            updateCalendarDisplay();
        }

        // Navegación del calendario
        function previousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendarDisplay();
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendarDisplay();
        }

        // Agregar nueva sesión de entrenamiento
        function addNewSession() {
            sessionCounter++;
            const sessionsList = document.getElementById('sessionsList');
            
            const sessionRow = document.createElement('div');
            sessionRow.className = 'session-row';
            sessionRow.setAttribute('data-session-id', sessionCounter);
            
            sessionRow.innerHTML = `
                <div class="time-input-group">
                    <label class="time-label">Hora:</label>
                    <input type="text" class="time-input"  placeholder="00:00">
                    <div class="am-pm-selector">
                        <button type="button" class="am-pm-arrow prev" onclick="toggleAmPm(this, 'prev')">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <span class="am-pm-display">PM</span>
                        <button type="button" class="am-pm-arrow next" onclick="toggleAmPm(this, 'next')">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

                <div class="area-selector-group">
                    <select class="area-select">
                        <option value="fisico">Físico</option>
                        <option value="lanzamientos">Lanzamientos</option>
                        <option value="partido">Partido</option>
                        <option value="toma-decisiones">Toma de decisiones</option>
                        <option value="2vs1">2vs1</option>
                        <option value="plan-juego">Plan de juego</option>
                        <option value="entomagcion">Entomagción</option>
                    </select>
                    <i class="fas fa-chevron-down select-arrow"></i>
                </div>

                <div class="duration-selector-group">
                    <select class="duration-select">
                        <option value="15">15 min</option>
                        <option value="30">30 min</option>
                        <option value="45">45 min</option>
                        <option value="60">60 min</option>
                        <option value="90">90 min</option>
                        <option value="120">120 min</option>
                    </select>
                    <i class="fas fa-chevron-down select-arrow"></i>
                </div>

                <div class="action-buttons">
                    <button class="action-btn check-btn" onclick="saveSession(${sessionCounter})">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="action-btn add-btn" onclick="addNewSession()">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteSession(${sessionCounter})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            sessionsList.appendChild(sessionRow);
            
            // Animar la aparición
            setTimeout(() => {
                sessionRow.style.opacity = '1';
                sessionRow.style.transform = 'translateY(0)';
            }, 10);
        }

        // Guardar sesión
        function saveSession(sessionId) {
            const sessionRow = document.querySelector(`[data-session-id="${sessionId}"]`);
            const timeInput = sessionRow.querySelector('.time-input').value;
            const area = sessionRow.querySelector('.area-select').value;
            const duration = sessionRow.querySelector('.duration-select').value;
            
            console.log('Guardando sesión:', {
                id: sessionId,
                time: timeInput,
                area: area,
                duration: duration + ' min',
                date: `${selectedDate}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
            });
            
            // Efecto visual de guardado
            const checkBtn = sessionRow.querySelector('.check-btn');
            checkBtn.style.backgroundColor = 'var(--primary-color)';
            checkBtn.style.color = 'white';
            
            setTimeout(() => {
                checkBtn.style.backgroundColor = '';
                checkBtn.style.color = '';
            }, 1000);
            
            alert('Sesión guardada correctamente');
        }

        // Eliminar sesión
        function deleteSession(sessionId) {
            const sessionRow = document.querySelector(`[data-session-id="${sessionId}"]`);
            const sessionsList = document.getElementById('sessionsList');
            
            // No eliminar si es la única sesión
            if (sessionsList.children.length === 1) {
                alert('Debe haber al menos una sesión de entrenamiento');
                return;
            }
            
            // Animar salida
            sessionRow.style.opacity = '0';
            sessionRow.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                sessionRow.remove();
            }, 300);
        }

        // Publicar entrenamiento
        function publishTraining() {
            const sessions = [];
            const sessionRows = document.querySelectorAll('.session-row');
            const notes = document.getElementById('notesTextarea').value;
            
            sessionRows.forEach(row => {
                const sessionId = row.getAttribute('data-session-id');
                const timeInput = row.querySelector('.time-input').value;
                const area = row.querySelector('.area-select').value;
                const duration = row.querySelector('.duration-select').value;
                
                sessions.push({
                    id: sessionId,
                    time: timeInput,
                    area: area,
                    duration: duration + ' min'
                });
            });
            
            const trainingData = {
                date: `${selectedDate}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
                notes: notes,
                sessions: sessions
            };
            
            console.log('Publicando entrenamiento:', trainingData);
            alert('Entrenamiento publicado correctamente');
            
            // Aquí iría la llamada al backend
            // publishTrainingToBackend(trainingData);
        }

        // Cambiar entre AM/PM
        function toggleAmPm(button, direction) {
            const amPmDisplay = button.parentElement.querySelector('.am-pm-display');
            const currentValue = amPmDisplay.textContent;
            
            if (direction === 'prev') {
                amPmDisplay.textContent = currentValue === 'AM' ? 'PM' : 'AM';
            } else if (direction === 'next') {
                amPmDisplay.textContent = currentValue === 'PM' ? 'AM' : 'PM';
            }
        }

        // Validar formato de hora en input
        function validateTimeInput(input) {
            let value = input.value.replace(/[^\d:]/g, '');
            
        
        }

        // Inicializar eventos de validación para inputs de tiempo
        document.addEventListener('DOMContentLoaded', function() {
            // Agregar eventos a inputs existentes y futuros
            document.addEventListener('input', function(e) {
                if (e.target.classList.contains('time-input')) {
                    validateTimeInput(e.target);
                }
            });
        });
            /*
            fetch('/api/training/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: JSON.stringify(trainingData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Entrenamiento creado correctamente');
                    window.location.href = '../index.html';
                } else {
                    alert('Error al crear entrenamiento: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error de conexión al servidor');
            });
            */
        
    