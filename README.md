# Samson Group of Companies - Landing Page

A comprehensive landing page for Samson Group of Companies featuring content management system (CMS), customer relationship management (CRM), and social media integration.

## Features

### 1. Landing Page
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and professional design with smooth animations
- **Key Sections**:
  - Hero section with call-to-action
  - About Us with company statistics
  - Services showcase
  - Contact form with validation
  - Social media integration

### 2. Content Management System (CMS)
- **Admin Dashboard**: Dedicated admin panel for managing website content
- **Content Editor**: Edit hero section, about text, and contact information
- **Service Management**: Add, edit, and delete services
- **Social Media Management**: Update social media links and view analytics
- **Activity Tracking**: View recent form submissions and user activity

### 3. Customer Relationship Management (CRM)
- **Contact Management**: View and manage all contact form submissions
- **Lead Tracking**: Add and manage leads through the sales pipeline
- **Sales Pipeline**: Visual representation of leads at different stages
- **Search & Filter**: Easily find contacts with search functionality
- **Export Functionality**: Export contacts and reports to CSV
- **Analytics Dashboard**: View daily, weekly, and monthly statistics

### 4. Social Media Integration
- **Social Links**: Links to Facebook, Twitter, LinkedIn, and Instagram
- **Share Buttons**: Allow visitors to share the page on social media
- **Social Meta Tags**: Optimized Open Graph and Twitter Card tags for better sharing
- **Social Analytics**: Track social media engagement (in Admin panel)

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **LocalStorage**: Client-side data persistence for CMS and CRM
- **Font Awesome**: Icons for enhanced UI

## Getting Started

### Prerequisites
- Node.js (optional, for running local development server)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jbsartedavid/Samson_Landing_Page.git
cd Samson_Landing_Page
```

2. Install dependencies (optional):
```bash
npm install
```

3. Run the development server (optional):
```bash
npm run dev
```

Or simply open `index.html` in your web browser.

## File Structure

```
Samson_Landing_Page/
├── index.html              # Main landing page
├── admin.html              # Admin/CMS dashboard
├── crm.html                # CRM dashboard
├── css/
│   ├── styles.css          # Main stylesheet
│   └── admin.css           # Admin/CRM styles
├── js/
│   ├── main.js             # Main JavaScript
│   ├── admin.js            # Admin/CMS functionality
│   └── crm.js              # CRM functionality
├── package.json            # Project configuration
└── README.md               # This file
```

## Usage

### Landing Page
Visit `index.html` to view the main landing page. Users can:
- Browse company information and services
- Submit contact forms
- Share the page on social media
- Navigate to Admin and CRM dashboards

### Admin Dashboard
Access via the "Admin" link in navigation or `admin.html`:
- **Overview**: View statistics and recent activity
- **Edit Content**: Modify page content (hero section, about text, contact info)
- **Manage Services**: Add, edit, or delete service offerings
- **Social Media**: Update social media links and view analytics

### CRM Dashboard
Access via the "CRM" link in navigation or `crm.html`:
- **Overview**: View CRM statistics and sales pipeline
- **Contacts**: Manage all contact form submissions
- **Leads**: Add and track sales leads
- **Reports**: Generate and export reports

## Features in Detail

### Contact Form
The contact form on the landing page automatically saves submissions to localStorage, making them available in the CRM dashboard. All submissions include:
- Name
- Email
- Phone (optional)
- Message
- Timestamp

### Content Management
Admins can update various content elements:
- Hero section title and subtitle
- About section text
- Contact information
- Service listings

All changes are saved to localStorage and can be applied across page refreshes.

### CRM Pipeline
The CRM includes a visual sales pipeline with stages:
1. **New**: Fresh leads
2. **Contacted**: Initial contact made
3. **Qualified**: Lead qualified for sales
4. **Proposal**: Proposal sent
5. **Closed**: Deal closed

### Social Media Sharing
Visitors can share the page using built-in share buttons for:
- Facebook
- Twitter
- LinkedIn

The page includes proper meta tags for optimal appearance when shared.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

Samson Group of Companies
- Email: info@samsongroup.com
- Phone: +1 (555) 123-4567

## Acknowledgments

- Font Awesome for icons
- Modern CSS techniques for responsive design
- LocalStorage API for client-side data persistence