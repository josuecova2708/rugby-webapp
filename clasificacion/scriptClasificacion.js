
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
        });

        // Funciones de navegación (para futuras implementaciones)
        function navigateToCalificacion() {
            // Aquí se navegará a la tabla de criterios de calificación
          
            window.location.href = '../criterios/criterios.html';
        }

        function navigateToIndisciplina() {
            // Aquí se navegará a la tabla de indisciplina
           
             window.location.href = '../indisciplina/indisciplina.html';
        }

        function navigateToLesiones() {
            
            window.location.href = '../lesionesMedicas/lesionesMedicas.html';
        }

        // Funciones para mostrar información (placeholder)
        function showCalificacionInfo() {
     
        }

        function showIndisciplinaInfo() {
            alert('Información sobre cómo cargar tabla de Indisciplina:\n\n' +
                  '• Tipos de faltas y sanciones\n' +
                  '• Sistema de tarjetas (amarilla/roja)\n' +
                  '• Registro de incidentes\n' +
                  '• Historial disciplinario\n\n' +
                  'Funcionalidad completa próximamente.');
        }

        function showLesionesInfo() {
            alert('Información sobre cómo cargar tabla de Lesiones:\n\n' +
                  '• Tipos de lesiones más comunes\n' +
                  '• Clasificación por gravedad\n' +
                  '• Tiempo de recuperación estimado\n' +
                  '• Seguimiento médico\n\n' +
                  'Funcionalidad completa próximamente.');
        }