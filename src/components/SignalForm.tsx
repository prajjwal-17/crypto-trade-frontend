import { useState } from "react";
import { createSignal } from "../api/signalApi";

type Direction = "LONG" | "SHORT";

interface CreateSignalForm {
  asset: string;
  direction: Direction;
  entryPrice: string;
  targetPrice: string;
  stopLoss: string;
}

const SignalForm = ({ refresh }: { refresh: () => void }) => {
  const [form, setForm] = useState<CreateSignalForm>({
    asset: "",
    direction: "LONG",
    entryPrice: "",
    targetPrice: "",
    stopLoss: "",
  });

  const [error, setError] = useState("");

  const validate = () => {
    if (!form.asset.trim()) return "Asset required";
    if (!/^\d+(\.\d+)?$/.test(form.entryPrice))
      return "Invalid entry price";
    if (!/^\d+(\.\d+)?$/.test(form.targetPrice))
      return "Invalid target price";
    if (!/^\d+(\.\d+)?$/.test(form.stopLoss))
      return "Invalid stop loss";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await createSignal(form);

      // Reset form
      setForm({
        asset: "",
        direction: "LONG",
        entryPrice: "",
        targetPrice: "",
        stopLoss: "",
      });

      setError("");
      refresh();
    } catch {
      setError("Creation failed");
    }
  };

  return (
    <>
      <h3>Create Signal</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Asset"
          value={form.asset}
          onChange={(e) =>
            setForm({ ...form, asset: e.target.value })
          }
        />

        <select
          value={form.direction}
          onChange={(e) =>
            setForm({
              ...form,
              direction: e.target.value as Direction,
            })
          }
        >
          <option value="LONG">LONG</option>
          <option value="SHORT">SHORT</option>
        </select>

        <input
          placeholder="Entry Price"
          value={form.entryPrice}
          onChange={(e) =>
            setForm({ ...form, entryPrice: e.target.value })
          }
        />

        <input
          placeholder="Target Price"
          value={form.targetPrice}
          onChange={(e) =>
            setForm({ ...form, targetPrice: e.target.value })
          }
        />

        <input
          placeholder="Stop Loss"
          value={form.stopLoss}
          onChange={(e) =>
            setForm({ ...form, stopLoss: e.target.value })
          }
        />

        <button className="primary" type="submit">
          Create
        </button>
      </form>
    </>
  );
};

export default SignalForm;