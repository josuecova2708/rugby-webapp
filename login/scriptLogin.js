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

        // Manejar envío del formulario de login
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            // Intentar hacer login
            const result = auth.login(email, password);
            
            if (result.success) {
                // Login exitoso - redirigir al home
                alert('¡Bienvenido ' + result.user.name + '!');
                window.location.href = '../index.html';
            } else {
                // Mostrar error
                errorMessage.textContent = result.message;
                errorMessage.style.display = 'block';
                
                // Ocultar error después de 3 segundos
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 3000);
            }
        });

        // Verificar si ya está logueado
        if (auth.isLoggedIn()) {
            window.location.href = '../index.html';
        }
    