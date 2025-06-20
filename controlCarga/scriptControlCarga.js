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
            initializeIntensityBars();
        });

        // Inicializar las barras de intensidad
        function initializeIntensityBars() {
            const intensityLevels = document.querySelectorAll('.intensity-level');
            
            intensityLevels.forEach(level => {
                const minutos = parseInt(level.getAttribute('data-minutos'));
                const esfuerzo = parseInt(level.getAttribute('data-esfuerzo'));
                
                // Calcular carga de intensidad (minutos × esfuerzo)
                const cargaIntensidad = minutos * esfuerzo;
                
                // Calcular porcentaje para la barra (usando 800 como máximo para normalizar)
                const maxCarga = 800; // Valor máximo esperado (80 min × 10 esfuerzo)
                const percentage = Math.min((cargaIntensidad / maxCarga) * 100, 100);
                
                // Establecer el ancho de la barra según el porcentaje
                level.style.width = percentage + '%';
                
                // Establecer el color según el nivel de intensidad
                if (cargaIntensidad >= 600) {
                    level.style.backgroundColor = '#dc3545'; // Rojo para alta intensidad
                } else if (cargaIntensidad >= 400) {
                    level.style.backgroundColor = '#ffc107'; // Amarillo para intensidad media
                } else {
                    level.style.backgroundColor = '#28a745'; // Verde para baja intensidad
                }
            });
        }
    