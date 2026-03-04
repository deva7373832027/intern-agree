// Sample internship data - Indian Companies
let internships = [
    {
        title: "Software Developer Intern",
        company: "Flipkart Tech",
        source: "LinkedIn",
        location: "Remote",
        field: "Tech",
        stipend: "₹18,000/month",
        experience: "Intermediate",
        description: "Python, JavaScript knowledge required. Work on e-commerce platform"
    },
    // example fresher entry
    {
        title: "Marketing Intern",
        company: "Unacademy",
        location: "Mumbai",
        field: "Marketing",
        stipend: "₹12,000/month",
        experience: "Fresher",
        description: "Social media marketing and content strategy for online education"
    },
    {
        title: "Financial Analyst Intern",
        company: "ICICI Bank",
        location: "Mumbai",
        field: "Finance",
        stipend: "₹15,000/month",
        experience: "Intermediate",
        description: "Excel, data analysis and financial modeling experience"
    },
    {
        title: "UI/UX Design Intern",
        company: "Razorpay",
        location: "Bangalore",
        field: "Design",
        stipend: "₹14,000/month",
        experience: "Intermediate",
        description: "Figma, Adobe XD, user experience design for fintech platform"
    },
    {
        title: "Data Science Intern",
        company: "Byju's",
        location: "Remote",
        field: "Tech",
        stipend: "₹16,000/month",
        experience: "Experienced",
        description: "Python, Machine Learning, data analytics for edtech solutions"
    },
    {
        title: "Content Marketing Intern",
        company: "Swiggy",
        location: "Bangalore",
        field: "Marketing",
        stipend: "₹13,000/month",
        experience: "Fresher",
        description: "Content writing, SEO, social media strategy for food delivery"
    },
    {
        title: "Sales Executive Intern",
        company: "OYO Rooms",
        location: "Delhi",
        field: "Sales",
        stipend: "₹10,000/month",
        experience: "Fresher",
        description: "Sales skills, customer relationship management in hospitality"
    },
    {
        title: "Frontend Developer Intern",
        company: "Freshworks",
        location: "Chennai",
        field: "Tech",
        stipend: "₹17,000/month",
        experience: "Intermediate",
        description: "React, JavaScript, HTML/CSS expertise for CRM platform"
    },
    {
        title: "Data Entry Executive",
        company: "Infosys",
        location: "Pune",
        field: "Tech",
        stipend: "₹8,000/month",
        experience: "Fresher",
        description: "Accuracy in data entry, MS Excel, time management"
    },
    {
        title: "UI/UX Design Intern",
        company: "Zoho",
        location: "Bangalore",
        field: "Design",
        stipend: "₹14,000/month",
        experience: "Intermediate",
        description: "Wireframing, Figma, user research, prototyping"
    }
];

// InternshipFilter utility class
const InternshipFilter = {
    applyMultipleFilters: function(jobs, filters) {
        return jobs.filter(job => {
            const matchSearch = !filters.search || 
                job.title.toLowerCase().includes(filters.search) ||
                job.company.toLowerCase().includes(filters.search) ||
                job.description.toLowerCase().includes(filters.search);
            
            const matchLocation = filters.location === 'All Locations' || job.location === filters.location;
            const matchField = filters.field === 'All Fields' || job.field === filters.field;
            const matchExperience = !filters.intermediateOnly || job.experience !== 'Fresher';
            const matchSource = !filters.source || job.source === filters.source;
            
            return matchSearch && matchLocation && matchField && matchExperience && matchSource;
        });
    }
};

// CategoryManager utility class
const CategoryManager = {
    getInternshipsByCategory: function(jobs, category) {
        return jobs.filter(job => job.field === category);
    }
};

// On window load, show internships and update user display if available
window.onload = function() {
    displayInternships(internships);
    const user = localStorage.getItem('userName');
    if (user) {
        // show name in header
        const headerDiv = document.querySelector('.header');
        if (headerDiv) {
            const userSpan = document.createElement('span');
            userSpan.className = 'user-greeting';
            userSpan.innerText = `Hello, ${user}`;
            headerDiv.appendChild(userSpan);
        }
    }
};

