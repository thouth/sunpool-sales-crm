import streamlit as st
import pandas as pd
from supabase_client import get_supabase_client

st.set_page_config(page_title="Sunpool Sales CRM", layout="wide")
st.title("Sunpool Sales CRM")

uploaded_file = st.file_uploader("Last opp Excel-fil med leads", type=["xlsx", "xls"])

if uploaded_file:
    df = pd.read_excel(uploaded_file)
    df.columns = [
        "dato", "firmanavn", "orgnr", "status", "kanal",
        "ansvarlig_selger", "arsak_avslag", "eksisterende_kunde",
        "kwp", "ppa_pris"
    ]

    st.write("Innhold i opplastet fil:")
    st.dataframe(df)

    if st.button("Lagre til database (Supabase)"):
        supabase = get_supabase_client()

        # Konverter dato til ISO-format
        if "dato" in df.columns:
            df["dato"] = pd.to_datetime(df["dato"], errors="coerce").dt.strftime('%Y-%m-%dT%H:%M:%S')

        # Fjern ugyldige float-verdier og NaN
        for col in df.columns:
            df[col] = df[col].apply(
                lambda x: None if pd.isna(x) or x in [float("inf"), float("-inf")] else x
            )

        # Konverter hver rad til JSON-vennlig dict
        def clean_json(row):
            clean = {}
            for k, v in row.items():
                if isinstance(v, (float, int, str)) or v is None:
                    clean[k] = v
                else:
                    clean[k] = str(v)
            return clean

        data_dicts = [clean_json(row) for _, row in df.iterrows()]

        # Prøv å sende til Supabase
        try:
            response = supabase.table("leads").insert(data_dicts).execute()
            if hasattr(response, "data") and response.data:
                st.success("Data lagret i Supabase!")
            else:
                st.error(f"Feil: {getattr(response, 'error', response)}")
        except Exception as e:
            st.error(f"Feil ved lagring: {str(e)}")

# --- Hent eksisterende data fra Supabase ---
if st.button("Hent alle leads fra database"):
    supabase = get_supabase_client()
    res = supabase.table("leads").select("*").execute()

    if hasattr(res, "data") and res.data:
        db_df = pd.DataFrame(res.data)
        st.write("Leads i database:")
        st.dataframe(db_df)

        st.metric("Antall leads", len(db_df))
        if "kwp" in db_df.columns:
            st.metric("Total kWp", db_df["kwp"].sum(skipna=True))
        if "ppa_pris" in db_df.columns:
            st.metric("Snitt PPA-pris", db_df["ppa_pris"].mean(skipna=True))
    else:
        st.info("Ingen data funnet.")
