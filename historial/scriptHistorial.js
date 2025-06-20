        // Verificar autenticación al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            // Si no está logueado, redirigir al home
            if (!auth.isLoggedIn()) {
                alert('Debes iniciar sesión para acceder al historial');
                window.location.href = '../index.html';
                return;
            }

            // Si está logueado, actualizar la navegación
            auth.updateNavigation();
            initializeHistorialSystem();
        });

        // Inicializar sistema de historial
        function initializeHistorialSystem() {
            const categories = document.querySelectorAll('.historial-category');
            const sections = document.querySelectorAll('.historial-section');
            const historialTitle = document.getElementById('historialTitle');
            const noRecords = document.getElementById('noRecords');

            categories.forEach(category => {
                category.addEventListener('click', function() {
                    // Remover clase active de todas las categorías
                    categories.forEach(cat => cat.classList.remove('active'));
                    // Agregar clase active a la categoría clickeada
                    this.classList.add('active');

                    const selectedCategory = this.getAttribute('data-category');
                    const categoryText = this.querySelector('span').textContent;
                    
                    // Actualizar título del historial
                    historialTitle.textContent = categoryText;

                    // Mostrar/ocultar secciones según categoría
                    let hasRecords = false;
                    sections.forEach(section => {
                        if (section.getAttribute('data-category') === selectedCategory) {
                            section.style.display = 'block';
                            if (section.children.length > 0) {
                                hasRecords = true;
                            }
                        } else {
                            section.style.display = 'none';
                        }
                    });

                    // Mostrar mensaje si no hay registros
                    if (hasRecords) {
                        noRecords.style.display = 'none';
                    } else {
                        noRecords.style.display = 'flex';
                    }

                    // Cerrar sidebar en móvil después de seleccionar
                    if (window.innerWidth <= 768) {
                        toggleSidebar();
                    }
                });
            });
        }

        // Toggle sidebar en móvil
        function toggleSidebar() {
            const sidebar = document.querySelector('.historial-sidebar');
            sidebar.classList.toggle('active');
        }

        // Funciones de historial (simuladas)
        function exportHistorial() {
            const currentCategory = document.querySelector('.historial-category.active span').textContent;
            alert(`Exportando historial de: ${currentCategory}`);
            // Aquí iría la lógica para exportar el historial
        }

       

        // Responsive: cerrar sidebar al hacer clic fuera en móvil
        document.addEventListener('click', function(event) {
            const sidebar = document.querySelector('.historial-sidebar');
            const historialActionBtn = document.querySelector('.historial-actions .mobile-only');
            
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('active') && 
                !sidebar.contains(event.target) && 
                !historialActionBtn.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });
    