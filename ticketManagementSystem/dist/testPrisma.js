// import { prisma } from "./lib/prisma.js";
// const result = await prisma.tickets.findMany();
// console.log(result);
import { prisma } from "./lib/prisma.js";
async function main() {
    const allUsers = await prisma.tickets.findMany();
    console.log("All users:", JSON.stringify(allUsers, null, 2));
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
