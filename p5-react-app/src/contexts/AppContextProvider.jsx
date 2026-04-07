import { useEffect, useReducer } from "react";
import { AppContext } from "./AppContext";
import { chefs } from "../data/chefs";
import { reviews } from "../data/reviews";

const AppContextProvider = ({ children }) => {
  const getCartFromStorage = () => {
    try {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  };

  const getOrdersFromStorage = () => {
    try {
      const orders = localStorage.getItem("orders");
      return orders ? JSON.parse(orders) : [];
    } catch {
      return [];
    }
  };

  const initialState = {
    foodData: [],
    ordersData: [],
    chefsData: chefs,
    reviewsData: reviews,
    loadingFoods: true,
    loadingOrders: true,
    errorFoods: null,
    errorOrders: null,
    cart: getCartFromStorage(),
    myOrderLocalStorage: getOrdersFromStorage(),
  };
  const reducerFoodData = (state, action) => {
    switch (action.type) {
      case "FETCH_FOODS_START":
        return { ...state, loadingFoods: true, errorFoods: null };

      case "FETCH_FOODS_SUCCESS":
        return { ...state, loadingFoods: false, foodData: action.payload };

      case "FETCH_FOODS_ERROR":
        return { ...state, loadingFoods: false, errorFoods: action.payload };

      case "FETCH_ORDERS_START":
        return { ...state, loadingOrders: true, errorOrders: null };

      case "FETCH_ORDERS_SUCCESS":
        return { ...state, loadingOrders: false, ordersData: action.payload };

      case "FETCH_ORDERS_ERROR":
        return { ...state, loadingOrders: false, errorOrders: action.payload };

      case "ADD_NEW_ORDER":
        return {
          ...state,
          ordersData: [...state.ordersData, action.payload],
          myOrderLocalStorage: [...state.myOrderLocalStorage, action.payload],
        };

      // code in cart
      case "ADD_TO_CART": {
        const item = action.payload;

        const existingItem = state.cart.find(
          (cartItem) => cartItem._id === item._id,
        );

        if (existingItem) {
          const updatedCart = state.cart.map((cartItem) =>
            cartItem._id === item._id
              ? {
                  ...cartItem,
                  quantity: Math.min(cartItem.quantity + 1, 10),
                }
              : cartItem,
          );

          return { ...state, cart: updatedCart };
        } else {
          return { ...state, cart: [...state.cart, { ...item, quantity: 1 }] };
        }
      }

      case "INCREASE_CART_QUANTITY": {
        const updatedCart = state.cart.map((cartItem) =>
          cartItem._id === action.payload._id
            ? {
                ...cartItem,
                quantity: Math.min(cartItem.quantity + 1, 10),
              }
            : cartItem,
        );

        return { ...state, cart: updatedCart };
      }

      case "DECREASE_CART_QUANTITY": {
        const updatedCart = state.cart.map((cartItem) =>
          cartItem._id === action.payload._id
            ? {
                ...cartItem,
                quantity: Math.max(cartItem.quantity - 1, 1),
              }
            : cartItem,
        );

        return { ...state, cart: updatedCart };
      }

      case "REMOVE_ITEM_TO_CART": {
        const deletedItem = action.payload;

        const updatedCart = state.cart.filter(
          (cartItem) => cartItem._id !== deletedItem._id,
        );

        return { ...state, cart: updatedCart };
      }

      case "CLEAR_CART":
        return { ...state, cart: [] };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFoodData, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(state.myOrderLocalStorage));
  }, [state.myOrderLocalStorage]);

  useEffect(() => {
    const fetchFoods = async () => {
      dispatch({ type: "FETCH_FOODS_START" });

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/foods`);

        if (!response.ok) {
          throw new Error(`Failed to fetch foods: ${response.status}`);
        }

        const foods = await response.json();

        dispatch({ type: "FETCH_FOODS_SUCCESS", payload: foods });
      } catch (error) {
        dispatch({ type: "FETCH_FOODS_ERROR", payload: error.message });
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: "FETCH_ORDERS_START" });

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`);

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }

        const orders = await response.json();

        dispatch({ type: "FETCH_ORDERS_SUCCESS", payload: orders });
      } catch (error) {
        dispatch({ type: "FETCH_ORDERS_ERROR", payload: error.message });
      }
    };

    fetchOrders();
  }, []);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
