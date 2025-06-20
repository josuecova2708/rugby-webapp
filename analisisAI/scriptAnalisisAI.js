 
        let currentCategory = 'primera';
        let currentTab = 'titulares';

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
            updateStats();
        });

        // Toggle dropdown de categorías
        function toggleCategoryDropdown() {
            const dropdown = document.getElementById('categoryDropdown');
            dropdown.classList.toggle('active');
        }

        // Seleccionar categoría
        function selectCategory(category) {
            currentCategory = category;
            
            // Actualizar botón activo
            document.querySelectorAll('.btn-category').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-category="${category}"]`).classList.add('active');
            
            // Filtrar tabla
            filterTable();
            updateStats();
        }

        // Cambiar pestaña (Titulares/Suplentes)
        function switchTab(tab) {
            currentTab = tab;
            
            // Actualizar botones de pestaña
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
            
            // Filtrar tabla
            filterTable();
            updateStats();
        }

        // Filtrar tabla según categoría y pestaña
        function filterTable() {
            const rows = document.querySelectorAll('#playersTableBody tr');
            
            rows.forEach(row => {
                const rowCategory = row.getAttribute('data-category');
                const isCorrectCategory = currentCategory === 'all' || rowCategory === currentCategory;
                const isCorrectTab = row.classList.contains(`${currentTab}-row`);
                
                if (isCorrectCategory && isCorrectTab) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        // Toggle selector de jugador
        function togglePlayerSelector(element) {
            const selectorToggle = element.querySelector('.selector-toggle');
            const icon = selectorToggle.querySelector('i');
            
            if (selectorToggle.classList.contains('selected')) {
                selectorToggle.classList.remove('selected');
                icon.className = 'fas fa-times';
            } else {
                selectorToggle.classList.add('selected');
                icon.className = 'fas fa-check';
            }
            
            updateStats();
        }

        // Actualizar estadísticas
        function updateStats() {
            const visibleRows = document.querySelectorAll('#playersTableBody tr:not([style*="display: none"])');
            const selectedRows = Array.from(visibleRows).filter(row => 
                row.querySelector('.selector-toggle.selected')
            );
            
            // Jugadores seleccionados
            document.getElementById('selectedPlayers').textContent = selectedRows.length;
            
            // Promedio de clasificación
            if (selectedRows.length > 0) {
                const avgClassification = selectedRows.reduce((sum, row) => {
                    const classification = parseInt(row.querySelector('.classification').textContent);
                    return sum + classification;
                }, 0) / selectedRows.length;
                document.getElementById('avgRating').textContent = avgClassification.toFixed(1);
                
                // Promedio de asistencia
                const avgAttendance = selectedRows.reduce((sum, row) => {
                    const attendance = parseInt(row.querySelector('.attendance').textContent);
                    return sum + attendance;
                }, 0) / selectedRows.length;
                document.getElementById('avgAttendance').textContent = Math.round(avgAttendance) + '%';
            } else {
                document.getElementById('avgRating').textContent = '0';
                document.getElementById('avgAttendance').textContent = '0%';
            }
        }

        // Generar análisis por IA
        function generateAIAnalysis() {
            // Simular proceso de IA
            const btn = document.querySelector('.btn-generate-ai');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analizando...';
            btn.disabled = true;
            
            setTimeout(() => {
                // Simular selección automática de mejores jugadores
                const rows = document.querySelectorAll('#playersTableBody tr:not([style*="display: none"])');
                
                rows.forEach((row, index) => {
                    const classification = parseInt(row.querySelector('.classification').textContent);
                    const attendance = parseInt(row.querySelector('.attendance').textContent);
                    const selectorToggle = row.querySelector('.selector-toggle');
                    const icon = selectorToggle.querySelector('i');
                    
                    // Lógica simple de IA: seleccionar si clasificación > 6 y asistencia > 80%
                    if (classification > 6 && attendance > 80) {
                        selectorToggle.classList.add('selected');
                        icon.className = 'fas fa-check';
                    } else {
                        selectorToggle.classList.remove('selected');
                        icon.className = 'fas fa-times';
                    }
                });
                
                updateStats();
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                alert('Análisis por IA completado. Se han seleccionado los jugadores con mejor rendimiento.');
            }, 2000);
        }

        // Exportar selección
        function exportSelection() {
            alert('Exportando selección de jugadores - Funcionalidad próximamente');
        }

        // Guardar selección
        function saveSelection() {
            alert('Guardando selección de jugadores - Funcionalidad próximamente');
        }

        // Restablecer selección
        function resetSelection() {
            if (confirm('¿Estás seguro de que quieres restablecer la selección?')) {
                document.querySelectorAll('.selector-toggle').forEach(toggle => {
                    toggle.classList.remove('selected');
                    toggle.querySelector('i').className = 'fas fa-times';
                });
                updateStats();
            }
        }

        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('categoryDropdown');
            const dropdownBtn = document.querySelector('.dropdown-btn');
            
            if (!dropdown.contains(event.target) && !dropdownBtn.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });

        // Manejar clicks en selectores
        document.addEventListener('click', function(event) {
            if (event.target.closest('.selector-toggle')) {
                togglePlayerSelector(event.target.closest('tr'));
            }
        });
    