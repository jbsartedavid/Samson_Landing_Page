// Admin Dashboard JavaScript

// Section Navigation
const adminMenuLinks = document.querySelectorAll('.admin-menu-link');
const adminSections = document.querySelectorAll('.admin-section');

adminMenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links and sections
        adminMenuLinks.forEach(l => l.classList.remove('active'));
        adminSections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Show corresponding section
        const sectionId = link.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
        }
    });
});

// Update contact count on overview
function updateContactCount() {
    const contacts = getContactsFromLocalStorage();
    const totalContactsElement = document.getElementById('totalContacts');
    if (totalContactsElement) {
        totalContactsElement.textContent = contacts.length;
    }
}

// Load recent activity
function loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    const contacts = getContactsFromLocalStorage();
    
    if (contacts.length === 0) {
        activityList.innerHTML = '<p>No recent activity</p>';
        return;
    }
    
    // Show last 5 contacts
    const recentContacts = contacts.slice(-5).reverse();
    
    activityList.innerHTML = recentContacts.map(contact => `
        <div class="activity-item">
            <strong>${contact.name}</strong> submitted a contact form
            <div class="activity-time">${new Date(contact.timestamp).toLocaleString()}</div>
        </div>
    `).join('');
}

// Content Form Handler
const contentForm = document.getElementById('contentForm');
if (contentForm) {
    contentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const contentData = {
            heroTitle: document.getElementById('heroTitle').value,
            heroSubtitle: document.getElementById('heroSubtitle').value,
            aboutText: document.getElementById('aboutText').value,
            contactEmail: document.getElementById('contactEmail').value,
            contactPhone: document.getElementById('contactPhone').value
        };
        
        localStorage.setItem('samson_content', JSON.stringify(contentData));
        alert('Content updated successfully!');
    });
}

// Load existing services
function loadServices() {
    const servicesList = document.getElementById('servicesList');
    if (!servicesList) return;
    
    const services = getServicesFromLocalStorage();
    
    if (services.length === 0) {
        servicesList.innerHTML = '<p>No services yet. Add your first service!</p>';
        return;
    }
    
    servicesList.innerHTML = services.map((service, index) => `
        <div class="service-admin-item">
            <div>
                <h4>${service.title}</h4>
                <p>${service.description}</p>
            </div>
            <div class="service-admin-actions">
                <button class="btn-small" onclick="editService(${index})">Edit</button>
                <button class="btn-small" onclick="deleteService(${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Get services from localStorage
function getServicesFromLocalStorage() {
    const services = localStorage.getItem('samson_services');
    return services ? JSON.parse(services) : [
        { title: 'Business Consulting', description: 'Strategic guidance to help your business reach new heights', icon: 'fa-chart-line' },
        { title: 'Technology Solutions', description: 'Cutting-edge technology to streamline your operations', icon: 'fa-laptop-code' },
        { title: 'CRM Management', description: 'Comprehensive customer relationship management tools', icon: 'fa-users' },
        { title: 'Digital Marketing', description: 'Boost your online presence with our marketing expertise', icon: 'fa-bullhorn' }
    ];
}

// Add new service
function addService() {
    const title = prompt('Service Title:');
    if (!title) return;
    
    const description = prompt('Service Description:');
    if (!description) return;
    
    const icon = prompt('Font Awesome Icon Class (e.g., fa-chart-line):');
    
    const services = getServicesFromLocalStorage();
    services.push({ title, description, icon: icon || 'fa-star' });
    localStorage.setItem('samson_services', JSON.stringify(services));
    
    loadServices();
    alert('Service added successfully!');
}

// Edit service
function editService(index) {
    const services = getServicesFromLocalStorage();
    const service = services[index];
    
    const title = prompt('Service Title:', service.title);
    if (!title) return;
    
    const description = prompt('Service Description:', service.description);
    if (!description) return;
    
    services[index] = { ...service, title, description };
    localStorage.setItem('samson_services', JSON.stringify(services));
    
    loadServices();
    alert('Service updated successfully!');
}

// Delete service
function deleteService(index) {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    const services = getServicesFromLocalStorage();
    services.splice(index, 1);
    localStorage.setItem('samson_services', JSON.stringify(services));
    
    loadServices();
    alert('Service deleted successfully!');
}

// Social Form Handler
const socialForm = document.getElementById('socialForm');
if (socialForm) {
    socialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const socialData = {
            facebook: document.getElementById('facebookUrl').value,
            twitter: document.getElementById('twitterUrl').value,
            linkedin: document.getElementById('linkedinUrl').value,
            instagram: document.getElementById('instagramUrl').value
        };
        
        localStorage.setItem('samson_social', JSON.stringify(socialData));
        alert('Social media links updated successfully!');
    });
}

// Helper function to get contacts from localStorage
function getContactsFromLocalStorage() {
    const contacts = localStorage.getItem('samson_contacts');
    return contacts ? JSON.parse(contacts) : [];
}

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', () => {
    updateContactCount();
    loadRecentActivity();
    loadServices();
});

// Export functions to global scope
window.addService = addService;
window.editService = editService;
window.deleteService = deleteService;
