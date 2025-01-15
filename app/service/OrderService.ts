import { CartItemObj } from "../context/CartContext";

interface OrderRequest {

    orderIdAndQuantityMap: Record<string, number>; // A map of product IDs to quantities
  }
  
  export class OrderService {
    private baseUrl: string;

    
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }

    private createOrderRequest(cartItems: CartItemObj[]): OrderRequest {

        const orderIdAndQuantityMap = cartItems.reduce((map: Record<string, number>, item) => {
            map[item.productId] = item.quantity;
            return map;
          }, {});

        const orderRequest: OrderRequest = {
            orderIdAndQuantityMap
        }

        return orderRequest;

    }
  
    /**
     * Places an order by sending a POST request to the API.
     * @param orderRequest The order details.
     * @param token The authentication token.
     * @param uid The user ID.
     * @returns Promise resolving to the API response.
     */
    public async placeOrder(
        token: String,
        uid: string,
        cartItems: CartItemObj[]
      ): Promise<Response> {
        const orderRequest = this.createOrderRequest(cartItems);
      
        try {
          const response = await fetch(`${this.baseUrl}/orders/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token': token,
              'uid': uid
            },
            body: JSON.stringify(orderRequest),
          });
      
          // Check if the response is OK (status code 200-299)
          if (!response.ok) {
            const errorDetails = await response.text();  // Use .text() for non-JSON responses
            throw new Error(`Failed to place order: ${response.status} ${response.statusText} - ${errorDetails}`);
          }
      
          // Try to parse as JSON only if the content type is JSON
          const contentType = response.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data;
          } else {
            // If it's not JSON, return the raw response body as text or handle accordingly
            const text = await response.text();
            console.log('Response is not JSON:', text);
            return response;  // Or handle in another way depending on your needs
          }
        } catch (error) {
          console.error('Error placing order:', error);
          throw error;
        }
      }
  }
  