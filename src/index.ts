import { Server } from './server.js';
import { PaymentService } from './payment.service.js';
import { readHtmlFile } from './readHtmlFile.js';
import { successListener } from './successListener.js';

(async () => {

  const server = new Server(18000);
  const paymentService = new PaymentService("test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6");
  const indexHtml = await readHtmlFile("index")
  server.addRequestListener('/', (req, res) => {
    res.writeHead(200)
    res.end(indexHtml)
  })

  server.addRequestListener('/success', successListener(paymentService));
  await server.start();
  const chromeLauncher = await import('chrome-launcher');

  await chromeLauncher.launch({
    startingUrl: `http://localhost:18000`,
  });

})();
