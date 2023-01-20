const cors = require('cors')
const initMiddleware = require('../../lib/init-middleware');

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['OPTIONS'],
    })
);

export default async function handler(req, res) {
    // Run cors
    await cors(req, res);

    // Rest of the API logic
    res.json({ message: 'Hello Everyone!' });
}