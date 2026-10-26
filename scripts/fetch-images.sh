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
dl technic-palette.jpg       "https://mcgrocer.com/cdn/shop/files/e05b9f70f2209bbfd30dd81fed57293991dde42e24387740545238397c5eccc9.jpg"
dl technic-palette-2.jpg     "https://mcgrocer.com/cdn/shop/files/a8eb90fee36670d7beb4bc32a00b42d04d958ad71a773196dd6ca9862c9cf007.jpg"
dl relouis-foundation.jpeg   "https://cdn21vek.by/img/galleries/9145/386/youreallysecondskin20naturalbeige_relouis_9145386_668fc8417b979.jpeg"
