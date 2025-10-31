// Empaqueta la app Express para correr como Function en Vercel
import serverless from "serverless-http";
import app from "../app.js";

export default serverless(app);
