import { createServer, IncomingMessage } from 'http';
import { URL } from 'url';

/**
 * Service class for managing the http server instance.
 * Handles routing and response/requests event handling.
 */
class ServerService {
    #server;
    #port;
    #BASE_URL;

    /**
     * Creates a new Server instance.
     * @param {number} [port = 3000] - Sets the port number of the server
     */
    constructor(port = 3000) {
        this.#port = port;
        this.#BASE_URL = `http://localhost:${this.#port}`;
    }

    /**
     * Initializes the server.
     * Configures routes and listens on specified port.
     * @returns http.Server instance if started successfully.
     */
    start() {
        this.#server = createServer((request, response) => {
            try {
                //The roman numeral conversion endpoint
                const reqUrl = this.getFullUrl(request);
                if (reqUrl.pathname === '/romannumeral') {
                    const param = this.getQueryParam(request);

                    //default response when no query params submitted
                    if (!param) {
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.write(JSON.stringify({
                            'input': null,
                            'output': null
                        }));
                        response.end();
                    }
                    //response for when a query param is submitted
                    else {
                        try {
                            //must be a valid integer
                            const value = parseInt(param);
                            if (isNaN(value)) throw new Error("Entry is not a valid number.");

                            //TODO: Roman Numeral Conversion Service...
                            //placeholder for now
                            response.writeHead(200, { 'Content-Type': 'text/html' });
                            response.write(
                                "Conversion service coming soon :)"
                            );
                            response.end();
                        } catch (error) {
                            console.log(`${error.name}: ${error.message}`)
                            response.writeHead(200, { 'Content-Type': 'text/html' });
                            response.write(
                                "Invalid entry. Please enter an integer value."
                            );
                            response.end();
                        }
                    }
                }
                //404 error for any other endpoint
                else {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.write(
                        "Resource not found!"
                    );
                    response.end();
                }
            } catch (error) {
                //500 error if our endpoints fail
                console.log(`${error.name}: ${error.message}`);

                response.writeHead(500, { 'Content-Type': 'text/html' });
                response.write(
                    "Internal Server Error."
                );
                response.end();
            }
        });
        return this.#server.listen(this.#port);
    }

    /**
     * Stops the server.
     */
    stop() {
        if (this.#server) {
            this.#server.close();
        }
    }

    /**
     * Looks through the request url for the "query" parameter value.
     * @param {IncomingMessage} request - HTTP request object
     * @returns a string
     */
    getQueryParam(request) {
        const url = this.getFullUrl(request);
        //looking for "query" query param in the url
        return url.searchParams.get('query');
    }

    /**
     * Gets the full URL by taking the relative endpoint of the request and local base url.
     * @param {IncomingMessage} request - HTTP request object
     * @returns a URL object
     */
    getFullUrl(request) {
        return new URL(request.url, this.#BASE_URL);
    }
}

export default ServerService;