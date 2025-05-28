// Sistema de autenticación temporal para demo
class AuthSystem {
    constructor() {
        // Usuario de prueba con información completa
        this.testUser = {
            // Datos de autenticación
            email: "jugador@rugby360.com",
            password: "123456",

            // Información personal básica
            name: "Carlos Rodríguez",
            nickname: "Carlitos",
            birthDate: "1995-03-15",

            // Información deportiva
            position: "Centro",
            category: "Primera",

            // Información física
            height: "1.78", // en metros
            weight: "82", // en kg

            // Información médica/seguro
            healthInsurance: "OSDE",
            credentialNumber: "123456789",
            medicalHistory: "./recursos/historial-medico-carlos.pdf", // Archivo ficticio

            // Información adicional
            photo: "./recursos/user-avatar.png", // Foto ficticia del usuario
            registrationDate: "2023-01-15",

            // Datos calculados
            get age() {
                const today = new Date();
                const birth = new Date(this.birthDate);
                let age = today.getFullYear() - birth.getFullYear();
                const monthDiff = today.getMonth() - birth.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                    age--;
                }
                return age;
            },

            get bmi() {
                const heightInM = parseFloat(this.height);
                const weightInKg = parseFloat(this.weight);
                return (weightInKg / (heightInM * heightInM)).toFixed(1);
            },

            get physicalInfo() {
                return `${this.height}m - ${this.weight}kg`;
            }
        };
    }

    // Verificar si hay usuario logueado
    isLoggedIn() {
        return sessionStorage.getItem('isLoggedIn') === 'true';
    }

    // Obtener datos del usuario logueado
    getCurrentUser() {
        if (this.isLoggedIn()) {
            return JSON.parse(sessionStorage.getItem('currentUser'));
        }
        return null;
    }

    // Obtener información completa del usuario
    getUserProfile() {
        if (this.isLoggedIn()) {
            const user = this.getCurrentUser();
            return {
                personal: {
                    name: user.name,
                    nickname: user.nickname,
                    email: user.email,
                    birthDate: user.birthDate,
                    age: this.calculateAge(user.birthDate)
                },
                sports: {
                    position: user.position,
                    category: user.category,
                    registrationDate: user.registrationDate
                },
                physical: {
                    height: user.height,
                    weight: user.weight,
                    bmi: this.calculateBMI(user.height, user.weight),
                    physicalInfo: `${user.height}m - ${user.weight}kg`
                },
                medical: {
                    healthInsurance: user.healthInsurance,
                    credentialNumber: user.credentialNumber,
                    medicalHistory: user.medicalHistory
                }
            };
        }
        return null;
    }

    // Calcular edad
    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    // Calcular IMC
    calculateBMI(height, weight) {
        const heightInM = parseFloat(height);
        const weightInKg = parseFloat(weight);
        return (weightInKg / (heightInM * heightInM)).toFixed(1);
    }

    // Obtener historial médico
    getMedicalHistory() {
        const user = this.getCurrentUser();
        return user ? user.medicalHistory : null;
    }

    // Formatear fecha de nacimiento
    getFormattedBirthDate() {
        const user = this.getCurrentUser();
        if (user && user.birthDate) {
            const date = new Date(user.birthDate);
            return date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
        return '';
    }

    // Iniciar sesión
    login(email, password) {
        if (email === this.testUser.email && password === this.testUser.password) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('currentUser', JSON.stringify(this.testUser));
            return { success: true, user: this.testUser };
        }
        return { success: false, message: 'Email o contraseña incorrectos' };
    }

    // Cerrar sesión
    logout() {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('currentUser');
        // Cerrar menú si está abierto
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    }

    // Mostrar estado de autenticación en la navegación
    updateNavigation() {
        const navButtons = document.querySelector('.nav-buttons');

        if (this.isLoggedIn() && navButtons) {
            const user = this.getCurrentUser();

            navButtons.innerHTML = `
                <!-- Desktop: Opciones de navegación + perfil dropdown -->
                <div class="desktop-nav desktop-only">
                    <div class="nav-options">
                        <button class="nav-option" onclick="auth.navigateTo('panel')">Panel de rendimiento</button>
                        
                        <!-- Dropdown de Comunidad -->
                        <div class="nav-dropdown-container">
                            <button class="nav-option dropdown-trigger" onclick="auth.toggleCommunityDropdown()">
                                Comunidad <i class="fas fa-chevron-down dropdown-arrow-small"></i>
                            </button>
                            <div class="nav-dropdown" id="communityDropdown">
                                <div class="nav-dropdown-item" onclick="auth.navigateTo('notificaciones')">
                                    <i class="fas fa-bell"></i>
                                    <span>Notificaciones</span>
                                </div>
                                <div class="nav-dropdown-item" onclick="auth.navigateTo('feedback')">
                                    <i class="fas fa-comment-alt"></i>
                                    <span>Feedback</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="user-dropdown-container">
                        <div class="user-profile-btn" onclick="auth.toggleDesktopDropdown()">
                            <div class="user-avatar-small">
                                <i class="fas fa-user-circle"></i>
                            </div>
                            <span class="user-greeting">¡Hola, ${user.name.split(' ')[0]}!</span>
                            <i class="fas fa-chevron-down dropdown-arrow"></i>
                        </div>
                        
                        <div class="user-dropdown" id="userDropdown">
                            <div class="dropdown-item" onclick="auth.navigateTo('perfil')">
                                <i class="fas fa-user"></i>
                                <span>Mi perfil</span>
                            </div>
                            <div class="dropdown-item" onclick="auth.navigateTo('historial')">
                                <i class="fas fa-history"></i>
                                <span>Historial</span>
                            </div>
                            <div class="dropdown-item logout-dropdown" onclick="auth.logout(); location.reload();">
                                <i class="fas fa-sign-out-alt"></i>
                                <span>Cerrar sesión</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Mobile: Menú hamburguesa -->
                <div class="mobile-menu-container mobile-only">
                    <button class="hamburger-btn" onclick="auth.toggleMobileMenu()">
                        <i class="fas fa-bars"></i>
                    </button>
                    
                    <div class="mobile-menu" id="mobileMenu">
                        <div class="menu-section menu-options">
                            <div class="menu-item" onclick="auth.navigateTo('panel')">
                                <span>Panel de rendimiento</span>
                            </div>
                            
                            <!-- Submenu de Comunidad en móvil -->
                            <div class="menu-item-with-submenu">
                                <div class="menu-item submenu-trigger" onclick="auth.toggleMobileCommunitySubmenu()">
                                    <span>Comunidad</span>
                                    <i class="fas fa-chevron-down submenu-arrow"></i>
                                </div>
                                <div class="mobile-submenu" id="mobileCommunitySub">
                                    <div class="submenu-item" onclick="auth.navigateTo('notificaciones')">
                                        <i class="fas fa-bell"></i>
                                        <span>Notificaciones</span>
                                    </div>
                                    <div class="submenu-item" onclick="auth.navigateTo('feedback')">
                                        <i class="fas fa-comment-alt"></i>
                                        <span>Feedback</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="menu-section user-section">
                            <div class="user-profile">
                                <div class="user-avatar">
                                    <i class="fas fa-user-circle"></i>
                                </div>
                                <div class="user-actions">
                                    <div class="menu-item" onclick="auth.navigateTo('perfil')">
                                        <span>Mi perfil</span>
                                    </div>
                                    <div class="menu-item" onclick="auth.navigateTo('historial')">
                                        <span>Historial</span>
                                    </div>
                                    <div class="menu-item logout-item" onclick="auth.logout(); location.reload();">
                                        <span>Cerrar sesión</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Overlay para cerrar el menú -->
                    <div class="menu-overlay" onclick="auth.closeMobileMenu()"></div>
                </div>
            `;

            // Agregar event listener para cerrar dropdown al hacer clic fuera
            document.addEventListener('click', this.handleOutsideClick.bind(this));
        }
    }

    // Toggle del dropdown de Comunidad en desktop
    toggleCommunityDropdown() {
        const dropdown = document.getElementById('communityDropdown');
        const arrow = document.querySelector('.dropdown-arrow-small');

        if (dropdown && arrow) {
            const isActive = dropdown.classList.contains('active');

            // Cerrar otros dropdowns primero
            this.closeDesktopDropdown();

            if (isActive) {
                dropdown.classList.remove('active');
                arrow.classList.remove('rotated');
            } else {
                dropdown.classList.add('active');
                arrow.classList.add('rotated');
            }
        }
    }

    // Cerrar dropdown de Comunidad
    closeCommunityDropdown() {
        const dropdown = document.getElementById('communityDropdown');
        const arrow = document.querySelector('.dropdown-arrow-small');

        if (dropdown && arrow) {
            dropdown.classList.remove('active');
            arrow.classList.remove('rotated');
        }
    }

    // Toggle del submenu de Comunidad en móvil
    toggleMobileCommunitySubmenu() {
        const submenu = document.getElementById('mobileCommunitySub');
        const arrow = document.querySelector('.submenu-arrow');

        if (submenu && arrow) {
            const isActive = submenu.classList.contains('active');

            if (isActive) {
                submenu.classList.remove('active');
                arrow.classList.remove('rotated');
            } else {
                submenu.classList.add('active');
                arrow.classList.add('rotated');
            }
        }
    }

    // Toggle del dropdown de desktop
    toggleDesktopDropdown() {
        const dropdown = document.getElementById('userDropdown');
        const arrow = document.querySelector('.dropdown-arrow');

        if (dropdown && arrow) {
            const isActive = dropdown.classList.contains('active');

            // Cerrar dropdown de comunidad primero
            this.closeCommunityDropdown();

            if (isActive) {
                dropdown.classList.remove('active');
                arrow.classList.remove('rotated');
            } else {
                dropdown.classList.add('active');
                arrow.classList.add('rotated');
            }
        }
    }

    // Cerrar dropdown de desktop
    closeDesktopDropdown() {
        const dropdown = document.getElementById('userDropdown');
        const arrow = document.querySelector('.dropdown-arrow');

        if (dropdown && arrow) {
            dropdown.classList.remove('active');
            arrow.classList.remove('rotated');
        }
    }

    // Manejar clics fuera del dropdown
    handleOutsideClick(event) {
        const userDropdownContainer = document.querySelector('.user-dropdown-container');
        const communityDropdownContainer = document.querySelector('.nav-dropdown-container');
        const userDropdown = document.getElementById('userDropdown');
        const communityDropdown = document.getElementById('communityDropdown');

        // Cerrar dropdown de usuario si el clic está fuera
        if (userDropdown && userDropdownContainer && !userDropdownContainer.contains(event.target)) {
            this.closeDesktopDropdown();
        }

        // Cerrar dropdown de comunidad si el clic está fuera
        if (communityDropdown && communityDropdownContainer && !communityDropdownContainer.contains(event.target)) {
            this.closeCommunityDropdown();
        }
    }

    // Toggle del menú móvil
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.querySelector('.menu-overlay');
        const hamburgerBtn = document.querySelector('.hamburger-btn');

        if (mobileMenu && overlay && hamburgerBtn) {
            const isActive = mobileMenu.classList.contains('active');

            if (isActive) {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            } else {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                hamburgerBtn.classList.add('active');
            }
        }
    }

    // Cerrar menú móvil
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.querySelector('.menu-overlay');
        const hamburgerBtn = document.querySelector('.hamburger-btn');

        if (mobileMenu && overlay && hamburgerBtn) {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        }
    }

    // Navegación a diferentes secciones
    navigateTo(section) {
        console.log(`Navegando a: ${section}`);

        // Cerrar todos los menús después de navegar
        this.closeMobileMenu();
        this.closeDesktopDropdown();
        this.closeCommunityDropdown();

        // Aquí irían las redirecciones cuando se implementen las páginas
        switch (section) {
            case 'panel':
              
               window.location.href = '../panel/panel.html';
                break;
            case 'notificaciones':
                // Redirigir a la página de notificaciones
                if (!window.location.pathname.endsWith('/notificaciones/notificaciones.html')) {
                    window.location.href = '../notificaciones/notificaciones.html';
                }
                break;
            case 'feedback':

                if (!window.location.pathname.endsWith('/feedback/feedback.html')) {
                    window.location.href = '../feedback/feedback.html';
                }
                break;
            case 'perfil':
                // Redirigir a la página de perfil solo si no estamos ya en ella
                if (!window.location.pathname.endsWith('/perfil/perfil.html')) {
                    window.location.href = '../perfil/perfil.html';
                }
                break;
            case 'historial':
              window.location.href = '../historial/historial.html';  
            
                break;
        }
    }

    // Mostrar información completa del usuario (temporal para demo)
    showUserProfile() {
        const profile = this.getUserProfile();
        if (profile) {
            const info = `
📋 PERFIL DE USUARIO
━━━━━━━━━━━━━━━━━━━━

👤 INFORMACIÓN PERSONAL:
• Nombre: ${profile.personal.name}
• Apodo: ${profile.personal.nickname}
• Email: ${profile.personal.email}
• Fecha de nacimiento: ${this.getFormattedBirthDate()}
• Edad: ${profile.personal.age} años

🏉 INFORMACIÓN DEPORTIVA:
• Posición: ${profile.sports.position}
• Categoría: ${profile.sports.category}
• Fecha de registro: ${profile.sports.registrationDate}

📏 INFORMACIÓN FÍSICA:
• Estatura: ${profile.physical.height}m
• Peso: ${profile.physical.weight}kg
• IMC: ${profile.physical.bmi}

🏥 INFORMACIÓN MÉDICA:
• Obra social: ${profile.medical.healthInsurance}
• N° Credencial: ${profile.medical.credentialNumber}
• Historial médico: ${profile.medical.medicalHistory ? 'Archivo disponible' : 'No disponible'}
            `;

            alert(info);
        }
    }
}

// Instancia global del sistema de autenticación
const auth = new AuthSystem();

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    // Detectar en qué página estamos y actualizar navegación según corresponda
    const currentPath = window.location.pathname;

    if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
        // Página principal - actualizar navegación
        auth.updateNavigation();
    } else if (currentPath.includes('perfil.html')) {
        // Página de perfil - verificar autenticación primero
        if (!auth.isLoggedIn()) {
            alert('Debes iniciar sesión para acceder a tu perfil');
            window.location.href = '../index.html';
            return;
        }
        // Si está logueado, actualizar navegación
        auth.updateNavigation();
    }
});