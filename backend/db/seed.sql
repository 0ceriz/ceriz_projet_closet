BEGIN;

-- Insert sample users
INSERT INTO app_user (pseudo, email, password_hash, picture_url)
VALUES
    ('john_doe', 'john@example.com', 'hashed_password_1', 'http://example.com/users/john.jpg'),
    ('jane_doe', 'jane@example.com', 'hashed_password_2', 'http://example.com/users/jane.jpg')
ON CONFLICT (email) DO NOTHING;

-- Insert sample closets
INSERT INTO closet (user_id, name, description)
VALUES
    ((SELECT id FROM app_user WHERE email = 'john@example.com'), 'Main Closet', 'Default closet for John'),
    ((SELECT id FROM app_user WHERE email = 'jane@example.com'), 'Main Closet', 'Default closet for Jane')
ON CONFLICT (user_id, name) DO NOTHING;

-- Insert sample categories
INSERT INTO clothing_category (name)
VALUES
    ('top'),
    ('bottom'),
    ('shoes'),
    ('accessory')
ON CONFLICT (name) DO NOTHING;

-- Insert sample tags
INSERT INTO tag (user_id, name)
VALUES
    ((SELECT id FROM app_user WHERE email = 'john@example.com'), 'casual'),
    ((SELECT id FROM app_user WHERE email = 'john@example.com'), 'weekend'),
    ((SELECT id FROM app_user WHERE email = 'jane@example.com'), 'office'),
    ((SELECT id FROM app_user WHERE email = 'jane@example.com'), 'elegant')
ON CONFLICT (user_id, name) DO NOTHING;

-- Insert sample clothing items
INSERT INTO clothing_item (
    closet_id,
    category_id,
    name,
    subcategory,
    color,
    is_favorite,
    comment
)
VALUES
(
    (SELECT c.id FROM closet c JOIN app_user u ON c.user_id = u.id WHERE u.email = 'john@example.com' AND c.name = 'Main Closet'),
    (SELECT id FROM clothing_category WHERE name = 'top'),
    'Graphic T-Shirt',
    't-shirt',
    'blue',
    TRUE,
    'Love this shirt!'
),
(
    (SELECT c.id FROM closet c JOIN app_user u ON c.user_id = u.id WHERE u.email = 'john@example.com' AND c.name = 'Main Closet'),
    (SELECT id FROM clothing_category WHERE name = 'bottom'),
    'Slim Fit Jeans',
    'jeans',
    'black',
    FALSE,
    NULL
),
(
    (SELECT c.id FROM closet c JOIN app_user u ON c.user_id = u.id WHERE u.email = 'jane@example.com' AND c.name = 'Main Closet'),
    (SELECT id FROM clothing_category WHERE name = 'top'),
    'White Blouse',
    'blouse',
    'white',
    TRUE,
    'Perfect for work!'
),
(
    (SELECT c.id FROM closet c JOIN app_user u ON c.user_id = u.id WHERE u.email = 'jane@example.com' AND c.name = 'Main Closet'),
    (SELECT id FROM clothing_category WHERE name = 'shoes'),
    'Black Heels',
    'heels',
    'black',
    FALSE,
    NULL
);

-- Insert sample outfits
INSERT INTO outfit (user_id, name, comment)
VALUES
(
    (SELECT id FROM app_user WHERE email = 'john@example.com'),
    'Casual Friday',
    'My go-to outfit for casual Fridays.'
),
(
    (SELECT id FROM app_user WHERE email = 'jane@example.com'),
    'Office Chic',
    'A polished outfit for work.'
);

-- Insert sample outfit items
INSERT INTO outfit_item (outfit_id, clothing_item_id)
VALUES
(
    (SELECT o.id FROM outfit o JOIN app_user u ON o.user_id = u.id WHERE o.name = 'Casual Friday' AND u.email = 'john@example.com'),
    (SELECT ci.id FROM clothing_item ci JOIN closet c ON ci.closet_id = c.id JOIN app_user u ON c.user_id = u.id WHERE ci.name = 'Graphic T-Shirt' AND u.email = 'john@example.com')
),
(
    (SELECT o.id FROM outfit o JOIN app_user u ON o.user_id = u.id WHERE o.name = 'Casual Friday' AND u.email = 'john@example.com'),
    (SELECT ci.id FROM clothing_item ci JOIN closet c ON ci.closet_id = c.id JOIN app_user u ON c.user_id = u.id WHERE ci.name = 'Slim Fit Jeans' AND u.email = 'john@example.com')
),
(
    (SELECT o.id FROM outfit o JOIN app_user u ON o.user_id = u.id WHERE o.name = 'Office Chic' AND u.email = 'jane@example.com'),
    (SELECT ci.id FROM clothing_item ci JOIN closet c ON ci.closet_id = c.id JOIN app_user u ON c.user_id = u.id WHERE ci.name = 'White Blouse' AND u.email = 'jane@example.com')
),
(
    (SELECT o.id FROM outfit o JOIN app_user u ON o.user_id = u.id WHERE o.name = 'Office Chic' AND u.email = 'jane@example.com'),
    (SELECT ci.id FROM clothing_item ci JOIN closet c ON ci.closet_id = c.id JOIN app_user u ON c.user_id = u.id WHERE ci.name = 'Black Heels' AND u.email = 'jane@example.com')
);

