import { PaymentConfirmRequest, TossPaymentsApi } from '@yuju/tosspayments-sdk';

export class PaymentService {
  private tossPaymentsApi: TossPaymentsApi;

  constructor(private apiKey: string) {
    this.tossPaymentsApi = new TossPaymentsApi(apiKey);
  }

  async confirmPayment(request: PaymentConfirmRequest) {
    return await this.tossPaymentsApi.paymentApi.confirm(request);
  }
}
