-- Seed topics and subtopics data

INSERT INTO topics (name) VALUES 
  ('Movies'),
  ('TV Shows'),
  ('Animation'),
  ('Books'),
  ('Games')
ON CONFLICT (name) DO NOTHING;

-- Get topic IDs for subtopics
DO $$
DECLARE
  movies_id UUID;
  tv_shows_id UUID;
  animation_id UUID;
  books_id UUID;
  games_id UUID;
BEGIN
  SELECT id INTO movies_id FROM topics WHERE name = 'Movies';
  SELECT id INTO tv_shows_id FROM topics WHERE name = 'TV Shows';
  SELECT id INTO animation_id FROM topics WHERE name = 'Animation';
  SELECT id INTO books_id FROM topics WHERE name = 'Books';
  SELECT id INTO games_id FROM topics WHERE name = 'Games';

  -- Movies subtopics
  INSERT INTO subtopics (topic_id, name) VALUES 
    (movies_id, 'Fantasy'),
    (movies_id, 'Sci-Fi'),
    (movies_id, 'Superheroes'),
    (movies_id, 'Comedy'),
    (movies_id, 'Drama')
  ON CONFLICT (topic_id, name) DO NOTHING;

  -- TV Shows subtopics
  INSERT INTO subtopics (topic_id, name) VALUES 
    (tv_shows_id, 'Sitcoms'),
    (tv_shows_id, 'Drama'),
    (tv_shows_id, 'Fantasy'),
    (tv_shows_id, 'Reality')
  ON CONFLICT (topic_id, name) DO NOTHING;

  -- Animation subtopics
  INSERT INTO subtopics (topic_id, name) VALUES 
    (animation_id, 'Anime'),
    (animation_id, 'Cartoons'),
    (animation_id, 'Disney'),
    (animation_id, 'Pixar')
  ON CONFLICT (topic_id, name) DO NOTHING;

  -- Books subtopics
  INSERT INTO subtopics (topic_id, name) VALUES 
    (books_id, 'Fantasy'),
    (books_id, 'Science Fiction'),
    (books_id, 'Mystery'),
    (books_id, 'Young Adult')
  ON CONFLICT (topic_id, name) DO NOTHING;

  -- Games subtopics
  INSERT INTO subtopics (topic_id, name) VALUES 
    (games_id, 'RPG'),
    (games_id, 'FPS'),
    (games_id, 'Strategy'),
    (games_id, 'Adventure')
  ON CONFLICT (topic_id, name) DO NOTHING;
END $$;