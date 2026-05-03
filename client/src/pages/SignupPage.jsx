import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = ({ onSubmit, loading, error }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await onSubmit({ name, email, password });
    if (!result.error) {
      navigate("/");
    }
  };

  return (
    <section className="container page auth-page">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h2>Create account</h2>
        <p>Sign up and keep your tasks, moods, and reports private to your profile.</p>
        {error ? <p className="error-text">{error}</p> : null}
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" required />
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
          minLength={6}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default SignupPage;
