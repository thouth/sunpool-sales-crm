import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Leads = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function fetchLeads() {
      const { data, error } = await supabase.from("leads").select("*");
      if (!error) setLeads(data);
    }
    fetchLeads();
  }, []);

  return (
    <div>
      <h1>Leads</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Company</th><th>Status</th><th>kWp</th><th>PPA</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.date}</td>
              <td>{lead.company_name}</td>
              <td>{lead.status}</td>
              <td>{lead.kwp}</td>
              <td>{lead.ppa_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leads;