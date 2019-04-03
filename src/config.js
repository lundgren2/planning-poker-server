/* eslint-disable */
export const PORT = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
const { DBUSER, DBPASSWORD, DBURI, DBNAME } = process.env;
export const MONGODB_URI = `mongodb://${DBUSER}:${DBPASSWORD}@${DBURI}/${DBNAME}`;
