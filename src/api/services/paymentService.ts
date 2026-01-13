import { ApiResponse } from '../types';
import {
  CreateStripeIntentRequest,
  CreateStripeIntentResponse,
  CreateOrderRequest,
  CreateOrderResponse,
} from '../types/payment';
import { API_HOST } from '../config/host';

// Payment service for Stripe integration
export class PaymentService {
  private static baseURL = API_HOST;

  // Step 1: Initialize Stripe Payment Intent
  static async createStripeIntent(
    packageId: string
  ): Promise<ApiResponse<CreateStripeIntentResponse>> {
    const response = await fetch(`${this.baseURL}/api/payment/stripe-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ packageId }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to create payment intent: ${response.statusText}`,
        statusCode: response.status,
      };
    }

    try {
      const data = await response.json();
      return {
        success: true,
        data: data.data || data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to parse response',
        statusCode: response.status,
      };
    }
  }

  // Step 3: Create Order after successful payment
  static async createOrder(
    orderData: CreateOrderRequest,
    authToken?: string
  ): Promise<ApiResponse<CreateOrderResponse>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add auth token if provided (for logged-in users)
    // if (authToken) {
    //   headers['Authorization'] = `Bearer ${authToken}`;
    // }
    console.log("Creating the order ", JSON.stringify(orderData))
    const response = await fetch(`${this.baseURL}/api/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to create order: ${response.statusText}`,
        statusCode: response.status,
      };
    }

    try {
      const data = await response.json();
      return {
        success: true,
        data: data.data || data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to parse response',
        statusCode: response.status,
      };
    }
  }
}
