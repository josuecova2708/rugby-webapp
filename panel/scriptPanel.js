        // Datos de asistencias para marzo 2025 (ejemplo para backend)
        const attendanceData = {
            2025: {
                2: { // Marzo (0-indexed)
                    9: { status: 'asiste', type: 'training' },      // 9 marzo
                    10: { status: 'no-asiste', type: 'training' },  // 10 marzo
                    11: { status: 'asiste', type: 'training' },     // 11 marzo
                    12: { status: 'tarde', type: 'training' },      // 12 marzo
                    13: { status: 'asiste', type: 'match' },        // 13 marzo
                    14: { status: 'tarde', type: 'training' },      // 14 marzo
                    15: { status: 'asiste', type: 'training' },     // 15 marzo
                    16: { status: 'asiste', type: 'training' },     // 16 marzo
                    18: { status: 'lesionado', type: 'training' },  // 18 marzo
                    19: { status: 'lesionado', type: 'training' },  // 19 marzo
                    21: { status: 'no-asiste', type: 'training' },  // 21 marzo
                    22: { status: 'asiste', type: 'training' },     // 22 marzo
                    24: { status: 'asiste', type: 'training' },     // 24 marzo
                    27: { status: 'asiste', type: 'match' },        // 27 marzo
                    28: { status: 'no-asiste', type: 'training' },  // 28 marzo
                    29: { status: 'asiste', type: 'training' },     // 29 marzo
                }
            }
        };

        // Configuración de colores
        const statusColors = {
            'asiste': '#9747FF',
            'no-asiste': '#108B37', 
            'lesionado': '#CF5904',
            'tarde': '#00ACC1'
        };

        // Datos de desempeño técnico (ejemplo para backend)
        const performanceData = {
            // Datos para gráfico de progreso físico (línea)
            physicalProgress: [
                { week: 0, value: 850 },
                { week: 1, value: 1000 },
                { week: 2, value: 50 },
                { week: 3, value: 700 },
                { week: 4, value: 200 },
                { week: 5, value: 400 },
                { week: 6, value: 1000 }
            ],
            
            // Datos para composición corporal (donut)
            bodyComposition: {
                moderateFat: 25,    // Grasa corporal moderada (morado)
                highFat: 15,        // Grasa corporal alta (verde claro)
                optimalMuscle: 60   // Masa muscular óptima (verde oscuro)
            },
            
            // Datos para rendimiento semanal (barras)
            weeklyPerformance: [
                { week: 0, blue: 750, green: 450 },
                { week: 1, blue: 350, green: 800 },
                { week: 2, blue: 200, green: 600 },
                { week: 3, blue: 300, green: 300 },
                { week: 4, blue: 500, green: 1000 }
            ],
            
            // Datos del jugador
            playerInfo: {
                name: "Martínez Gonzalo",
                position: "3ra línea - Apertura",
                status: "Activo - Primera",
                attendance: "80%",
                photo: "../recursos/player-martinez.jpg" // Ruta de la foto del jugador
            }
        };

        // Variables globales
        let currentDate = new Date(2025, 2, 1); // Marzo 2025
        let attendanceChart = null;
        let progressChart = null;
        let bodyCompositionChart = null;
        let weeklyChart = null;

        // Verificar autenticación al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            // Si no está logueado, redirigir al home
            if (!auth.isLoggedIn()) {
                alert('Debes iniciar sesión para acceder al panel de rendimiento');
                window.location.href = '../index.html';
                return;
            }

            // Si está logueado, actualizar la navegación
            auth.updateNavigation();
            initializePanelTabs();
            initializeCalendar();
            initializeAttendanceChart();
        });

        // Inicializar sistema de pestañas
        function initializePanelTabs() {
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const targetTab = this.getAttribute('data-tab');

                    // Remover clase active de todos los botones y contenidos
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => {
                        content.classList.remove('active');
                        content.style.display = 'none';
                    });

                    // Agregar clase active al botón clickeado
                    this.classList.add('active');

                    // Mostrar el contenido correspondiente
                    const targetContent = document.getElementById(targetTab);
                    if (targetContent) {
                        targetContent.classList.add('active');
                        targetContent.style.display = 'block';
                        
                        // Inicializar gráfico cuando se abra la pestaña de asistencias
                        if (targetTab === 'asistencias' && !attendanceChart) {
                            setTimeout(() => {
                                initializeAttendanceChart();
                            }, 100);
                        }
                        
                        // Inicializar gráficos cuando se abra la pestaña de desempeño
                        if (targetTab === 'desempeno' && !progressChart) {
                            setTimeout(() => {
                                initializePerformanceCharts();
                                loadPlayerInfo();
                            }, 100);
                        }
                    }
                });
            });
        }

        // Inicializar calendario
        function initializeCalendar() {
            updateCalendarDisplay();
            
            document.getElementById('prevMonth').addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateCalendarDisplay();
                updateAttendanceChart();
            });
            
            document.getElementById('nextMonth').addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateCalendarDisplay();
                updateAttendanceChart();
            });
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
                
                // Aplicar estado de asistencia si existe
                const monthData = attendanceData[year] && attendanceData[year][month];
                if (monthData && monthData[day]) {
                    const status = monthData[day].status;
                    dayElement.style.backgroundColor = statusColors[status];
                    dayElement.style.color = 'white';
                    dayElement.classList.add('has-attendance');
                }
                
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

        // Inicializar gráfico de asistencias
        function initializeAttendanceChart() {
            const canvas = document.getElementById('attendanceChart');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const stats = calculateAttendanceStats();
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Configuración del gráfico
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 80;
            const lineWidth = 20;
            
            // Calcular ángulos
            const attendedAngle = (stats.attended / stats.total) * 2 * Math.PI;
            const absentAngle = (stats.absent / stats.total) * 2 * Math.PI;
            
            // Dibujar círculo de fondo
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = '#e9ecef';
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            
            // Dibujar segmento de asistencias (morado)
            if (stats.attended > 0) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, -Math.PI/2, -Math.PI/2 + attendedAngle);
                ctx.strokeStyle = statusColors['asiste'];
                ctx.lineWidth = lineWidth;
                ctx.stroke();
            }
            
            // Dibujar segmento de ausencias (verde)
            if (stats.absent > 0) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, -Math.PI/2 + attendedAngle, -Math.PI/2 + attendedAngle + absentAngle);
                ctx.strokeStyle = statusColors['no-asiste'];
                ctx.lineWidth = lineWidth;
                ctx.stroke();
            }
            
            // Actualizar porcentaje
            const percentage = Math.round((stats.attended / stats.total) * 100);
            document.getElementById('attendancePercentage').textContent = `${percentage}%`;
        }

        // Calcular estadísticas de asistencia
        function calculateAttendanceStats() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const monthData = attendanceData[year] && attendanceData[year][month];
            
            let attended = 0;
            let absent = 0;
            let injured = 0;
            let late = 0;
            
            if (monthData) {
                Object.values(monthData).forEach(entry => {
                    switch(entry.status) {
                        case 'asiste':
                            attended++;
                            break;
                        case 'no-asiste':
                            absent++;
                            break;
                        case 'lesionado':
                            injured++;
                            break;
                        case 'tarde':
                            late++;
                            break;
                    }
                });
            }
            
            const total = attended + absent;
            return { attended, absent, injured, late, total };
        }

        // Actualizar gráfico cuando cambie el mes
        function updateAttendanceChart() {
            if (document.getElementById('asistencias').style.display !== 'none') {
                initializeAttendanceChart();
            }
        }

        // Funciones para futuras implementaciones
        function exportGymData() {
            alert('Exportar datos de gimnasio - Próximamente');
        }

        function addNewExercise() {
            alert('Agregar nuevo ejercicio - Próximamente');
        }

        // Función para backend: obtener datos de asistencia
        function getAttendanceData(year, month) {
            // Esta función será reemplazada por llamada al backend
            return attendanceData[year] && attendanceData[year][month] || {};
        }

        // Inicializar gráficos de desempeño técnico
        function initializePerformanceCharts() {
            initializeProgressChart();
            initializeBodyCompositionChart();
            initializeWeeklyPerformanceChart();
        }

        // Gráfico de progreso físico (línea)
        function initializeProgressChart() {
            const canvas = document.getElementById('progressChart');
            if (!canvas) return;
            
            // Ajustar tamaño del canvas según el dispositivo
            const isMobile = window.innerWidth <= 767;
            canvas.width = isMobile ? 300 : 400;
            canvas.height = isMobile ? 150 : 200;
            
            const ctx = canvas.getContext('2d');
            const data = performanceData.physicalProgress;
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Configuración
            const padding = isMobile ? 30 : 40;
            const chartWidth = canvas.width - (padding * 2);
            const chartHeight = canvas.height - (padding * 2);
            const maxValue = 1000;
            
            // Dibujar ejes
            ctx.strokeStyle = '#e9ecef';
            ctx.lineWidth = 1;
            
            // Eje Y (líneas horizontales)
            for (let i = 0; i <= 4; i++) {
                const y = padding + (chartHeight * i / 4);
                const value = maxValue - (maxValue * i / 4);
                
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(padding + chartWidth, y);
                ctx.stroke();
                
                // Etiquetas del eje Y
                ctx.fillStyle = '#6c757d';
                ctx.font = isMobile ? '10px Arial' : '12px Arial';
                ctx.textAlign = 'right';
                ctx.fillText(value.toString(), padding - 10, y + 4);
            }
            
            // Eje X (líneas verticales)
            for (let i = 0; i <= 6; i++) {
                const x = padding + (chartWidth * i / 6);
                
                ctx.beginPath();
                ctx.moveTo(x, padding);
                ctx.lineTo(x, padding + chartHeight);
                ctx.stroke();
                
                // Etiquetas del eje X
                ctx.fillStyle = '#6c757d';
                ctx.font = isMobile ? '10px Arial' : '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(i.toString(), x, padding + chartHeight + (isMobile ? 15 : 20));
            }
            
            // Dibujar línea de datos
            ctx.strokeStyle = '#9747FF';
            ctx.lineWidth = isMobile ? 2 : 3;
            ctx.beginPath();
            
            data.forEach((point, index) => {
                const x = padding + (chartWidth * point.week / 6);
                const y = padding + chartHeight - (chartHeight * point.value / maxValue);
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                
                // Dibujar puntos
                ctx.fillStyle = '#9747FF';
                ctx.beginPath();
                ctx.arc(x, y, isMobile ? 3 : 4, 0, 2 * Math.PI);
                ctx.fill();
            });
            
            ctx.stroke();
            progressChart = true;
        }

        // Gráfico de composición corporal (donut)
        function initializeBodyCompositionChart() {
            const canvas = document.getElementById('bodyCompositionChart');
            if (!canvas) return;
            
            // Ajustar tamaño del canvas según el dispositivo
            const isMobile = window.innerWidth <= 767;
            canvas.width = isMobile ? 120 : 200;
            canvas.height = isMobile ? 120 : 200;
            
            const ctx = canvas.getContext('2d');
            const data = performanceData.bodyComposition;
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Configuración
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = isMobile ? 40 : 70;
            const lineWidth = isMobile ? 15 : 25;
            
            // Calcular ángulos
            const total = data.moderateFat + data.highFat + data.optimalMuscle;
            const moderateAngle = (data.moderateFat / total) * 2 * Math.PI;
            const highAngle = (data.highFat / total) * 2 * Math.PI;
            const optimalAngle = (data.optimalMuscle / total) * 2 * Math.PI;
            
            let currentAngle = -Math.PI / 2;
            
            // Dibujar segmento de grasa moderada (morado)
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + moderateAngle);
            ctx.strokeStyle = '#9747FF';
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            currentAngle += moderateAngle;
            
            // Dibujar segmento de grasa alta (verde claro)
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + highAngle);
            ctx.strokeStyle = '#7CB342';
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            currentAngle += highAngle;
            
            // Dibujar segmento de masa muscular óptima (verde oscuro)
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + optimalAngle);
            ctx.strokeStyle = '#2E7D32';
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            
            bodyCompositionChart = true;
        }

        // Gráfico de rendimiento semanal (barras)
        function initializeWeeklyPerformanceChart() {
            const canvas = document.getElementById('weeklyPerformanceChart');
            if (!canvas) return;
            
            // Ajustar tamaño del canvas según el dispositivo
            const isMobile = window.innerWidth <= 767;
            canvas.width = isMobile ? 350 : 500;
            canvas.height = isMobile ? 180 : 250;
            
            const ctx = canvas.getContext('2d');
            const data = performanceData.weeklyPerformance;
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Configuración
            const padding = isMobile ? 30 : 40;
            const chartWidth = canvas.width - (padding * 2);
            const chartHeight = canvas.height - (padding * 2);
            const maxValue = 1000;
            const barWidth = chartWidth / (data.length * 2.5);
            
            // Dibujar ejes
            ctx.strokeStyle = '#e9ecef';
            ctx.lineWidth = 1;
            
            // Eje Y (líneas horizontales)
            for (let i = 0; i <= 4; i++) {
                const y = padding + (chartHeight * i / 4);
                const value = maxValue - (maxValue * i / 4);
                
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(padding + chartWidth, y);
                ctx.stroke();
                
                // Etiquetas del eje Y
                ctx.fillStyle = '#6c757d';
                ctx.font = isMobile ? '10px Arial' : '12px Arial';
                ctx.textAlign = 'right';
                ctx.fillText(value.toString(), padding - 10, y + 4);
            }
            
            // Dibujar barras
            data.forEach((point, index) => {
                const x = padding + (chartWidth * (index + 0.5) / data.length) - barWidth;
                
                // Barra azul
                const blueHeight = (chartHeight * point.blue / maxValue);
                const blueY = padding + chartHeight - blueHeight;
                ctx.fillStyle = '#00ACC1';
                ctx.fillRect(x, blueY, barWidth * 0.8, blueHeight);
                
                // Barra verde
                const greenHeight = (chartHeight * point.green / maxValue);
                const greenY = padding + chartHeight - greenHeight;
                ctx.fillStyle = '#7CB342';
                ctx.fillRect(x + barWidth * 0.9, greenY, barWidth * 0.8, greenHeight);
                
                // Etiqueta del eje X
                ctx.fillStyle = '#6c757d';
                ctx.font = isMobile ? '10px Arial' : '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(point.week.toString(), x + barWidth, padding + chartHeight + (isMobile ? 15 : 20));
            });
            
            weeklyChart = true;
        }

        // Función para redibujar gráficos cuando cambie el tamaño de pantalla
        function redrawChartsOnResize() {
            if (progressChart) {
                progressChart = false;
                initializeProgressChart();
            }
            if (bodyCompositionChart) {
                bodyCompositionChart = false;
                initializeBodyCompositionChart();
            }
            if (weeklyChart) {
                weeklyChart = false;
                initializeWeeklyPerformanceChart();
            }
        }

        // Agregar listener para redimensionamiento
        window.addEventListener('resize', function() {
            setTimeout(redrawChartsOnResize, 100);
        });

        // Cargar información del jugador
        function loadPlayerInfo() {
            const playerInfo = performanceData.playerInfo;
            
            // Actualizar nombre
            document.getElementById('playerName').textContent = playerInfo.name;
            
            // Actualizar imagen si existe
            const playerImage = document.getElementById('playerImage');
            playerImage.src = playerInfo.photo;
            
            // Actualizar detalles del jugador
            const playerCard = document.querySelector('.player-card');
            const detailItems = playerCard.querySelectorAll('.detail-item span');
            
            if (detailItems[0]) detailItems[0].textContent = playerInfo.position;
            if (detailItems[1]) detailItems[1].textContent = `● ${playerInfo.status}`;
        }
        // Función para backend: actualizar datos de asistencia
        function updateAttendanceData(year, month, day, status, type) {
            // Esta función será reemplazada por llamada al backend
            if (!attendanceData[year]) attendanceData[year] = {};
            if (!attendanceData[year][month]) attendanceData[year][month] = {};
            attendanceData[year][month][day] = { status, type };
            
            updateCalendarDisplay();
            updateAttendanceChart();
        }

        // Funciones para backend - Desempeño técnico
        function getPerformanceData() {
            // Esta función será reemplazada por llamada al backend
            return performanceData;
        }

        function updatePlayerPhoto(photoFile) {
            // Esta función será reemplazada por llamada al backend
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('playerImage').src = e.target.result;
                performanceData.playerInfo.photo = e.target.result;
            };
            reader.readAsDataURL(photoFile);
        }
    