UPDATE
  odpt.busstop_pole
SET
  location = ST_GeomFromText('POINT(' || new_locations.lon || ' ' || new_locations.lat || ')', 4326)
FROM (
  VALUES
    ( 'KantoBus.Ou.10121.1', 35.7247820, 139.5265070),
    ( 'KantoBus.Ou.1251.12', 35.70639,   139.66410),
    ( 'KeioBus.Jizoumae.480.0', 35.6463590, 139.5510578),
    ( 'KeioBus.Shinagawadourikamifuda.486.0', 35.6469537, 139.5477421),
    ( 'KeioBus.Choufuekiiriguchi.786.0', 35.6492346, 139.5432566),
    ( 'KeioBus.Hirutonhoteru.1231.0', 35.69247, 139.69158),
    ( 'KeioBus.Shiminkyuujoumae.498.0', 35.6755443, 139.4750536),
    ( 'KeioBus.Kotobukichou1choume.388.0', 35.6754655, 139.4773659),
    ( 'KeioBus.Dainichuugakkou.684.0', 35.6724840, 139.5100339),
    ('KokusaiKogyoBus.MettsuXa.5205.1', 35.8709027, 139.3327169),
    ('KokusaiKogyoBus.MettsuXa.5205.2', 35.87055, 139.33278),
    ('KokusaiKogyoBus.MettsuXa.5205.10', 35.87049, 139.33299),
    ('KokusaiKogyoBus.HannouEki.5001.1', 35.85099, 139.32014),
    ('KokusaiKogyoBus.HannouEki.5001.2', 35.85084, 139.32032),
    ('KokusaiKogyoBus.HannouEki.5001.3', 35.85080, 139.32052),
    ('KokusaiKogyoBus.HannouEki.5001.10', 35.85080, 139.32052),
    ('KokusaiKogyoBus.HigashihannouEkiHigashiguchi.5175.2', 35.85220, 139.32666),
    ('KokusaiKogyoBus.HigashihannouEkiHigashiguchi.5175.10', 35.85220, 139.32666),
    ('KokusaiKogyoBus.WakouShiEkinanGuchi.62.10', 35.78801, 139.61207),
    ('KokusaiKogyoBus.KamiitabashiEkiMae.226.1', 35.76395, 139.67731),
    ('KokusaiKogyoBus.NiizaEkiMinamiguchi.64.10', 35.80357, 139.55645),
    ('KokusaiKogyoBus.KouhokuRikkyouKa.618.10', 35.77836, 139.76908),
    ('KokusaiKogyoBus.UchiMagiKouen.4829.11', 35.82473, 139.60673),
    ('KokusaiKogyoBus.MinamiKouraiShougakkou.5095.1', 35.8407600, 139.2782642),
    ('KokusaiKogyoBus.MinamiKouraiShougakkou.5095.2', 35.84076, 139.27842),
    ('KokusaiKogyoBus.MinamiKouraiShougakkou.5095.10', 35.8407600, 139.2782642),
    ('KokusaiKogyoBus.NarikiIchiChoumeYonTsuKaku.5094.1', 35.83881, 139.28090),
    ('KokusaiKogyoBus.NarikiIchiChoumeYonTsuKaku.5094.2', 35.83868, 139.28100),
    ('KokusaiKogyoBus.Jouhata.5093.1', 35.83769, 139.28490),
    ('KokusaiKogyoBus.Jouhata.5093.2', 35.83783, 139.28533)
  ) AS new_locations(id, lat, lon) 
WHERE
  busstop_pole.id = new_locations.id
AND
  location is null;



-- KantoBus.Fuku.1236.2	NULL	
-- KantoBus.Ou.1236.1	NULL	
-- KeioBus.Hachimandoori.1115.0	NULL	
-- KeioBus.Hounansuidoudouro.1686.0	NULL	
-- KeioBus.Nishieifuku.1014.0	NULL	
-- KeioBus.Oomiyachou.145.0	NULL	
-- KeioBus.OomiyahachimanIriguchi.146.0	NULL	
-- KeioBus.Pa-kutawa-.1746.1	NULL	
-- KeioBus.Shinjukunishiguchierutawa-.1770.1	NULL