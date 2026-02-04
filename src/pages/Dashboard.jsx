import ProductCard from "../components/ProductCard.jsx";

export default function DashboardPage({
  user,
  products,
  cartCount,
  onAddToCart,
  onLogout,
}) {
  return (
    <div className="dashPage">
      <header className="dashHeader">
        <div>
          <h2 className="dashTitle">Dashboard</h2>
          <p className="dashSub">
            Welcome <b>{user?.email}</b> 👋
          </p>
        </div>

        <div className="dashRight">
          <div className="cartPill">🧺 Cart: {cartCount}</div>
          <button className="btnOutline" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="card">
        <h3 className="cardTitle">Featured Products</h3>
        <p className="text">Click “Add to Cart” to see reactive state updates.</p>

        <div className="productGrid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
}
