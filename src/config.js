/* eslint-disable */

// url and port
export const PORT = process.env.PORT || 4000;
export const API_URL =
  process.env.API_URL || `http://localhost:${PORT}/graphql`;

// auth
export const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';

// mongo db
const { DBUSER, DBPASSWORD, DBURI, DBNAME } = process.env;
export const MONGODB_URI = `mongodb://${DBUSER}:${DBPASSWORD}@${DBURI}/${DBNAME}`;
