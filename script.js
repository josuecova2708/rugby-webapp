// Datos de jugadores para el entrenador
const playersData = [
    {
        name: "Juan Serra",
        position: "3ra línea - Apertura",
        status: "Activo - Primera",
        attendance: "80%",
        photo: "./recursos/player-martinez.jpg"
    },
    {
        name: "Mario Coronel",
        position: "Centro",
        status: "Activo - Primera",
        attendance: "85%",
        photo: "./recursos/player-martinez.jpg"
    },
    {
        name: "Agustín Montenegro",
        position: "Ala",
        status: "Activo - Primera",
        attendance: "90%",
        photo: "./recursos/player-martinez.jpg"
    },
    {
        name: "Lucas González",
        position: "Hooker",
        status: "Activo - Primera",
        attendance: "75%",
        photo: "./recursos/player-martinez.jpg"
    },
    {
        name: "Luciano Valdez",
        position: "Tercera línea",
        status: "Activo - Primera",
        attendance: "88%",
        photo: "./recursos/player-martinez.jpg"
    },
    {
        name: "Federico Martín",
        position: "Apertura",
        status: "Activo - M21",
        attendance: "92%",
        photo: "./recursos/player-martinez.jpg"
    },
    {
        name: "Carlos Rodríguez",
        position: "Centro",
        status: "Activo - Primera",
        attendance: "82%",
        photo: "./recursos/player-martinez.jpg"
    },
    {
        name: "Diego Fernández",
        position: "Wing",
        status: "Activo - M21",
        attendance: "86%",
        photo: "./recursos/player-martinez.jpg"
    },
    {
        name: "Sebastián García",
        position: "Fullback",
        status: "Activo - M21",
        attendance: "89%",
        photo: "./recursos/player-martinez.jpg"
    },
    {
        name: "Nicolás Torres",
        position: "Pilar",
        status: "Activo - Primera",
        attendance: "78%",
        photo: "./recursos/player-martinez.jpg"
    }
];

let currentIndicator = 0;
let indicatorInterval = null;
let filteredPlayers = [...playersData];
let isFiltering = false;
let selectedIntensity = null;
let currentPlayerPage = 0;
const playersPerPage = window.innerWidth >= 768 ? 6 : 4;

document.addEventListener('DOMContentLoaded', function () {
    if (typeof auth !== 'undefined') {
        auth.updateNavigation();

        if (auth.isLoggedIn() && auth.isCoach()) {
            showPlayersSection();
            showLocationActions();
            showCoachFAB();
            generatePlayersGrid();
            generateIndicators();
            startIndicatorAnimation();
            setupHoverEvents();
            setupFilterEvents();
            updateCounter();
        }

        if (auth.isLoggedIn() && auth.isPlayer()) {
            showPlayerFAB();
        }
    }
});

function showPlayerFAB() {
    document.getElementById('playerFabContainer').style.display = 'block';
}

function togglePlayerModal() {
    const modal = document.getElementById('playerModalOverlay');
    if (modal.style.display === 'flex') {
        closePlayerModal();
    } else {
        openPlayerModal();
    }
}

function openPlayerModal() {
    const modal = document.getElementById('playerModalOverlay');
    modal.style.display = 'flex';
    modal.classList.add('modal-opening');
    setTimeout(() => {
        modal.classList.remove('modal-opening');
        modal.addEventListener('click', handlePlayerModalClick);
    }, 300);
}

function closePlayerModal() {
    const modal = document.getElementById('playerModalOverlay');
    modal.classList.add('modal-closing');
    modal.removeEventListener('click', handlePlayerModalClick);
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('modal-closing');
    }, 300);
}

function handlePlayerModalClick(event) {
    if (event.target === event.currentTarget) {
        closePlayerModal();
    }
}

function handleAsistenciaEntrenamiento() {
    closePlayerModal();
    setTimeout(() => {
        alert('Funcionalidad: Asistencia de entrenamiento - Próximamente');
    }, 200);
}

function handleComoEstuvoEntrenamiento() {
    document.getElementById('playerMainOptions').style.display = 'none';
    const intensityView = document.getElementById('intensityView');
    intensityView.classList.add('active');
    setupIntensitySelection();
}

