       // Verificar autenticación al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            // Si no está logueado, redirigir al home
            if (!auth.isLoggedIn()) {
                alert('Debes iniciar sesión para acceder a tu perfil');
                window.location.href = '../index.html';
                return;
            }

            // Si está logueado, actualizar la navegación y cargar perfil
            auth.updateNavigation();
            loadUserProfile();
        });

        // Cargar perfil adaptado al tipo de usuario
        function loadUserProfile() {
            const user = auth.getCurrentUser();
            if (!user) return;

            // Actualizar información básica
            document.getElementById('userName').textContent = user.name;
            
            if (auth.isCoach()) {
                loadCoachProfile(user);
            } else if (auth.isPlayer()) {
                loadPlayerProfile(user);
            }
        }

        // Cargar perfil de entrenador
        function loadCoachProfile(coach) {
            // Cambiar icono
            document.getElementById('userIcon').className = 'fas fa-chalkboard-teacher';
            
            // Mostrar rol
            document.getElementById('userRole').textContent = `Entrenador - ${coach.specializationName || 'Técnica General'}`;
            
            // Menú específico del entrenador
            document.getElementById('perfilMenu').innerHTML = `
                <a href="../datosPerfilEntrenador/datosPerfilEntrenador.html">
                    <li><i class="fas fa-user-edit"></i> Mis datos</li>
                </a>
                <a href="../configuracionPerfil/configuracionPerfil.html">
                    <li><i class="fas fa-cog"></i> Configuración</li>
                </a>
                <a href="../historialMedicoEntrenador/historialMedicoEntrenador.html">
                    <li><i class="fas fa-file-medical"></i> Historial médico</li>
                </a>
                <li onclick="auth.logout(); window.location.href='../index.html';">
                    <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                </li>
            `;
        }

        // Cargar perfil de jugador
        function loadPlayerProfile(player) {
            // Mantener icono por defecto
            document.getElementById('userIcon').className = 'fas fa-user-circle';
            
            // Mostrar rol
            document.getElementById('userRole').textContent = `Jugador - ${player.position || 'Sin posición'} | ${player.category || 'Sin categoría'}`;
            
            // Menú específico del jugador
            document.getElementById('perfilMenu').innerHTML = `
                <a href="../datosPerfil/datosPerfil.html">
                    <li><i class="fas fa-user-edit"></i> Mis datos</li>
                </a>
                <a href="../configuracionPerfil/configuracionPerfil.html">
                    <li><i class="fas fa-cog"></i> Configuración</li>
                </a>
                <li onclick="auth.logout(); window.location.href='../index.html';">
                    <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                </li>
            `;
        }
    