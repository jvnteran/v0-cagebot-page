-- Manually add existing user to the users table
-- Replace 'your-email@example.com' with your actual email address
INSERT INTO users (username, email, created_at)
VALUES ('jvnteran', 'jvnteran@gmail.com', NOW())
ON CONFLICT (username) DO NOTHING;
