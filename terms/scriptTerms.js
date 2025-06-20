        // Verificar autenticación y actualizar navegación
        document.addEventListener('DOMContentLoaded', function () {
            updateNavigation();
        });

        function updateNavigation() {
            const navButtons = document.querySelector('.nav-buttons');
            
            // Verificar si el sistema de autenticación está disponible
            if (typeof auth !== 'undefined' && auth.isLoggedIn()) {
                // Usuario logueado - usar navegación completa
                auth.updateNavigation();
            } else {
                // Usuario no logueado - mostrar botones de login/registro
                navButtons.innerHTML = `
                    <button class="btn-login" onclick="window.location.href = '../login/login.html'">Iniciar sesión</button>
                    <button class="btn-register" onclick="window.location.href='../registro/registro.html'">Registrarse</button>
                `;
            }
        }
