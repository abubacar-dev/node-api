import http from 'node:http';

const port = 3000;
const host = 'localhost'

const server = http.createServer(async (req, res) => {
    return res  
        .writeHead(404)
        .end(JSON.stringify({error: 'Resource not Found...'}))
})

server.listen(port, host, () => {
    console.log(`Server is Running on http://${host}:${port}`);
})