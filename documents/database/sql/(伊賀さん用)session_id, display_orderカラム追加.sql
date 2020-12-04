ALTER TABLE reasons ADD COLUMN session_id text;
ALTER TABLE examples ADD COLUMN session_id text;
ALTER TABLE examples ADD COLUMN display_order integer;
ALTER TABLE reasons ADD COLUMN display_order integer;
ALTER TABLE first_hierarchies ADD COLUMN display_order integer;
ALTER TABLE second_hierarchies ADD COLUMN display_order integer;
ALTER TABLE third_hierarchies ADD COLUMN display_order integer;
ALTER TABLE pyramids ADD COLUMN session_id text;