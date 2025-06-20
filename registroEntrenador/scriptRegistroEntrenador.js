        // Navegación entre pasos
        document.getElementById('next-step').addEventListener('click', function() {
            // Validar paso 1
            const step1Inputs = document.querySelectorAll('#step-1 input[required]');
            let isValid = true;
            
            step1Inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                document.getElementById('step-1').classList.add('hidden');
                document.getElementById('step-2').classList.remove('hidden');
                // Sincronizar foto entre pasos
                const photo1 = document.getElementById('photoPreview').innerHTML;
                document.getElementById('photoPreview2').innerHTML = photo1;
            } else {
                alert('Por favor completa todos los campos requeridos');
            }
        });

        document.getElementById('prev-step').addEventListener('click', function() {
            document.getElementById('step-2').classList.add('hidden');
            document.getElementById('step-1').classList.remove('hidden');
            // Sincronizar foto entre pasos
            const photo2 = document.getElementById('photoPreview2').innerHTML;
            document.getElementById('photoPreview').innerHTML = photo2;
        });

        // Manejo de foto de perfil
        function handlePhotoUpload(inputId, previewId) {
            const input = document.getElementById(inputId);
            const preview = document.getElementById(previewId);
            
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        preview.innerHTML = `<img src="${e.target.result}" alt="Foto de perfil" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                        // Sincronizar con el otro paso
                        const otherPreview = previewId === 'photoPreview' ? 'photoPreview2' : 'photoPreview';
                        document.getElementById(otherPreview).innerHTML = preview.innerHTML;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Inicializar manejadores de foto
        handlePhotoUpload('photoInput', 'photoPreview');
        handlePhotoUpload('photoInput2', 'photoPreview2');

        // Toggle password visibility
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const icon = input.nextElementSibling.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        // Envío del formulario
        document.getElementById('entrenadorForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar paso 2
            const step2Inputs = document.querySelectorAll('#step-2 input[required], #step-2 select[required]');
            let isValid = true;
            
            step2Inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Aquí iría la lógica para enviar al backend
                alert('Registro de entrenador completado exitosamente!');
                // Opcional: redirigir al login
                // window.location.href = '../login/login.html';
            } else {
                alert('Por favor completa todos los campos requeridos');
            }
        });

        // Funcionalidad de botones "Modificar"
   
    