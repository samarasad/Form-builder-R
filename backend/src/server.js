import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3000; 
import { errorHandler } from './middleware/errorHandler.js';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
import { connectDB } from './db/connectionDb/connectionDb.js';

// connect to DB 
connectDB();
// Routes
app.use("/api/form-schema", routes);
app.use('/api/form-submissions',routes);
app.use('/api/get-submissions',routes);
// app.use("/api/submissions", submissionRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});