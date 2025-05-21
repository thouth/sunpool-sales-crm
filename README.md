# Sunpool Sales CRM

## Oppstartsguide

1. Opprett leads-tabell i Supabase (se ChatGPT for struktur).
2. Hent ut SUPABASE_URL og SUPABASE_KEY fra Supabase (Settings → API).
3. Lag en `.env`-fil med disse verdiene i prosjektroten.
4. Kjør `pip install -r requirements.txt`
5. Start appen: `streamlit run app.py`
6. Last opp Excel-fil og trykk "Lagre til database"
7. Trykk "Hent alle leads fra database" for å se og oppsummere data.

Deploy til Render:
- Legg SUPABASE_URL og SUPABASE_KEY som miljøvariabler i Render dashboardet.
