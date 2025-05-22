import React from "react";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import ImportData from "./pages/ImportData";

const [page, setPage] = React.useState("dashboard");

function App() {
  return (
    <div className="app">
      <nav>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("leads")}>Leads</button>
        <button onClick={() => setPage("import")}>Import Data</button>
      </nav>
      {page === "dashboard" && <Dashboard />}
      {page === "leads" && <Leads />}
      {page === "import" && <ImportData />}
    </div>
  );
}

export default App;