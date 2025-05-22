import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, avgKwp: 0, avgPpa: 0 });

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("leads").select("*");
      if (!error) {
        const total = data.length;
        const avgKwp = data.reduce((acc, l) => acc + l.kwp, 0) / total;
        const avgPpa = data.reduce((acc, l) => acc + l.ppa_price, 0) / total;
        setStats({ total, avgKwp, avgPpa });
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total leads: {stats.total}</p>
      <p>Average kWp: {stats.avgKwp.toFixed(2)}</p>
      <p>Average PPA price: {stats.avgPpa.toFixed(2)}</p>
    </div>
  );
};

export default Dashboard;
