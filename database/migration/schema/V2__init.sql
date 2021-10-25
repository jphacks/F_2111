CREATE TABLE IF NOT EXISTS `photos`
(
    `id`          CHAR(36) NOT NULL,
    `url`         TEXT NOT NULL,
    `title`       TEXT NOT NULL,
    `description` TEXT,
    `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
