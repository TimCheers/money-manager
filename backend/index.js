import "dotenv/config"; // сразу читает .env и заполняет process.env
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});