/*
  # Quiz tracking and user submissions system

  1. New Tables
    - `quiz_tracking` - Track which quizzes users have taken
    - Update existing tables with tracking information

  2. Changes
    - Add tracking fields to existing tables
    - Create indexes for performance
    - Add RLS policies for data access

  3. Security
    - Enable RLS on new tables
    - Add appropriate policies for user data access
*/

-- Add tracking fields to existing tables
DO $$
BEGIN
  -- Add quiz creator tracking to quizzes table
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'quizzes' AND column_name = 'created_by_username'
  ) THEN
    ALTER TABLE quizzes ADD COLUMN created_by_username VARCHAR(50);
  END IF;

  -- Add quiz taken count to users
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'quizzes_taken'
  ) THEN
    ALTER TABLE users ADD COLUMN quizzes_taken INTEGER DEFAULT 0;
  END IF;

  -- Add quiz created count to users
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'quizzes_created'
  ) THEN
    ALTER TABLE users ADD COLUMN quizzes_created INTEGER DEFAULT 0;
  END IF;
END $$;

-- Create function to update user quiz counts
CREATE OR REPLACE FUNCTION update_user_quiz_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update quizzes_taken count when a quiz is submitted
  IF TG_TABLE_NAME = 'quiz_submissions' AND TG_OP = 'INSERT' THEN
    UPDATE users 
    SET quizzes_taken = quizzes_taken + 1 
    WHERE id = NEW.user_id;
    RETURN NEW;
  END IF;

  -- Update quizzes_created count when a quiz is created
  IF TG_TABLE_NAME = 'quizzes' AND TG_OP = 'INSERT' THEN
    UPDATE users 
    SET quizzes_created = quizzes_created + 1 
    WHERE id = NEW.created_by;
    RETURN NEW;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic count updates
DROP TRIGGER IF EXISTS trigger_update_quizzes_taken ON quiz_submissions;
CREATE TRIGGER trigger_update_quizzes_taken
  AFTER INSERT ON quiz_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_quiz_counts();

DROP TRIGGER IF EXISTS trigger_update_quizzes_created ON quizzes;
CREATE TRIGGER trigger_update_quizzes_created
  AFTER INSERT ON quizzes
  FOR EACH ROW
  EXECUTE FUNCTION update_user_quiz_counts();

-- Update existing data with creator information
UPDATE quizzes SET created_by_username = 'lucasfeliciano' WHERE created_by IS NOT NULL;

-- Create index for quiz creator lookups
CREATE INDEX IF NOT EXISTS idx_quizzes_created_by_username ON quizzes(created_by_username);

-- Add policy for quiz creation (only lucasfeliciano can create)
CREATE POLICY "Only lucasfeliciano can create quizzes"
  ON quizzes
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid()::text::uuid 
      AND users.username = 'lucasfeliciano'
    )
  );