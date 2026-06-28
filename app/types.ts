// Blueprint for a product item fetched directly from the JSON API
export interface Product {
  id: string | number;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  description: string;
}

// Extension of the product item containing tracking state for the cart
export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}