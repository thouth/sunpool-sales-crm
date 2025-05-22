import React from "react";
import * as XLSX from "xlsx";
import { supabase } from "../supabaseClient";

const ImportData = () => {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const leads = XLSX.utils.sheet_to_json(worksheet);

    for (const lead of leads) {
      await supabase.from("leads").insert([{
        company_name: lead["company_name"],
        org_number: lead["org_number"],
        status: lead["status"],
        channel: lead["channel"],
        sales_rep: lead["sales_rep"],
        rejection_reason: lead["rejection_reason"],
        existing_customer: lead["existing_customer"] === "Ja",
        kwp: parseFloat(lead["kwp"]),
        ppa_price: parseFloat(lead["ppa_price"]),
        date: lead["date"]
      }]);
    }

    alert("Upload complete");
  };

  return (
    <div>
      <h1>Import Excel</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
    </div>
  );
};

export default ImportData;