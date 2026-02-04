import { useState } from "react";

export default function SignUpModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successText, setSuccessText] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccessText("");
  }

  function validate(values) {
    const nextErrors = {};

    if (!values.name.trim()) nextErrors.name = "Name is required";
    else if (values.name.trim().length < 3)
      nextErrors.name = "Name must be at least 3 characters";

    if (!values.email.trim()) nextErrors.email = "Email is required";
    else if (!values.email.includes("@"))
      nextErrors.email = "Invalid email format";

    if (!values.password.trim()) nextErrors.password = "Password is required";
    else if (values.password.length < 6)
      nextErrors.password = "Password must be at least 6 characters";

    if (!values.confirmPassword.trim())
      nextErrors.confirmPassword = "Please confirm your password";
    else if (values.confirmPassword !== values.password)
      nextErrors.confirmPassword = "Passwords do not match";

    return nextErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSuccessText("✅ Sign-up successful");

    onSuccess({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
  }

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modalHeader">
          <h3 className="modalTitle">Create Account</h3>
          <button className="iconBtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <label className="label">
            Full Name
            <input
              className={`input ${errors.name ? "inputError" : ""}`}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Arun Kumar"
            />
            {errors.name && <span className="errorText">{errors.name}</span>}
          </label>

          <label className="label">
            Email
            <input
              className={`input ${errors.email ? "inputError" : ""}`}
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="arun@shop.com"
            />
            {errors.email && (
              <span className="errorText">{errors.email}</span>
            )}
          </label>

          <label className="label">
            Password
            <input
              className={`input ${errors.password ? "inputError" : ""}`}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="min 6 chars"
            />
            {errors.password && (
              <span className="errorText">{errors.password}</span>
            )}
          </label>

          <label className="label">
            Confirm Password
            <input
              className={`input ${
                errors.confirmPassword ? "inputError" : ""
              }`}
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="re-enter password"
            />
            {errors.confirmPassword && (
              <span className="errorText">{errors.confirmPassword}</span>
            )}
          </label>

          <button className="btnPrimary" type="submit">
            Sign Up
          </button>

          {successText && <div className="successBox">{successText}</div>}
        </form>

        <p className="hint">
          This is a <b>frontend-only</b> demo. No database or backend.
        </p>
      </div>
    </div>
  );
}