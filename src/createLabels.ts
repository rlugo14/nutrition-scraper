import { createAllLabels } from "./helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
	await createAllLabels(prisma);
})();
