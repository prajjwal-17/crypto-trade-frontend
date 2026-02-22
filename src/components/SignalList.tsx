import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { deleteSignal } from "../api/SignalApi";

interface Signal {
  id: string;
  asset: string;
  direction: string;
  entryPrice: string;
  targetPrice: string;
  stopLoss: string;
  status: string;
  userId: string;
}

interface Props {
  signals: Signal[];
  refresh: () => void;
}

const SignalList = ({ signals, refresh }: Props) => {
  const { user } = useAuth();

  if (!Array.isArray(signals)) {
    return <div>No signals available</div>;
  }

  const handleDelete = async (id: string) => {
  if (!window.confirm("Are you sure you want to delete this signal?"))
    return;

  try {
    await deleteSignal(id);
    refresh();
  } catch {
    alert("Delete failed");
  }
};

  const handleClose = async (id: string) => {
    try {
      await api.put(`/signals/${id}`, {
        status: "CLOSED",
      });
      refresh();
    } catch (err) {
      console.error("Close failed", err);
    }
  };

  return (
    <div>
      <h3>Signals</h3>

      {signals.map((s) => {
        const canModify =
          user?.role === "ADMIN" || user?.userId === s.userId;

        return (
          <div key={s.id}>
            <p>
              <strong>{s.asset}</strong> - {s.direction}
            </p>
            <p>Entry: {s.entryPrice}</p>
            <p>Target: {s.targetPrice}</p>
            <p>Stop: {s.stopLoss}</p>
            <p>Status: {s.status}</p>

            {canModify && (
              <>
                {s.status === "OPEN" && (
                  <button onClick={() => handleClose(s.id)}>
                    Close
                  </button>
                )}
                <button onClick={() => handleDelete(s.id)}>
                  Delete
                </button>
              </>
            )}

            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default SignalList;