// Display internships
function displayInternships(jobs) {
    const list = document.getElementById('internship-list');
    list.innerHTML = '';
    // Render as comparison grid of cards
    const grid = document.createElement('div');
    grid.className = 'internship-grid';
    jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'internship-card';
        card.setAttribute('data-title', job.title);

        card.innerHTML = `
            <div class="card-top">
                <div>
                    <div class="company-name">${job.company}</div>
                    <div class="meta">${job.title} • ${job.field}</div>
                </div>
                <div class="stipend">${job.stipend}</div>
            </div>
            <div class="card-meta">${job.location} • ${job.experience}</div>
            <p class="card-desc">${job.description}</p>
            <div class="card-actions">
                <button class="save-btn" onclick="saveInternship('${job.title}')">⭐ Save</button>
                <button onclick="applyForInternship('${job.title}')">Apply Now</button>
            </div>
        `;

        grid.appendChild(card);
    });
    list.appendChild(grid);
}

// Search functionality
function searchInternships() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const location = document.getElementById('location').value;
    const field = document.getElementById('field').value;
    
    const intermediateOnly = document.getElementById('intermediateOnly').checked;
    const skill = document.getElementById('skillFilter').value.toLowerCase();
    const sourceFilter = document.getElementById('sourceFilter').value;
    const filters = {
        search: searchText,
        location: location,
        field: field,
        intermediateOnly: intermediateOnly,
        source: sourceFilter
    };
    
    let filtered = InternshipFilter.applyMultipleFilters(internships, filters);
    if (skill) {
        filtered = filtered.filter(job => job.description.toLowerCase().includes(skill) || job.title.toLowerCase().includes(skill));
    }
    const sortOption = document.getElementById('sort').value;
    if (sortOption) {
        filtered = sortInternships(filtered, sortOption);
    }
    displayInternships(filtered);
}

// Sorting helper
function sortInternships(list, option) {
    const copy = [...list];
    switch(option) {
        case 'stipendDesc':
            return copy.sort((a,b)=>parseInt(b.stipend.replace(/[^\d]/g,'')) - parseInt(a.stipend.replace(/[^\d]/g,'')));
        case 'stipendAsc':
            return copy.sort((a,b)=>parseInt(a.stipend.replace(/[^\d]/g,'')) - parseInt(b.stipend.replace(/[^\d]/g,'')));
        case 'titleAsc':
            return copy.sort((a,b)=>a.title.localeCompare(b.title));
        default:
            return copy;
    }
}


// Hamburger menu toggle
// Hamburger menu toggle (uses side-drawer)
function toggleMenu() {
    const drawer = document.getElementById('sideDrawer');
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
    } else {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
    }
}

// Handle login submission from home page
function submitLogin() {
    const id = document.getElementById('loginId').value.trim();
    const name = document.getElementById('loginName').value.trim();
    if (!id || !name) { alert('Please enter both ID and name'); return; }
    localStorage.setItem('userId', id);
    localStorage.setItem('userName', name);
    // after login redirect to portal
    window.location.href = 'index.html';
}
// Save internship
let savedInternships = [];
function saveInternship(title) {
    if (!savedInternships.includes(title)) {
        savedInternships.push(title);
        localStorage.setItem(`savedInternships`, JSON.stringify(savedInternships));
        alert(`Saved: ${title}`);
    } else {
        alert('Already saved!');
    }
}

function loadSaved() {
    const stored = JSON.parse(localStorage.getItem(`savedInternships`)) || [];
    savedInternships = stored;
}

function showSaved() {
    loadSaved();
    const container = document.getElementById('saved-items');
    container.innerHTML = '';
    savedInternships.forEach(title => {
        const job = internships.find(j => j.title === title);
        if (job) {
            container.innerHTML += `
                <div class="internship-card">
                    <h3>${job.title}</h3>
                    <p><strong>${job.company}</strong> • ${job.location}</p>
                    <p>${job.field} • ${job.stipend}</p>
                    <button onclick="applyForInternship('${job.title}')">Apply Now</button>
                </div>
            `;
        }
    });
    document.getElementById('bookmark-list').classList.add('show');
}

