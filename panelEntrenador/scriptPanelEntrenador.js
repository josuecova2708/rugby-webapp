        const playersData = [
            {
                name: "Juan Serra",
                position: "3ra línea - Apertura",
                status: "Activo - Primera",
                attendance: "80%",
                photo: "../recursos/player-martinez.jpg"
            },
            {
                name: "Mario Coronel",
                position: "Centro",
                status: "Activo - Primera",
                attendance: "85%",
                photo: "../recursos/player-martinez.jpg"
            },
            {
                name: "Agustín Montenegro",
                position: "Ala",
                status: "Activo - Primera",
                attendance: "90%",
                photo: "../recursos/player-martinez.jpg"
            },
            {
                name: "Lucas González",
                position: "Hooker",
                status: "Activo - Primera",
                attendance: "75%",
                photo: "../recursos/player-martinez.jpg"
            },
            {
                name: "Luciano Valdez",
                position: "Tercera línea",
                status: "Activo - Primera",
                attendance: "88%",
                photo: "../recursos/player-martinez.jpg"
            },
            {
                name: "Federico Martín",
                position: "Apertura",
                status: "Activo - M21",
                attendance: "92%",
                photo: "../recursos/player-martinez.jpg"
            },
            {
                name: "Carlos Rodríguez",
                position: "Centro",
                status: "Activo - Primera",
                attendance: "82%",
                photo: "../recursos/player-martinez.jpg"
            },
            {
                name: "Diego Fernández",
                position: "Wing",
                status: "Activo - M21",
                attendance: "86%",
                photo: "../recursos/player-martinez.jpg"
            },
            {
                name: "Sebastián García",
                position: "Fullback",
                status: "Activo - M21",
                attendance: "89%",
                photo: "../recursos/player-martinez.jpg"
            },
            {
                name: "Nicolás Torres",
                position: "Pilar",
                status: "Activo - Primera",
                attendance: "78%",
                photo: "../recursos/player-martinez.jpg"
            }
        ];

        // Datos de rendimiento del gimnasio
        const performanceData = [
            {
                name: "Juan Serra",
                exercise: "Sentadilla",
                repetitions: 4,
                weight: 85
            },
            {
                name: "Mario Coronel",
                exercise: "Pecho",
                repetitions: 4,
                weight: 90
            },
            {
                name: "Agustín Montenegro",
                exercise: "Dominadas",
                repetitions: 5,
                weight: 100
            },
            {
                name: "Lucas González",
                exercise: "Arranque",
                repetitions: 5,
                weight: 100
            },
            {
                name: "Luciano Valdez",
                exercise: "Peso muerto",
                repetitions: 4,
                weight: 100
            },
            {
                name: "Federico Martín",
                exercise: "Sentadilla",
                repetitions: 3,
                weight: 75
            },
            {
                name: "Carlos Rodríguez",
                exercise: "Pecho",
                repetitions: 4,
                weight: 85
            },
            {
                name: "Diego Fernández",
                exercise: "Dominadas",
                repetitions: 6,
                weight: 95
            },
            {
                name: "Sebastián García",
                exercise: "Arranque",
                repetitions: 4,
                weight: 80
            },
            {
                name: "Nicolás Torres",
                exercise: "Peso muerto",
                repetitions: 5,
                weight: 110
            },
            {
                name: "Juan Serra",
                exercise: "Pecho",
                repetitions: 3,
                weight: 80
            },
            {
                name: "Mario Coronel",
                exercise: "Sentadilla",
                repetitions: 5,
                weight: 95
            }
        ];

        let currentPlayerPage = 0;
        const playersPerPage = 6;
        let currentFilter = 'todos';

        // Verificar autenticación al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            // Si no está logueado o no es entrenador, redirigir
            if (!auth.isLoggedIn() || !auth.isCoach()) {
                alert('Solo los entrenadores pueden acceder a esta página');
                window.location.href = '../index.html';
                return;
            }

            // Si está logueado y es entrenador, actualizar navegación
            auth.updateNavigation();
            initializePanelTabs();
            initializePlayersSection();
              initializeGymSection();
        });

        // Inicializar sistema de pestañas
        function initializePanelTabs() {
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach(button => {
                button.addEventListener('click', function () {
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
                    }
                });
            });
        }

        // Inicializar sección de jugadores
        function initializePlayersSection() {
            generatePlayersGrid();
            generateIndicators();
        }
          // Inicializar sección del gimnasio
        function initializeGymSection() {
            initializeExerciseFilters();
            renderPerformanceTable();
        }

        // Inicializar filtros de ejercicios
        function initializeExerciseFilters() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remover clase active de todos los botones
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Agregar clase active al botón clickeado
                    this.classList.add('active');
                    
                    // Obtener el ejercicio seleccionado
                    currentFilter = this.getAttribute('data-exercise');
                    
                    // Renderizar tabla con filtro
                    renderPerformanceTable();
                });
            });
        }

        // Renderizar tabla de rendimiento con filtros
        function renderPerformanceTable() {
            const tableBody = document.getElementById('performanceTableBody');
            const recordsCount = document.getElementById('recordsCount');
            
            // Filtrar datos según el filtro seleccionado
            let filteredData = performanceData;
            if (currentFilter !== 'todos') {
                filteredData = performanceData.filter(item => item.exercise === currentFilter);
            }
            
            // Limpiar tabla
            tableBody.innerHTML = '';
            
            // Generar filas
            filteredData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.exercise}</td>
                    <td>${item.repetitions}</td>
                    <td>${item.weight}</td>
                `;
                tableBody.appendChild(row);
            });
            
            // Actualizar contador
            recordsCount.textContent = `Mostrando ${filteredData?.length} registros`;
            
            // Mensaje si no hay datos
            if (filteredData.length === 0) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="4" style="text-align: center; padding: 40px; color: #6c757d; font-style: italic;">
                        <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                        No se encontraron registros para "${currentFilter}"
                    </td>
                `;
                tableBody.appendChild(row);
                recordsCount.textContent = 'No hay registros que mostrar';
            }
        }


        // Generar grid de jugadores (estático, sin duplicación)
        function generatePlayersGrid() {
            const playersGrid = document.getElementById('playersGrid');
            const startIndex = currentPlayerPage * playersPerPage;
            const endIndex = Math.min(startIndex + playersPerPage, playersData.length);

            playersGrid.innerHTML = '';

            for (let i = startIndex; i < endIndex; i++) {
                const player = playersData[i];
                const playerCard = document.createElement('div');
                playerCard.className = 'player-card';
                playerCard.onclick = () => selectPlayer(player);

                playerCard.innerHTML = `
            <div class="player-photo">
                <img src="${player.photo}" alt="${player.name}" 
                     onerror="this.src='../recursos/sergio.jpg'">
            </div>
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-position">${player.position}</div>
                <div class="player-status">
                    <span class="status-indicator"></span>
                    ${player.status}
                </div>
                <div class="player-attendance">Asistencia ${player.attendance}</div>
            </div>
        `;

                playersGrid.appendChild(playerCard);
            }
        }

        // Generar indicadores de páginas
        function generateIndicators() {
            const playersIndicators = document.getElementById('playersIndicators');
            const totalPages = Math.ceil(playersData.length / playersPerPage);

            playersIndicators.innerHTML = '';

            for (let i = 0; i < totalPages; i++) {
                const indicator = document.createElement('div');
                indicator.className = `indicator ${i === currentPlayerPage ? 'active' : ''}`;
                indicator.onclick = () => goToPlayerPage(i);
                playersIndicators.appendChild(indicator);
            }

            // Actualizar estado de botones de navegación
            updateNavigationButtons();
        }

        // Actualizar estado de botones de navegación
        function updateNavigationButtons() {
            const totalPages = Math.ceil(playersData.length / playersPerPage);
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');

            if (prevBtn && nextBtn) {
                // Deshabilitar botón anterior si estamos en la primera página
                prevBtn.disabled = currentPlayerPage === 0;

                // Deshabilitar botón siguiente si estamos en la última página
                nextBtn.disabled = currentPlayerPage === totalPages - 1;
            }
        }

        // Navegar a página específica
        function goToPlayerPage(page) {
            const totalPages = Math.ceil(playersData.length / playersPerPage);
            if (page >= 0 && page < totalPages) {
                currentPlayerPage = page;
                generatePlayersGrid();
                generateIndicators();
            }
        }

        // Página anterior
        function previousPlayers() {
            if (currentPlayerPage > 0) {
                goToPlayerPage(currentPlayerPage - 1);
            }
        }

        // Página siguiente
        function nextPlayers() {
            const totalPages = Math.ceil(playersData.length / playersPerPage);
            if (currentPlayerPage < totalPages - 1) {
                goToPlayerPage(currentPlayerPage + 1);
            }
        }

        // Seleccionar jugador
        function selectPlayer(player) {
            alert(`Has seleccionado a ${player.name}\nPosición: ${player.position}\nAsistencia: ${player.attendance}\n\nEsta funcionalidad estará disponible próximamente.`);
            // Aquí se implementará la navegación al detalle del jugador
            // Ejemplo: window.location.href = `../jugadorDetalle/jugadorDetalle.html?id=${player.id}`;
        }

        // Funciones para botones de acción (placeholder)
        function exportarArchivo() {
            alert('Exportar archivo - Funcionalidad próximamente');
        }

        function importarArchivo() {
            alert('Importar archivo - Funcionalidad próximamente');
        }

        function agregarJugador() {
            alert('Agregar jugador - Funcionalidad próximamente');
        }
    