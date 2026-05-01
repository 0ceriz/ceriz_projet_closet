BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS outfit_tag;
DROP TABLE IF EXISTS clothing_item_tag;
DROP TABLE IF EXISTS outfit_item;
DROP TABLE IF EXISTS outfit_picture;
DROP TABLE IF EXISTS clothing_picture;
DROP TABLE IF EXISTS outfit;
DROP TABLE IF EXISTS clothing_item;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS closet;
DROP TABLE IF EXISTS clothing_category;
DROP TABLE IF EXISTS app_user;

CREATE TABLE app_user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pseudo VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    picture_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE closet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ,

    CONSTRAINT fk_closet_user_id
        FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE,
    CONSTRAINT unique_closet_name_per_user
        UNIQUE (user_id, name)
);

CREATE TABLE clothing_category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE tag (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ,

    CONSTRAINT fk_tag_user_id
        FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE,
    CONSTRAINT unique_tag_name_per_user
        UNIQUE (user_id, name)
);

CREATE TABLE clothing_item (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    closet_id UUID NOT NULL,
    category_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    subcategory VARCHAR(255),
    color VARCHAR(255),
    is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ,

    CONSTRAINT fk_clothing_item_closet_id
        FOREIGN KEY (closet_id) REFERENCES closet (id) ON DELETE CASCADE,
    CONSTRAINT fk_clothing_item_category_id
        FOREIGN KEY (category_id) REFERENCES clothing_category (id) ON DELETE RESTRICT
);

CREATE TABLE outfit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ,

    CONSTRAINT fk_outfit_user_id
        FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE
);

CREATE TABLE clothing_picture (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clothing_item_id UUID NOT NULL,
    url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    is_cover BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ,

    CONSTRAINT fk_clothing_picture_clothing_item_id
        FOREIGN KEY (clothing_item_id) REFERENCES clothing_item (id) ON DELETE CASCADE
);

CREATE TABLE outfit_picture (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    outfit_id UUID NOT NULL,
    url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    is_cover BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ,

    CONSTRAINT fk_outfit_picture_outfit_id
        FOREIGN KEY (outfit_id) REFERENCES outfit (id) ON DELETE CASCADE
);

CREATE TABLE outfit_item (
    outfit_id UUID NOT NULL,
    clothing_item_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT pk_outfit_item
        PRIMARY KEY (outfit_id, clothing_item_id),
    CONSTRAINT fk_outfit_item_outfit_id
        FOREIGN KEY (outfit_id) REFERENCES outfit (id) ON DELETE CASCADE,
    CONSTRAINT fk_outfit_item_clothing_item_id
        FOREIGN KEY (clothing_item_id) REFERENCES clothing_item (id) ON DELETE CASCADE
);

CREATE TABLE clothing_item_tag (
    clothing_item_id UUID NOT NULL,
    tag_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT pk_clothing_item_tag
        PRIMARY KEY (clothing_item_id, tag_id),
    CONSTRAINT fk_clothing_item_tag_clothing_item_id
        FOREIGN KEY (clothing_item_id) REFERENCES clothing_item (id) ON DELETE CASCADE,
    CONSTRAINT fk_clothing_item_tag_tag_id
        FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE
);

CREATE TABLE outfit_tag (
    outfit_id UUID NOT NULL,
    tag_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT pk_outfit_tag
        PRIMARY KEY (outfit_id, tag_id),
    CONSTRAINT fk_outfit_tag_outfit_id
        FOREIGN KEY (outfit_id) REFERENCES outfit (id) ON DELETE CASCADE,
    CONSTRAINT fk_outfit_tag_tag_id
        FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE
);

CREATE INDEX idx_closet_user_id ON closet (user_id);
CREATE INDEX idx_clothing_item_closet_id ON clothing_item (closet_id);
CREATE INDEX idx_clothing_item_category_id ON clothing_item (category_id);
CREATE INDEX idx_outfit_user_id ON outfit (user_id);
CREATE INDEX idx_tag_user_id ON tag(user_id);

COMMIT;