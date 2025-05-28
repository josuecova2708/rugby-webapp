
        // Toggle para mostrar/ocultar contraseña
        const togglePassword = document.querySelector('.toggle-password');
        const passwordInput = document.querySelector('input[type="password"]');

        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', function () {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);

                const icon = this.querySelector('i');
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            });
        }

        // Navegación entre pasos
        const step1 = document.getElementById('step-1');
        const step2 = document.getElementById('step-2');
        const nextBtn = document.getElementById('next-step');
        const prevBtn = document.getElementById('prev-step');

        // Ir al paso 2
        nextBtn.addEventListener('click', function() {
            // Validar campos del paso 1 antes de continuar
            const step1Inputs = step1.querySelectorAll('input[required]');
            let allValid = true;

            step1Inputs.forEach(input => {
                if (!input.value.trim()) {
                    allValid = false;
                    input.style.borderColor = '#ff0000';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });

            if (allValid) {
                step1.classList.add('hidden');
                step2.classList.remove('hidden');
            }
        });

        // Volver al paso 1
        prevBtn.addEventListener('click', function() {
            step2.classList.add('hidden');
            step1.classList.remove('hidden');
        });

        // Manejar envío del formulario
        document.querySelector('.registro-form').addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Validar campos del paso 2
            const step2Inputs = step2.querySelectorAll('input[required], select[required]');
            let allValid = true;

            step2Inputs.forEach(input => {
                if (!input.value.trim()) {
                    allValid = false;
                    input.style.borderColor = '#ff0000';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });

            if (allValid) {
                // Aquí iría la lógica para enviar los datos al backend
                console.log('Formulario completo enviado');
                alert('Registro completado exitosamente!');
            }
        });
    