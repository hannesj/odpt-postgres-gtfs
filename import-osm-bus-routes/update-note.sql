UPDATE odpt.busroute_pattern SET note = translate(note,
    '　０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
    ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
);

UPDATE odpt.busroute_pattern SET title = translate(title,
    '　０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
    ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
);