function backToMainOptions() {
    document.getElementById('playerMainOptions').style.display = 'flex';
    document.getElementById('intensityView').classList.remove('active');
    resetIntensitySelection();
}

function setupIntensitySelection() {
    const intensityNumbers = document.querySelectorAll('.intensity-number');
    const submitBtn = document.getElementById('intensitySubmit');
    intensityNumbers.forEach(number => {
        number.addEventListener('click', function () {
            intensityNumbers.forEach(n => n.classList.remove('selected'));
            this.classList.add('selected');
            selectedIntensity = parseInt(this.getAttribute('data-value'));
            submitBtn.disabled = false;
        });
    });
}

function resetIntensitySelection() {
    const intensityNumbers = document.querySelectorAll('.intensity-number');
    const submitBtn = document.getElementById('intensitySubmit');
    intensityNumbers.forEach(n => n.classList.remove('selected'));
    selectedIntensity = null;
    submitBtn.disabled = true;
}

function submitIntensity() {
    if (selectedIntensity !== null) {
        alert(`Intensidad registrada: ${selectedIntensity}/10`);
        closePlayerModal();
        setTimeout(() => {
            backToMainOptions();
        }, 500);
    }
}

function showCoachFAB() {
    document.getElementById('fabContainer').style.display = 'block';
}

function toggleCoachModal() {
    const modal = document.getElementById('coachModalOverlay');
    if (modal.style.display === 'flex') {
        closeCoachModal();
    } else {
        openCoachModal();
    }
}

function openCoachModal() {
    const modal = document.getElementById('coachModalOverlay');
    modal.style.display = 'flex';
    modal.classList.add('modal-opening');
    setTimeout(() => {
        modal.classList.remove('modal-opening');
        modal.addEventListener('click', handleModalClick);
    }, 300);
}

function closeCoachModal() {
    const modal = document.getElementById('coachModalOverlay');
    modal.classList.add('modal-closing');
    modal.removeEventListener('click', handleModalClick);
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('modal-closing');
    }, 300);
}

function handleModalClick(event) {
    if (event.target === event.currentTarget) {
        closeCoachModal();
    }
}

function navigateToPage(url) {
    closeCoachModal();
    setTimeout(() => {
        window.location.href = url;
    }, 200);
}

function showLocationActions() {
    document.getElementById('locationCoachActions').style.display = 'flex';
    document.getElementById('locationCoachActionsNews').style.display = 'flex';
}

function createNewLocation() {
    window.location.href = './crearEntrenamiento/crearEntrenamiento.html';
}

function goToNews() {
    window.location.href = './crearNews/crearNews.html';
}

function editLocation() {
    alert('Editar ubicación - Funcionalidad próximamente');
}

function showPlayersSection() {
    document.getElementById('playersSection').style.display = 'block';
    generatePlayersGrid();
    generateIndicators();
}

function generatePlayersGrid() {
    const playersGrid = document.getElementById('playersGrid');
    playersGrid.innerHTML = '';
    playersGrid.style.width = window.innerWidth >= 768 ?
        'calc(180px * 20 + 20px * 19)' :
        'calc(160px * 20 + 15px * 19)';
    playersGrid.style.animation = window.innerWidth >= 768 ?
        'autoScroll 40s linear infinite' :
        'autoScroll 30s linear infinite';

    const duplicatedPlayers = [...playersData, ...playersData];
    duplicatedPlayers.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <div class="player-photo">
                <img src="${player.photo || './recursos/sergio.jpg'}" alt="${player.name}"
                     onerror="this.src='./recursos/sergio.jpg'">
            </div>
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-position">${player.position}</div>
                <div class="player-status">
                    <span class="status-indicator"></span>
                    ${player.status}
                </div>
                <div class="player-attendance">Asistencia ${player.attendance}</div>
            </div>`;
        playersGrid.appendChild(playerCard);
    });
}

function generateIndicators() {
    const playersIndicators = document.getElementById('playersIndicators');
    playersIndicators.innerHTML = '';
    const pages = Math.ceil(playersData.length / playersPerPage);
    for (let i = 0; i < pages; i++) {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${i === currentIndicator ? 'active' : ''}`;
        indicator.onclick = () => jumpToSection(i);
        playersIndicators.appendChild(indicator);
    }
}

function jumpToSection(section) {
    currentIndicator = section;
    updateIndicators();
}

