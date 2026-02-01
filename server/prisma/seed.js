const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const contentSeed = [
  {
    key: "heroTitle",
    value: "Samson Group of Companies",
  },
  {
    key: "heroSubtitle",
    value:
      "Service with love and care, from our family to yours. Modern memorial care, integrated facilities, and a legacy of compassionate service across Cavite.",
  },
  {
    key: "heroCtaPrimary",
    value: "Schedule a Consultation",
  },
  {
    key: "heroCtaSecondary",
    value: "Explore Our Services",
  },
  {
    key: "aboutTitle",
    value: "A Legacy of Compassion Since 1928",
  },
  {
    key: "aboutText",
    value:
      "Founded by Rita Monzon Samson in Imus, Cavite, Samson continues a proud tradition of personalized, dignified service. Our group includes memorial gardens, vigil spaces, cremation services, floristry, and casket craftsmanship to support families through every step with care and respect.",
  },
  {
    key: "aboutFeature1",
    value: "Professional and dignified services",
  },
  {
    key: "aboutFeature2",
    value: "Modern facilities and technology",
  },
  {
    key: "aboutFeature3",
    value: "Compassionate staff available 24/7",
  },
  {
    key: "aboutFeature4",
    value: "Flexible payment plans",
  },
  {
    key: "legacyTitle",
    value: "Our Legacy",
  },
  {
    key: "legacyDescription",
    value: "Founded in 1928, we've been trusted by thousands of families to provide compassionate, professional funeral and cemetery services.",
  },
  {
    key: "missionTitle",
    value: "Our Mission",
  },
  {
    key: "missionText",
    value: "To provide compassionate, dignified, and personalized memorial care that honors every life and supports families with empathy and excellence.",
  },
  {
    key: "visionTitle",
    value: "Our Vision",
  },
  {
    key: "visionText",
    value: "To be the most trusted and innovative memorial care provider in Cavite, setting the standard for service, facilities, and family support.",
  },
  {
    key: "valuesTitle",
    value: "Our Values",
  },
  {
    key: "valuesItems",
    value: "Compassion\nIntegrity\nExcellence\nService",
  },
  // Contact Information
  {
    key: "contactPhone",
    value: "(046) 472-3000",
  },
  {
    key: "contactEmail",
    value: "info@samsongroup.com.ph",
  },
  {
    key: "contactLocations",
    value: "Multiple branches in Cavite",
  },
  {
    key: "facebookMessengerUrl",
    value: "https://m.me/samsongroup",
  },
  {
    key: "facebookMessengerText",
    value: "Message us directly on Facebook Messenger for quick responses",
  },
  // Footer Information
  {
    key: "footerTitle",
    value: "Samson Funeral & Cemetery Services",
  },
  {
    key: "footerTagline",
    value: "Serving families with dignity since 1928",
  },
  {
    key: "footerCopyright",
    value: "© 2024 Samson Group. All rights reserved.",
  },
  // Footer Quick Links
  {
    key: "footerQuickLinks",
    value: JSON.stringify([
      { label: "About Us", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Obituaries", href: "/obituaries" },
      { label: "Directory", href: "/directory" },
      { label: "Contact", href: "#contact" }
    ]),
  },
  // Footer Other Links
  {
    key: "footerOtherLinks",
    value: JSON.stringify([
      { label: "Officers", href: "/officers" },
      { label: "Announcements", href: "/announcements" },
      { label: "Affiliations", href: "/affiliations" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms and Conditions", href: "#" }
    ]),
  },
  // Footer Addresses
  {
    key: "footerAddresses",
    value: JSON.stringify([
      { label: "Main Office", address: "123 Memorial Street, Imus, Cavite" },
      { label: "Branch Office", address: "456 Service Avenue, Cavite City" },
      { label: "Facilities", address: "789 Garden Lane, Rosario, Cavite" }
    ]),
  },
  {
    key: "historyTimeline",
    value: JSON.stringify([
      {
        year: "1928",
        title: "Founded in Imus, Cavite",
        detail:
          "Rita Monzon Samson established Funeraria Samson with a mission of quality and compassionate care.",
      },
      {
        year: "1976",
        title: "Business Relaunched",
        detail:
          "Cecilia Del Mundo Ancheta revived the company, expanding services and locations.",
      },
      {
        year: "1988",
        title: "Casket Craftsmanship",
        detail:
          "C. Ancheta Crafts opened to provide premium locally-made and imported caskets.",
      },
      {
        year: "1997",
        title: "Memorial Gardens",
        detail:
          "Rita Samson Memorial Garden opened in Alapan, Imus to offer serene memorial spaces.",
      },
      {
        year: "2000",
        title: "Bahay Ugnayan Vigil Spaces",
        detail:
          "The Imus branch became a complete memorial chapel facility with modern amenities.",
      },
      {
        year: "2004",
        title: "Antonio’s Farm",
        detail:
          "Samson introduced in-house floristry with a flower farm to craft meaningful tributes.",
      },
    ]),
  },
  {
    key: "solutions",
    value: JSON.stringify([
      {
        title: "Content Management",
        description:
          "Update service descriptions, branch details, and announcements instantly through an easy content editor.",
      },
      {
        title: "AI Chat Support (CRM)",
        description:
          "Capture inquiries, respond instantly, and log customer conversations with a smart chat assistant.",
      },
      {
        title: "Social Media Integration",
        description:
          "Connect with families on Facebook and other social channels, and share updates effortlessly.",
      },
    ]),
  },
  {
    key: "stats",
    value: JSON.stringify([
      { label: "Years of Service", value: "96+" },
      { label: "Branches", value: "8" },
      { label: "Employees", value: "100+" },
      { label: "Memorial Sites", value: "3" },
    ]),
  },
  {
    key: "branches",
    value: JSON.stringify([
      {
        name: "Imus Branch",
        detail:
          "145 Gen. F. Yengco St., Bayan Luma 1, Imus, Cavite. 11 premium memorial chapels with tranquil common areas.",
      },
      {
        name: "Rita Samson Memorial Garden",
        detail:
          "Alapan, Imus, Cavite. 6-hectare memorial garden with lots, columbarium, and crematorium.",
      },
      {
        name: "Samson Divine Memorial Garden",
        detail:
          "Congbalay St., Binakayan, Kawit, Cavite. Picturesque memorial garden with chapel and columbarium.",
      },
      {
        name: "Mabolo Branch",
        detail:
          "Tirona Highway, Mabolo, Bacoor, Cavite. Landmark facility with 8 premium chapels.",
      },
      {
        name: "San Francisco Branch",
        detail:
          "Brookside Lane, San Francisco, General Trias, Cavite. 5 memorial chapels in a peaceful setting.",
      },
    ]),
  },
  {
    key: "socialLinks",
    value: JSON.stringify([
      { name: "Facebook", url: "https://facebook.com" },
      { name: "Instagram", url: "https://instagram.com" },
      { name: "LinkedIn", url: "https://linkedin.com" },
      { name: "YouTube", url: "https://youtube.com" },
    ]),
  },
  {
    key: "contactEmail",
    value: "bahay_ugnayan@hotmail.com",
  },
  {
    key: "contactPhone",
    value: "(046) 471-2675",
  },
  {
    key: "contactAddress",
    value: "145 Bayan Luma I Imus, Cavite, Philippines 4103",
  },
  // SMTP Configuration
  {
    key: "smtpHost",
    value: "smtp.gmail.com",
  },
  {
    key: "smtpPort",
    value: "587",
  },
  {
    key: "smtpUser",
    value: "your-email@gmail.com",
  },
  {
    key: "smtpPassword",
    value: "",
  },
  {
    key: "smtpFromEmail",
    value: "noreply@samsongroup.com.ph",
  },
  {
    key: "contactFormEmail",
    value: "info@samsongroup.com.ph",
  },
  // Legal Pages
  {
    key: "privacyPolicyTitle",
    value: "Privacy Policy & Data Consent",
  },
  {
    key: "privacyPolicyContent",
    value: "At Samson Group of Companies, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains our information practices, what types of information we collect, how we use it, and the rights you have with respect to your information.",
  },
  {
    key: "cookiePolicyTitle",
    value: "Cookie Policy",
  },
  {
    key: "cookiePolicyContent",
    value: "We use cookies to enhance your experience on our website. Cookies are small files stored on your device that help us understand how you use our site and improve our services. By continuing to use this website, you consent to our use of cookies.",
  },
];

const servicesSeed = [
  {
    name: "Cremation Services",
    heading: "Cremation Services",
    caption: "Professional cremation services with dignified handling and care",
    content: "",
    image: "https://res.cloudinary.com/samson-group/video/upload/v1640231570/servicesvid/interment_jpdhwx_fwcnuh.mp4",
    order: 1
  },
  {
    name: "Mausoleums",
    heading: "Mausoleums",
    caption: "Beautiful above-ground mausoleum options for eternal resting places",
    content: "",
    image: "https://res.cloudinary.com/samson-group/video/upload/v1640231567/servicesvid/mausoleum_iby7ho_rx4veh.mp4",
    order: 2
  },
  {
    name: "Memorial Services",
    heading: "Memorial Services",
    caption: "Meaningful memorial services to honor and celebrate lives",
    content: "",
    image: "https://res.cloudinary.com/samson-group/video/upload/v1640231570/servicesvid/interment_jpdhwx_fwcnuh.mp4",
    order: 3
  },
  {
    name: "Caskets",
    heading: "Caskets",
    caption: "Premium selection of caskets in various styles and materials",
    content: "",
    image: "https://res.cloudinary.com/samson-group/video/upload/v1640231570/servicesvid/casket_oibqpx_bwxxmo.mp4",
    order: 4
  },
  {
    name: "Columbary Inurnment",
    heading: "Columbary Inurnment",
    caption: "Elegant columbarium units for cremated remains",
    content: "",
    image: "https://res.cloudinary.com/samson-group/video/upload/v1640231557/servicesvid/urnburial_spstcl_otvukx.mp4",
    order: 5
  },
  {
    name: "Funeral Ceremony",
    heading: "Funeral Ceremony",
    caption: "Complete funeral ceremony arrangements and coordination",
    content: "",
    image: "https://res.cloudinary.com/samson-group/video/upload/v1640231559/servicesvid/urnfuneralwake_dwsf22_hnyjkl.mp4",
    order: 6
  }
];

const affiliationsSeed = [
  {
    name: "Philippine Funeral Directors Association",
    description: "Committed to ethical and compassionate service standards.",
    logo: null,
    order: 1
  },
  {
    name: "Cavite Memorial Care Network",
    description: "Partnering for modern memorial care and facilities.",
    logo: null,
    order: 2
  },
  {
    name: "National Association of Memorial Parks",
    description: "Advocating excellence in memorial park operations.",
    logo: null,
    order: 3
  }
];

async function main() {
  console.log('Seeding content...');
  for (const item of contentSeed) {
    await prisma.content.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: item,
    });
  }
  
  console.log('Seeding services...');
  // Clear and recreate services
  await prisma.service.deleteMany();
  for (const service of servicesSeed) {
    const created = await prisma.service.create({ data: service });
    console.log(`✓ Created: ${created.heading}`);
  }
  
  console.log('Seeding affiliations...');
  // Clear and recreate affiliations
  await prisma.affiliation.deleteMany();
  for (const affiliation of affiliationsSeed) {
    const created = await prisma.affiliation.create({ data: affiliation });
    console.log(`✓ Created: ${created.name}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
