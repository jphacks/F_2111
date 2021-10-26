-- メーカー名
ALTER TABLE photos ADD `make` TEXT;
-- 画像入力機器のモデル名(ex: Canon EOS Kiss X9i)
ALTER TABLE photos ADD `model` TEXT;
-- レンズのモデル
ALTER TABLE photos ADD `lens_model` TEXT;
-- F値
ALTER TABLE photos ADD `fnumber` FLOAT;
-- フラッシュ
ALTER TABLE photos ADD `flash` INT UNSIGNED;

-- 実焦点距離，単位(mm)
ALTER TABLE photos ADD `focal_length` DECIMAL(7,2);

-- ISO感度などが入る
ALTER TABLE photos ADD `photo_graphic_sensitivity` INT UNSIGNED;

-- 露出(露光)補正値
ALTER TALBE photos ADD `exposure_bias_value` DECIMAL(10, 7);

-- APEX値
ALTER TABLE photos ADD `shutter_speed_value`   DECIMAL(21, 15);

-- 0=自動 1=マニュアル その他=予約
ALTER TABLE photos ADD `white_balance` INT;

-- 緯度
ALTER TABLE photos ADD `gps_latitude`   DECIMAL(10, 7);
-- 経度
ALTER TABLE photos ADD `gps_longitude`   DECIMAL(10, 7);
-- 高度
ALTER TABLE photos ADD `gps_altitude`   INT UNSIGNED;

-- T=真方位 M=磁気方位
ALTER TABLE photos ADD `gps_img_direction_ref`   CHAR(1);
-- 方向
ALTER TABLE photos ADD `gps_img_direction`     DECIMAL(10, 7);

-- 撮影時刻
ALTER TABLE photos ADD `datetime_original`     DATETIME;

-- TODO 編集アプリも気にするなら softwareも取得する