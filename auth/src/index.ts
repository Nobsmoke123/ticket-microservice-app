import http from 'node:http';
import app from './app';


const PORT = parseInt(process.env?.PORT || '4000');
const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Auth service is runnning on port ${PORT}`);
})