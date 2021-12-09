update odpt.busstop_pole
set location = public.ST_GeomFromText('POINT(' || updates.lon || ' ' || updates.lat || ')', 4326)
from (
         SELECT t.name, t.code, t.destination, t.origin, brp.title, bpo.*, sp.*, bp.*
         FROM osm_transit.route t
                  inner join osm_transit.route_point rp on t.route_id = rp.route_id
                  inner join osm_transit.stop_point sp on sp.stop_point_id = rp.stop_id
                  inner join odpt.busroute_pattern brp on brp.operator = 'Kanachu'
             and brp.title ILIKE t.code || ' %' || t.destination || '%'
                  inner join odpt.busstop_pole_order bpo on brp.id = bpo.busroute_pattern
                  inner join odpt.busstop_pole bp on bp.id = bpo.busstop_pole and sp.name = bp.title
         WHERE (t.operator LIKE '%神奈川中%' or network LIKE '%神奈川中%')
           and location is null
         ORDER BY busroute_pattern, i
     ) as updates
where busstop_pole.id = updates.id
  and busstop_pole.location is null
returning *