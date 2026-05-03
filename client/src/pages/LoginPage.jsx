import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = ({ onSubmit, loading, error }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await onSubmit({ email, password });
    if (!result.error) {
      navigate("/");
    }
  };

  return (
    <section className="container page auth-page">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h2>Welcome back</h2>
        <p>Login to continue managing your tasks and mood insights.</p>
        {error ? <p className="error-text">{error}</p> : null}
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
