// CRM Dashboard JavaScript

// Section Navigation
const crmMenuLinks = document.querySelectorAll('.admin-menu-link');
const crmSections = document.querySelectorAll('.admin-section');

crmMenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links and sections
        crmMenuLinks.forEach(l => l.classList.remove('active'));
        crmSections.forEach(s => s.classList.remove('active'));
        
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

// Get contacts from localStorage
function getCRMContacts() {
    const contacts = localStorage.getItem('samson_contacts');
    return contacts ? JSON.parse(contacts) : [];
}

// Get leads from localStorage
function getCRMLeads() {
    const leads = localStorage.getItem('samson_leads');
    return leads ? JSON.parse(leads) : [];
}

// Update CRM statistics
function updateCRMStats() {
    const contacts = getCRMContacts();
    const leads = getCRMLeads();
    
    // Update overview stats
    const totalCustomers = document.getElementById('totalCustomers');
    const newLeads = document.getElementById('newLeads');
    const conversions = document.getElementById('conversions');
    
    if (totalCustomers) totalCustomers.textContent = contacts.length;
    if (newLeads) newLeads.textContent = leads.length;
    if (conversions) conversions.textContent = Math.floor(contacts.length * 0.3);
    
    // Update pipeline stages
    updatePipelineStages(contacts, leads);
    
    // Update report stats
    updateReportStats(contacts);
}

// Update pipeline stages
function updatePipelineStages(contacts, leads) {
    const total = contacts.length + leads.length;
    
    const stageNew = document.getElementById('stageNew');
    const stageContacted = document.getElementById('stageContacted');
    const stageQualified = document.getElementById('stageQualified');
    const stageProposal = document.getElementById('stageProposal');
    const stageClosed = document.getElementById('stageClosed');
    
    if (stageNew) stageNew.textContent = leads.length;
    if (stageContacted) stageContacted.textContent = Math.floor(total * 0.3);
    if (stageQualified) stageQualified.textContent = Math.floor(total * 0.2);
    if (stageProposal) stageProposal.textContent = Math.floor(total * 0.15);
    if (stageClosed) stageClosed.textContent = contacts.length;
}

// Update report statistics
function updateReportStats(contacts) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const dailyContacts = contacts.filter(c => new Date(c.timestamp) >= today).length;
    const weeklyContacts = contacts.filter(c => new Date(c.timestamp) >= weekAgo).length;
    const monthlyContacts = contacts.filter(c => new Date(c.timestamp) >= monthAgo).length;
    
    const dailyContactsEl = document.getElementById('dailyContacts');
    const weeklyContactsEl = document.getElementById('weeklyContacts');
    const monthlyContactsEl = document.getElementById('monthlyContacts');
    
    if (dailyContactsEl) dailyContactsEl.textContent = dailyContacts;
    if (weeklyContactsEl) weeklyContactsEl.textContent = weeklyContacts;
    if (monthlyContactsEl) monthlyContactsEl.textContent = monthlyContacts;
}

// Load contacts table
function loadContactsTable() {
    const contacts = getCRMContacts();
    const tbody = document.getElementById('contactsTableBody');
    
    if (!tbody) return;
    
    if (contacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No contacts found</td></tr>';
        return;
    }
    
    tbody.innerHTML = contacts.map((contact, index) => `
        <tr>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone || 'N/A'}</td>
            <td>${new Date(contact.timestamp).toLocaleDateString()}</td>
            <td><span class="status-badge status-new">New</span></td>
            <td>
                <button class="btn-small" onclick="viewContact(${index})">View</button>
                <button class="btn-small" onclick="deleteContact(${index})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Filter contacts based on search
function filterContacts() {
    const searchTerm = document.getElementById('contactSearch').value.toLowerCase();
    const contacts = getCRMContacts();
    const tbody = document.getElementById('contactsTableBody');
    
    if (!tbody) return;
    
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm) ||
        (contact.phone && contact.phone.toLowerCase().includes(searchTerm))
    );
    
    if (filteredContacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No contacts found</td></tr>';
        return;
    }
    
    tbody.innerHTML = filteredContacts.map((contact, index) => `
        <tr>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone || 'N/A'}</td>
            <td>${new Date(contact.timestamp).toLocaleDateString()}</td>
            <td><span class="status-badge status-new">New</span></td>
            <td>
                <button class="btn-small" onclick="viewContact(${index})">View</button>
                <button class="btn-small" onclick="deleteContact(${index})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// View contact details
function viewContact(index) {
    const contacts = getCRMContacts();
    const contact = contacts[index];
    
    alert(`Contact Details:\n\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone || 'N/A'}\nMessage: ${contact.message}\nDate: ${new Date(contact.timestamp).toLocaleString()}`);
}

// Delete contact
function deleteContact(index) {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    const contacts = getCRMContacts();
    contacts.splice(index, 1);
    localStorage.setItem('samson_contacts', JSON.stringify(contacts));
    
    loadContactsTable();
    updateCRMStats();
    alert('Contact deleted successfully!');
}

// Refresh contacts
function refreshContacts() {
    loadContactsTable();
    updateCRMStats();
    alert('Contacts refreshed!');
}

// Export contacts to CSV
function exportContacts() {
    const contacts = getCRMContacts();
    
    if (contacts.length === 0) {
        alert('No contacts to export');
        return;
    }
    
    let csv = 'Name,Email,Phone,Message,Date\n';
    contacts.forEach(contact => {
        csv += `"${contact.name}","${contact.email}","${contact.phone || ''}","${contact.message}","${new Date(contact.timestamp).toLocaleString()}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Add new lead
function addLead() {
    const name = prompt('Lead Name:');
    if (!name) return;
    
    const email = prompt('Email:');
    if (!email) return;
    
    const phone = prompt('Phone:');
    const company = prompt('Company:');
    
    const leads = getCRMLeads();
    leads.push({
        name,
        email,
        phone: phone || '',
        company: company || '',
        status: 'new',
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('samson_leads', JSON.stringify(leads));
    updateCRMStats();
    alert('Lead added successfully!');
}

// Export report
function exportReport(type) {
    const contacts = getCRMContacts();
    const reportName = `${type}_report_${new Date().toISOString().split('T')[0]}.txt`;
    
    let reportContent = `Samson Group CRM - ${type.toUpperCase()} Report\n`;
    reportContent += `Generated: ${new Date().toLocaleString()}\n\n`;
    reportContent += `Total Contacts: ${contacts.length}\n`;
    reportContent += `Total Leads: ${getCRMLeads().length}\n`;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = reportName;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} report exported!`);
}

// Initialize CRM dashboard
document.addEventListener('DOMContentLoaded', () => {
    updateCRMStats();
    loadContactsTable();
});

// Export functions to global scope
window.filterContacts = filterContacts;
window.viewContact = viewContact;
window.deleteContact = deleteContact;
window.refreshContacts = refreshContacts;
window.exportContacts = exportContacts;
window.addLead = addLead;
window.exportReport = exportReport;
