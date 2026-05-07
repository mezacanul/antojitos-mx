-- =============================================
-- Create likes schema + permissions (for postgres user)
-- =============================================

CREATE SCHEMA IF NOT EXISTS likes;

-- Grant usage
GRANT USAGE ON SCHEMA likes 
  TO anon, authenticated, service_role;

-- Grants on existing objects
GRANT ALL ON ALL TABLES IN SCHEMA likes 
  TO anon, authenticated, service_role;

GRANT ALL ON ALL SEQUENCES IN SCHEMA likes 
  TO anon, authenticated, service_role;

GRANT ALL ON ALL ROUTINES IN SCHEMA likes 
  TO anon, authenticated, service_role;

-- Default privileges (this is the critical part)
ALTER DEFAULT PRIVILEGES IN SCHEMA likes 
  GRANT ALL ON TABLES TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA likes 
  GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA likes 
  GRANT ALL ON ROUTINES TO anon, authenticated, service_role;