import { useState } from "react";
import BushidoIntro from "./components/BushidoIntro";
import AppRouter from "./router/AppRouter";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <CartProvider>
      <WishlistProvider>
        {showIntro ? <BushidoIntro onComplete={() => setShowIntro(false)} /> : <AppRouter />}
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
