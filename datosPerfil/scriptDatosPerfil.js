        // Verificar autenticación al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            // Si no está logueado, redirigir al home
            if (!auth.isLoggedIn()) {
                alert('Debes iniciar sesión para acceder a esta página');
                window.location.href = '../index.html';
                return;
            }

            // Si está logueado, actualizar la navegación y cargar datos
            auth.updateNavigation();
            loadUserData();
        });

        // Cargar datos del usuario en el formulario
        function loadUserData() {
            const user = auth.getCurrentUser();
            if (user) {
                document.getElementById('fullName').value = user.name || '';
                document.getElementById('birthDate').value = user.birthDate || '';
                document.getElementById('email').value = user.email || '';
                document.getElementById('password').value = user.password || '';
                document.getElementById('nickname').value = user.nickname || '';
                document.getElementById('position').value = user.position || '';
                document.getElementById('category').value = user.category || '';
                document.getElementById('height').value = user.height || '';
                document.getElementById('weight').value = user.weight || '';
                document.getElementById('healthInsurance').value = user.healthInsurance || '';
                document.getElementById('credentialNumber').value = user.credentialNumber || '';
            }
        }

        // Toggle para mostrar/ocultar contraseña
        const togglePassword = document.querySelector('.toggle-password');
        const passwordInput = document.getElementById('password');

        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', function () {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);

                const icon = this.querySelector('i');
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            });
        }

        // Manejar selección de archivo
        const fileInput = document.getElementById('medicalHistory');
        const fileName = document.getElementById('fileName');

        fileInput.addEventListener('change', function (e) {
            if (e.target.files.length > 0) {
                fileName.textContent = e.target.files[0].name;
            } else {
                fileName.textContent = 'Ningún archivo seleccionado';
            }
        });

        // Manejar envío del formulario
        document.getElementById('datosForm').addEventListener('submit', function (e) {
            e.preventDefault();

            // Aquí iría la lógica para guardar los datos
            // Por ahora solo mostramos un mensaje
            alert('Datos guardados correctamente (demo)');
        });
    