-- Insert sample tags for clothing items
INSERT INTO clothing_item_tag (clothing_item_id, tag_id)
VALUES
(
    (SELECT ci.id FROM clothing_item ci JOIN closet c ON ci.closet_id = c.id JOIN app_user u ON c.user_id = u.id WHERE ci.name = 'Graphic T-Shirt' AND u.email = 'john@example.com'),
    (SELECT t.id FROM tag t JOIN app_user u ON t.user_id = u.id WHERE t.name = 'casual' AND u.email = 'john@example.com')
),
(
    (SELECT ci.id FROM clothing_item ci JOIN closet c ON ci.closet_id = c.id JOIN app_user u ON c.user_id = u.id WHERE ci.name = 'Slim Fit Jeans' AND u.email = 'john@example.com'),
    (SELECT t.id FROM tag t JOIN app_user u ON t.user_id = u.id WHERE t.name = 'weekend' AND u.email = 'john@example.com')
),
(
    (SELECT ci.id FROM clothing_item ci JOIN closet c ON ci.closet_id = c.id JOIN app_user u ON c.user_id = u.id WHERE ci.name = 'White Blouse' AND u.email = 'jane@example.com'),
    (SELECT t.id FROM tag t JOIN app_user u ON t.user_id = u.id WHERE t.name = 'office' AND u.email = 'jane@example.com')
),
(
    (SELECT ci.id FROM clothing_item ci JOIN closet c ON ci.closet_id = c.id JOIN app_user u ON c.user_id = u.id WHERE ci.name = 'Black Heels' AND u.email = 'jane@example.com'),
    (SELECT t.id FROM tag t JOIN app_user u ON t.user_id = u.id WHERE t.name = 'elegant' AND u.email = 'jane@example.com')
);

-- Insert sample tags for outfits
INSERT INTO outfit_tag (outfit_id, tag_id)
VALUES
(
    (SELECT o.id FROM outfit o JOIN app_user u ON o.user_id = u.id WHERE o.name = 'Casual Friday' AND u.email = 'john@example.com'),
    (SELECT t.id FROM tag t JOIN app_user u ON t.user_id = u.id WHERE t.name = 'casual' AND u.email = 'john@example.com')
),
(
    (SELECT o.id FROM outfit o JOIN app_user u ON o.user_id = u.id WHERE o.name = 'Office Chic' AND u.email = 'jane@example.com'),
    (SELECT t.id FROM tag t JOIN app_user u ON t.user_id = u.id WHERE t.name = 'office' AND u.email = 'jane@example.com')
);

-- Insert sample pictures for clothing items and outfits
INSERT INTO clothing_picture (clothing_item_id, url, alt_text, is_cover)
VALUES
(
    (SELECT id FROM clothing_item WHERE name = 'Graphic T-Shirt'),
    'http://example.com/clothes/graphic-tshirt-front.jpg',
    'Front view of a blue graphic t-shirt',
    TRUE
),
(
    (SELECT id FROM clothing_item WHERE name = 'Graphic T-Shirt'),
    'http://example.com/clothes/graphic-tshirt-back.jpg',
    'Back view of a blue graphic t-shirt',
    FALSE
),
(
    (SELECT id FROM clothing_item WHERE name = 'Slim Fit Jeans'),
    'http://example.com/clothes/slim-fit-jeans.jpg',
    'Black slim fit jeans',
    TRUE
),
(
    (SELECT id FROM clothing_item WHERE name = 'White Blouse'),
    'http://example.com/clothes/white-blouse.jpg',
    'White blouse',
    TRUE
),
(
    (SELECT id FROM clothing_item WHERE name = 'Black Heels'),
    'http://example.com/clothes/black-heels.jpg',
    'Black heels',
    TRUE
);

INSERT INTO outfit_picture (outfit_id, url, alt_text, is_cover)
VALUES
(
    (SELECT id FROM outfit WHERE name = 'Casual Friday'),
    'http://example.com/outfits/casual-friday.jpg',
    'Casual Friday outfit',
    TRUE
),
(
    (SELECT id FROM outfit WHERE name = 'Office Chic'),
    'http://example.com/outfits/office-chic.jpg',
    'Office Chic outfit',
    TRUE
);

COMMIT;