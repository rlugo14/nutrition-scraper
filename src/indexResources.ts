import {
	resolvePromisesSequentially,
	getIndexingTransactions,
} from "./helpers";
import axiosClient from "axios";
import { ALPHANUMERIC } from "./constants";
import { PrismaClient } from "@prisma/client";

const axios = axiosClient.create();
const prisma = new PrismaClient();

(async () => {
	const transactions = await getIndexingTransactions(
		axios,
		prisma,
		ALPHANUMERIC
	);

	await resolvePromisesSequentially(transactions);
})();
