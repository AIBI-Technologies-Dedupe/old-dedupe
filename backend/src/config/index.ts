import dotenv from "dotenv";
dotenv.config();

export const config = {
	PORT: process.env.PORT || 3000,
	ENV: process.env.NODE_ENV,
	LOGGER: process.env.NODE_ENV === "development" ? "dev" : "tiny",
	JWT_SECRET: process.env.JWT_SECRET,
};
