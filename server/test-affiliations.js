const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function test() {
  try {
    const affiliations = await prisma.affiliation.findMany({
      orderBy: { order: "asc" },
    });
    console.log("✓ Affiliations:", affiliations);
  } catch (error) {
    console.error("✗ Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
