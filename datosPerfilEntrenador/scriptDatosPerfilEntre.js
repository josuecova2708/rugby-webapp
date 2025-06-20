        // Verificar autenticación al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            // Si no está logueado, redirigir al home
            if (!auth.isLoggedIn()) {
                alert('Debes iniciar sesión para acceder a esta página');
                window.location.href = '../index.html';
                return;
            }

            // Verificar que sea entrenador
            if (!auth.isCoach()) {
                alert('Acceso no autorizado - Solo para entrenadores');
                window.location.href = '../index.html';
                return;
            }

            // Si está logueado y es entrenador, actualizar la navegación y cargar datos
            auth.updateNavigation();
            loadCoachData();
            initializeFormHandlers();
        });

        // Cargar datos del entrenador en el formulario
        function loadCoachData() {
            const coach = auth.getCurrentUser();
            if (coach) {
                // Datos personales
                document.getElementById('fullName').value = coach.name || '';
                document.getElementById('birthDate').value = coach.birthDate || '';
                document.getElementById('email').value = coach.email || '';
                document.getElementById('mobile').value = coach.mobile || '';
                document.getElementById('password').value = coach.password || '';

                // Datos profesionales
                document.getElementById('specialization').value = coach.specialization || '';
                document.getElementById('certification').value = coach.certification || '';
                document.getElementById('yearsExperience').value = coach.yearsOfExperience || '';
                document.getElementById('startDate').value = coach.registrationDate || '';
                document.getElementById('availability').value = coach.availability || '';

                // Equipos asignados (checkboxes)
                if (coach.assignedTeams && Array.isArray(coach.assignedTeams)) {
                    coach.assignedTeams.forEach(team => {
                        const checkbox = document.querySelector(`input[value="${team}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                }

                // Datos médicos
                document.getElementById('healthInsurance').value = coach.healthInsurance || '';
                document.getElementById('insuranceNumber').value = coach.insuranceNumber || '';

                // Estadísticas (solo lectura)
                document.getElementById('playersManaged').textContent = coach.playersManaged || '0';
                document.getElementById('matchesCoached').textContent = coach.matchesCoached || '0';
                document.getElementById('winRate').textContent = (coach.winRate || 0) + '%';
                document.getElementById('trainingSessions').textContent = coach.trainingSessions || '0';
            }
        }

        // Inicializar manejadores del formulario
        function initializeFormHandlers() {
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

            // Manejar selección de certificado médico
            const medicalCertificate = document.getElementById('medicalCertificate');
            const certificateFileName = document.getElementById('certificateFileName');

            medicalCertificate.addEventListener('change', function (e) {
                if (e.target.files.length > 0) {
                    certificateFileName.textContent = e.target.files[0].name;
                } else {
                    certificateFileName.textContent = 'Ningún archivo seleccionado';
                }
            });

            // Manejar selección de certificaciones de coaching
            const coachingCertificates = document.getElementById('coachingCertificates');
            const coachingFileName = document.getElementById('coachingFileName');

            coachingCertificates.addEventListener('change', function (e) {
                if (e.target.files.length > 0) {
                    if (e.target.files.length === 1) {
                        coachingFileName.textContent = e.target.files[0].name;
                    } else {
                        coachingFileName.textContent = `${e.target.files.length} archivos seleccionados`;
                    }
                } else {
                    coachingFileName.textContent = 'Ningún archivo seleccionado';
                }
            });

            // Manejar envío del formulario
            document.getElementById('datosEntrenadorForm').addEventListener('submit', function (e) {
                e.preventDefault();
                
                if (validateForm()) {
                    const formData = collectFormData();
                    
                    // Aquí iría la lógica para enviar los datos al backend
                    console.log('Datos del entrenador:', formData);
                    alert('Datos guardados correctamente (demo)');
                    
                    // TODO: Implementar llamada al backend
                    // updateCoachData(formData);
                }
            });
        }

        // Validar formulario
        function validateForm() {
            const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                    field.style.backgroundColor = '#fff5f5';
                } else {
                    field.style.borderColor = '#ddd';
                    field.style.backgroundColor = '#f8f8f8';
                }
            });

            // Validar que al menos un equipo esté seleccionado
            const checkedTeams = document.querySelectorAll('#assignedTeams input[type="checkbox"]:checked');
            if (checkedTeams.length === 0) {
                isValid = false;
                alert('Debe seleccionar al menos un equipo o categoría');
            }

            if (!isValid) {
                alert('Por favor complete todos los campos requeridos');
            }

            return isValid;
        }

        // Recopilar datos del formulario
        function collectFormData() {
            const assignedTeams = Array.from(document.querySelectorAll('#assignedTeams input[type="checkbox"]:checked'))
                .map(checkbox => checkbox.value);

            return {
                // Datos personales
                fullName: document.getElementById('fullName').value,
                birthDate: document.getElementById('birthDate').value,
                email: document.getElementById('email').value,
                mobile: document.getElementById('mobile').value,
                password: document.getElementById('password').value,

                // Datos profesionales
                specialization: document.getElementById('specialization').value,
                certification: document.getElementById('certification').value,
                yearsExperience: parseInt(document.getElementById('yearsExperience').value),
                startDate: document.getElementById('startDate').value,
                assignedTeams: assignedTeams,
                availability: document.getElementById('availability').value,

                // Datos médicos
                healthInsurance: document.getElementById('healthInsurance').value,
                insuranceNumber: document.getElementById('insuranceNumber').value,

                // Archivos (se manejarían separadamente en una implementación real)
                medicalCertificate: document.getElementById('medicalCertificate').files[0],
                coachingCertificates: document.getElementById('coachingCertificates').files
            };
        }

        // Función para que el backend actualice los datos
        function updateCoachData(formData) {
            // Esta función será implementada para enviar datos al backend
            console.log('Enviando datos al backend:', formData);
            
            // Ejemplo de estructura para el backend:
            /*
            fetch('/api/coach/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Datos actualizados correctamente');
                    // Actualizar datos en auth.js si es necesario
                } else {
                    alert('Error al actualizar datos: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error de conexión al servidor');
            });
            */
        }