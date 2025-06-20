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
            initializeForm();
        });

        // Inicializar funcionalidad del formulario
        function initializeForm() {
            const tipoMensaje = document.getElementById('tipoMensaje');
            const mensajeTexto = document.getElementById('mensajeTexto');
            const charCount = document.getElementById('charCount');
            const anuncioForm = document.getElementById('anuncioForm');
            const valoracionPlaceholder = document.getElementById('valoracionPlaceholder');

            // Manejar cambio en tipo de mensaje
            tipoMensaje.addEventListener('change', function() {
                handleTipoMensajeChange(this.value);
            });

            // Contador de caracteres
            mensajeTexto.addEventListener('input', function() {
                const currentLength = this.value.length;
                charCount.textContent = currentLength;
                
                if (currentLength > 500) {
                    charCount.style.color = '#dc3545';
                    this.style.borderColor = '#dc3545';
                } else {
                    charCount.style.color = '#6c757d';
                    this.style.borderColor = '#ddd';
                }
            });

            // Manejar envío del formulario
            anuncioForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmit();
            });
        }

        // Manejar cambio en tipo de mensaje
        function handleTipoMensajeChange(tipo) {
            const anuncioForm = document.getElementById('anuncioForm');
            const valoracionPlaceholder = document.getElementById('valoracionPlaceholder');
            
            // Ocultar todos los campos condicionales
            hideAllConditionalFields();

            if (tipo === 'valoracion-entrenamiento') {
                // Mostrar placeholder para valoración
                anuncioForm.style.display = 'none';
                valoracionPlaceholder.style.display = 'flex';
                return;
            } else {
                // Mostrar formulario normal
                anuncioForm.style.display = 'block';
                valoracionPlaceholder.style.display = 'none';
            }

            // Mostrar campos específicos según el tipo
            switch(tipo) {
                case 'recordatorio':
                    showField('horaRecordatorio');
                    break;
                case 'mensaje-directo':
                    showField('jugadorDestino');
                    break;
                case 'difusion':
                case 'alerta-urgente':
                    showField('tituloAnuncio');
                    break;
            }
        }

        // Ocultar todos los campos condicionales
        function hideAllConditionalFields() {
            const conditionalFields = document.querySelectorAll('.conditional-field');
            conditionalFields.forEach(field => {
                field.style.display = 'none';
                // Limpiar valores
                const inputs = field.querySelectorAll('input, select');
                inputs.forEach(input => input.value = '');
            });
        }

        // Mostrar campo específico
        function showField(fieldId) {
            const field = document.getElementById(fieldId);
            field.style.display = 'block';
            
            // Hacer el campo requerido
            const inputs = field.querySelectorAll('input, select');
            inputs.forEach(input => input.required = true);
        }

        // Manejar envío del formulario
        function handleFormSubmit() {
            const tipoMensaje = document.getElementById('tipoMensaje').value;
            const mensajeTexto = document.getElementById('mensajeTexto').value;

            // Validar longitud del mensaje
            if (mensajeTexto.length > 500) {
                alert('El mensaje no puede exceder los 500 caracteres');
                return;
            }

            // Construir objeto de datos
            const anuncioData = {
                tipo: tipoMensaje,
                mensaje: mensajeTexto,
                fecha: new Date().toISOString(),
                entrenador: auth.getCurrentUser().name
            };

            // Agregar campos específicos según el tipo
            switch(tipoMensaje) {
                case 'recordatorio':
                    const hora = document.getElementById('horaInput').value;
                    if (!hora) {
                        alert('Debes seleccionar una hora para el recordatorio');
                        return;
                    }
                    anuncioData.hora = hora;
                    break;

                case 'mensaje-directo':
                    const jugador = document.getElementById('jugadorSelect').value;
                    if (!jugador) {
                        alert('Debes seleccionar un destinatario');
                        return;
                    }
                    anuncioData.destinatario = jugador;
                    break;

                case 'difusion':
                case 'alerta-urgente':
                    const titulo = document.getElementById('tituloInput').value;
                    if (!titulo.trim()) {
                        alert('Debes ingresar un título para el anuncio');
                        return;
                    }
                    anuncioData.titulo = titulo;
                    break;
            }

            // Simular envío (aquí iría la llamada al backend)
            console.log('Datos del anuncio:', anuncioData);
            
            // Mostrar mensaje de éxito
            showSuccessMessage(anuncioData);
        }

        // Mostrar mensaje de éxito
        function showSuccessMessage(data) {
            let mensaje = `Anuncio de tipo "${data.tipo}" enviado exitosamente.`;
            
            if (data.destinatario) {
                mensaje += ` Destinatario: ${data.destinatario}`;
            }
            if (data.hora) {
                mensaje += ` Programado para las ${data.hora}`;
            }
            if (data.titulo) {
                mensaje += ` Título: "${data.titulo}"`;
            }

            alert(mensaje);

            // Resetear formulario
            resetForm();
        }

        // Resetear formulario
        function resetForm() {
            document.getElementById('anuncioForm').reset();
            document.getElementById('anuncioForm').style.display = 'block';
            document.getElementById('valoracionPlaceholder').style.display = 'none';
            document.getElementById('charCount').textContent = '0';
            hideAllConditionalFields();
        }

        // Función para el backend: enviar anuncio
        async function enviarAnuncio(anuncioData) {
            try {
                // Esta función será implementada cuando se conecte con el backend
                const response = await fetch('/api/anuncios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getAuthToken()}`
                    },
                    body: JSON.stringify(anuncioData)
                });

                if (!response.ok) {
                    throw new Error('Error al enviar el anuncio');
                }

                return await response.json();
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        }

        // Función para obtener token de autenticación (placeholder)
        function getAuthToken() {
            // Esta función será implementada con el sistema de autenticación real
            return 'placeholder-token';
        }
    