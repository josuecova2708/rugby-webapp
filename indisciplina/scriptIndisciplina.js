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

        // Funciones para los botones de acción
        function exportIndisciplinaData() {
            alert('Exportar datos de indisciplina - Funcionalidad próximamente');
            // Aquí iría la lógica para exportar los datos
        }

        function importIndisciplinaData() {
            // Crear input file temporal
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.csv,.xlsx,.xls';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    alert(`Importando archivo: ${file.name} - Funcionalidad próximamente`);
                    // Aquí iría la lógica para procesar el archivo
                }
            };
            input.click();
        }

        function editIndisciplinaData() {
            alert('Editar datos de indisciplina - Funcionalidad próximamente');
            // Aquí iría la lógica para habilitar edición en línea
        }
    