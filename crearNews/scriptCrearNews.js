        // Verificar autenticación al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            if (!auth.isLoggedIn()) {
                alert('Debes iniciar sesión para acceder a esta página');
                window.location.href = '../index.html';
                return;
            }

            if (!auth.isCoach()) {
                alert('Acceso no autorizado - Solo para entrenadores');
                window.location.href = '../index.html';
                return;
            }

            auth.updateNavigation();
        });

        // Abrir selector de archivo
        function openFileSelector(inputId) {
            document.getElementById(inputId).click();
        }

        // Manejar carga de imagen
        function handleImageUpload(type, input) {
            const file = input.files[0];
            if (!file) return;

            // Validar que sea una imagen
            if (!file.type.startsWith('image/')) {
                alert('Por favor selecciona un archivo de imagen válido');
                return;
            }

            // Validar tamaño (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('La imagen debe ser menor a 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                if (type === 'main') {
                    updateImagePreview('main', e.target.result);
                } else if (type === 'additional') {
                    updateImagePreview('additional', e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }

        // Actualizar vista previa de imagen
        function updateImagePreview(type, imageSrc) {
            if (type === 'main') {
                const preview = document.getElementById('mainImagePreview');
                const placeholder = document.getElementById('mainUploadPlaceholder');
                const deleteBtn = document.getElementById('mainDeleteBtn');

                preview.src = imageSrc;
                preview.style.display = 'block';
                placeholder.querySelector('.image-placeholder').style.display = 'none';
                deleteBtn.style.display = 'flex';
            } else if (type === 'additional') {
                const preview = document.getElementById('additionalImagePreview');
                const placeholder = document.getElementById('additionalUploadPlaceholder');
                const deleteBtn = document.getElementById('additionalDeleteBtn');

                preview.src = imageSrc;
                preview.style.display = 'block';
                placeholder.querySelector('.add-image-btn').style.display = 'none';
                deleteBtn.style.display = 'flex';
            }
        }

        // Eliminar imagen
        function deleteImage(type, event) {
            event.stopPropagation();

            if (type === 'main') {
                const preview = document.getElementById('mainImagePreview');
                const placeholder = document.getElementById('mainUploadPlaceholder');
                const deleteBtn = document.getElementById('mainDeleteBtn');
                const input = document.getElementById('mainImage');

                preview.style.display = 'none';
                preview.src = '';
                placeholder.querySelector('.image-placeholder').style.display = 'flex';
                deleteBtn.style.display = 'none';
                input.value = '';
            } else if (type === 'additional') {
                const preview = document.getElementById('additionalImagePreview');
                const placeholder = document.getElementById('additionalUploadPlaceholder');
                const deleteBtn = document.getElementById('additionalDeleteBtn');
                const input = document.getElementById('additionalImage');

                preview.style.display = 'none';
                preview.src = '';
                placeholder.querySelector('.add-image-btn').style.display = 'flex';
                deleteBtn.style.display = 'none';
                input.value = '';
            }
        }

        // Publicar noticia
        function publishNews() {
            const title = document.getElementById('newsTitle').value.trim();
            const content = document.getElementById('newsContent').value.trim();
            const mainImage = document.getElementById('mainImage').files[0];
            const additionalImage = document.getElementById('additionalImage').files[0];

            // Validaciones
            if (!title) {
                alert('Por favor ingresa un título para la noticia');
                document.getElementById('newsTitle').focus();
                return;
            }

            if (!content) {
                alert('Por favor ingresa el contenido de la noticia');
                document.getElementById('newsContent').focus();
                return;
            }

            if (!mainImage) {
                alert('Por favor selecciona al menos una imagen principal');
                return;
            }

            // Crear objeto de datos para enviar
            const newsData = {
                title: title,
                content: content,
                mainImage: mainImage,
                additionalImage: additionalImage || null,
                publishDate: new Date().toISOString(),
                author: auth.getCurrentUser().name
            };

            console.log('Publicando noticia:', newsData);
            
            // Simular publicación exitosa
            alert('Noticia publicada correctamente');
            
            // Redirigir al home
            window.location.href = '../index.html';

            // Aquí iría la llamada al backend
            // publishNewsToBackend(newsData);
        }

        // Función para enviar al backend (placeholder)
        function publishNewsToBackend(newsData) {
            /*
            const formData = new FormData();
            formData.append('title', newsData.title);
            formData.append('content', newsData.content);
            formData.append('mainImage', newsData.mainImage);
            if (newsData.additionalImage) {
                formData.append('additionalImage', newsData.additionalImage);
            }
            formData.append('publishDate', newsData.publishDate);
            formData.append('author', newsData.author);

            fetch('/api/news/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Noticia creada correctamente');
                    window.location.href = '../index.html';
                } else {
                    alert('Error al crear noticia: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error de conexión al servidor');
            });
            */
        }

        // Contador de caracteres para el contenido (opcional)
        document.getElementById('newsContent').addEventListener('input', function() {
            const maxLength = 1000;
            const currentLength = this.value.length;
            
            if (currentLength > maxLength) {
                this.value = this.value.substring(0, maxLength);
            }
        });

        // Auto-resize del textarea
        document.getElementById('newsContent').addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
