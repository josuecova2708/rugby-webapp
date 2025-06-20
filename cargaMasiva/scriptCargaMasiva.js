 
        let selectedFile = null;
        let previewData = null;

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
            initializeUploadArea();
        });

        // Inicializar área de carga
        function initializeUploadArea() {
            const uploadArea = document.getElementById('uploadArea');
            const fileInput = document.getElementById('fileInput');

            // Drag and drop functionality
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });

            uploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handleFileSelection(files[0]);
                }
            });

            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    handleFileSelection(e.target.files[0]);
                }
            });
        }

        // Navegar entre pasos
        function goToStep(stepNumber) {
            // Ocultar todos los contenidos
            document.querySelectorAll('.step-content').forEach(content => {
                content.classList.remove('active');
            });

            // Ocultar todos los steps
            document.querySelectorAll('.step').forEach(step => {
                step.classList.remove('active');
            });

            // Mostrar el contenido y step correspondiente
            document.getElementById(`step-${stepNumber}-content`).classList.add('active');
            document.querySelector(`[data-step="${stepNumber}"]`).classList.add('active');
        }

        // Descargar template
        function downloadTemplate() {
            alert('Descargando template Excel - Funcionalidad próximamente');
            // Aquí iría la lógica para descargar el template
        }

        // Seleccionar archivo
        function selectFile() {
            document.getElementById('fileInput').click();
        }

        // Manejar selección de archivo
        function handleFileSelection(file) {
            if (!file) return;

            // Validar tipo de archivo
            const validTypes = ['.xlsx', '.xls'];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            
            if (!validTypes.includes(fileExtension)) {
                alert('Por favor selecciona un archivo Excel válido (.xlsx o .xls)');
                return;
            }

            // Validar tamaño (ejemplo: máximo 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('El archivo es demasiado grande. Máximo 10MB.');
                return;
            }

            selectedFile = file;
            
            // Mostrar información del archivo
            document.getElementById('fileName').textContent = file.name;
            document.getElementById('fileSize').textContent = formatFileSize(file.size);
            document.getElementById('fileSelected').style.display = 'block';
            document.getElementById('uploadArea').style.display = 'none';
            document.getElementById('btnProcess').disabled = false;
        }

        // Formatear tamaño de archivo
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // Remover archivo
        function removeFile() {
            selectedFile = null;
            document.getElementById('fileSelected').style.display = 'none';
            document.getElementById('uploadArea').style.display = 'block';
            document.getElementById('btnProcess').disabled = true;
            document.getElementById('fileInput').value = '';
        }

        // Procesar archivo
        function processFile() {
            if (!selectedFile) {
                alert('No hay archivo seleccionado');
                return;
            }

            // Simular procesamiento
            alert('Procesando archivo... (Funcionalidad próximamente)');
            
            // Simular datos de vista previa
            previewData = {
                total: 150,
                valid: 145,
                errors: 5,
                records: [
                    ['Juan Pérez', 'juan.perez@email.com', '+54911234567', 'Facebook', 'Nuevo'],
                    ['María González', 'maria.gonzalez@email.com', '+54911234568', 'Instagram', 'Contactado'],
                    ['Carlos López', 'carlos.lopez@email.com', '+54911234569', 'Web', 'Nuevo']
                ]
            };
            
            updatePreviewStats();
            generatePreviewTable();
            goToStep(3);
        }

        // Actualizar estadísticas de vista previa
        function updatePreviewStats() {
            if (!previewData) return;
            
            document.getElementById('totalRecords').textContent = previewData.total;
            document.getElementById('validRecords').textContent = previewData.valid;
            document.getElementById('errorRecords').textContent = previewData.errors;
        }

        // Generar tabla de vista previa
        function generatePreviewTable() {
            if (!previewData) return;
            
            const table = document.getElementById('previewTable');
            
            // Limpiar tabla
            table.innerHTML = '';
            
            // Crear header
            const header = table.createTHead();
            const headerRow = header.insertRow();
            const headers = ['Nombre', 'Email', 'Teléfono', 'Canal', 'Estado', 'Status'];
            
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            
            // Crear body
            const tbody = table.createTBody();
            previewData.records.forEach((record, index) => {
                const row = tbody.insertRow();
                record.forEach(cellData => {
                    const cell = row.insertCell();
                    cell.textContent = cellData;
                });
                
                // Agregar status
                const statusCell = row.insertCell();
                statusCell.innerHTML = '<span class="status-valid">Válido</span>';
                if (index >= previewData.valid) {
                    statusCell.innerHTML = '<span class="status-error">Error</span>';
                }
            });
        }

        // Importar datos
        function importData() {
            if (confirm('¿Estás seguro de que quieres importar estos datos?')) {
                alert('Importando datos... (Funcionalidad próximamente)');
                // Aquí iría la lógica para enviar los datos al backend
            }
        }
    