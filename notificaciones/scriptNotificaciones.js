        // Verificar autenticación al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            // Si no está logueado, redirigir al home
            if (!auth.isLoggedIn()) {
                alert('Debes iniciar sesión para acceder a las notificaciones');
                window.location.href = '../index.html';
                return;
            }

            // Si está logueado, actualizar la navegación
            auth.updateNavigation();
            initializeFilters();
        });

        // Toggle del menú de filtros
        function toggleFilterMenu() {
            const filterMenu = document.getElementById('filterMenu');
            filterMenu.classList.toggle('active');
        }

        // Inicializar sistema de filtros
        function initializeFilters() {
            const filterButtons = document.querySelectorAll('.filter-option');
            const notifications = document.querySelectorAll('.notification-item');
            const noNotificationsMsg = document.getElementById('noNotifications');

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remover clase active de todos los botones
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Agregar clase active al botón clickeado
                    this.classList.add('active');

                    const filter = this.getAttribute('data-filter');
                    let visibleCount = 0;

                    // Filtrar notificaciones
                    notifications.forEach(notification => {
                        if (filter === 'all' || notification.getAttribute('data-category') === filter) {
                            notification.style.display = 'flex';
                            visibleCount++;
                        } else {
                            notification.style.display = 'none';
                        }
                    });

                    // Mostrar mensaje si no hay notificaciones
                    if (visibleCount === 0) {
                        noNotificationsMsg.style.display = 'flex';
                    } else {
                        noNotificationsMsg.style.display = 'none';
                    }

                    // Cerrar menú de filtros
                    document.getElementById('filterMenu').classList.remove('active');
                });
            });
        }

        // Cerrar filtros al hacer clic fuera
        document.addEventListener('click', function(event) {
            const filterMenu = document.getElementById('filterMenu');
            const filterBtn = document.querySelector('.filter-btn');
            
            if (!filterMenu.contains(event.target) && !filterBtn.contains(event.target)) {
                filterMenu.classList.remove('active');
            }
        });

        // Marcar notificación como leída al hacer clic
        document.querySelectorAll('.notification-item').forEach(notification => {
            notification.addEventListener('click', function() {
                this.classList.add('read');
            });
        });
    