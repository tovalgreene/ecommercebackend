const router = require('express').Router();
const apiRoutes = require('./api');

// API Routes
router.use('/api', apiRoutes);

// If no API routes are hit, send a 404 error response
router.use((req, res) => {
  // You could log the wrong route access here
  console.error(`404 Error: The route ${req.originalUrl} does not exist.`);

  // Sending a 404 status code and a JSON response
  res.status(404).json({
    message: "Sorry, we couldn't find the page you were looking for."
  });
});

module.exports = router;
