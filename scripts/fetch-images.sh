#!/usr/bin/env bash
set -euo pipefail
mkdir -p public/products
dl () { curl -fL --retry 2 --max-time 30 -o "public/products/$1" "$2" && echo "ok $1" || echo "FAIL $1"; }

dl missha-bb-50.jpg          "https://www.vitacost.com/cdn/shop/files/55_7074b220-5e40-494a-9ec2-673282c6cded.jpg"
dl missha-bb-20.png          "https://misshaus.com/cdn/shop/files/bbcreammini21shade_d0e47c9f-d407-4786-a44d-6ee04bb91e61.png"
dl anua-azelaic.png          "https://www.boozyshop.com/cdn/shop/files/anua-azelaic-acid-10-hyaluron-redness-soothing-serum-70646205972863.png"
dl anua-heartleaf-toner.png  "https://www.boozyshop.com/cdn/shop/products/anua-heartleaf-77-soothing-toner-36754905694484.png"
dl anua-peach-serum.jpg      "https://koreanskincare.com/cdn/shop/files/Anua_Peach70_NiacinSerum_Packshot.jpg"
dl biobalance-wash.png       "https://images.e-menessaptieka.lv/unsafe/fit-in/588x588/c3/44/0ac6440cfd1bcf1f009da6fdcf14.png"
dl biobalance-balm.jpg       "https://www.cosmeticclick.com/images/products/19091/hello-clean-balsamo-de-limpeza-iluminador-2025057123430-cosmeticclick.jpg"
dl dermokil-sabun.webp       "https://dermokil.com/cdn/shop/files/komurlu-detoks-dogal-kati-sabun-100-gr-1.webp"
dl topface-matte.jpg         "https://www.bloompharmacy.com/cdn/shop/files/topface-skin-editor-matte-foundation-32ml-01-918344.jpg"
dl topface-concealer.jpg     "https://www.bloompharmacy.com/cdn/shop/files/topface-instyle-lasting-finish-concealer-1-6948303.jpg"
dl topface-maestro.jpg       "https://spacenet.tn/266783-large_default/topface-eyeshadow-maestro-academy-n001-soft-dream.jpg"
dl sheglam-highlighter.jpg   "https://www.watsons.sa/cdn/shop/files/ASW20000020238_101.jpg"
dl sheglam-powder.jpg        "https://www.watsons.sa/cdn/shop/files/ASW20000017083_101.jpg"
dl sheglam-blush.jpg         "https://www.watsons.sa/cdn/shop/files/ASW20000017140_101.jpg"
dl sheglam-blush-2.jpg       "https://www.watsons.sa/cdn/shop/files/ASW20000017723_101.jpg"
dl sheglam-gloss.jpg         "https://www.watsons.sa/cdn/shop/files/ASW20000017729_101.jpg"
dl technic-triple-wave.png   "https://cdn2.primor.eu/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/2/4/24725_Triple_Wave___Dark_wc_sq_removebg_preview_6245.png"
dl technic-mascara.jpg       "https://www.boozyshop.com/cdn/shop/files/technic-mega-lash-mega-volumsing-mascara-blue-1.jpg"
dl technic-mascara-wr.jpg    "https://www.boozyshop.com/cdn/shop/products/technic-mega-lash-water-resistant-36755439943956.jpg"
dl technic-brushes.jpg       "https://lloydspharmacy.com/cdn/shop/files/5021769832249_3.jpg"
# mcgrocer.com отдаёт HTTP-ошибку, палетка берётся с сайта Technic
dl technic-palette.jpg       "https://techniccosmetics.com/cdn/shop/files/21540shadelightandbright-WC.jpg"
dl relouis-foundation.jpeg   "https://cdn21vek.by/img/galleries/9145/386/youreallysecondskin20naturalbeige_relouis_9145386_668fc8417b979.jpeg"

# Вторая партия: пакшоты с сайтов брендов и ритейлеров
dl skinsensual-bb.jpg        "https://witcdn.dermoeczanem.com/skinsensual-bb-krem-medium-spf50-50-ml-skin-sensual-224047-91-B.jpg"
dl skinsensual-concealer.jpg "https://witcdn.dermoeczanem.com/skinsensual-magic-eye-duo-repair-cc-light-to-medium-goz-alti-kremi-15-ml-skin-sensual-224200-91-B.jpg"
dl ct-mega-mat.jpg           "https://images.ctfassets.net/wlke2cbybljx/WxDJPKUVXMMi80A4zkm0w/65124d0b96ed9b1e558b238b268e4786/AFF_Bronzer_Medium_Packshot.png?bg=rgb%3Affffff&fm=jpg&w=1000&h=1000&fit=pad&q=85"
dl creamco-vitc.jpg          "https://cdn.shopify.com/s/files/1/0781/6049/4837/files/1-sos-serum-sari-web_04e1cfae-f2a1-406f-a22f-3034672ccf04.jpg?v=1791353311"
dl sport-fix.jpg             "https://cdn.shopify.com/s/files/1/1002/6015/1641/files/20577_1.jpg?v=1774015813"
dl sheglam-gift.jpg          "https://ecombe.nahdionline.com/media/catalog/product/1/0/103937621_a45a8ae0bea02a2d7_79123.jpg"
dl wonka-set.jpg             "https://trb-cosmetics.com/cdn/shop/files/IMG-9336.jpg?v=1760111727"
# Lovefest снят с продажи, пакшот из Wayback Machine (может отвечать 429, повторить позже)
dl huda-lovefest.jpg         "http://web.archive.org/web/20241008232248im_/https://hudabeauty.com/dw/image/v2/BCNC_PRD/on/demandware.static/-/Sites-huda-master-catalog/default/dwe4953947/images/Lovefest_Cream_Blush/_0010__0002_Love%20Fest-Creamy-Kiss-Blush.jpg?sw=1200&sh=1200&sm=fit"
