import http from 'node:http';
import { bodyToJson } from './middlewares/bodytojson';
import { routes } from './routes.js';

const port = 3000;
const host = 'localhost'

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await bodyToJson(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path === url
    })

    if(route) {
        return route.handler(req, res)
    }
    
    return res  
        .writeHead(404)
        .end(JSON.stringify({error: 'Resource not Found...'}))
})

server.listen(port, host, () => {
    console.log(`Server is Running on http://${host}:${port}`);
})