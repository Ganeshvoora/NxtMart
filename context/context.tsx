// context/context.tsx
import { createContext } from "react";

// Define the context value type (cart and setCart function)
export const cartContext = createContext<{cart: any[];setCart: React.Dispatch<React.SetStateAction<any[]>>; }>({cart: [],setCart: () => {}});
