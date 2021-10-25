ALTER TABLE photos ADD `make` TEXT;
ALTER TABLE photos ADD `model` TEXT;
ALTER TABLE photos ADD `flash` INT UNSIGNED;

-- 実焦点距離，単位(mm)
ALTER TABLE photos ADD `focal_length` DECIMAL(7,2);

-- TODO PhotographicSensitivity がexifでの項目名
ALTER TABLE photos ADD `iso_speed_ratings` INT UNSIGNED;

-- APEX値
ALTER TABLE photos ADD `shutter_speed_value`   DECIMAL(21, 15);

-- TODO GPSだと思うのでprefixに`gps_`をつけても良いかも？
ALTER TABLE photos ADD `latitude`   DECIMAL(10, 7);
ALTER TABLE photos ADD `longitude`   DECIMAL(10, 7);
ALTER TABLE photos ADD `altitude`   INT UNSIGNED;

ALTER TABLE photos ADD `gps_img_direction_ref`   CHAR(1);
-- TODO INTで良いんですっけ？小数？
ALTER TABLE photos ADD `gps_img_direction`     INT;
ALTER TABLE photos ADD `exif_timestamp`     TIMESTAMP;
