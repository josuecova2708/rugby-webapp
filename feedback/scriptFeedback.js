        // Verificar autenticación al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            // Si no está logueado, redirigir al home
            if (!auth.isLoggedIn()) {
                alert('Debes iniciar sesión para acceder al feedback');
                window.location.href = '../index.html';
                return;
            }

            // Si está logueado, actualizar la navegación
            auth.updateNavigation();
            initializeChatSystem();
        });

        // Inicializar sistema de chat
        function initializeChatSystem() {
            const categories = document.querySelectorAll('.chat-category');
            const messages = document.querySelectorAll('.message');
            const chatTitle = document.getElementById('chatTitle');

            categories.forEach(category => {
                category.addEventListener('click', function () {
                    // Remover clase active de todas las categorías
                    categories.forEach(cat => cat.classList.remove('active'));
                    // Agregar clase active a la categoría clickeada
                    this.classList.add('active');

                    const selectedCategory = this.getAttribute('data-category');
                    const categoryText = this.querySelector('span').textContent;

                    // Actualizar título del chat
                    chatTitle.textContent = `#${categoryText.toLowerCase()}`;

                    // Mostrar/ocultar mensajes según categoría
                    if (selectedCategory === 'tecnica-general') {
                        // Mostrar mensajes por defecto
                        messages.forEach(message => {
                            if (!message.hasAttribute('data-category')) {
                                message.style.display = 'flex';
                            } else {
                                message.style.display = 'none';
                            }
                        });
                    } else {
                        // Mostrar mensajes de la categoría específica
                        messages.forEach(message => {
                            if (message.getAttribute('data-category') === selectedCategory) {
                                message.style.display = 'flex';
                            } else {
                                message.style.display = 'none';
                            }
                        });
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
            const sidebar = document.querySelector('.feedback-sidebar');
            sidebar.classList.toggle('active');
        }

        // Funciones de chat (simuladas)
        function refreshChat() {
            console.log('Actualizando chat...');
            // Aquí iría la lógica para actualizar mensajes
        }

        function pinChat() {
            console.log('Fijando chat...');
            // Aquí iría la lógica para fijar el chat
        }

        // Responsive: cerrar sidebar al hacer clic fuera en móvil
        document.addEventListener('click', function (event) {
            const sidebar = document.querySelector('.feedback-sidebar');
            const chatActionBtn = document.querySelector('.chat-actions .mobile-only');

            if (window.innerWidth <= 768 &&
                sidebar.classList.contains('active') &&
                !sidebar.contains(event.target) &&
                !chatActionBtn.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });
    