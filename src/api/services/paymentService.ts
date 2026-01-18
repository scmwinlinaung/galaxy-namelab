import { httpClient } from '../utils/httpClient';
import { ApiResponse } from '../types';
import {
  CreateStripeIntentRequest,
  CreateStripeIntentResponse,
  CreateOrderRequest,
  CreateOrderResponse,
} from '../types/payment';

// Payment service for Stripe integration
export class PaymentService {

  // Step 1: Initialize Stripe Payment Intent
  static async createStripeIntent(
    packageId: string
  ): Promise<ApiResponse<CreateStripeIntentResponse>> {
    return httpClient.post<CreateStripeIntentResponse>(
      '/payment/stripe-intent',
      { packageId }
    );
  }

  // Step 3: Create Order after successful payment
  static async createOrder(
    orderData: CreateOrderRequest
  ): Promise<ApiResponse<CreateOrderResponse>> {
    console.log('Creating the order ', JSON.stringify(orderData));

    return httpClient.post<CreateOrderResponse>(
      '/orders',
      orderData
    );
  }
}
