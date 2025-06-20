        // Datos de ejemplo para los historiales médicos
        const playersData = {
            'juan-serra': {
                name: 'Juan Serra',
                position: 'Centro - Primera',
                status: 'apto',
                lastUpdate: '10/03/2024',
                healthStatus: 'Apto',
                injuries: [
                    {
                        date: '15/01/2024',
                        description: 'Esguince de tobillo derecho (Grado 1)',
                        status: 'recovered'
                    },
                    {
                        date: '05/10/2023',
                        description: 'Contractura en isquiotibiales',
                        status: 'recovered'
                    }
                ],
                treatments: [
                    {
                        icon: 'fas fa-hand-paper',
                        title: 'Sesiones de fisioterapia',
                        description: '2 veces por semana hasta el 20/03/2024'
                    },
                    {
                        icon: 'fas fa-dumbbell',
                        title: 'Ejercicios de fortalecimiento recomendados por el kinesiólogo',
                        description: 'Rutina diaria'
                    }
                ],
                observations: [
                    'Se recomienda control post-recuperación en 15 días.',
                    'Puede entrenar con normalidad, pero evitar sobrecarga en el tobillo.'
                ],
                lastCheck: '01/03/2024 - Apto sin restricciones'
            },
            'carlos-rodriguez': {
                name: 'Carlos Rodríguez',
                position: 'Ala - Primera',
                status: 'revision',
                lastUpdate: '08/03/2024',
                healthStatus: 'En revisión',
                injuries: [
                    {
                        date: '02/03/2024',
                        description: 'Posible desgarro en gemelos',
                        status: 'pending'
                    }
                ],
                treatments: [
                    {
                        icon: 'fas fa-clock',
                        title: 'Esperando resultados de ecografía',
                        description: 'Programada para el 12/03/2024'
                    }
                ],
                observations: [
                    'Suspendido de entrenamientos hasta confirmación médica.',
                    'Aplicar hielo y reposo.'
                ],
                lastCheck: '02/03/2024 - Pendiente de diagnóstico'
            },
            'diego-fernandez': {
                name: 'Diego Fernández',
                position: 'Tercera línea - Primera',
                status: 'lesionado',
                lastUpdate: '05/03/2024',
                healthStatus: 'Lesionado',
                injuries: [
                    {
                        date: '25/02/2024',
                        description: 'Desgarro grado 2 en cuádriceps',
                        status: 'active'
                    }
                ],
                treatments: [
                    {
                        icon: 'fas fa-procedures',
                        title: 'Rehabilitación intensiva',
                        description: 'Fisioterapia diaria por 3 semanas'
                    },
                    {
                        icon: 'fas fa-ban',
                        title: 'Reposo deportivo',
                        description: 'Sin actividad física hasta el 25/03/2024'
                    }
                ],
                observations: [
                    'Evolución favorable, pero requiere paciencia.',
                    'No forzar la recuperación.'
                ],
                lastCheck: '25/02/2024 - No apto temporalmente'
            }
        };

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
            initializeHistorialMedico();
        });

        // Inicializar la página
        function initializeHistorialMedico() {
            // Event listeners para los jugadores
            const playerItems = document.querySelectorAll('.player-item');
            playerItems.forEach(item => {
                item.addEventListener('click', function() {
                    selectPlayer(this);
                });
            });

            // Búsqueda de jugadores
            const searchInput = document.getElementById('searchPlayer');
            searchInput.addEventListener('input', function() {
                filterPlayers(this.value);
            });

            // Botones de acción
            document.querySelector('.btn-export').addEventListener('click', exportMedicalHistory);
            document.querySelector('.btn-print').addEventListener('click', printMedicalHistory);
        }

        // Seleccionar jugador
        function selectPlayer(playerElement) {
            // Remover selección anterior
            document.querySelectorAll('.player-item').forEach(item => {
                item.classList.remove('active');
            });

            // Agregar selección actual
            playerElement.classList.add('active');

            // Obtener datos del jugador
            const playerId = playerElement.getAttribute('data-player');
            const playerData = playersData[playerId];

            if (playerData) {
                showMedicalHistory(playerData);
            }
        }

        // Mostrar historial médico
        function showMedicalHistory(playerData) {
            document.getElementById('selectedPlayerName').textContent = playerData.name;
            
            const medicalContent = document.getElementById('medicalContent');
            const noSelection = document.getElementById('noSelection');

            // Ocultar mensaje de "no selección"
            noSelection.style.display = 'none';
            medicalContent.style.display = 'block';

            // Actualizar contenido
            updateMedicalContent(playerData);
        }

        // Actualizar contenido médico
        function updateMedicalContent(playerData) {
            // Actualizar información básica
            document.querySelector('.last-update').textContent = `Última actualización: ${playerData.lastUpdate}`;
            
            const healthStatus = document.querySelector('.health-status');
            const statusIcon = healthStatus.querySelector('.status-icon-apto');
            const statusText = healthStatus.querySelector('.status-text');
            
            // Cambiar clase del icono según estado
            statusIcon.className = `fas fa-check-circle status-icon-${playerData.status}`;
            statusText.textContent = `Estado de Salud: ${playerData.healthStatus}`;

            // Actualizar lesiones
            const injuryList = document.querySelector('.injury-list');
            injuryList.innerHTML = '';
            
            playerData.injuries.forEach(injury => {
                const injuryItem = document.createElement('div');
                injuryItem.className = 'injury-item';
                injuryItem.innerHTML = `
                    <div class="injury-date">${injury.date}</div>
                    <div class="injury-description">
                        <strong>${injury.description}</strong>
                        <span class="injury-status ${injury.status}">${getInjuryStatusText(injury.status)}</span>
                    </div>
                `;
                injuryList.appendChild(injuryItem);
            });

            // Actualizar tratamientos
            const treatmentList = document.querySelector('.treatment-list');
            treatmentList.innerHTML = '';
            
            playerData.treatments.forEach(treatment => {
                const treatmentItem = document.createElement('div');
                treatmentItem.className = 'treatment-item';
                treatmentItem.innerHTML = `
                    <i class="${treatment.icon}"></i>
                    <div class="treatment-info">
                        <strong>${treatment.title}</strong>
                        <span>${treatment.description}</span>
                    </div>
                `;
                treatmentList.appendChild(treatmentItem);
            });

            // Actualizar observaciones
            const observationsList = document.querySelector('.observations-list');
            observationsList.innerHTML = '';
            
            playerData.observations.forEach(observation => {
                const observationItem = document.createElement('div');
                observationItem.className = 'observation-item';
                observationItem.innerHTML = `
                    <i class="fas fa-info-circle"></i>
                    <span>${observation}</span>
                `;
                observationsList.appendChild(observationItem);
            });

            // Actualizar último chequeo
            document.querySelector('.check-info span').textContent = playerData.lastCheck;
        }

        // Obtener texto del estado de lesión
        function getInjuryStatusText(status) {
            const statusTexts = {
                'recovered': 'Recuperado',
                'active': 'En tratamiento',
                'pending': 'Pendiente diagnóstico'
            };
            return statusTexts[status] || status;
        }

        // Filtrar jugadores
        function filterPlayers(searchTerm) {
            const playerItems = document.querySelectorAll('.player-item');
            
            playerItems.forEach(item => {
                const playerName = item.querySelector('.player-name').textContent.toLowerCase();
                const playerPosition = item.querySelector('.player-position').textContent.toLowerCase();
                
                if (playerName.includes(searchTerm.toLowerCase()) || 
                    playerPosition.includes(searchTerm.toLowerCase())) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Exportar historial médico
        function exportMedicalHistory() {
            alert('Funcionalidad de exportación - Próximamente');
            // Aquí se implementaría la exportación a PDF
        }

        // Imprimir historial médico
        function printMedicalHistory() {
            alert('Funcionalidad de impresión - Próximamente');
            // Aquí se implementaría la impresión
        }
    