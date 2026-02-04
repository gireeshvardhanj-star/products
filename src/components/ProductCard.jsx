export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="productCard">
      <div className="productIcon">{product.icon}</div>

      <h4 className="productName">{product.name}</h4>
      <p className="productDesc">{product.desc}</p>

      <div className="productFooter">
        <span className="price">₹ {product.price}</span>

        <button
          className="btnPrimarySmall"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
