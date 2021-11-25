UPDATE
  odpt.busstop_pole
SET
  location = ST_GeomFromText('POINT(' || new_locations.lon || ' ' || new_locations.lat || ')', 4326)
FROM (
  VALUES
    ( 'KantoBus.Ou.10121.1', 35.7247820, 139.5265070),
    ( 'KantoBus.Ou.1251.12', 35.70639,   139.66410),
    ( 'KeioBus.Choufuekiiriguchi.786.0', 35.6492346, 139.5432566),
    ( 'KeioBus.Dainichuugakkou.684.0', 35.6724840, 139.5100339),
    ( 'KeioBus.Hirutonhoteru.1231.0', 35.69247, 139.69158),
    ( 'KeioBus.Jizoumae.480.0', 35.6463590, 139.5510578),
    ( 'KeioBus.Kotobukichou1choume.388.0', 35.6754655, 139.4773659),
    ( 'KeioBus.Shiminkyuujoumae.498.0', 35.6755443, 139.4750536),
    ( 'KeioBus.Shinagawadourikamifuda.486.0', 35.6469537, 139.5477421),
    ('KokusaiKogyoBus.MettsuXa.5205.1', 35.8709027, 139.3327169),
    ('KokusaiKogyoBus.MettsuXa.5205.2', 35.87055, 139.33278),
    ('KokusaiKogyoBus.MettsuXa.5205.10', 35.87049, 139.33299),
    ('KokusaiKogyoBus.KouhokuRikkyouKa.618.10', 35.77836, 139.76908),
    ('KokusaiKogyoBus.UchiMagiKouen.4829.11', 35.82473, 139.60673),
    ('KokusaiKogyoBus.MinamiKouraiShougakkou.5095.10', 35.8407600, 139.2782642)
  ) AS new_locations(id, lat, lon) 
WHERE
  busstop_pole.id = new_locations.id
AND
  location is null;

