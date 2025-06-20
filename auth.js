// Sistema de autenticación temporal para demo
class AuthSystem {
    constructor() {
        // Usuario jugador de prueba con información completa
        this.testPlayer = {
            // Datos de autenticación
            email: "jugador@rugby360.com",
            password: "123456",
            userType: "jugador",

            // Información personal básica
            name: "Carlos Rodríguez",
            nickname: "Carlitos",
            birthDate: "1995-03-15",
            mobile: "+54 9 11 5555-1234",

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

        // Usuario entrenador de prueba con información completa
        this.testCoach = {
            // Datos de autenticación
            email: "entrenador@rugby360.com",
            password: "123456",
            userType: "entrenador",

            // Información personal básica
            name: "Miguel Fernández",
            birthDate: "1980-08-22",
            mobile: "+54 9 11 4444-5678",

            // Información profesional del entrenador
            specialization: "tecnica-general",
            specializationName: "Técnica general",
            certification: "certificacion-3",
            certificationName: "Certificación 3",
            availability: "Lunes a Viernes 16:00-20:00, Sábados 09:00-13:00",
            assignedTeams: ["primera", "m21"],
            assignedTeamsNames: ["Primera", "M21"],

            // Información médica/seguro
            healthInsurance: "Swiss Medical",
            insuranceNumber: "987654321",

            // Información adicional
            photo: "./recursos/coach-avatar.png", // Foto ficticia del entrenador
            registrationDate: "2022-03-10",
            yearsOfExperience: 12,

            // Estadísticas del entrenador
            playersManaged: 45,
            matchesCoached: 128,
            winRate: 73.4,

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

            get formattedTeams() {
                return this.assignedTeamsNames.join(", ");
            },

            get professionalInfo() {
                return `${this.specializationName} - ${this.certificationName}`;
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

    // Verificar si el usuario actual es un entrenador
    isCoach() {
        const user = this.getCurrentUser();
        return user && user.userType === 'entrenador';
    }

    // Verificar si el usuario actual es un jugador
    isPlayer() {
        const user = this.getCurrentUser();
        return user && user.userType === 'jugador';
    }

    // Obtener tipo de usuario
    getUserType() {
        const user = this.getCurrentUser();
        return user ? user.userType : null;
    }

    // Obtener información completa del usuario
    getUserProfile() {
        if (this.isLoggedIn()) {
            const user = this.getCurrentUser();

            if (user.userType === 'jugador') {
                return {
                    userType: 'jugador',
                    personal: {
                        name: user.name,
                        nickname: user.nickname,
                        email: user.email,
                        birthDate: user.birthDate,
                        mobile: user.mobile,
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
            } else if (user.userType === 'entrenador') {
                return {
                    userType: 'entrenador',
                    personal: {
                        name: user.name,
                        email: user.email,
                        birthDate: user.birthDate,
                        mobile: user.mobile,
                        age: this.calculateAge(user.birthDate)
                    },
                    professional: {
                        specialization: user.specialization,
                        specializationName: user.specializationName,
                        certification: user.certification,
                        certificationName: user.certificationName,
                        availability: user.availability,
                        assignedTeams: user.assignedTeams,
                        assignedTeamsNames: user.assignedTeamsNames,
                        formattedTeams: user.formattedTeams,
                        yearsOfExperience: user.yearsOfExperience,
                        registrationDate: user.registrationDate
                    },
                    stats: {
                        playersManaged: user.playersManaged,
                        matchesCoached: user.matchesCoached,
                        winRate: user.winRate
                    },
                    medical: {
                        healthInsurance: user.healthInsurance,
                        insuranceNumber: user.insuranceNumber
                    }
                };
            }
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
        // Verificar jugador
        if (email === this.testPlayer.email && password === this.testPlayer.password) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('currentUser', JSON.stringify(this.testPlayer));
            return { success: true, user: this.testPlayer };
        }

        // Verificar entrenador
        if (email === this.testCoach.email && password === this.testCoach.password) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('currentUser', JSON.stringify(this.testCoach));
            return { success: true, user: this.testCoach };
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

            if (user.userType === 'jugador') {
                // Navegación para JUGADOR
                navButtons.innerHTML = `
                    <!-- Desktop: Opciones de navegación + perfil dropdown -->
                    <div class="desktop-nav desktop-only">
                        <div class="nav-options">
                            <button class="nav-option" onclick="auth.navigateTo('panel')">Panel de rendimiento</button>
                            <button class="nav-option" onclick="auth.navigateTo('notificaciones')">Notificaciones</button>
                            <button class="nav-option" onclick="auth.navigateTo('feedback')">Feedback</button>
                        </div>
                        
                        <div class="user-dropdown-container">
                            <div class="user-profile-btn" onclick="auth.toggleDesktopDropdown()" id="userProfileTrigger">
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
                `;
            } else if (user.userType === 'entrenador') {
                // Navegación para ENTRENADOR
                navButtons.innerHTML = `
                    <!-- Desktop: Opciones de navegación + perfil dropdown -->
                    <div class="desktop-nav desktop-only">
                        <div class="nav-options">
                            <button class="nav-option" onclick="auth.navigateTo('clasificacion')">Clasificación</button>
                            <button class="nav-option" onclick="auth.navigateTo('notificaciones')">Notificaciones</button>
                            <button class="nav-option" onclick="auth.navigateTo('feedback')">Feedback</button>

                            <!-- Dropdown de Entrenamiento -->
                            <div class="nav-dropdown-container">
                                <button class="nav-option dropdown-trigger" onclick="auth.toggleTrainingDropdown()" id="trainingTrigger">
                                    Entrenamiento <i class="fas fa-chevron-down dropdown-arrow-small"></i>
                                </button>
                                <div class="nav-dropdown" id="trainingDropdown">
                                    <div class="nav-dropdown-item" onclick="auth.navigateTo('panel-rendimiento')">
                                        <i class="fas fa-chart-line"></i>
                                        <span>Panel de Rendimiento</span>
                                    </div>
                                    <div class="nav-dropdown-item" onclick="auth.navigateTo('analisis-ia')">
                                        <i class="fas fa-brain"></i>
                                        <span>Análisis por IA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="user-dropdown-container">
                            <div class="user-profile-btn" onclick="auth.toggleDesktopDropdown()" id="userProfileTrigger">
                                <div class="user-avatar-small">
                                    <i class="fas fa-user-circle"></i>
                                </div>
                                <span class="user-greeting">¡Hola, ${user.name.split(' ')[0]}!</span>
                                <i class="fas fa-chevron-down dropdown-arrow"></i>
                            </div>
                            
                            <div class="user-dropdown" id="userDropdown">
                                <div class="dropdown-item" onclick="auth.navigateTo('perfil-entrenador')">
                                    <i class="fas fa-user"></i>
                                    <span>Mi perfil</span>
                                </div>
                                <div class="dropdown-item" onclick="auth.navigateTo('historial-entrenador')">
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
                `;
            }

            // Navegación móvil (común para ambos tipos de usuario)
            navButtons.innerHTML += `
                <!-- Mobile: Menú hamburguesa -->
                <div class="mobile-menu-container mobile-only">
                    <button class="hamburger-btn" onclick="auth.toggleMobileMenu()">
                        <i class="fas fa-bars"></i>
                    </button>
                    
                    <div class="mobile-menu" id="mobileMenu">
                        <div class="menu-section menu-options">
                            ${user.userType === 'jugador' ? `
                                <div class="menu-item" onclick="auth.navigateTo('panel')">
                                    <span>Panel de rendimiento</span>
                                </div>
                            ` : `
                                <div class="menu-item" onclick="auth.navigateTo('clasificacion')">
                                    <span>Clasificación</span>
                                </div>
                                <div class="menu-item" onclick="auth.navigateTo('panel-rendimiento')">
                                    <span>Panel de Rendimiento</span>
                                </div>
                                <div class="menu-item" onclick="auth.navigateTo('analisis-ia')">
                                    <span>Análisis por IA</span>
                                </div>
                            `}
                            
                            <div class="menu-item" onclick="auth.navigateTo('notificaciones')">
                                <span>Notificaciones</span>
                            </div>
                            <div class="menu-item" onclick="auth.navigateTo('feedback')">
                                <span>Feedback</span>
                            </div>
                        </div>
                        
                        <div class="menu-section user-section">
                            <div class="user-profile">
                                <div class="user-avatar">
                                    <i class="fas fa-user-circle"></i>
                                </div>
                                <div class="user-actions">
                                    <div class="menu-item" onclick="auth.navigateTo('${user.userType === 'jugador' ? 'perfil' : 'perfil-entrenador'}')">
                                        <span>Mi perfil</span>
                                    </div>
                                    <div class="menu-item" onclick="auth.navigateTo('${user.userType === 'jugador' ? 'historial' : 'historial-entrenador'}')">
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
        } else {
            // Usuario no logueado - mostrar botones de login y registro con dropdown
            navButtons.innerHTML = `
                <button class="btn-login" onclick="window.location.href = './login/login.html'">Iniciar sesión</button>
                
                <!-- Dropdown de Registro -->
                <div class="register-dropdown-container">
                    <button class="btn-register dropdown-trigger" onclick="auth.toggleRegisterDropdown()" id="registerTrigger">
                        Registrarse <i class="fas fa-chevron-down dropdown-arrow-small"></i>
                    </button>
                    <div class="register-dropdown" id="registerDropdown">
                        <div class="register-dropdown-item" onclick="auth.navigateToRegister('jugador')">
                           
                            <span>Jugador</span>
                        </div>
                        <div class="register-dropdown-item" onclick="auth.navigateToRegister('entrenador')">
                           
                            <span>Entrenador</span>
                        </div>
                    </div>
                </div>
            `;

            // Agregar event listener para cerrar dropdown de registro
            document.addEventListener('click', this.handleRegisterOutsideClick.bind(this));
        }
    }

    // Toggle del dropdown de Entrenamiento (solo para entrenadores)
    toggleTrainingDropdown() {
        const dropdown = document.getElementById('trainingDropdown');
        const trigger = document.getElementById('trainingTrigger');
        const arrow = trigger?.querySelector('.dropdown-arrow-small');

        if (dropdown && arrow && trigger) {
            const isActive = dropdown.classList.contains('active');

            // Cerrar otros dropdowns primero
            this.closeDesktopDropdown();

            if (isActive) {
                dropdown.classList.remove('active');
                arrow.classList.remove('rotated');
                trigger.classList.remove('dropdown-active');
            } else {
                dropdown.classList.add('active');
                arrow.classList.add('rotated');
                trigger.classList.add('dropdown-active');
            }
        }
    }

    // Cerrar dropdown de Entrenamiento
    closeTrainingDropdown() {
        const dropdown = document.getElementById('trainingDropdown');
        const trigger = document.getElementById('trainingTrigger');
        const arrow = trigger?.querySelector('.dropdown-arrow-small');

        if (dropdown && arrow && trigger) {
            dropdown.classList.remove('active');
            arrow.classList.remove('rotated');
            trigger.classList.remove('dropdown-active');
        }
    }

    // Toggle del dropdown de registro
    toggleRegisterDropdown() {
        const dropdown = document.getElementById('registerDropdown');
        const trigger = document.getElementById('registerTrigger');
        const arrow = trigger?.querySelector('.dropdown-arrow-small');

        if (dropdown && arrow && trigger) {
            const isActive = dropdown.classList.contains('active');

            if (isActive) {
                dropdown.classList.remove('active');
                arrow.classList.remove('rotated');
                trigger.classList.remove('dropdown-active');
            } else {
                dropdown.classList.add('active');
                arrow.classList.add('rotated');
                trigger.classList.add('dropdown-active');
            }
        }
    }

    // Cerrar dropdown de registro
    closeRegisterDropdown() {
        const dropdown = document.getElementById('registerDropdown');
        const trigger = document.getElementById('registerTrigger');
        const arrow = trigger?.querySelector('.dropdown-arrow-small');

        if (dropdown && arrow && trigger) {
            dropdown.classList.remove('active');
            arrow.classList.remove('rotated');
            trigger.classList.remove('dropdown-active');
        }
    }

    // Navegar a registro según tipo
    navigateToRegister(type) {
        this.closeRegisterDropdown();

        switch (type) {
            case 'jugador':
                window.location.href = '../registro/registro.html';
                break;
            case 'entrenador':
                window.location.href = '../registroEntrenador/registroEntrenador.html';
                break;
        }
    }

    // Toggle del dropdown de desktop
    toggleDesktopDropdown() {
        const dropdown = document.getElementById('userDropdown');
        const trigger = document.getElementById('userProfileTrigger');
        const arrow = trigger?.querySelector('.dropdown-arrow');

        if (dropdown && arrow && trigger) {
            const isActive = dropdown.classList.contains('active');

            // Cerrar otros dropdowns primero
            this.closeTrainingDropdown();

            if (isActive) {
                dropdown.classList.remove('active');
                arrow.classList.remove('rotated');
                trigger.classList.remove('dropdown-active');
            } else {
                dropdown.classList.add('active');
                arrow.classList.add('rotated');
                trigger.classList.add('dropdown-active');
            }
        }
    }

    // Cerrar dropdown de desktop
    closeDesktopDropdown() {
        const dropdown = document.getElementById('userDropdown');
        const trigger = document.getElementById('userProfileTrigger');
        const arrow = trigger?.querySelector('.dropdown-arrow');

        if (dropdown && arrow && trigger) {
            dropdown.classList.remove('active');
            arrow.classList.remove('rotated');
            trigger.classList.remove('dropdown-active');
        }
    }

    // Manejar clics fuera del dropdown
    handleOutsideClick(event) {
        const userDropdownContainer = document.querySelector('.user-dropdown-container');
        const trainingDropdownContainer = document.querySelector('.nav-dropdown-container');
        const userDropdown = document.getElementById('userDropdown');
        const trainingDropdown = document.getElementById('trainingDropdown');

        // Cerrar dropdown de usuario si el clic está fuera
        if (userDropdown && userDropdownContainer && !userDropdownContainer.contains(event.target)) {
            this.closeDesktopDropdown();
        }

        // Cerrar dropdown de entrenamiento si el clic está fuera
        if (trainingDropdown && trainingDropdownContainer && !trainingDropdownContainer.contains(event.target)) {
            this.closeTrainingDropdown();
        }
    }

    // Manejar clics fuera del dropdown de registro
    handleRegisterOutsideClick(event) {
        const registerDropdownContainer = document.querySelector('.register-dropdown-container');
        const registerDropdown = document.getElementById('registerDropdown');

        if (registerDropdown && registerDropdownContainer && !registerDropdownContainer.contains(event.target)) {
            this.closeRegisterDropdown();
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
        this.closeTrainingDropdown();

        // Aquí irían las redirecciones cuando se implementen las páginas
        switch (section) {
            // Navegación para jugadores
            case 'panel':
                window.location.href = '../panel/panel.html';
                break;
            case 'perfil':
                window.location.href = '../perfil/perfil.html';
                break;
            case 'historial':
                window.location.href = '../historial/historial.html';
                break;

            // Navegación común (jugadores y entrenadores)
            case 'notificaciones':
                window.location.href = '../notificaciones/notificaciones.html';

                break;
            case 'feedback':
                if (this.isCoach()) {
                    window.location.href = '../feedbackEntrenador/feedbackEntrenador.html';
                } else {
                    window.location.href = '../feedback/feedback.html';
                }
                break;

            // Navegación específica para entrenadores
            case 'clasificacion':
                window.location.href = '../clasificacion/clasificacion.html';
                break;
            case 'panel-rendimiento':
                window.location.href = '../panelEntrenador/panelEntrenador.html';
                break;
            case 'analisis-ia':
                window.location.href = '../analisisAI/analisisAI.html';
                break;
            case 'perfil-entrenador':
                window.location.href = '../perfil/perfil.html'
                break;
            case 'historial-entrenador':
                alert('Historial de Entrenador - Próximamente');
                break;
        }
    }

    // Mostrar información completa del usuario (temporal para demo)
    showUserProfile() {
        const profile = this.getUserProfile();
        if (profile) {
            let info = '';

            if (profile.userType === 'jugador') {
                info = `
📋 PERFIL DE JUGADOR
━━━━━━━━━━━━━━━━━━━━

👤 INFORMACIÓN PERSONAL:
• Nombre: ${profile.personal.name}
• Apodo: ${profile.personal.nickname}
• Email: ${profile.personal.email}
• Teléfono: ${profile.personal.mobile}
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
            } else if (profile.userType === 'entrenador') {
                info = `
👨‍🏫 PERFIL DE ENTRENADOR
━━━━━━━━━━━━━━━━━━━━━━

👤 INFORMACIÓN PERSONAL:
• Nombre: ${profile.personal.name}
• Email: ${profile.personal.email}
• Teléfono: ${profile.personal.mobile}
• Fecha de nacimiento: ${this.getFormattedBirthDate()}
• Edad: ${profile.personal.age} años

🎯 INFORMACIÓN PROFESIONAL:
• Especialización: ${profile.professional.specializationName}
• Certificación: ${profile.professional.certificationName}
• Equipos asignados: ${profile.professional.formattedTeams}
• Disponibilidad: ${profile.professional.availability}
• Experiencia: ${profile.professional.yearsOfExperience} años
• Fecha de registro: ${profile.professional.registrationDate}

📊 ESTADÍSTICAS:
• Jugadores gestionados: ${profile.stats.playersManaged}
• Partidos dirigidos: ${profile.stats.matchesCoached}
• Tasa de victorias: ${profile.stats.winRate}%

🏥 INFORMACIÓN MÉDICA:
• Obra social: ${profile.medical.healthInsurance}
• N° Obra social: ${profile.medical.insuranceNumber}
                `;
            }

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