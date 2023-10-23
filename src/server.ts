import * as http from 'node:http';
import * as console from 'console';

export class Server {
  private server: http.Server;
  private requestListenerMap: Map<string, http.RequestListener> = new Map();

  constructor(private port: number, private host: string = 'localhost') {
    console.log('Server');
    this.server = http.createServer((req, res) => this.processor(req, res));
  }

  addRequestListener(path: string, requestListener: http.RequestListener) {
    this.requestListenerMap.set(path, requestListener);
  }

  async start() {
    this.server.listen(this.port, this.host, () => {
      console.log(`Server is running on http://${this.host}:${this.port}`);
    });
  }

  private async processor(req: http.IncomingMessage, res: http.ServerResponse) {
    const path = req.url!.split('?')[0];
    const requestListener = this.requestListenerMap.get(path);
    if (requestListener) {
      await requestListener(req, res);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  }
}


