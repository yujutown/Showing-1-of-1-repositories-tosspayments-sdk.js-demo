import * as querystring from 'querystring';
import * as http from 'http';
import { PaymentService } from './payment.service.js';

const css = `
code {
    white-space: pre-wrap;
}`
export const successListener = (paymentService: PaymentService) => async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const query = querystring.parse(req.url!.split("?")[1])

  const ret = await paymentService.confirmPayment({
    paymentKey: query.paymentKey as string,
    amount: Number.parseInt(query.amount as string),
    orderId: query.orderId as string,
  })
  if (ret.success) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<style>${css}</style><meta charset="UTF-8">
<code>${JSON.stringify(ret.data, null, 2)}</code>`);
  } else {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end(`<style>${css}</style><meta charset="UTF-8">
<code>${JSON.stringify(ret.error, null, 2)}</code>`);
  }
}