function setupHoverEvents() {
    const playersContainer = document.getElementById('playersContainer');
    const carouselStatus = document.getElementById('carouselStatus');
    playersContainer.addEventListener('mouseenter', () => {
        carouselStatus.textContent = 'PAUSADO';
        carouselStatus.classList.add('visible');
    });
    playersContainer.addEventListener('mouseleave', () => {
        carouselStatus.classList.remove('visible');
    });
}

function startIndicatorAnimation() {
    if (indicatorInterval) clearInterval(indicatorInterval);
    const duration = window.innerWidth >= 768 ? 40000 : 30000;
    const intervalTime = duration / Math.ceil(playersData.length / playersPerPage);
    indicatorInterval = setInterval(() => {
        currentIndicator = (currentIndicator + 1) % Math.ceil(playersData.length / playersPerPage);
        updateIndicators();
    }, intervalTime);
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndicator);
    });
}

function setupFilterEvents() {
    const searchInput = document.getElementById('playerSearch');
    const clearSearchBtn = document.getElementById('clearSearch');

    searchInput.addEventListener('input', function () {
        const value = this.value.trim();
        clearSearchBtn.classList.toggle('visible', value.length > 0);
        applyFilters();
    });

    clearSearchBtn.addEventListener('click', clearSearch);
}

function applyFilters() {
    const searchTerm = document.getElementById('playerSearch').value.toLowerCase().trim();
    filteredPlayers = playersData.filter(player =>
        player.name.toLowerCase().includes(searchTerm)
    );
    isFiltering = searchTerm.length > 0;
    if (isFiltering) {
        stopCarousel();
        showFilteredResults();
    } else {
        startCarousel();
    }
    updateCounter();
}

function showFilteredResults() {
    const playersGrid = document.getElementById('playersGrid');
    const noResults = document.getElementById('noResults');
    const navigation = document.querySelector('.players-navigation');
    if (filteredPlayers.length === 0) {
        playersGrid.style.display = 'none';
        navigation.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';
    navigation.style.display = 'flex';
    playersGrid.style.display = 'flex';
    playersGrid.innerHTML = '';
    playersGrid.style.animation = 'none';
    playersGrid.style.transform = 'translateX(0)';
    playersGrid.style.width = 'auto';

    filteredPlayers.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.style.flexShrink = '0';
        playerCard.innerHTML = `
            <div class="player-photo">
                <img src="${player.photo || './recursos/sergio.jpg'}" alt="${player.name}"
                     onerror="this.src='./recursos/sergio.jpg'">
            </div>
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-position">${player.position}</div>
                <div class="player-status">
                    <span class="status-indicator"></span>
                    ${player.status}
                </div>
                <div class="player-attendance">Asistencia ${player.attendance}</div>
            </div>`;
        playersGrid.appendChild(playerCard);
    });

    document.getElementById('playersIndicators').style.display = 'none';
}

function stopCarousel() {
    if (indicatorInterval) clearInterval(indicatorInterval);
}

function startCarousel() {
    const playersGrid = document.getElementById('playersGrid');
    document.getElementById('noResults').style.display = 'none';
    document.querySelector('.players-navigation').style.display = 'flex';
    document.getElementById('playersIndicators').style.display = 'flex';
    generatePlayersGrid();
    generateIndicators();
    startIndicatorAnimation();
}

function clearSearch() {
    document.getElementById('playerSearch').value = '';
    document.getElementById('clearSearch').classList.remove('visible');
    applyFilters();
}

function updateCounter() {
    const count = isFiltering ? filteredPlayers.length : playersData.length;
    document.getElementById('filterCounter').textContent = `${count} jugador${count !== 1 ? 'es' : ''}`;
}

window.addEventListener('beforeunload', () => {
    if (indicatorInterval) clearInterval(indicatorInterval);
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (indicatorInterval) clearInterval(indicatorInterval);
    } else {
        if (!isFiltering) startIndicatorAnimation();
    }
});

window.addEventListener('resize', () => {
    if (!isFiltering) {
        generatePlayersGrid();
        generateIndicators();
        startIndicatorAnimation();
    }
});

document.getElementById('coachModalOverlay').addEventListener('click', function (event) {
    if (event.target === this) {
        closeCoachModal();
    }
});