function hideSaved() {
    document.getElementById('bookmark-list').classList.remove('show');
}

// Apply for internship
function applyForInternship(title) {
    // Save the selected internship to start application flow
    const job = internships.find(j => j.title === title);
    if (job) {
        localStorage.setItem('currentApplication', JSON.stringify({ title: job.title, company: job.company, stipend: job.stipend }));
    }
    window.location.href = 'application.html';
}

// Submit application form: save to localStorage applications list
function submitApplicationFromForm(applicantName, resumeText) {
    const current = JSON.parse(localStorage.getItem('currentApplication') || 'null');
    if (!current) {
        alert('No internship selected. Please apply from the listing.');
        return;
    }

    const job = internships.find(j => j.title === current.title) || {};
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const appObj = {
        id: 'app_' + Date.now(),
        title: current.title || job.title || '',
        company: current.company || job.company || '',
        stipend: current.stipend || job.stipend || '₹0',
        applicantName: applicantName || '',
        resume: resumeText || '',
        appliedAt: new Date().toISOString(),
        status: 'Pending'
    };

    applications.push(appObj);
    localStorage.setItem('applications', JSON.stringify(applications));
    // remove currentApplication marker and store last submitted for confirmation page
    localStorage.removeItem('currentApplication');
    localStorage.setItem('lastSubmittedApplication', JSON.stringify(appObj));
    // redirect to confirmation page
    window.location.href = 'application_submitted.html';
}

// Utilities used by dashboard
function getApplications() {
    return JSON.parse(localStorage.getItem('applications') || '[]');
}

function parseStipendToNumber(stipendStr) {
    if (!stipendStr) return 0;
    const digits = stipendStr.replace(/[^\d]/g, '');
    return parseInt(digits || '0', 10);
}

// Render dashboard if present on the page
function renderDashboard() {
    const container = document.getElementById('applications-container');
    const budgetEl = document.getElementById('budgetTotal');
    if (!container) return;
    const apps = getApplications();

    // Budget tracker: sum stipends for Pending applications
    const totalPending = apps.filter(a => a.status === 'Pending')
        .reduce((sum, a) => sum + parseStipendToNumber(a.stipend), 0);
    if (budgetEl) {
        budgetEl.innerText = `₹${totalPending.toLocaleString()}`;
    }

    // Render table
    container.innerHTML = '';
    if (apps.length === 0) {
        container.innerHTML = '<p>No applications yet. Apply to internships to see them here.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'apps-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Company</th>
                <th>Stipend</th>
                <th>Applied On</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');
    apps.slice().reverse().forEach(app => {
        const tr = document.createElement('tr');
        const date = new Date(app.appliedAt);
        const formatted = date.toLocaleString();
        tr.innerHTML = `
            <td>${app.company}</td>
            <td>${app.stipend}</td>
            <td>${formatted}</td>
            <td><span class="status-badge status-${app.status.toLowerCase()}">${app.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
    container.appendChild(table);
}


// Create alert
function createAlert() {
    const email = document.getElementById('email').value;
    const keywords = document.getElementById('keywords').value;
    
    if (email && keywords) {
        // Store in localStorage
        let alerts = JSON.parse(localStorage.getItem('alerts')) || [];
        alerts.push({
            email: email,
            keywords: keywords,
            created: new Date().toLocaleString()
        });
        localStorage.setItem('alerts', JSON.stringify(alerts));
        
        alert(`Alert created! We'll notify you at ${email} for: ${keywords}`);
        
        // Clear form
        document.getElementById('email').value = '';
        document.getElementById('keywords').value = '';
    } else {
        alert('Please fill all fields');
    }
}

// Add new internship (for demo)
function addInternship() {
    const newJob = {
        title: "Data Science Intern",
        company: "AI Labs",
        location: "Remote",
        field: "Tech",
        stipend: "₹25,000/month",
        description: "Python, ML, Data analysis"
    };
    internships.push(newJob);
    displayInternships(internships);
    alert('New internship added!');
}

// Get categorized internships by type
function getCategorizedInternships(mainCategory) {
    return CategoryManager.getInternshipsByCategory(internships, mainCategory);
}