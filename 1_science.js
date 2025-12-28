/* بيانات علمي علوم الكاملة (رضا الفاروق + محمد صلاح) */
const SCIENCE_RAW = [
  {
    "id": 3,
    "name": "2026",
    "subjects": [
      {
        "id": 40,
        "name": "لغة عربية",
        "image_url": "https://i.ibb.co/P9DxZ48/photo-2023-07-20-23-53-0.jpg",
        "teachers": [
          /* ========================
             1. أ. رضا الفاروق
             ======================== */
          {
            "id": 109,
            "name": "أ. رضا الفاروق",
            "image_url": "https://i.ibb.co/jkwYwHNJ/mrr.jpg",
            "chapters": [
              {
                "id": 524,
                "name": "الترم الأول",
                "lectures": [
                  {
                    "name": "المحاضرة 15 (المنقوص والممدود)",
                    "videos": [
                      { "title": "محتوى المحاضرة 15", "stream_url": "https://river-3-344.rtbcdn.ru/hls-vod/HgPMvgvaabK5kW5uFdYKpA/1767200235/3320/0x5000c500e9ee263c/831db01913874978980d98501b896df8.mp4.m3u8" },
                      { "title": "الاسم المنقوص", "stream_url": "https://river-3-314.rtbcdn.ru/hls-vod/MQb7oDpdTZWkKYSPt3ERUg/1767200242/2692/0x5000039ce8694319/db9c41ade55943b1839c2942bc977c1a.mp4.m3u8" },
                      { "title": "الاسم الممدود", "stream_url": "https://river-5-546.rtbcdn.ru/hls-vod/44BQ8hnr_ZGWIe0xo68csw/1766951252/3282/0x5000c500fa77633b/64dcfd92bb8c4afe98ff641e430b3337.mp4.m3u8" },
                      { "title": "بناء الفعل للمجهول", "stream_url": "https://river-5-538.rtbcdn.ru/hls-vod/mnc3Z9Nw3XcoRrBU1uIipA/1766953168/3344/0x5000c500e9cf76a4/dcd132d939744635af0ca4acb187a8ab.mp4.m3u8" }
                    ]
                  },
                  {
                    "name": "المحاضرة 14 (المقصور)",
                    "videos": [
                      { "title": "الاسم المقصور", "stream_url": "https://river-5-557.rtbcdn.ru/hls-vod/rDSlOkDWEkHpb-7dKKgtyA/1767118957/3298/0x5000c500e9ebbe4c/cd10a7167f64460b93c095e91eae3662.mp4.m3u8" },
                      { "title": "أدب الديوان (1)", "stream_url": "https://river-3-368.rtbcdn.ru/hls-vod/QUQqvy7yHuaHwBuSsC_5iA/1767120663/3282/0x5000c500fa77b760/fa12b77ffa7a49bda6e42d7b3016888d.mp4.m3u8" }
                    ]
                  }
                ]
              }
            ]
          },
          /* ========================
             2. أ. محمد صلاح (البيانات الجديدة)
             ======================== */
          {
            "id": 110,
            "name": "أ. محمد صلاح",
            "image_url": "https://i.ibb.co/G4Dd4Y2g/salalllh.jpg",
            "chapters": [
              {
                "id": 624,
                "name": "الشهر الرابع (الأحدث)",
                "lectures": [
                  {
                    "name": "المحاضرة 15",
                    "videos": [
                      { "title": "مقدمة المحاضرة", "stream_url": "https://river-3-371.rtbcdn.ru/hls-vod/LSAifZDHD-F3Vn1Lgm94Pg/1767146729/3326/0x5000c500e9d36b96/f46f88d5ad604ea7a3218f81335f6281.mp4.m3u8" },
                      { "title": "نحو - الهمزة المتطرفة", "stream_url": "https://river-3-375.rtbcdn.ru/hls-vod/6wa9HF54ig8eY5gZm3x-lQ/1767149212/3410/0x5000c500e978e6c0/2beea556fe1e4db0aa8364458e98a5a2.mp4.m3u8" },
                      { "title": "أدب - مدرسة أبولو", "stream_url": "https://river-3-379.rtbcdn.ru/hls-vod/OOup8g-54uluepNHqavxmw/1767148298/3404/0x5000c500fa90ba02/95f1714ff3b94d289b2b6c4d3d3f6df8.mp4.m3u8" },
                      { "title": "تعبير - نمط الكنايات", "stream_url": "https://river-3-360.rtbcdn.ru/hls-vod/_OWnKS6Jm_eGCDno-ZtapA/1767150590/3290/0x5000c500fa6e914e/d36a38474ece45ce97e776c48842ce96.mp4.m3u8" },
                      { "title": "تدريبات الحصة", "stream_url": "https://river-3-347.rtbcdn.ru/hls-vod/GIz0G-n5FQyX6sxfkFUMyQ/1767154574/3410/0x5000c500c7e49c55/33e2b0b351bb4316a21c1bd77e80ff3e.mp4.m3u8" },
                      { "title": "خلاصة الخلاويص (نحو)", "stream_url": "https://river-5-538.rtbcdn.ru/hls-vod/aEz_vV5DiKDsUK5bwrgF0w/1767149957/2872/0x5000c500fa77ce47/f0af948e8110426f8d2742e070f4c2f4.mp4.m3u8" },
                      { "title": "خلاصة الخلاويص (أدب)", "stream_url": "https://river-4-420.rtbcdn.ru/hls-vod/B8p73Uzj5KPsV1u_fhiAUQ/1767150505/2996/0x5000c500e9cf3384/8419b828795a474f855a7de04a026610.mp4.m3u8" },
                      { "title": "حل واجب النحو", "stream_url": "https://river-5-536.rtbcdn.ru/hls-vod/zo7NfZZXrBFpy5HThWR4kw/1767148466/3286/0x5000c500fa778eb3/8e601abb35ce4d6095809642c6db6192.mp4.m3u8" },
                      { "title": "حل واجب الأدب", "stream_url": "https://river-5-534.rtbcdn.ru/hls-vod/9ZmL_WB4aEy5TF5a4CzaMA/1767154074/3294/0x5000c500e8752c15/016d4864612a4ed79e7a0e8db54b527b.mp4.m3u8" },
                      { "title": "حل واجب النصوص", "stream_url": "https://river-3-342.rtbcdn.ru/hls-vod/AJi4OSci3N17yc8-SI7WFQ/1767155988/2996/0x5000c500e9cf3d99/3790ea0ee267492e9feef713e1df38b9.mp4.m3u8" }
                    ]
                  },
                  {
                    "name": "المحاضرة 14",
                    "videos": [
                      { "title": "مقدمة المحاضرة", "stream_url": "https://river-3-358.rtbcdn.ru/hls-vod/X2YY2E-L0M-vcM-_-NToaA/1767076765/3290/0x5000c500fa780e71/48ac321e51c64929ae869304c8bfb6d1.mp4.m3u8" },
                      { "title": "نحو - همزة القطع والوصل", "stream_url": "https://river-5-549.rtbcdn.ru/hls-vod/gKyzUh5yEu8Frqghx-Dy7Q/1767074212/2748/0x5000c500dbb8063f/0e2ebf941b704a6c85b1ba09f6b6a772.mp4.m3u8" },
                      { "title": "القصة - الفصل 9", "stream_url": "https://river-3-340.rtbcdn.ru/hls-vod/cqcJGudb-428P76zuEbAXw/1767079312/3304/0x5000c500fa915e8c/5131915ef7084e0bb7161a7bffed6c6d.mp4.m3u8" },
                      { "title": "بلاغة - المجاز المرسل", "stream_url": "https://river-3-336.rtbcdn.ru/hls-vod/oQvkPJU2vzfK38TZXibLEg/1767077517/2682/0x5000039ce84060bd/42dba9509c13499a8c27ca579269b256.mp4.m3u8" },
                      { "title": "تدريبات الحصة", "stream_url": "https://river-3-366.rtbcdn.ru/hls-vod/9wTTQqI4Vlt3IQ_Z3kJoVA/1767079775/1889/0x5000c500e4dc1485/f3f429ed9dfb4b10a21633382b36d602.mp4.m3u8" },
                      { "title": "خلاصة الخلاويص (نحو)", "stream_url": "https://river-5-534.rtbcdn.ru/hls-vod/8Tn6SBadEds63POnOtHkGQ/1767093332/3360/0x5000c500fa77747a/b3bffc4fea7b4d36b75d3b67928b81d4.mp4.m3u8" },
                      { "title": "حل الواجب", "stream_url": "https://river-3-351.rtbcdn.ru/hls-vod/agx3GcG1hmACXdhcvkYXPw/1767094229/3346/0x5000c500e9cc1bdf/bb0a3c40df144539a993497bd223ef8d.mp4.m3u8" }
                    ]
                  },
                  {
                    "name": "المحاضرة 13",
                    "videos": [
                      { "title": "مقدمة المحاضرة", "stream_url": "https://river-3-346.rtbcdn.ru/hls-vod/4iIsAJFes8-IIWA53dtAeQ/1767010211/3400/0x5000c500fa777b4d/9471ce88c4a94f6dad2f0f6f0b25b5eb.mp4.m3u8" },
                      { "title": "النحو - المقصور والمنقوص", "stream_url": "https://river-5-534.rtbcdn.ru/hls-vod/9FzfT8a3tvTYwhPQuZaGuQ/1767009068/3392/0x5000c500e874b915/fe7a2458e20d4b928aac72348245beea.mp4.m3u8" },
                      { "title": "النحو - البناء للمجهول", "stream_url": "https://river-5-549.rtbcdn.ru/hls-vod/DODugi0FVAOrYQUyQEajNA/1767011054/3280/0x5000c500e874dcb7/4141497248d34c3b92b83987f8627fb7.mp4.m3u8" },
                      { "title": "النصوص - نص رثاء مي", "stream_url": "https://river-4-425.rtbcdn.ru/hls-vod/QQIVVpa28z9ybYSgftWzxQ/1767013053/3318/0x5000c500e927ac67/1ecade69976e4a8996f05d3d5fdcb92e.mp4.m3u8" },
                      { "title": "القصة - الفصل 8", "stream_url": "https://river-3-341.rtbcdn.ru/hls-vod/3FblGEblylaZTUo79TpPwQ/1767011171/3326/0x5000c500e3d05f4d/8639784f570544fd960db696dc7f1685.mp4.m3u8" },
                      { "title": "تدريبات نحو", "stream_url": "https://river-3-340.rtbcdn.ru/hls-vod/FRIOmeGEdA9MclhM3gCfDA/1767011653/3398/0x5000c500fa6e6f85/840ed228eecc4314b681fa4ade5f10fa.mp4.m3u8" },
                      { "title": "تدريبات نصوص", "stream_url": "https://river-5-537.rtbcdn.ru/hls-vod/FX-WQBvHeox2PI3XhMBHDg/1767040683/2670/0x5000039ce863fa9d/7d2c48b21fe141ed821b873d6fb633d8.mp4.m3u8" }
                    ]
                  }
                ]
              },
              {
                "id": 529,
                "name": "الشهر الثالث",
                "lectures": [
                  {
                    "name": "المحاضرة 12",
                    "videos": [
                      { "title": "مقدمة - نصيحة", "stream_url": "https://river-3-365.rtbcdn.ru/hls-vod/IX1vYKtWE0bR3CZ9qJEVXw/1767196759/3340/0x5000c500e986f319/c2f885828e1842b28892e727e2404814.mp4.m3u8" },
                      { "title": "نحو - الزمان والمكان", "stream_url": "https://river-3-346.rtbcdn.ru/hls-vod/Y8JqbOLv-mjYSCj_Q_ToPw/1767169601/3338/0x5000c500e9ebc9fc/12d4841e28da4678a90d82e996f39211.mp4.m3u8" },
                      { "title": "أدب - مدرسة الديوان", "stream_url": "https://river-3-314.rtbcdn.ru/hls-vod/RcEaDI2TFXRp2TDsxbb0NQ/1767171379/2720/0x5000039ce833b2d1/afa00880d70a482ea55958f87ee69b52.mp4.m3u8" },
                      { "title": "الأدب بشكل مختلف", "stream_url": "https://river-5-513.rtbcdn.ru/hls-vod/DuayCTViPjrQMF_nsmIjEw/1767176208/3370/0x5000c500fa77a5f3/c8df750e38904e409de00097c59d66d3.mp4.m3u8" },
                      { "title": "تعبير - الربط بين فقرتين", "stream_url": "https://river-5-549.rtbcdn.ru/hls-vod/ZgPw1KnNWiMJBd-Z0Itm9g/1766967165/3370/0x5000c500fa775efa/0b4d23a590d249618fc6ab18ef84907e.mp4.m3u8" },
                      { "title": "واجب النحو", "stream_url": "https://river-4-421.rtbcdn.ru/hls-vod/ZaDpIU3SXxvdIpuBVoeg-Q/1767183423/3328/0x5000c500fa6e5db3/5eff3571bcc3428faebabe09ae149e15.mp4.m3u8" }
                    ]
                  },
                  {
                    "name": "المحاضرة 11",
                    "videos": [
                      { "title": "اسم الزمان والمكان", "stream_url": "https://river-5-556.rtbcdn.ru/hls-vod/hgP0NQaaTJmwc19ClEfgAw/1767461903/3324/0x5000c500e9eb5606/fbddba1e78964df2b104df7202afe38b.mp4.m3u8" },
                      { "title": "اسم الآلة", "stream_url": "https://river-3-366.rtbcdn.ru/hls-vod/cohh85hacTJnXIyLDjZzNg/1767461912/3404/0x5000c500dbb99230/72ce4b7d57c0452392a0d22916b07cf8.mp4.m3u8" },
                      { "title": "المصدر الصناعي", "stream_url": "https://river-4-420.rtbcdn.ru/hls-vod/7g6gSqqfz2xQ-HgvZUuQ6g/1767252999/3310/0x5000c50074475cb7/335d824014a644e385017e90dcd136dc.mp4.m3u8" },
                      { "title": "المصدر الميمي", "stream_url": "https://river-3-366.rtbcdn.ru/hls-vod/NN1F-03olMCORzuoKHq2yg/1767162583/2718/0x5000039ce840c505/7c99ac5d83ad4cb897fa066cacb4ff01.mp4.m3u8" },
                      { "title": "تدريبات نحو", "stream_url": "https://river-3-362.rtbcdn.ru/hls-vod/R0PETjAwdixVOHWFS5q_4w/1767007528/3302/0x5000c500e9cffd0f/5ae266eb3f7f4772a43df058f400e591.mp4.m3u8" },
                      { "title": "المحسنات البديعية", "stream_url": "https://river-3-359.rtbcdn.ru/hls-vod/J5Fz2QwVyYEYFuNOamQKtw/1766944866/3410/0x5000c500c7db1260/ae249a2d10d74b52b00cb6b0ae487acd.mp4.m3u8" },
                      { "title": "القصة القصيرة", "stream_url": "https://river-5-517.rtbcdn.ru/hls-vod/R7rh4y2J4HLWML_8wnz7rg/1767198239/3284/0x5000c500fa6e76ee/d430a2747c8443a9b8dd0bdd5552e834.mp4.m3u8" }
                    ]
                  },
                  {
                    "name": "المحاضرة 10",
                    "videos": [
                      { "title": "محتوى المحاضرة", "stream_url": "https://river-5-533.rtbcdn.ru/hls-vod/EwKYwiGf0HoBY6pywOfiXw/1767140674/2716/0x5000039ce863a495/73915b2cbd42439793d9556ea20b0ce4.mp4.m3u8" },
                      { "title": "صياغة اسم التفضيل", "stream_url": "https://river-3-363.rtbcdn.ru/hls-vod/UGwUgWGOB0gJ9LIqbZErJw/1767141528/3330/0x5000c500e9d36bcc/f37b30dee7d3453eb8297b2411fe5929.mp4.m3u8" },
                      { "title": "صور وحالات اسم التفضيل", "stream_url": "https://river-5-534.rtbcdn.ru/hls-vod/JX3hCZyocRh61l_AnGrkgA/1766948364/2203/0x5000c5007446e2a2/d0e9a6eeaa554334a35dcc4165f200d6.mp4.m3u8" },
                      { "title": "أفكار مهمة (تفضيل)", "stream_url": "https://river-4-417.rtbcdn.ru/hls-vod/6AH3lqiq-1J8yy9HF2rLoA/1767080759/1859/0x5000c500e53561cd/da850afe02084dc4ad7157bf11b86b43.mp4.m3u8" },
                      { "title": "أسلوب المدح والذم", "stream_url": "https://river-3-314.rtbcdn.ru/hls-vod/N4sVbR_QZST0Z-nVC04Jlw/1767200649/3282/0x5000c500fa78b70f/bdb8f12f9cee472d9c59d8b70fa7659b.mp4.m3u8" },
                      { "title": "الخيال المركب", "stream_url": "https://river-3-346.rtbcdn.ru/hls-vod/Q74QBNoTN-SaCVOozM1B9w/1767115169/3266/0x5000c500e9d37e6b/06996f99328244c69536840a853b2a36.mp4.m3u8" }
                    ]
                  },
                  {
                    "name": "المحاضرة 9",
                    "videos": [
                      { "title": "محتوى المحاضرة", "stream_url": "https://river-3-342.rtbcdn.ru/hls-vod/qv28i6WSQnlfocIbWn1vIA/1767025523/3296/0x5000c500e9ebbe7d/af85f9c2e4554a5ab82742abdad23820.mp4.m3u8" },
                      { "title": "صياغة اسم المفعول", "stream_url": "https://river-3-330.rtbcdn.ru/hls-vod/0gNGvFUyfyfz0B3P2AOnwQ/1767127512/3266/0x5000c500e9cf2dd8/961e92b0282849f4bacf410cd9a1f2bc.mp4.m3u8" },
                      { "title": "إعمال اسم المفعول", "stream_url": "https://river-5-548.rtbcdn.ru/hls-vod/eOJgQrilY0vkaJawEALRYQ/1767198368/3284/0x5000c500fa6e8c90/572e9fc4e74d4418b01abe3235e36447.mp4.m3u8" },
                      { "title": "أسلوب الاختصاص", "stream_url": "https://river-5-557.rtbcdn.ru/hls-vod/ESDsx-4m4GXcCNwZccMkjg/1767461924/3264/0x5000c500e9ebc6fc/00d10debd60446828cc6bb5d3e08f84d.mp4.m3u8" },
                      { "title": "القصة - الفصل 6", "stream_url": "https://river-3-354.rtbcdn.ru/hls-vod/079es_pOiMnPvrdNnF4fzg/1766944671/3298/0x5000c500e9ebf765/74eb6c57057645519e878415c7f60517.mp4.m3u8" },
                      { "title": "حل الواجب", "stream_url": "https://river-3-363.rtbcdn.ru/hls-vod/ztLwrZidhvNooVNeTs48yg/1767200741/2770/0x5000c500e3c5a86b/e6de259cd91c407ba9843669b7919e3d.mp4.m3u8" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
