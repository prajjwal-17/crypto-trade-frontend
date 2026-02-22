import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchSignals } from "../api/SignalApi";
import type { Signal } from "../api/types";
import SignalForm from "../components/SignalForm";
import SignalList from "../components/SignalList";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [signals, setSignals] = useState<Signal[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const load = async () => {
    try {
      setError("");
      const data = await fetchSignals(user?.role === "ADMIN");
      setSignals(data);
    } catch {
      setError("Failed to load signals");
    }
  };

  useEffect(() => {
    load();
  }, [user]);

  const paginated = signals.slice((page - 1) * 5, page * 5);
  const totalPages = Math.ceil(signals.length / 5);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
  <div className="sidebar-top">
    <h2>Crypto Signals</h2>
    <span className="role-badge">
      {"Role - ("+(user?.role)+")"}
    </span>
  </div>

  <button onClick={logout}>Logout</button>
</div>

      <div className="main">
        <div className="card">
          <SignalForm refresh={load} />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="card">
          <SignalList signals={paginated} refresh={load} />
          <div>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className="secondary"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;