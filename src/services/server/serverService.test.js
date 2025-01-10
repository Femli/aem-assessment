import ServerService from './serverService.js';
import request from 'supertest';
import { jest } from '@jest/globals';
import { IncomingMessage } from 'http';

describe('ServerService Class', () => {
    let serverInstance;
    let httpServer;
    let PORT = 8001;

    // start server before each unit test
    beforeEach(async () => {
        serverInstance = new ServerService(PORT);
        httpServer = serverInstance.start();
        await new Promise(resolve => {
            httpServer.on('listening', resolve);
        });
    });
    //close server after each unit test
    afterEach(async () => {
        const serverClosePromise = new Promise(resolve => {
            httpServer.on('close', resolve);
        })
        serverInstance.stop();
        await serverClosePromise;
    });

    describe('Start() Method', () => {
        test('should initialize server on predefined port', async () => {
            const portTest = 8000;
            const serverInstanceTest = new ServerService(portTest); //custom server instance needed for this test
            const httpServerTest = serverInstanceTest.start();

            //need to wait for server to initialize and begin listening
            await new Promise(resolve => {
                httpServerTest.on('listening', resolve);
            });

            //need try..catch block to ensure server closes on test failure
            try {
                expect(serverInstanceTest).toBeDefined();
                expect(httpServerTest.address().port).toEqual(8000);
            } finally {
                serverInstanceTest.stop();
            }
        });
        test('should return the default response when GETing /romannumeral endpoint without query param ', async () => {
            const defaultResponse = {
                input: null,
                output: null
            };

            const response = await request(httpServer)
                .get('/romannumeral')
                .expect('Content-Type', 'application/json')
                .expect(200); //http status code 200

            expect(response.body).toEqual(defaultResponse);
        });
        test('should return an invalid message when GETing /romannumeral endpoint with query param that is not a number ', async () => {
            const invalidMessage = "Invalid entry. Please enter an integer value.";
            const queryInput = 'abc';

            const response = await request(httpServer)
                .get(`/romannumeral?query=${queryInput}`)
                .expect('Content-Type', 'text/html')
                .expect(200); //http status code 200

            expect(response.text).toEqual(invalidMessage);
        });
        //TODO: once roman numeral conversion service is implemented, update this test
        test('should return a valid message when GETing /romannumeral endpoint with query param that is a number ', async () => {
            const validMessage = "Conversion service coming soon :)";
            const queryInput = 1;

            const response = await request(httpServer)
                .get(`/romannumeral?query=${queryInput}`)
                .expect('Content-Type', 'text/html')
                .expect(200); //http status code 200

            expect(response.text).toEqual(validMessage);
        });
        test('should return 404 error with invalid message when GETing any endpoint that is not /romannumeral', async () => {
            const endpoint = '/randomEndpoint';
            const invalidMesage = 'Resource not found!';

            const response = await request(httpServer)
                .get(endpoint)
                .expect('Content-Type', 'text/html')
                .expect(404); //http status code 404

            expect(response.text).toEqual(invalidMesage);
        });
        test('should return 500 error and invalid message when any endpoint fails', async () => {
            const invalidMessage = "Internal Server Error.";

            //simulate throwing an error to cause server request to fail
            serverInstance.getQueryParam = jest.fn().mockImplementation(() => {
                throw new Error('Simulated Error');
            });
            const response = await request(httpServer)
                .get('/romannumeral')
                .expect('Content-Type', 'text/html')
                .expect(500); //http status code 500

            expect(response.text).toEqual(invalidMessage);
        });
    });
    describe('Stop() Method', () => {
        test('should stop a running server', async () => {
            const serverInstanceTest = new ServerService(8000);
            const httpServerTest = serverInstanceTest.start();

            //wait for server to initialize
            await new Promise(resolve => {
                httpServerTest.on('listening', resolve);
            });

            //wait for server to stop
            const serverClosePromiseTest = new Promise(resolve => {
                httpServerTest.on('close', resolve);
            });
            serverInstanceTest.stop();
            await serverClosePromiseTest;

            expect(httpServerTest.address()).toBeNull();
        });
    });
    describe('getFullUrl() Method', () => {
        test('should get the full url as a URL object', async () => {
            const localhost = 'localhost'
            const endpoint = '/rommannumeral';

            const mockUrl = {
                url: endpoint
            };
            const fullUrl = serverInstance.getFullUrl(mockUrl);

            expect(fullUrl.pathname).toBe(endpoint);
            expect(fullUrl.port).toBe(`${PORT}`);
            expect(fullUrl.hostname).toBe(localhost);
        });
    });
    describe('getQueryParam() Method', () => {
        test('should get the query param from a request object', () => {
            const expectedQueryParam = '300';
            const endpoint = `/rommannumeral?query=${expectedQueryParam}`;

            const mockUrl = {
                url: endpoint
            };
            const queryParam = serverInstance.getQueryParam(mockUrl);

            expect(queryParam).toBe(expectedQueryParam);
        });
    });
});