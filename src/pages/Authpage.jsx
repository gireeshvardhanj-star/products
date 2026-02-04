import { useState } from "react";
import SignUpModal from "../components/SignUpModal.jsx";

export default function AuthPage({ registeredUser, onSignUp, onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validateSignIn(values) {
    const nextErrors = {};
    if (!values.email.trim()) nextErrors.email = "Email is required";
    else if (!values.email.includes("@"))
      nextErrors.email = "Email must contain @";

    if (!values.password.trim()) nextErrors.password = "Password is required";
    else if (values.password.length < 6)
      nextErrors.password = "Password must be at least 6 characters";

    return nextErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = validateSignIn(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const demoEmail = "demo@shop.com";
    const demoPassword = "demo123";

    const canLoginWithRegistered =
      registeredUser &&
      form.email === registeredUser.email &&
      form.password === registeredUser.password;

    const canLoginWithDemo =
      form.email === demoEmail && form.password === demoPassword;

    if (!canLoginWithRegistered && !canLoginWithDemo) {
      setInfoMessage(
        "Invalid credentials. Try demo@shop.com / demo123 or Sign Up first."
      );
      return;
    }

    onLogin({ email: form.email });
  }

  function openSignUp() {
    setIsSignUpOpen(true);
    setInfoMessage("");
  }

  function closeSignUp() {
    setIsSignUpOpen(false);
  }

  function handleSignUpSuccess(user) {
    onSignUp(user);
    setInfoMessage(
      "✅ Sign-up successful! Now login using your email & password."
    );
    setForm((prev) => ({ ...prev, email: user.email, password: "" }));
    setIsSignUpOpen(false);
  }

  return (
    <div className="authPage">
      <header className="brandHeader">
        <div className="brandLogo">🛒</div>
        <div>
          <h1 className="brandTitle">ShopEZ</h1>
          <p className="brandTag">Frontend-only Ecommerce Demo (React + Vite)</p>
        </div>
      </header>

      <div className="authGrid">
        <section className="card">
          <h2 className="cardTitle">Sign In</h2>

          <form onSubmit={handleSubmit} className="form">
            <label className="label">
              Email
              <input
                className={`input ${errors.email ? "inputError" : ""}`}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="demo@shop.com"
              />
              {errors.email && <span className="errorText">{errors.email}</span>}
            </label>

            <label className="label">
              Password
              <input
                className={`input ${errors.password ? "inputError" : ""}`}
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="demo123"
              />
              {errors.password && (
                <span className="errorText">{errors.password}</span>
              )}
            </label>

            <button className="btnPrimary" type="submit">
              Login
            </button>

            <p className="hint">
              Demo account: <b>demo@shop.com</b> / <b>demo123</b>
            </p>

            {infoMessage && <div className="infoBox">{infoMessage}</div>}
          </form>
        </section>

        <section className="card cardAlt">
          <h2 className="cardTitle">New here?</h2>
          <p className="text">
            Create an account to continue. (No backend — only React state
            validation demo.)
          </p>

          <button className="btnOutline" onClick={openSignUp}>
            Sign Up
          </button>

          <SignUpModal
            isOpen={isSignUpOpen}
            onClose={closeSignUp}
            onSuccess={handleSignUpSuccess}
          />
        </section>
      </div>
    </div>
  );
}
