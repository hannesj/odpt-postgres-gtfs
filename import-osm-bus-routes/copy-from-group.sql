update odpt.busstop_pole bp1
set location = bp2.location
from odpt.busstop_pole bp2 where bp2.location is not null
      and split_part(bp1.id, '.', 1) = split_part(bp2.id, '.', 1)
      and split_part(bp1.id, '.', 2) = split_part(bp2.id, '.', 2)
      and split_part(bp1.id, '.', 3) = split_part(bp2.id, '.', 3)
and bp1.location is null
returning *;