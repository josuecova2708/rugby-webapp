        // Variables globales
        let selectedDestinationType = null;
        let selectedPlayer = 'juan-serra';

        // Verificar autenticación al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            // Si no está logueado, redirigir al home
            if (!auth.isLoggedIn()) {
                alert('Debes iniciar sesión para acceder al feedback');
                window.location.href = '../index.html';
                return;
            }

            // Verificar que sea entrenador
            if (!auth.isCoach()) {
                alert('Acceso no autorizado - Solo para entrenadores');
                window.location.href = '../index.html';
                return;
            }

            // Si está logueado y es entrenador, actualizar la navegación
            auth.updateNavigation();
            initializeFeedbackEntrenador();
        });

        // Inicializar sistema de feedback para entrenador
        function initializeFeedbackEntrenador() {
            const playerItems = document.querySelectorAll('.player-chat-item');
            const messageTextarea = document.getElementById('messageTextarea');

            // Event listeners para los jugadores
            playerItems.forEach(item => {
                item.addEventListener('click', function() {
                    selectPlayerChat(this);
                });
            });

            // Contador de caracteres
            if (messageTextarea) {
                messageTextarea.addEventListener('input', function() {
                    updateCharacterCount();
                });
            }

            // Cerrar modal con Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeChatModal();
                }
            });
        }

        // Seleccionar chat de jugador
        function selectPlayerChat(playerElement) {
            // Remover selección anterior
            document.querySelectorAll('.player-chat-item').forEach(item => {
                item.classList.remove('active');
            });

            // Agregar selección actual
            playerElement.classList.add('active');

            // Actualizar título del chat
            const playerName = playerElement.querySelector('.player-name').textContent;
            document.getElementById('chatTitle').textContent = `#${playerName.toLowerCase().replace(' ', '-')}`;

            // Guardar jugador seleccionado
            selectedPlayer = playerElement.getAttribute('data-player');

            // Cerrar sidebar en móvil después de seleccionar
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        }

        // Toggle sidebar en móvil
        function toggleSidebar() {
            const sidebar = document.querySelector('.feedback-sidebar');
            sidebar.classList.toggle('active');
        }

        // Abrir modal de chat
        function openChatModal() {
            const modal = document.getElementById('chatModalOverlay');
            modal.classList.add('active');
            
            // Focus en el textarea
            setTimeout(() => {
                document.getElementById('messageTextarea').focus();
            }, 100);
        }

        // Cerrar modal de chat
        function closeChatModal() {
            const modal = document.getElementById('chatModalOverlay');
            modal.classList.remove('active');
            
            // Resetear formulario
            resetModalForm();
        }

        // Toggle dropdown de destino
        function toggleDestinationDropdown() {
            const dropdown = document.getElementById('dropdownMenu');
            const arrow = document.querySelector('.dropdown-arrow');
            
            dropdown.classList.toggle('active');
            arrow.classList.toggle('rotated');
        }

        // Seleccionar destino
        function selectDestination(type, displayName) {
            selectedDestinationType = type;
            document.getElementById('selectedDestination').textContent = displayName;
            
            // Cerrar dropdown
            document.getElementById('dropdownMenu').classList.remove('active');
            document.querySelector('.dropdown-arrow').classList.remove('rotated');
            
            // Actualizar estilo del botón de envío
            updateSendButtonState();
        }

        // Actualizar contador de caracteres
        function updateCharacterCount() {
            const textarea = document.getElementById('messageTextarea');
            const charCount = document.getElementById('charCount');
            
            charCount.textContent = textarea.value.length;
            
            // Cambiar color si se acerca al límite
            if (textarea.value.length > 450) {
                charCount.style.color = '#dc3545';
            } else if (textarea.value.length > 400) {
                charCount.style.color = '#ffc107';
            } else {
                charCount.style.color = '#6c757d';
            }
            
            updateSendButtonState();
        }

        // Actualizar estado del botón de envío
        function updateSendButtonState() {
            const textarea = document.getElementById('messageTextarea');
            const sendBtn = document.querySelector('.btn-send');
            
            const hasMessage = textarea.value.trim().length > 0;
            const hasDestination = selectedDestinationType !== null;
            
            if (hasMessage && hasDestination) {
                sendBtn.disabled = false;
                sendBtn.classList.remove('disabled');
            } else {
                sendBtn.disabled = true;
                sendBtn.classList.add('disabled');
            }
        }

        // Enviar mensaje
        function sendMessage() {
            const textarea = document.getElementById('messageTextarea');
            const message = textarea.value.trim();
            
            if (!message || !selectedDestinationType) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            // Simular envío de mensaje
            console.log('Enviando mensaje:', {
                type: selectedDestinationType,
                player: selectedPlayer,
                message: message,
                timestamp: new Date().toISOString()
            });
            
            // Mostrar confirmación
            alert(`Mensaje enviado ${selectedDestinationType === 'direct' ? 'directamente' : 'al chat general'}`);
            
            // Cerrar modal
            closeChatModal();
            
            // Aquí iría la lógica para enviar al backend
            // sendMessageToBackend(selectedDestinationType, selectedPlayer, message);
        }

        // Resetear formulario del modal
        function resetModalForm() {
            document.getElementById('messageTextarea').value = '';
            document.getElementById('selectedDestination').textContent = 'Seleccionar destino';
            document.getElementById('charCount').textContent = '0';
            document.getElementById('charCount').style.color = '#6c757d';
            
            selectedDestinationType = null;
            
            // Cerrar dropdown si está abierto
            document.getElementById('dropdownMenu').classList.remove('active');
            document.querySelector('.dropdown-arrow').classList.remove('rotated');
            
            updateSendButtonState();
        }

        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('destinationDropdown');
            const dropdownMenu = document.getElementById('dropdownMenu');
            
            if (!dropdown.contains(event.target)) {
                dropdownMenu.classList.remove('active');
                document.querySelector('.dropdown-arrow').classList.remove('rotated');
            }
        });

        // Responsive: cerrar sidebar al hacer clic fuera en móvil
        document.addEventListener('click', function(event) {
            const sidebar = document.querySelector('.feedback-sidebar');
            const chatActionBtn = document.querySelector('.chat-actions .mobile-only');
            
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('active') && 
                !sidebar.contains(event.target) && 
                !chatActionBtn.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });

        // Función para enviar al backend (placeholder)
        function sendMessageToBackend(type, player, message) {
            // Esta función será implementada para enviar al backend
            /*
            fetch('/api/messages/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: JSON.stringify({
                    type: type,
                    recipientId: type === 'direct' ? player : null,
                    message: message,
                    timestamp: new Date().toISOString()
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Mensaje enviado correctamente');
                } else {
                    alert('Error al enviar mensaje: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error de conexión al servidor');
            });
            */
        }
    