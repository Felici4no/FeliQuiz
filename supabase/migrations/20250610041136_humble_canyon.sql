/*
  # Update badge values and quiz rewards

  1. Changes
    - Reduce coin rewards for quizzes to prevent inflation
    - Update badge coin values to be more balanced
    - Adjust user starting coins

  2. Security
    - No changes to existing RLS policies
*/

-- Update quiz coin rewards to be more balanced
UPDATE quizzes SET coin_reward = 50 WHERE coin_reward = 100;
UPDATE quizzes SET coin_reward = 75 WHERE coin_reward = 150;

-- Update badge coin values in quiz_results to prevent inflation
UPDATE quiz_results SET coin_value = 100 WHERE coin_value BETWEEN 1000 AND 1100;
UPDATE quiz_results SET coin_value = 80 WHERE coin_value BETWEEN 800 AND 900;
UPDATE quiz_results SET coin_value = 90 WHERE coin_value BETWEEN 900 AND 1000;
UPDATE quiz_results SET coin_value = 95 WHERE coin_value BETWEEN 950 AND 999;
UPDATE quiz_results SET coin_value = 110 WHERE coin_value BETWEEN 1100 AND 1199;
UPDATE quiz_results SET coin_value = 120 WHERE coin_value >= 1200;
UPDATE quiz_results SET coin_value = 150 WHERE coin_value = 1500;

-- Update user starting coins to be more balanced
UPDATE users SET feli_coins = 50 WHERE feli_coins = 500;
UPDATE users SET feli_coins = 250 WHERE feli_coins = 2500;
UPDATE users SET feli_coins = 100 WHERE feli_coins = 1000;

-- Update existing user badges coin values
UPDATE user_badges SET coin_value = 100 WHERE coin_value = 1000;
UPDATE user_badges SET coin_value = 150 WHERE coin_value = 1500;