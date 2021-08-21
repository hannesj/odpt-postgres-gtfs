export const finalConnections: Record<string, Record<string, Record<string, string | null>>> = {
  "Keikyu.Airport.KeikyuKamata": {
    "Keikyu.AirportExpress": {
      "Hokuso.Hokuso.ImbaNihonIdai": "Keikyu.Main.KeikyuKamata",
      "Keikyu.Main.KanagawaShimmachi": "Keikyu.Main.KeikyuKamata",
      "Keikyu.Main.KanazawaBunko": "Keikyu.Main.KeikyuKamata",
      "Keikyu.Main.KeikyuKawasaki": "Keikyu.Main.KeikyuKamata",
      "Keikyu.Main.Sengakuji": "Keikyu.Main.KeikyuKamata",
      "Keikyu.Main.Shinagawa": "Keikyu.Main.KeikyuKamata",
      "Keikyu.Zushi.ZushiHayama": "Keikyu.Main.KeikyuKamata",
      "Keisei.Main.KeiseiTakasago": "Keikyu.Main.KeikyuKamata",
      "Keisei.Main.NaritaAirportTerminal1": "Keikyu.Main.KeikyuKamata",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Main.KeikyuKamata",
      "Keisei.Oshiage.Aoto": "Keikyu.Main.KeikyuKamata",
      "Hokuso.Hokuso.InzaiMakinohara": "Keikyu.Main.KeikyuKamata",
      "Keisei.Main.KeiseiNarita": "Keikyu.Main.KeikyuKamata",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keikyu.Main.KeikyuKamata",
      "Toei.Asakusa.Oshiage": "Keikyu.Main.KeikyuKamata",
    },
    "Keikyu.LimitedExpress": {
      "Keikyu.Zushi.ZushiHayama": "Keikyu.Main.KeikyuKamata",
    },
    "Keikyu.RapidLimitedExpress": {
      "Hokuso.Hokuso.ImbaNihonIdai": "Keikyu.Main.KeikyuKamata",
      "Hokuso.Hokuso.InzaiMakinohara": "Keikyu.Main.KeikyuKamata",
    }
  },
  "Keikyu.Main.Shinagawa": {
    "Keikyu.AirportRapidLimitedExpress": {
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Main.Shinagawa",
      "Keisei.Oshiage.Aoto": "Keikyu.Main.Shinagawa",
      "Keisei.Main.NaritaAirportTerminal1": "Keikyu.Main.Shinagawa",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keikyu.Main.Shinagawa"
    }
  },
  "Keikyu.Kurihama.Horinouchi": {
    "Keikyu.LimitedExpress": {
      "Hokuso.Hokuso.ImbaNihonIdai": "Keikyu.Main.Horinouchi",
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Main.Horinouchi",
      "Keikyu.Main.KanagawaShimmachi": "Keikyu.Main.Horinouchi",
      "Keikyu.Main.Sengakuji": "Keikyu.Main.Horinouchi",
      "Keikyu.Main.Shinagawa": "Keikyu.Main.Horinouchi",
      "Keisei.Main.KeiseiTakasago": "Keikyu.Main.Horinouchi",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Main.Horinouchi",
      "Keisei.Oshiage.Aoto": "Keikyu.Main.Horinouchi",
      "Toei.Asakusa.Oshiage": "Keikyu.Main.Horinouchi",
    },
    "Keikyu.RapidLimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Main.Horinouchi",
      "Keikyu.Main.Sengakuji": "Keikyu.Main.Horinouchi",
      "Keikyu.Main.Shinagawa": "Keikyu.Main.Horinouchi",
      "Keisei.Main.KeiseiTakasago": "Keikyu.Main.Horinouchi",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keikyu.Main.Horinouchi",
      "Keisei.Oshiage.Aoto": "Keikyu.Main.Horinouchi",
      "Toei.Asakusa.Oshiage": "Keikyu.Main.Horinouchi",
      "Hokuso.Hokuso.ImbaNihonIdai": "Keikyu.Main.Horinouchi",
      "Hokuso.Hokuso.InzaiMakinohara": "Keikyu.Main.Horinouchi",
    }
  },
  "Keikyu.Main.YokosukaChuo": {
    "Keikyu.MorningWing": {
      "Keikyu.Main.Sengakuji": "Keikyu.Main.YokosukaChuo",
      "Keikyu.Main.Shinagawa": "Keikyu.Main.YokosukaChuo"
    }
  },
  "Keikyu.Main.Horinouchi": {
    "Keikyu.Local": {
      "Keikyu.Kurihama.KeikyuKurihama": "Keikyu.Kurihama.Horinouchi"
    },
    "Keikyu.LimitedExpress": {
      "Keikyu.Kurihama.KeikyuKurihama": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Kurihama.Misakiguchi": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Kurihama.Miurakaigan": "Keikyu.Kurihama.Horinouchi"
    },
    "Keikyu.RapidLimitedExpress": {
      "Keikyu.Kurihama.KeikyuKurihama": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Kurihama.Misakiguchi": "Keikyu.Kurihama.Horinouchi"
    },
    "Keikyu.EveningWing": {
      "Keikyu.Kurihama.KeikyuKurihama": "Keikyu.Kurihama.Horinouchi",
      "Keikyu.Kurihama.Misakiguchi": "Keikyu.Kurihama.Horinouchi"
    }
  },
  "Keikyu.Main.KeikyuKamata": {
    "Keikyu.AirportExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Airport.KeikyuKamata"
    },
    "Keikyu.RapidLimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Airport.KeikyuKamata"
    },
    "Keikyu.Local": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Airport.KeikyuKamata"
    },
    "Keikyu.LimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Airport.KeikyuKamata"
    }
  },
  "Keikyu.Main.KanazawaHakkei": {
    "Keikyu.Local": {
      "Keikyu.Zushi.ZushiHayama": "Keikyu.Zushi.KanazawaHakkei"
    },
    "Keikyu.LimitedExpress": {
      "Keikyu.Zushi.ZushiHayama": "Keikyu.Zushi.KanazawaHakkei"
    },
    "Keikyu.AirportExpress": {
      "Keikyu.Zushi.ZushiHayama": "Keikyu.Zushi.KanazawaHakkei"
    }
  },
  "Keikyu.Zushi.KanazawaHakkei": {
    "Keikyu.AirportExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Main.KanazawaHakkei"
    }
  },
  "Keikyu.Airport.HanedaAirportTerminal3": {
    "Keikyu.AirportRapidLimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keikyu.Airport.HanedaAirportTerminal3"
    }
  },
  "Keikyu.Main.Sengakuji": {
    "Keikyu.Local": {
      "Keisei.Oshiage.Aoto": "Toei.Asakusa.Sengakuji",
      "Keisei.Main.KeiseiTakasago": "Toei.Asakusa.Sengakuji",
    },
    "Keikyu.AirportExpress": {
      "Hokuso.Hokuso.ImbaNihonIdai": "Toei.Asakusa.Sengakuji",
      "Keisei.Main.KeiseiTakasago": "Toei.Asakusa.Sengakuji",
      "Keisei.Main.NaritaAirportTerminal1": "Toei.Asakusa.Sengakuji",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Toei.Asakusa.Sengakuji",
      "Keisei.Oshiage.Aoto": "Toei.Asakusa.Sengakuji",
      "Hokuso.Hokuso.InzaiMakinohara": "Toei.Asakusa.Sengakuji",
      "Keisei.Main.KeiseiNarita": "Toei.Asakusa.Sengakuji",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Toei.Asakusa.Sengakuji",
      "Toei.Asakusa.Oshiage": "Toei.Asakusa.Sengakuji",
    },
    "Keikyu.LimitedExpress": {
      "Hokuso.Hokuso.ImbaNihonIdai": "Toei.Asakusa.Sengakuji",
      "Keisei.Main.KeiseiSakura": "Toei.Asakusa.Sengakuji",
      "Keisei.Main.KeiseiTakasago": "Toei.Asakusa.Sengakuji",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Toei.Asakusa.Sengakuji",
      "Keisei.Oshiage.Aoto": "Toei.Asakusa.Sengakuji",
      "Toei.Asakusa.Oshiage": "Toei.Asakusa.Sengakuji",
    },
    "Keikyu.RapidLimitedExpress": {
      "Keisei.Main.KeiseiTakasago": "Toei.Asakusa.Sengakuji",
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Toei.Asakusa.Sengakuji",
      "Keisei.Oshiage.Aoto": "Toei.Asakusa.Sengakuji",
      "Toei.Asakusa.Oshiage": "Toei.Asakusa.Sengakuji",
      "Hokuso.Hokuso.ImbaNihonIdai": "Toei.Asakusa.Sengakuji",
      "Hokuso.Hokuso.InzaiMakinohara": "Toei.Asakusa.Sengakuji",
    },
    "Keikyu.AirportRapidLimitedExpress": {
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Toei.Asakusa.Sengakuji",
      "Keisei.Oshiage.Aoto": "Toei.Asakusa.Sengakuji",
      "Keisei.Main.NaritaAirportTerminal1": "Toei.Asakusa.Sengakuji",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Toei.Asakusa.Sengakuji",
    }
  },
  "Keio.Keio.Kitano": {
    "Keio.Express": {
      "Keio.Takao.Takaosanguchi": "Keio.Takao.Kitano"
    },
    "Keio.LimitedExpress": {
      "Keio.Takao.Takaosanguchi": "Keio.Takao.Kitano"
    },
    "Keio.SemiLimitedExpress": {
      "Keio.Takao.Takaosanguchi": "Keio.Takao.Kitano"
    },
    "Keio.Local": {
      "Keio.Takao.Takaosanguchi": "Keio.Takao.Kitano",
      "Keio.Takao.Takao": "Keio.Takao.Kitano"
    },
    "Keio.Rapid": {
      "Keio.Takao.Takaosanguchi": "Keio.Takao.Kitano"
    }
  },
  "Keio.Keio.Chofu": {
    "Keio.Local": {
      "Keio.Sagamihara.Hashimoto": "Keio.Sagamihara.Chofu",
      "Keio.Sagamihara.Wakabadai": "Keio.Sagamihara.Chofu",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Sagamihara.Chofu"
    },
    "Keio.Rapid": {
      "Keio.Sagamihara.Hashimoto": "Keio.Sagamihara.Chofu",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Sagamihara.Chofu",
      "Keio.Sagamihara.Wakabadai": "Keio.Sagamihara.Chofu"
    },
    "Keio.SemiExpress": {
      "Keio.Sagamihara.Hashimoto": "Keio.Sagamihara.Chofu",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Sagamihara.Chofu",
      "Keio.Sagamihara.Wakabadai": "Keio.Sagamihara.Chofu"
    },
    "Keio.Express": {
      "Keio.Sagamihara.Hashimoto": "Keio.Sagamihara.Chofu",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Sagamihara.Chofu"
    },
    "Keio.SemiLimitedExpress": {
      "Keio.Sagamihara.Hashimoto": "Keio.Sagamihara.Chofu",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Sagamihara.Chofu"
    },
    "Keio.LimitedExpress": {
      "Keio.Sagamihara.Hashimoto": "Keio.Sagamihara.Chofu",
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Sagamihara.Chofu"
    }
  },
  "Keio.Sagamihara.KeioNagayama": {
    "Keio.KeioLiner": {
      "Keio.Sagamihara.Hashimoto": "Keio.Sagamihara.KeioNagayama"
    }
  },
  "Keio.Keio.Sasazuka": {
    "Keio.Local": {
      "Keio.KeioNew.Shinjuku": "Keio.KeioNew.Sasazuka",
      "Toei.Shinjuku.Motoyawata": "Keio.KeioNew.Sasazuka",
      "Toei.Shinjuku.Ojima": "Keio.KeioNew.Sasazuka"
    },
    "Keio.Express": {
      "Toei.Shinjuku.Motoyawata": "Keio.KeioNew.Sasazuka"
    },
    "Keio.Rapid": {
      "Toei.Shinjuku.Motoyawata": "Keio.KeioNew.Sasazuka"
    },
    "Keio.SemiExpress": {
      "Toei.Shinjuku.Motoyawata": "Keio.KeioNew.Sasazuka",
      "Toei.Shinjuku.Ojima": "Keio.KeioNew.Sasazuka"
    }
  },
  "Keio.KeioNew.Sasazuka": {
    "Keio.Express": {
      "Keio.Sagamihara.KeioTamaCenter": "Keio.Keio.Sasazuka"
    },
    "Keio.Local": {
      "Keio.Sagamihara.Wakabadai": "Keio.Keio.Sasazuka"
    },
    "Keio.Rapid": {
      "Keio.Keio.Chofu": "Keio.Keio.Sasazuka",
      "Keio.Sagamihara.Wakabadai": "Keio.Keio.Sasazuka"
    },
    "Keio.SemiExpress": {
      "Keio.Keio.Sakurajosui": "Keio.Keio.Sasazuka"
    }
  },
  "Keio.KeioNew.Shinjuku": {
    "Keio.Express": {
      "Toei.Shinjuku.Motoyawata": "Toei.Shinjuku.Shinjuku",
      "Toei.Shinjuku.Ojima": "Toei.Shinjuku.Shinjuku"
    },
    "Keio.Local": {
      "Toei.Shinjuku.Iwamotocho": "Toei.Shinjuku.Shinjuku",
      "Toei.Shinjuku.Motoyawata": "Toei.Shinjuku.Shinjuku",
      "Toei.Shinjuku.Ojima": "Toei.Shinjuku.Shinjuku"
    },
    "Keio.Rapid": {
      "Toei.Shinjuku.Motoyawata": "Toei.Shinjuku.Shinjuku"
    },
    "Keio.SemiExpress": {
      "Toei.Shinjuku.Motoyawata": "Toei.Shinjuku.Shinjuku",
      "Toei.Shinjuku.Ojima": "Toei.Shinjuku.Shinjuku"
    }
  },
  "Keio.Sagamihara.Chofu": {
    "Keio.Express": {
      "Toei.Shinjuku.Motoyawata": "Keio.Keio.Chofu"
    },
    "Keio.Local": {
      "Toei.Shinjuku.Ojima": "Keio.Keio.Chofu"
    },
    "Keio.Rapid": {
      "Keio.Keio.Shinjuku": "Keio.Keio.Chofu",
      "Keio.Keio.Tsutsujigaoka": "Keio.Keio.Chofu",
      "Toei.Shinjuku.Motoyawata": "Keio.Keio.Chofu"
    },
    "Keio.SemiExpress": {
      "Keio.Keio.Shinjuku": "Keio.Keio.Chofu",
      "Toei.Shinjuku.Motoyawata": "Keio.Keio.Chofu",
      "Toei.Shinjuku.Ojima": "Keio.Keio.Chofu"
    }
  },
  "Keio.Takao.Kitano": {
    "Keio.Local": {
      "Keio.KeioNew.Shinjuku": "Keio.Keio.Kitano",
      "Keio.Keio.Chofu": "Keio.Keio.Kitano",
      "Keio.Keio.Fuchu": "Keio.Keio.Kitano"
    }
  },
  "Keisei.Chiba.ChibaChuo": {
    "Keisei.Local": {
      "Keisei.Chihara.Chiharadai": "Keisei.Chihara.ChibaChuo"
    }
  },
  "Keisei.Chiba.KeiseiTsudanuma": {
    "Keisei.Local": {
      "ShinKeisei.ShinKeisei.Matsudo": null
    }
  },
  "Keisei.Chihara.ChibaChuo": {
    "Keisei.Local": {
      "Keisei.Chiba.KeiseiTsudanuma": "Keisei.Chiba.ChibaChuo",
      "Keisei.Main.KeiseiUeno": "Keisei.Chiba.ChibaChuo"
    }
  },
  "Keisei.HigashiNarita.HigashiNarita": {
    "Keisei.LimitedExpress": {
      "Shibayama.Shibayama.ShibayamaChiyoda": null
    },
    "Keisei.Local": {
      "Shibayama.Shibayama.ShibayamaChiyoda": null
    },
    "Keisei.Rapid": {
      "Shibayama.Shibayama.ShibayamaChiyoda": null
    },
    "Keisei.RapidLimitedExpress": {
      "Shibayama.Shibayama.ShibayamaChiyoda": null
    },
    "Keisei.CommuterLimitedExpress": {
      "Shibayama.Shibayama.ShibayamaChiyoda": null
    }
  },
  "Keisei.Main.KeiseiTakasago": {
    "Keisei.AccessExpress": {
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keisei.NaritaSkyAccess.KeiseiTakasago"
    },
    "Keisei.Local": {
      "Hokuso.Hokuso.InzaiMakinohara": null,
      "Keisei.NaritaSkyAccess.ImbaNihonIdai": null
    },
    "Keisei.LimitedExpress": {
      "Keisei.NaritaSkyAccess.ImbaNihonIdai": null
    }
  },
  "Keisei.Main.KeiseiNarita": {
    "Keisei.LimitedExpress": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.HigashiNarita.KeiseiNarita"
    },
    "Keisei.Local": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.HigashiNarita.KeiseiNarita"
    },
    "Keisei.Rapid": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.HigashiNarita.KeiseiNarita"
    },
    "Keisei.CommuterLimitedExpress": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.HigashiNarita.KeiseiNarita"
    },
    "Keisei.RapidLimitedExpress": {
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.HigashiNarita.KeiseiNarita"
    }
  },
  "Keisei.Main.KeiseiTsudanuma": {
    "Keisei.Local": {
      "Keisei.Chiba.ChibaChuo": "Keisei.Chiba.KeiseiTsudanuma",
      "Keisei.Chihara.Chiharadai": "Keisei.Chiba.KeiseiTsudanuma"
    }
  },
  "Keisei.NaritaSkyAccess.NaritaAirportTerminal2and3": {
    "Keisei.Skyliner": {
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": null
    }
  },
  "Keisei.Main.Aoto": {
    "Keisei.Rapid": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Oshiage.Aoto",
      "Toei.Asakusa.NishiMagome": "Keisei.Oshiage.Aoto",
      "Keikyu.Kurihama.Misakiguchi": "Keisei.Oshiage.Aoto"
    },
    "Keisei.RapidLimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Oshiage.Aoto",
      "Toei.Asakusa.NishiMagome": "Keisei.Oshiage.Aoto"
    },
    "Keisei.CommuterLimitedExpress": {
      "Toei.Asakusa.NishiMagome": "Keisei.Oshiage.Aoto"
    },
    "Keisei.LimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Oshiage.Aoto",
      "Toei.Asakusa.NishiMagome": "Keisei.Oshiage.Aoto"
    },
    "Keisei.AccessExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Oshiage.Aoto",
      "Keikyu.Kurihama.KeikyuKurihama": "Keisei.Oshiage.Aoto",
      "Keikyu.Kurihama.Misakiguchi": "Keisei.Oshiage.Aoto",
      "Toei.Asakusa.NishiMagome": "Keisei.Oshiage.Aoto"
    },
    "Keisei.Local": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Oshiage.Aoto",
      "Keikyu.Kurihama.KeikyuKurihama": "Keisei.Oshiage.Aoto",
      "Keikyu.Kurihama.Misakiguchi": "Keisei.Oshiage.Aoto",
      "Keikyu.Kurihama.Miurakaigan": "Keisei.Oshiage.Aoto",
      "Keikyu.Main.KanazawaBunko": "Keisei.Oshiage.Aoto",
      "Keikyu.Main.Shinagawa": "Keisei.Oshiage.Aoto",
      "Keisei.Oshiage.Oshiage": "Keisei.Oshiage.Aoto",
      "Toei.Asakusa.Asakusabashi": "Keisei.Oshiage.Aoto",
      "Toei.Asakusa.NishiMagome": "Keisei.Oshiage.Aoto",
      "Toei.Asakusa.Sengakuji": "Keisei.Oshiage.Aoto"
    }
  },
  "Keisei.NaritaSkyAccess.KeiseiTakasago": {
    "Keisei.AccessExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Keisei.Main.KeiseiTakasago",
      "Keikyu.Kurihama.KeikyuKurihama": "Keisei.Main.KeiseiTakasago",
      "Keikyu.Kurihama.Misakiguchi": "Keisei.Main.KeiseiTakasago",
      "Keisei.Main.KeiseiUeno": "Keisei.Main.KeiseiTakasago",
      "Toei.Asakusa.NishiMagome": "Keisei.Main.KeiseiTakasago"
    }
  },
  "Keisei.Main.Nippori": {
    "Keisei.Skyliner": {
      "Keisei.Main.KeiseiUeno": null
    }
  },
  "Keisei.Oshiage.Aoto": {
    "Keisei.Local": {
      "Hokuso.Hokuso.InzaiMakinohara": "Keisei.Main.Aoto",
      "Keisei.NaritaSkyAccess.ImbaNihonIdai": "Keisei.Main.Aoto"
    },
    "Keisei.AccessExpress": {
      "Keisei.NaritaSkyAccess.NaritaAirportTerminal1": "Keisei.Main.Aoto"
    },
    "Keisei.RapidLimitedExpress": {
      "Keisei.Main.KeiseiTakasago": "Keisei.Main.Aoto",
      "Keisei.Main.NaritaAirportTerminal1": "Keisei.Main.Aoto",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.Main.Aoto"
    },
    "Keisei.CommuterLimitedExpress": {
      "Keisei.Main.KeiseiNarita": "Keisei.Main.Aoto",
      "Keisei.Main.NaritaAirportTerminal1": "Keisei.Main.Aoto",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.Main.Aoto"
    },
    "Keisei.LimitedExpress": {
      "Keisei.NaritaSkyAccess.ImbaNihonIdai": "Keisei.Main.Aoto",
      "Shibayama.Shibayama.ShibayamaChiyoda": "Keisei.Main.Aoto"
    }
  },
  "Keisei.Oshiage.Oshiage": {
    "Keisei.AccessExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Toei.Asakusa.Oshiage",
      "Keikyu.Kurihama.KeikyuKurihama": "Toei.Asakusa.Oshiage",
      "Keikyu.Kurihama.Misakiguchi": "Toei.Asakusa.Oshiage",
      "Toei.Asakusa.NishiMagome": "Toei.Asakusa.Oshiage"
    },
    "Keisei.LimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Toei.Asakusa.Oshiage",
      "Toei.Asakusa.NishiMagome": "Toei.Asakusa.Oshiage"
    },
    "Keisei.Rapid": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Toei.Asakusa.Oshiage",
      "Toei.Asakusa.NishiMagome": "Toei.Asakusa.Oshiage",
      "Keikyu.Kurihama.Misakiguchi": "Toei.Asakusa.Oshiage",
      "Keikyu.Main.KanagawaShimmachi": "Toei.Asakusa.Oshiage"
    },
    "Keisei.RapidLimitedExpress": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Toei.Asakusa.Oshiage",
      "Toei.Asakusa.NishiMagome": "Toei.Asakusa.Oshiage"
    },
    "Keisei.CommuterLimitedExpress": {
      "Toei.Asakusa.NishiMagome": "Toei.Asakusa.Oshiage"
    },
    "Keisei.Local": {
      "Keikyu.Airport.HanedaAirportTerminal1and2": "Toei.Asakusa.Oshiage",
      "Keikyu.Kurihama.KeikyuKurihama": "Toei.Asakusa.Oshiage",
      "Keikyu.Kurihama.Misakiguchi": "Toei.Asakusa.Oshiage",
      "Keikyu.Kurihama.Miurakaigan": "Toei.Asakusa.Oshiage",
      "Keikyu.Main.KanazawaBunko": "Toei.Asakusa.Oshiage",
      "Keikyu.Main.Shinagawa": "Toei.Asakusa.Oshiage",
      "Toei.Asakusa.Asakusabashi": "Toei.Asakusa.Oshiage",
      "Toei.Asakusa.NishiMagome": "Toei.Asakusa.Oshiage",
      "Toei.Asakusa.Sengakuji": "Toei.Asakusa.Oshiage"
    }
  },
  "Seibu.Ikebukuro.NishiTokorozawa": {
    "Seibu.Local": {
      "Seibu.Sayama.SeibukyujoMae": "Seibu.Sayama.NishiTokorozawa"
    }
  },
  "Seibu.Ikebukuro.Nerima": {
    "Seibu.Local": {
      "Seibu.Toshima.Toshimaen": "Seibu.Toshima.Nerima",
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.SeibuYurakucho.Nerima",
      "Seibu.SeibuYurakucho.KotakeMukaihara": "Seibu.SeibuYurakucho.Nerima",
      "TokyoMetro.Yurakucho.ShinKiba": "Seibu.SeibuYurakucho.Nerima",
      "Tokyu.Toyoko.Motosumiyoshi": "Seibu.SeibuYurakucho.Nerima",
      "Tokyu.Toyoko.Yokohama": "Seibu.SeibuYurakucho.Nerima",
      "Tokyu.Toyoko.MusashiKosugi": "Seibu.SeibuYurakucho.Nerima",
      "Tokyu.Toyoko.Kikuna": "Seibu.SeibuYurakucho.Nerima",
    },
    "Seibu.Rapid": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.SeibuYurakucho.Nerima",
      "TokyoMetro.Yurakucho.ShinKiba": "Seibu.SeibuYurakucho.Nerima",
    },
    "Seibu.SemiExpress": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.SeibuYurakucho.Nerima",
      "TokyoMetro.Yurakucho.ShinKiba": "Seibu.SeibuYurakucho.Nerima",
    },
    "Seibu.RapidExpress": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.SeibuYurakucho.Nerima",
    }
  },
  "Seibu.Ikebukuro.Agano": {
    "Seibu.Local": {
      "Chichibu.Chichibu.Mitsumineguchi/Chichibu.Chichibu.Nagatoro": "Seibu.SeibuChichibu.Agano",
      "Seibu.SeibuChichibu.SeibuChichibu": "Seibu.SeibuChichibu.Agano"
    }
  },
  "Seibu.Ikebukuro.Hanno": {
    "Seibu.LimitedExpress": {
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.Ikebukuro.Hanno"
    },
    "Seibu.S-TRAIN": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "Seibu.Ikebukuro.Hanno"
    }
  },
  "Seibu.Kokubunji.HigashiMurayama": {
    "Seibu.Local": {
      "Seibu.Seibuen.Seibuen": "Seibu.Seibuen.HigashiMurayama"
    }
  },
  "Seibu.Sayama.NishiTokorozawa": {
    "Seibu.Local": {
      "Seibu.Ikebukuro.Hoya": "Seibu.Ikebukuro.NishiTokorozawa"
    }
  },
  "Seibu.SeibuChichibu.Yokoze": {
    "Seibu.Local": {
      "Chichibu.Chichibu.Mitsumineguchi/Chichibu.Chichibu.Nagatoro": "Seibu.SeibuChichibu.Yokoze"
    },
    "Seibu.LimitedExpress": {
      "Seibu.SeibuChichibu.SeibuChichibu": "Seibu.SeibuChichibu.Yokoze"
    }
  },
  "Seibu.SeibuChichibu.SeibuChichibu": {
    "Seibu.Local": {
      "Chichibu.Chichibu.Mitsumineguchi": null
    }
  },
  "Seibu.SeibuChichibu.Agano": {
    "Seibu.Local": {
      "Seibu.Ikebukuro.Hanno": "Seibu.Ikebukuro.Agano"
    },
    "Seibu.RapidExpress": {
      "Seibu.Ikebukuro.Ikebukuro": "Seibu.Ikebukuro.Agano"
    }
  },
  "Chichibu.Chichibu.Ohanabatake": {
    "Seibu.Local": {
      "Chichibu.Chichibu.Nagatoro": null
    }
  },
  "Seibu.SeibuYurakucho.Nerima": {
    "Seibu.SemiExpress": {
      "Seibu.Ikebukuro.Hoya": "Seibu.Ikebukuro.Nerima"
    },
    "Seibu.RapidExpress": {
      "Seibu.Ikebukuro.Hanno": "Seibu.Ikebukuro.Nerima",
      "Seibu.Ikebukuro.Kotesashi": "Seibu.Ikebukuro.Nerima",
      "Seibu.Ikebukuro.Tokorozawa": "Seibu.Ikebukuro.Nerima"
    }
  },
  "Seibu.SeibuYurakucho.KotakeMukaihara": {
    "Seibu.Local": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "TokyoMetro.Fukutoshin.KotakeMukaihara",
      "TokyoMetro.Yurakucho.ShinKiba": "TokyoMetro.Yurakucho.KotakeMukaihara",
      "Tokyu.Toyoko.Motosumiyoshi": "TokyoMetro.Fukutoshin.KotakeMukaihara",
      "Tokyu.Toyoko.MusashiKosugi": "TokyoMetro.Fukutoshin.KotakeMukaihara",
      "Tokyu.Toyoko.Yokohama": "TokyoMetro.Fukutoshin.KotakeMukaihara",
      "Tokyu.Toyoko.Kikuna": "TokyoMetro.Fukutoshin.KotakeMukaihara",
    },
    "Seibu.Rapid": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "TokyoMetro.Fukutoshin.KotakeMukaihara",
      "TokyoMetro.Yurakucho.ShinKiba": "TokyoMetro.Yurakucho.KotakeMukaihara"
    },
    "Seibu.SemiExpress": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "TokyoMetro.Fukutoshin.KotakeMukaihara",
      "TokyoMetro.Yurakucho.ShinKiba": "TokyoMetro.Yurakucho.KotakeMukaihara"
    },
    "Seibu.RapidExpress": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "TokyoMetro.Fukutoshin.KotakeMukaihara"
    }
  },
  "Seibu.Seibuen.HigashiMurayama": {
    "Seibu.Local": {
      "Seibu.Kokubunji.Kokubunji": "Seibu.Kokubunji.HigashiMurayama"
    }
  },
  "Seibu.Shinjuku.Kodaira": {
    "Seibu.Local": {
      "Seibu.Haijima.Haijima": "Seibu.Haijima.Kodaira",
      "Seibu.Haijima.TamagawaJosui": "Seibu.Haijima.Kodaira",
      "Seibu.Tamako.Tamako": "Seibu.Haijima.Kodaira"
    },
    "Seibu.HaijimaLiner": {
      "Seibu.Haijima.Haijima": "Seibu.Haijima.Kodaira"
    }
  },
  "TokyoMetro.Fukutoshin.Ikebukuro": {
    "Seibu.S-TRAIN": {
      "Minatomirai.Minatomirai.MotomachiChukagai": "TokyoMetro.Fukutoshin.Ikebukuro"
    }
  },
  "TokyoMetro.Yurakucho.Iidabashi": {
    "Seibu.S-TRAIN": {
      "TokyoMetro.Yurakucho.Toyosu": "TokyoMetro.Yurakucho.Iidabashi"
    }
  },
  "Tokyu.DenEnToshi.Shibuya": {
    "Tokyu.Express": {
      "Tobu.Isesaki.Kuki": "TokyoMetro.Hanzomon.Shibuya",
      "Tobu.Nikko.MinamiKurihashi": "TokyoMetro.Hanzomon.Shibuya",
      "Tobu.TobuSkytree.KitaKoshigaya": "TokyoMetro.Hanzomon.Shibuya",
      "Tobu.TobuSkytree.TobuDobutsuKoen": "TokyoMetro.Hanzomon.Shibuya",
      "TokyoMetro.Hanzomon.Oshiage": "TokyoMetro.Hanzomon.Shibuya",
      "TokyoMetro.Hanzomon.KiyosumiShirakawa": "TokyoMetro.Hanzomon.Shibuya",
    },
    "Tokyu.Local": {
      "Tobu.Isesaki.Kuki": "TokyoMetro.Hanzomon.Shibuya",
      "Tobu.Nikko.MinamiKurihashi": "TokyoMetro.Hanzomon.Shibuya",
      "Tobu.TobuSkytree.KitaKoshigaya": "TokyoMetro.Hanzomon.Shibuya",
      "Tobu.TobuSkytree.TobuDobutsuKoen": "TokyoMetro.Hanzomon.Shibuya",
      "TokyoMetro.Hanzomon.AoyamaItchome": "TokyoMetro.Hanzomon.Shibuya",
      "TokyoMetro.Hanzomon.KiyosumiShirakawa": "TokyoMetro.Hanzomon.Shibuya",
      "TokyoMetro.Hanzomon.Nagatacho": "TokyoMetro.Hanzomon.Shibuya",
      "TokyoMetro.Hanzomon.Oshiage": "TokyoMetro.Hanzomon.Shibuya",
      "TokyoMetro.Hanzomon.Hanzomon": "TokyoMetro.Hanzomon.Shibuya",
    },
    "Tokyu.SemiExpress": {
      "Tobu.TobuSkytree.TobuDobutsuKoen": "TokyoMetro.Hanzomon.Shibuya",
      "TokyoMetro.Hanzomon.Oshiage": "TokyoMetro.Hanzomon.Shibuya",
      "Tobu.Isesaki.Kuki": "TokyoMetro.Hanzomon.Shibuya",
      "Tobu.Nikko.MinamiKurihashi": "TokyoMetro.Hanzomon.Shibuya",
      "TokyoMetro.Hanzomon.KiyosumiShirakawa": "TokyoMetro.Hanzomon.Shibuya",
    }
  },
  "Tokyu.DenEnToshi.Mizonokuchi": {
    "Tokyu.Express": {
      "Tokyu.Oimachi.Oimachi": "Tokyu.Oimachi.Mizonokuchi"
    },
    "Tokyu.Local": {
      "Tokyu.Oimachi.Oimachi": "Tokyu.Oimachi.Mizonokuchi"
    }
  },
  "Tokyu.Meguro.Meguro": {
    "Tokyu.Express": {
      "SaitamaRailway.SaitamaRailway.UrawaMisono": "TokyoMetro.Namboku.Meguro",
      "Toei.Mita.NishiTakashimadaira": "Toei.Mita.Meguro",
      "TokyoMetro.Namboku.AkabaneIwabuchi": "TokyoMetro.Namboku.Meguro",
      "SaitamaRailway.SaitamaRailway.Hatogaya": "TokyoMetro.Namboku.Meguro",
      "Toei.Mita.Takashimadaira": "Toei.Mita.Meguro",
      "TokyoMetro.Namboku.OjiKamiya": "TokyoMetro.Namboku.Meguro",
    },
    "Tokyu.Local": {
      "SaitamaRailway.SaitamaRailway.Hatogaya": "TokyoMetro.Namboku.Meguro",
      "SaitamaRailway.SaitamaRailway.UrawaMisono": "TokyoMetro.Namboku.Meguro",
      "Toei.Mita.NishiTakashimadaira": "Toei.Mita.Meguro",
      "Toei.Mita.Takashimadaira": "Toei.Mita.Meguro",
      "TokyoMetro.Namboku.AkabaneIwabuchi": "TokyoMetro.Namboku.Meguro",
      "TokyoMetro.Namboku.Komagome": "TokyoMetro.Namboku.Meguro",
      "TokyoMetro.Namboku.OjiKamiya": "TokyoMetro.Namboku.Meguro",
    }
  },
  "Tokyu.Oimachi.Mizonokuchi": {
    "Tokyu.Local": {
      "Tokyu.DenEnToshi.Saginuma": "Tokyu.DenEnToshi.Mizonokuchi"
    }
  },
  "Tokyu.Toyoko.Yokohama": {
    "Tokyu.Local": {
      "Minatomirai.Minatomirai.MotomachiChukagai": null
    },
    "Tokyu.Express": {
      "Minatomirai.Minatomirai.MotomachiChukagai": null
    },
    "Tokyu.CommuterLimitedExpress": {
      "Minatomirai.Minatomirai.MotomachiChukagai": null
    },
    "Tokyu.F-Liner": {
      "Minatomirai.Minatomirai.MotomachiChukagai": null
    },
    "Tokyu.LimitedExpress": {
      "Minatomirai.Minatomirai.MotomachiChukagai": null
    },
    "Tokyu.S-TRAIN": {
      "Minatomirai.Minatomirai.MotomachiChukagai": null
    }
  },
  "Tokyu.Toyoko.Shibuya": {
    "Tokyu.Local": {
      "Seibu.Ikebukuro.Hanno": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Hoya": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Kiyose": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Kotesashi": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.ShakujiiKoen": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Tokorozawa": "TokyoMetro.Fukutoshin.Shibuya",
      "TokyoMetro.Fukutoshin.Ikebukuro": "TokyoMetro.Fukutoshin.Shibuya",
      "TokyoMetro.Fukutoshin.ShinjukuSanchome": "TokyoMetro.Fukutoshin.Shibuya",
      "TokyoMetro.Fukutoshin.Wakoshi": "TokyoMetro.Fukutoshin.Shibuya",
      "Tobu.Tojo.Shiki": "TokyoMetro.Fukutoshin.Shibuya"
    },
    "Tokyu.Express": {
      "Seibu.Ikebukuro.Hanno": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Hoya": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Kiyose": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Kotesashi": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.ShakujiiKoen": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Tokorozawa": "TokyoMetro.Fukutoshin.Shibuya",
      "Tobu.Tojo.Kawagoeshi": "TokyoMetro.Fukutoshin.Shibuya",
      "Tobu.Tojo.Ogawamachi": "TokyoMetro.Fukutoshin.Shibuya",
      "Tobu.Tojo.ShinrinKoen": "TokyoMetro.Fukutoshin.Shibuya",
      "TokyoMetro.Fukutoshin.Wakoshi": "TokyoMetro.Fukutoshin.Shibuya",
      "Tobu.Tojo.Shiki": "TokyoMetro.Fukutoshin.Shibuya",
      "TokyoMetro.Fukutoshin.Ikebukuro": "TokyoMetro.Fukutoshin.Shibuya",
    },
    "Tokyu.CommuterLimitedExpress": {
      "Seibu.Ikebukuro.Hanno": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Kiyose": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Kotesashi": "TokyoMetro.Fukutoshin.Shibuya",
      "Tobu.Tojo.Kawagoeshi": "TokyoMetro.Fukutoshin.Shibuya",
      "Tobu.Tojo.ShinrinKoen": "TokyoMetro.Fukutoshin.Shibuya",
      "TokyoMetro.Fukutoshin.Ikebukuro": "TokyoMetro.Fukutoshin.Shibuya",
      "TokyoMetro.Fukutoshin.ShinjukuSanchome": "TokyoMetro.Fukutoshin.Shibuya",
      "TokyoMetro.Fukutoshin.Wakoshi": "TokyoMetro.Fukutoshin.Shibuya",
    },
    "Tokyu.F-Liner": {
      "Seibu.Ikebukuro.Hanno": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Kotesashi": "TokyoMetro.Fukutoshin.Shibuya",
      "Tobu.Tojo.ShinrinKoen": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Tokorozawa": "TokyoMetro.Fukutoshin.Shibuya",
    },
    "Tokyu.LimitedExpress": {
      "Seibu.Ikebukuro.Hanno": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Hoya": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Kotesashi": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Tokorozawa": "TokyoMetro.Fukutoshin.Shibuya",
      "Tobu.Tojo.Kawagoeshi": "TokyoMetro.Fukutoshin.Shibuya",
      "Tobu.Tojo.Ogawamachi": "TokyoMetro.Fukutoshin.Shibuya",
      "Tobu.Tojo.ShinrinKoen": "TokyoMetro.Fukutoshin.Shibuya",
      "TokyoMetro.Fukutoshin.Wakoshi": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Kiyose": "TokyoMetro.Fukutoshin.Shibuya",
    },
    "Tokyu.S-TRAIN": {
      "Seibu.Ikebukuro.Hanno": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.Ikebukuro.Tokorozawa": "TokyoMetro.Fukutoshin.Shibuya",
      "Seibu.SeibuChichibu.SeibuChichibu": "TokyoMetro.Fukutoshin.Shibuya",
    }
  }
}