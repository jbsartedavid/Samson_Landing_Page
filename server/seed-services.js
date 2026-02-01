const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedServices() {
  const services = [
    {
      heading: "Cremation Services",
      caption: "Professional cremation services with dignified handling and care",
      image: "https://res.cloudinary.com/samson-group/video/upload/v1640231570/servicesvid/interment_jpdhwx_fwcnuh.mp4",
      order: 1,
    },
    {
      heading: "Mausoleums",
      caption: "Beautiful above-ground mausoleum options for eternal resting places",
      image: "https://res.cloudinary.com/samson-group/video/upload/v1640231567/servicesvid/mausoleum_iby7ho_rx4veh.mp4",
      order: 2,
    },
    {
      heading: "Memorial Services",
      caption: "Meaningful memorial services to honor and celebrate lives",
      image: "https://res.cloudinary.com/samson-group/video/upload/v1640231570/servicesvid/interment_jpdhwx_fwcnuh.mp4",
      order: 3,
    },
    {
      heading: "Caskets",
      caption: "Premium selection of caskets in various styles and materials",
      image: "https://res.cloudinary.com/samson-group/video/upload/v1640231570/servicesvid/casket_oibqpx_bwxxmo.mp4",
      order: 4,
    },
    {
      heading: "Columbary Inurnment",
      caption: "Elegant columbarium units for cremated remains",
      image: "https://res.cloudinary.com/samson-group/video/upload/v1640231557/servicesvid/urnburial_spstcl_otvukx.mp4",
      order: 5,
    },
    {
      heading: "Funeral Ceremony",
      caption: "Complete funeral ceremony arrangements and coordination",
      image: "https://res.cloudinary.com/samson-group/video/upload/v1640231559/servicesvid/urnfuneralwake_dwsf22_hnyjkl.mp4",
      order: 6,
    },
  ];

  try {
    for (const service of services) {
      const existingService = await prisma.service.findFirst({
        where: { heading: service.heading },
      });

      if (!existingService) {
        await prisma.service.create({
          data: service,
        });
        console.log(`✓ Created service: ${service.heading}`);
      } else {
        console.log(`→ Service already exists: ${service.heading}`);
      }
    }
    console.log("✓ Services seeded successfully!");
  } catch (error) {
    console.error("Error seeding services:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedServices();
