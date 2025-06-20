
        // Verificar autenticación al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            // Si no está logueado, redirigir al home
            if (!auth.isLoggedIn()) {
                alert('Debes iniciar sesión para acceder a esta página');
                window.location.href = '../index.html';
                return;
            }

            // Si está logueado, actualizar la navegación
            auth.updateNavigation();
            loadUserSettings();
        });

        // Cargar configuraciones del usuario (simulado)
        function loadUserSettings() {
            // Aquí cargarías las configuraciones guardadas del usuario
            // Por ahora dejamos algunos valores por defecto
            document.getElementById('mobile-notifications').checked = true;
            document.getElementById('training-notifications').checked = true;
        }

        // Manejar cambios en los toggles
        document.querySelectorAll('.toggle-input').forEach(toggle => {
            toggle.addEventListener('change', function() {
                console.log(`${this.id} cambiado a: ${this.checked}`);
                // Aquí enviarías los cambios al backend
                saveUserSetting(this.id, this.checked);
            });
        });

        // Función para guardar configuración (simulada)
        function saveUserSetting(setting, value) {
            // Aquí harías la llamada al backend para guardar la configuración
            console.log(`Guardando configuración: ${setting} = ${value}`);
        }

        // Manejar descarga de rendimiento
        document.querySelector('.download-item').addEventListener('click', function() {
            alert('Funcionalidad de descarga de rendimiento - Próximamente');
            // Aquí implementarías la descarga del reporte
        });

        // Manejar eliminación de cuenta
        document.querySelector('.delete-item').addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
                alert('Funcionalidad de eliminación de cuenta - Próximamente');
                // Aquí implementarías la eliminación de cuenta
            }
        });
    