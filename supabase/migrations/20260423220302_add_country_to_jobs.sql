/*
  # Add country column to jobs table

  1. Modified Tables
    - `jobs`
      - Added `country` (text) column with default 'United States'
      - Stores the country where the job is located

  2. Security
    - No RLS changes needed, existing policies cover the new column

  3. Important Notes
    - Used IF NOT EXISTS check to prevent errors on re-run
    - Backfilled existing rows with 'United States' as default
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'country'
  ) THEN
    ALTER TABLE jobs ADD COLUMN country text NOT NULL DEFAULT 'United States';
  END IF;
END $$;
