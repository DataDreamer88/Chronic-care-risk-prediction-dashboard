// Healthcare Dashboard JavaScript
class HealthcareDashboard {
    constructor() {
        this.data = {
            "patients": [
                {
                    "id": "P001",
                    "name": "Robert Johnson",
                    "age": 67,
                    "gender": "Male",
                    "primaryCondition": "Type 2 Diabetes + COPD",
                    "riskScore": 0.87,
                    "riskLevel": "High",
                    "lastPrediction": "2025-09-09",
                    "vitals": {
                        "bloodPressure": [140, 135, 142, 138, 145],
                        "glucose": [180, 165, 195, 170, 185],
                        "oxygenSat": [92, 90, 88, 91, 89],
                        "heartRate": [78, 82, 85, 79, 83]
                    },
                    "riskFactors": ["High glucose levels", "Low O2 saturation", "Medication non-adherence"],
                    "medicationAdherence": 0.65,
                    "lastVisit": "2025-09-05",
                    "interventions": ["Medication adjustment", "Home monitoring setup"]
                },
                {
                    "id": "P002",
                    "name": "Maria Garcia",
                    "age": 54,
                    "gender": "Female",
                    "primaryCondition": "Hypertension + Heart Failure",
                    "riskScore": 0.72,
                    "riskLevel": "High",
                    "lastPrediction": "2025-09-09",
                    "vitals": {
                        "bloodPressure": [160, 155, 158, 162, 159],
                        "glucose": [110, 108, 115, 112, 109],
                        "oxygenSat": [95, 94, 96, 95, 94],
                        "heartRate": [95, 98, 102, 94, 99]
                    },
                    "riskFactors": ["Elevated BP", "Fluid retention", "Increased heart rate"],
                    "medicationAdherence": 0.78,
                    "lastVisit": "2025-09-07",
                    "interventions": ["Diuretic adjustment", "Weight monitoring"]
                },
                {
                    "id": "P003",
                    "name": "James Wilson",
                    "age": 43,
                    "gender": "Male",
                    "primaryCondition": "Type 1 Diabetes",
                    "riskScore": 0.34,
                    "riskLevel": "Medium",
                    "lastPrediction": "2025-09-09",
                    "vitals": {
                        "bloodPressure": [125, 122, 128, 124, 126],
                        "glucose": [145, 140, 150, 142, 148],
                        "oxygenSat": [98, 97, 99, 98, 97],
                        "heartRate": [70, 72, 68, 71, 69]
                    },
                    "riskFactors": ["Glucose variability", "Recent travel"],
                    "medicationAdherence": 0.85,
                    "lastVisit": "2025-09-08",
                    "interventions": ["CGM calibration", "Diet counseling"]
                },
                {
                    "id": "P004",
                    "name": "Linda Brown",
                    "age": 59,
                    "gender": "Female",
                    "primaryCondition": "COPD + Osteoporosis",
                    "riskScore": 0.19,
                    "riskLevel": "Low",
                    "lastPrediction": "2025-09-09",
                    "vitals": {
                        "bloodPressure": [118, 120, 115, 122, 119],
                        "glucose": [95, 92, 98, 94, 96],
                        "oxygenSat": [96, 95, 97, 96, 95],
                        "heartRate": [65, 68, 63, 66, 67]
                    },
                    "riskFactors": ["Seasonal allergies", "Mild exercise intolerance"],
                    "medicationAdherence": 0.92,
                    "lastVisit": "2025-09-06",
                    "interventions": ["Pulmonary rehab", "Bone density monitoring"]
                }
            ],
            "alerts": [
                {
                    "id": "A001",
                    "patientId": "P001",
                    "patientName": "Robert Johnson",
                    "priority": "Critical",
                    "type": "Risk Score Increase",
                    "message": "Risk score increased from 0.78 to 0.87 in 24 hours. O2 saturation declining.",
                    "timestamp": "2025-09-09 14:30",
                    "status": "Unacknowledged",
                    "actions": ["Call Patient", "Schedule Urgent Visit", "Contact Care Team"]
                },
                {
                    "id": "A002",
                    "patientId": "P002",
                    "patientName": "Maria Garcia",
                    "priority": "High",
                    "type": "Vital Signs Alert",
                    "message": "Blood pressure readings consistently above 160/95 for 3 days.",
                    "timestamp": "2025-09-09 12:15",
                    "status": "Acknowledged",
                    "actions": ["Medication Review", "Home BP Monitoring", "Cardiology Consult"]
                },
                {
                    "id": "A003",
                    "patientId": "P003",
                    "patientName": "James Wilson",
                    "priority": "Medium",
                    "type": "Medication Adherence",
                    "message": "Insulin adherence dropped to 78% this week. Glucose trending upward.",
                    "timestamp": "2025-09-09 10:45",
                    "status": "In Progress",
                    "actions": ["Patient Education", "Reminder System", "Endocrine Review"]
                }
            ],
            "modelPerformance": {
                "auroc": 0.86,
                "auprc": 0.79,
                "accuracy": 0.83,
                "precision": 0.81,
                "recall": 0.78,
                "f1Score": 0.79,
                "calibrationScore": 0.92,
                "lastUpdated": "2025-09-09 08:00"
            },
            "populationStats": {
                "totalPatients": 847,
                "highRisk": 89,
                "mediumRisk": 234,
                "lowRisk": 524,
                "activeAlerts": 23,
                "interventionsThisWeek": 45
            }
        };

        this.charts = {};
        this.filteredPatients = [...this.data.patients];
        this.filteredAlerts = [...this.data.alerts];
        this.currentSection = 'dashboard';

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderDashboardData();
        this.renderPatientsGrid();
        this.renderAlertsList();
        this.initializeCharts();
        this.setupThemeToggle();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav__item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.navigateToSection(section);
            });
        });

        // Patient search and filters
        const patientSearch = document.getElementById('patientSearch');
        if (patientSearch) {
            patientSearch.addEventListener('input', (e) => this.filterPatients());
        }

        const riskFilter = document.getElementById('riskFilter');
        if (riskFilter) {
            riskFilter.addEventListener('change', (e) => this.filterPatients());
        }

        const conditionFilter = document.getElementById('conditionFilter');
        if (conditionFilter) {
            conditionFilter.addEventListener('change', (e) => this.filterPatients());
        }

        // Alert filters
        const priorityFilter = document.getElementById('priorityFilter');
        if (priorityFilter) {
            priorityFilter.addEventListener('change', (e) => this.filterAlerts());
        }

        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => this.filterAlerts());
        }

        // Quick search
        const quickSearch = document.getElementById('quickSearch');
        if (quickSearch) {
            quickSearch.addEventListener('input', (e) => this.handleQuickSearch(e.target.value));
        }

        // Modal events
        this.setupModalEvents();

        // Settings events
        this.setupSettingsEvents();
    }

    navigateToSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav__item').forEach(item => {
            item.classList.remove('nav__item--active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('nav__item--active');

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('section--active');
        });
        document.getElementById(sectionName).classList.add('section--active');

        this.currentSection = sectionName;

        // Render section-specific content
        if (sectionName === 'analytics') {
            this.renderAnalyticsCharts();
        } else if (sectionName === 'performance') {
            this.renderPerformanceChart();
        }
    }

    renderDashboardData() {
        // Render high-risk patients list
        const highRiskList = document.getElementById('highRiskList');
        if (highRiskList) {
            const highRiskPatients = this.data.patients
                .filter(p => p.riskLevel === 'High')
                .sort((a, b) => b.riskScore - a.riskScore);

            highRiskList.innerHTML = highRiskPatients.map(patient => `
                <div class="patient-quick-item" data-patient-id="${patient.id}">
                    <span class="patient-name">${patient.name}</span>
                    <span class="risk-score ${patient.riskLevel.toLowerCase()}">${(patient.riskScore * 100).toFixed(0)}%</span>
                </div>
            `).join('');

            // Add click events
            highRiskList.querySelectorAll('.patient-quick-item').forEach(item => {
                item.addEventListener('click', () => {
                    const patientId = item.dataset.patientId;
                    this.showPatientDetail(patientId);
                });
            });
        }

        // Render recent alerts
        const recentAlerts = document.getElementById('recentAlerts');
        if (recentAlerts) {
            const sortedAlerts = [...this.data.alerts]
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 3);

            recentAlerts.innerHTML = sortedAlerts.map(alert => `
                <div class="alert-item ${alert.priority.toLowerCase()}">
                    <div class="alert-priority ${alert.priority.toLowerCase()}">${alert.priority}</div>
                    <div class="alert-content">
                        <div class="alert-message">
                            <strong>${alert.patientName}</strong> - ${alert.message}
                        </div>
                        <div class="alert-time">${this.formatTimestamp(alert.timestamp)}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    renderPatientsGrid() {
        const patientsGrid = document.getElementById('patientsGrid');
        if (!patientsGrid) return;

        patientsGrid.innerHTML = this.filteredPatients.map(patient => `
            <div class="patient-card" data-patient-id="${patient.id}">
                <div class="patient-card__header">
                    <div class="patient-info">
                        <h3>${patient.name}</h3>
                        <div class="patient-meta">${patient.age} years, ${patient.gender}</div>
                    </div>
                    <div class="patient-risk">
                        <div class="risk-level ${patient.riskLevel.toLowerCase()}">${patient.riskLevel}</div>
                        <div style="font-weight: bold; margin-top: 4px;">${(patient.riskScore * 100).toFixed(0)}%</div>
                    </div>
                </div>
                <div class="patient-card__body">
                    <div class="patient-condition">${patient.primaryCondition}</div>
                    <div class="patient-factors">
                        ${patient.riskFactors.map(factor => `<span class="factor-tag">${factor}</span>`).join('')}
                    </div>
                </div>
                <div class="patient-card__footer">
                    <span>Last visit: ${this.formatDate(patient.lastVisit)}</span>
                    <span>Adherence: ${(patient.medicationAdherence * 100).toFixed(0)}%</span>
                </div>
            </div>
        `).join('');

        // Add click events
        patientsGrid.querySelectorAll('.patient-card').forEach(card => {
            card.addEventListener('click', () => {
                const patientId = card.dataset.patientId;
                this.showPatientDetail(patientId);
            });
        });
    }

    renderAlertsList() {
        const alertsList = document.getElementById('alertsList');
        if (!alertsList) return;

        alertsList.innerHTML = this.filteredAlerts.map(alert => `
            <div class="alert-card">
                <div class="alert-card__header">
                    <div>
                        <div class="alert-priority ${alert.priority.toLowerCase()}">${alert.priority}</div>
                        <h3>${alert.type}</h3>
                    </div>
                    <div class="alert-status ${alert.status.toLowerCase().replace(' ', '-')}">${alert.status}</div>
                </div>
                <div class="alert-card__body">
                    <p><strong>${alert.patientName}</strong> - ${alert.message}</p>
                    <small>${this.formatTimestamp(alert.timestamp)}</small>
                </div>
                <div class="alert-card__footer">
                    <div class="alert-actions">
                        ${alert.actions.map(action => `
                            <button class="btn btn--sm btn--outline" onclick="dashboard.handleAlertAction('${alert.id}', '${action}')">${action}</button>
                        `).join('')}
                    </div>
                    <button class="btn btn--sm btn--primary" onclick="dashboard.acknowledgeAlert('${alert.id}')">
                        ${alert.status === 'Unacknowledged' ? 'Acknowledge' : 'Mark Complete'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterPatients() {
        const searchTerm = document.getElementById('patientSearch')?.value.toLowerCase() || '';
        const riskLevel = document.getElementById('riskFilter')?.value || '';
        const condition = document.getElementById('conditionFilter')?.value.toLowerCase() || '';

        this.filteredPatients = this.data.patients.filter(patient => {
            const matchesSearch = patient.name.toLowerCase().includes(searchTerm) ||
                                patient.primaryCondition.toLowerCase().includes(searchTerm);
            const matchesRisk = !riskLevel || patient.riskLevel === riskLevel;
            const matchesCondition = !condition || patient.primaryCondition.toLowerCase().includes(condition);

            return matchesSearch && matchesRisk && matchesCondition;
        });

        this.renderPatientsGrid();
    }

    filterAlerts() {
        const priority = document.getElementById('priorityFilter')?.value || '';
        const status = document.getElementById('statusFilter')?.value || '';

        this.filteredAlerts = this.data.alerts.filter(alert => {
            const matchesPriority = !priority || alert.priority === priority;
            const matchesStatus = !status || alert.status === status;
            return matchesPriority && matchesStatus;
        });

        this.renderAlertsList();
    }

    handleQuickSearch(searchTerm) {
        if (!searchTerm) return;

        const results = this.data.patients.filter(patient =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.primaryCondition.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // For demo, just navigate to patients section and filter
        this.navigateToSection('patients');
        document.getElementById('patientSearch').value = searchTerm;
        this.filterPatients();
    }

    initializeCharts() {
        // Risk Distribution Chart
        const riskCtx = document.getElementById('riskChart');
        if (riskCtx) {
            this.charts.risk = new Chart(riskCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
                    datasets: [{
                        data: [
                            this.data.populationStats.lowRisk,
                            this.data.populationStats.mediumRisk,
                            this.data.populationStats.highRisk
                        ],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    renderAnalyticsCharts() {
        // Population Trends Chart
        const trendsCtx = document.getElementById('trendsChart');
        if (trendsCtx && !this.charts.trends) {
            this.charts.trends = new Chart(trendsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'High Risk',
                            data: [75, 82, 89, 91, 87, 89],
                            borderColor: '#B4413C',
                            backgroundColor: 'rgba(180, 65, 60, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Medium Risk',
                            data: [220, 235, 228, 241, 238, 234],
                            borderColor: '#FFC185',
                            backgroundColor: 'rgba(255, 193, 133, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Low Risk',
                            data: [500, 515, 508, 520, 518, 524],
                            borderColor: '#1FB8CD',
                            backgroundColor: 'rgba(31, 184, 205, 0.1)',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }

        // Intervention Effectiveness Chart
        const interventionCtx = document.getElementById('interventionChart');
        if (interventionCtx && !this.charts.intervention) {
            this.charts.intervention = new Chart(interventionCtx, {
                type: 'bar',
                data: {
                    labels: ['Medication Adj.', 'Monitoring', 'Education', 'Lifestyle', 'Rehab'],
                    datasets: [{
                        label: 'Success Rate %',
                        data: [85, 78, 92, 67, 89],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#ECEBD5', '#5D878F', '#DB4545'],
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
    }

    renderPerformanceChart() {
        const performanceCtx = document.getElementById('performanceChart');
        if (performanceCtx && !this.charts.performance) {
            this.charts.performance = new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                    datasets: [
                        {
                            label: 'AUROC',
                            data: [0.82, 0.84, 0.85, 0.86, 0.86, 0.86],
                            borderColor: '#1FB8CD',
                            backgroundColor: 'rgba(31, 184, 205, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Accuracy',
                            data: [0.78, 0.80, 0.81, 0.82, 0.83, 0.83],
                            borderColor: '#FFC185',
                            backgroundColor: 'rgba(255, 193, 133, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Precision',
                            data: [0.75, 0.77, 0.79, 0.80, 0.81, 0.81],
                            borderColor: '#B4413C',
                            backgroundColor: 'rgba(180, 65, 60, 0.1)',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            min: 0.7,
                            max: 1.0
                        }
                    }
                }
            });
        }
    }

    setupModalEvents() {
        const modal = document.getElementById('patientModal');
        const modalBackdrop = document.getElementById('modalBackdrop');
        const modalClose = document.getElementById('modalClose');

        if (modalClose) {
            modalClose.addEventListener('click', () => this.hideModal());
        }

        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', () => this.hideModal());
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                this.hideModal();
            }
        });
    }

    showPatientDetail(patientId) {
        const patient = this.data.patients.find(p => p.id === patientId);
        if (!patient) return;

        const modal = document.getElementById('patientModal');
        const modalBody = document.getElementById('modalBody');
        const modalPatientName = document.getElementById('modalPatientName');

        modalPatientName.textContent = patient.name;

        // Calculate latest vitals (last value in arrays)
        const latestVitals = {
            bloodPressure: patient.vitals.bloodPressure[patient.vitals.bloodPressure.length - 1],
            glucose: patient.vitals.glucose[patient.vitals.glucose.length - 1],
            oxygenSat: patient.vitals.oxygenSat[patient.vitals.oxygenSat.length - 1],
            heartRate: patient.vitals.heartRate[patient.vitals.heartRate.length - 1]
        };

        modalBody.innerHTML = `
            <div class="patient-detail">
                <div class="detail-section">
                    <h3>Patient Demographics</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Age</span>
                            <span class="detail-value">${patient.age} years</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Gender</span>
                            <span class="detail-value">${patient.gender}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Primary Condition</span>
                            <span class="detail-value">${patient.primaryCondition}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Risk Score</span>
                            <span class="detail-value risk-level ${patient.riskLevel.toLowerCase()}">${(patient.riskScore * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Latest Vital Signs</h3>
                    <div class="vitals-grid">
                        <div class="vital-item">
                            <div class="vital-value">${latestVitals.bloodPressure}</div>
                            <div class="vital-label">Blood Pressure</div>
                        </div>
                        <div class="vital-item">
                            <div class="vital-value">${latestVitals.glucose}</div>
                            <div class="vital-label">Glucose (mg/dL)</div>
                        </div>
                        <div class="vital-item">
                            <div class="vital-value">${latestVitals.oxygenSat}%</div>
                            <div class="vital-label">Oxygen Saturation</div>
                        </div>
                        <div class="vital-item">
                            <div class="vital-value">${latestVitals.heartRate}</div>
                            <div class="vital-label">Heart Rate (BPM)</div>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Risk Factors</h3>
                    <div class="patient-factors">
                        ${patient.riskFactors.map(factor => `<span class="factor-tag">${factor}</span>`).join('')}
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Treatment Information</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Medication Adherence</span>
                            <span class="detail-value">${(patient.medicationAdherence * 100).toFixed(1)}%</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Last Visit</span>
                            <span class="detail-value">${this.formatDate(patient.lastVisit)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Last Prediction</span>
                            <span class="detail-value">${this.formatDate(patient.lastPrediction)}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Recent Interventions</h3>
                    <ul>
                        ${patient.interventions.map(intervention => `<li>${intervention}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    }

    hideModal() {
        const modal = document.getElementById('patientModal');
        modal.classList.add('hidden');
    }

    setupSettingsEvents() {
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                this.setTheme(e.target.value);
            });
        }
    }

    setupThemeToggle() {
        // Auto-detect system theme
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        this.setTheme('auto');

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const themeSelect = document.getElementById('themeSelect');
            if (themeSelect && themeSelect.value === 'auto') {
                this.setTheme('auto');
            }
        });
    }

    setTheme(theme) {
        const html = document.documentElement;
        
        if (theme === 'auto') {
            html.removeAttribute('data-color-scheme');
        } else {
            html.setAttribute('data-color-scheme', theme);
        }

        // Update charts colors if needed
        this.updateChartsForTheme();
    }

    updateChartsForTheme() {
        // This would update chart colors based on theme
        // For now, we'll keep the current colors
    }

    acknowledgeAlert(alertId) {
        const alert = this.data.alerts.find(a => a.id === alertId);
        if (alert) {
            if (alert.status === 'Unacknowledged') {
                alert.status = 'Acknowledged';
            } else if (alert.status === 'Acknowledged') {
                alert.status = 'In Progress';
            } else {
                alert.status = 'Completed';
            }
            this.renderAlertsList();
            this.renderDashboardData(); // Update dashboard alerts
        }
    }

    handleAlertAction(alertId, action) {
        // Simulate handling alert actions
        console.log(`Handling action "${action}" for alert ${alertId}`);
        
        // For demo purposes, show a simple alert
        this.showNotification(`Action "${action}" has been initiated.`, 'success');
    }

    showNotification(message, type = 'info') {
        // Create a simple notification system
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">${message}</div>
            <button class="notification__close">×</button>
        `;

        // Add notification styles if not already present
        if (!document.querySelector('.notification-container')) {
            const container = document.createElement('div');
            container.className = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 1001;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(container);
        }

        const container = document.querySelector('.notification-container');
        container.appendChild(notification);

        // Style the notification
        notification.style.cssText = `
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-12) var(--space-16);
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
        `;

        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            margin-left: 10px;
            color: var(--color-text-secondary);
        `;

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);

        // Manual close
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new HealthcareDashboard();
});

// Make dashboard globally available for onclick handlers
window.dashboard = null;