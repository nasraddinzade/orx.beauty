import type { Localized } from "@/i18n";

export type Category =
  | "uz"
  | "goz"
  | "dodaq"
  | "enlik"
  | "baxim"
  | "sac"
  | "firca"
  | "dest";

export const CATEGORIES: Category[] = [
  "uz",
  "goz",
  "dodaq",
  "enlik",
  "baxim",
  "sac",
  "firca",
  "dest",
];

export type Product = {
  id: number;
  slug: string;
  /** Пустая строка — товар без бренда. */
  brand: string;
  name: Localized;
  price: number;
  oldPrice?: number;
  category: Category;
  description: Localized;
  ingredients: Localized;
  usage: Localized;
  /** Локальные пути вида /products/missha-bb-50.jpg. Пусто — плитка-плейсхолдер. */
  images: string[];
  /** Для табов на главной: Yeniliklər и Çox satılanlar. Endirimdə — по oldPrice. */
  isNew?: boolean;
  isBestseller?: boolean;
};

type Texts = Pick<Product, "description" | "ingredients" | "usage">;

/*
 * ВНИМАНИЕ: описания, составы и способы применения ниже — черновые,
 * написаны по типу продукта и подлежат подтверждению магазином.
 * Цены без пометки «подтверждена» проставлены правдоподобно и помечены
 * комментарием // qiymət dəqiqləşdirilməlidir.
 */
const T = {
  bb: {
    description: {
      az: "Yüngül örtüklü BB krem: tonu bərabərləşdirir, qüsurları gizlədir və SPF ilə günəşdən qoruyur. Gündəlik təbii makiyaj üçün.",
      ru: "BB-крем с лёгким покрытием: выравнивает тон, скрывает несовершенства и защищает от солнца. Для естественного макияжа на каждый день.",
    },
    ingredients: {
      az: "Su, siklopentasiloksan, titan dioksid, gliserin, niasinamid, hialuron turşusu, E vitamini, bitki ekstraktları.",
      ru: "Вода, циклопентасилоксан, диоксид титана, глицерин, ниацинамид, гиалуроновая кислота, витамин E, растительные экстракты.",
    },
    usage: {
      az: "Baxım kremindən sonra az miqdarda alın, barmaq və ya süngərlə üzə bərabər paylayın. Lazım gələrsə ikinci qat çəkin.",
      ru: "После ухода нанести небольшое количество и распределить пальцами или спонжем. При необходимости добавить второй слой.",
    },
  },
  foundation: {
    description: {
      az: "Mat və ya təbii bitişli tonal krem: məsamələri hamarlayır, gün boyu dayanır, yağlı parıltını nəzarətdə saxlayır.",
      ru: "Тональный крем со стойким покрытием: сглаживает поры, держится весь день и контролирует жирный блеск.",
    },
    ingredients: {
      az: "Su, dimetikon, izododekan, kaolin, titan dioksid, dəmir oksidləri, gliserin, E vitamini.",
      ru: "Вода, диметикон, изододекан, каолин, диоксид титана, оксиды железа, глицерин, витамин E.",
    },
    usage: {
      az: "Nəmləndirici və ya bazadan sonra bir damla götürüb üzün mərkəzindən kənara doğru fırça və ya süngərlə paylayın.",
      ru: "После увлажнения или базы распределить от центра лица к краям кистью или спонжем.",
    },
  },
  concealer: {
    description: {
      az: "Yüksək örtüklü konsiler göz altı qaraltıları və qızartıları gizlədir, qırışlara yığılmır, mat bitiş verir.",
      ru: "Консилер с высоким покрытием скрывает тёмные круги и покраснения, не скатывается в морщинки, матовый финиш.",
    },
    ingredients: {
      az: "Su, dimetikon, gliserin, titan dioksid, dəmir oksidləri, kofein, hialuron turşusu.",
      ru: "Вода, диметикон, глицерин, диоксид титана, оксиды железа, кофеин, гиалуроновая кислота.",
    },
    usage: {
      az: "Tonal kremdən sonra göz altına və lazımi yerlərə nöqtələrlə vurun, barmaq ucu ilə yumşaq paylayın.",
      ru: "После тонального крема нанести точками под глаза и на нужные зоны, растушевать подушечкой пальца.",
    },
  },
  powder: {
    description: {
      az: "Şəffaf nəmləndirici pudra makiyajı sabitləyir, parıltını götürür və toz kimi qalmır.",
      ru: "Прозрачная увлажняющая пудра фиксирует макияж, убирает блеск и не ложится пылью.",
    },
    ingredients: {
      az: "Mika, silika, nylon-12, hialuron turşusu, gliserin, E vitamini.",
      ru: "Слюда, кремнезём, нейлон-12, гиалуроновая кислота, глицерин, витамин E.",
    },
    usage: {
      az: "Tonal kremdən sonra yumşaq fırça və ya pufla T-zonaya və bütün üzə nazik qat çəkin.",
      ru: "После тонального крема нанести тонким слоем кистью или пуховкой на T-зону и всё лицо.",
    },
  },
  facePalette: {
    description: {
      az: "Hər şey bir paletdə: bronzer, kontur, iki pudra, iki ənlik və iki highlighter. Səyahət və gündəlik makiyaj üçün.",
      ru: "Всё в одной палетке: бронзер, контур, две пудры, двое румян и два хайлайтера. Для путешествий и ежедневного макияжа.",
    },
    ingredients: {
      az: "Talk, mika, maqnezium stearat, dimetikon, dəmir oksidləri, titan dioksid, ətir.",
      ru: "Тальк, слюда, стеарат магния, диметикон, оксиды железа, диоксид титана, отдушка.",
    },
    usage: {
      az: "Tonal kremdən sonra: kontur yanaq altına, bronzer üzün kənarlarına, ənlik almacıqlara, highlighter çıxıntılara.",
      ru: "После тона: контур под скулы, бронзер по краям лица, румяна на яблочки щёк, хайлайтер на выступающие зоны.",
    },
  },
  highlighter: {
    description: {
      az: "İncə parıltılı highlighter dəriyə sağlam işıq verir, parçacıqları hiss olunmur.",
      ru: "Хайлайтер с мелким сиянием даёт коже здоровое свечение, частицы не ощущаются.",
    },
    ingredients: {
      az: "Mika, talk, sintetik fluorflogopit, dimetikon, titan dioksid, qalay oksidi.",
      ru: "Слюда, тальк, синтетический флюорфлогопит, диметикон, диоксид титана, оксид олова.",
    },
    usage: {
      az: "Almacıqların üstünə, burun körpüsünə və dodaq üstünə yumşaq fırça ilə vurun.",
      ru: "Нанести мягкой кистью на верх скул, спинку носа и над губой.",
    },
  },
  blush: {
    description: {
      az: "Krem ənlik dəriyə təbii çəhrayı çalar verir, asan paylanır və gün boyu dayanır.",
      ru: "Кремовые румяна дают коже естественный румянец, легко растушёвываются и держатся весь день.",
    },
    ingredients: {
      az: "İzododekan, dimetikon, mika, mum, dəmir oksidləri, E vitamini.",
      ru: "Изододекан, диметикон, слюда, воск, оксиды железа, витамин E.",
    },
    usage: {
      az: "Barmaq ucu və ya süngərlə almacıqlara vurub kənarlara doğru paylayın.",
      ru: "Нанести пальцем или спонжем на яблочки щёк и растушевать к вискам.",
    },
  },
  bronzer: {
    description: {
      az: "Mat bronzer üzə isti çalar və həcm verir, narıncıya çalmır.",
      ru: "Матовый бронзер придаёт лицу тёплый оттенок и объём, не уходит в рыжину.",
    },
    ingredients: {
      az: "Talk, mika, maqnezium miristat, dəmir oksidləri, dimetikon.",
      ru: "Тальк, слюда, миристат магния, оксиды железа, диметикон.",
    },
    usage: {
      az: "Böyük fırça ilə almacıq altına, alının kənarlarına və çənə xəttinə «3» şəklində vurun.",
      ru: "Большой кистью нанести в форме «3» под скулы, по краям лба и вдоль линии челюсти.",
    },
  },
  mascara: {
    description: {
      az: "Həcm verən maskara kirpikləri qalınlaşdırır və ayırır, tökülmür və qatlanmır.",
      ru: "Тушь для объёма утолщает и разделяет ресницы, не осыпается и не склеивает.",
    },
    ingredients: {
      az: "Su, arı mumu, karnauba mumu, qliserin stearat, dəmir oksidləri, pantenol.",
      ru: "Вода, пчелиный воск, воск карнаубы, глицерил стеарат, оксиды железа, пантенол.",
    },
    usage: {
      az: "Fırçanı kirpiyin dibindən ucuna doğru ziqzaqla çəkin. Lazım gələrsə ikinci qat vurun.",
      ru: "Прокрасить ресницы зигзагом от корней к кончикам. При необходимости нанести второй слой.",
    },
  },
  eyePencil: {
    description: {
      az: "Yumşaq göz qələmi dəqiq xətt çəkir, sürtülmür və gün boyu qalır.",
      ru: "Мягкий карандаш для глаз рисует чёткую линию, не смазывается и держится весь день.",
    },
    ingredients: {
      az: "Siklopentasiloksan, sintetik mum, mikrokristal mum, piqmentlər, E vitamini.",
      ru: "Циклопентасилоксан, синтетический воск, микрокристаллический воск, пигменты, витамин E.",
    },
    usage: {
      az: "Kirpik xətti boyunca çəkin. Ağ qələmlə alt su xətti böyüdülmüş göz effekti verir.",
      ru: "Провести вдоль линии ресниц. Белым карандашом по нижней слизистой — эффект распахнутого взгляда.",
    },
  },
  eyeshadow: {
    description: {
      az: "Göz kölgəsi paleti: mat və parıltılı çalarlar gündəlik və axşam makiyajı üçün. Yüksək piqmentli, asan paylanır.",
      ru: "Палетка теней: матовые и сияющие оттенки для дневного и вечернего макияжа. Высокая пигментация, легко растушёвываются.",
    },
    ingredients: {
      az: "Talk, mika, maqnezium stearat, dimetikon, piqmentlər, paraben yoxdur.",
      ru: "Тальк, слюда, стеарат магния, диметикон, пигменты, без парабенов.",
    },
    usage: {
      az: "Açıq çaları bütün göz qapağına, tündü xarici küncə, parıltılını qapağın ortasına vurun.",
      ru: "Светлый оттенок на всё веко, тёмный во внешний угол, сияющий в центр века.",
    },
  },
  lipCombo: {
    description: {
      az: "Dodaq dəsti: kontur qələmi, mat pomada, parıltı və balzam — bir çalarda, bir-birinə uyğun.",
      ru: "Набор для губ: контурный карандаш, матовая помада, блеск и бальзам — в одном оттенке, подобраны друг к другу.",
    },
    ingredients: {
      az: "Mum, bitki yağları, piqmentlər, E vitamini, ətir.",
      ru: "Воски, растительные масла, пигменты, витамин E, отдушка.",
    },
    usage: {
      az: "Əvvəl kontur, sonra pomada, üstündən parıltı; gecə balzam.",
      ru: "Сначала контур, затем помада, сверху блеск; на ночь — бальзам.",
    },
  },
  lipBalm: {
    description: {
      az: "Şəffaf dodaq balzamı quruluğu aradan qaldırır, yumşaq parıltı verir, pomada altına uyğundur.",
      ru: "Прозрачный бальзам для губ снимает сухость, даёт мягкий блеск, подходит под помаду.",
    },
    ingredients: {
      az: "Şi yağı, arı mumu, hindistan cevizi yağı, E vitamini.",
      ru: "Масло ши, пчелиный воск, кокосовое масло, витамин E.",
    },
    usage: {
      az: "Lazım olduqca dodaqlara çəkin.",
      ru: "Наносить на губы по мере необходимости.",
    },
  },
  lipGloss: {
    description: {
      az: "Yapışmayan dodaq parıltısı dodaqları vizual dolğunlaşdırır, nəmləndirir və uzun müddət qalır.",
      ru: "Нелипкий блеск для губ визуально увеличивает губы, увлажняет и долго держится.",
    },
    ingredients: {
      az: "Polibuten, hidrogenləşdirilmiş poliizobuten, jojoba yağı, E vitamini, piqmentlər.",
      ru: "Полибутен, гидрогенизированный полиизобутен, масло жожоба, витамин E, пигменты.",
    },
    usage: {
      az: "Tək və ya pomadanın üstündən aplikatorla çəkin.",
      ru: "Наносить аппликатором отдельно или поверх помады.",
    },
  },
  serum: {
    description: {
      az: "Konsentrə serum: hədəfli təsir, yüngül tekstura, tez hopur. Gündəlik baxım üçün.",
      ru: "Концентрированная сыворотка: прицельное действие, лёгкая текстура, быстро впитывается. Для ежедневного ухода.",
    },
    ingredients: {
      az: "Su, aktiv komponent, gliserin, pantenol, hialuron turşusu, allantoin.",
      ru: "Вода, активный компонент, глицерин, пантенол, гиалуроновая кислота, аллантоин.",
    },
    usage: {
      az: "Tonikdən sonra 2–3 damla üzə yumşaq hərəkətlərlə vurun, sonra krem. Səhər SPF istifadə edin.",
      ru: "После тоника 2–3 капли нанести мягкими движениями, затем крем. Утром использовать SPF.",
    },
  },
  toner: {
    description: {
      az: "Sakitləşdirici tonik qızartını azaldır, dərini nəmləndirir və sonrakı baxıma hazırlayır. Həssas dəri üçün.",
      ru: "Успокаивающий тонер снимает покраснение, увлажняет и готовит кожу к дальнейшему уходу. Для чувствительной кожи.",
    },
    ingredients: {
      az: "Houttuynia cordata ekstraktı 77%, su, gliserin, betain, pantenol, allantoin.",
      ru: "Экстракт хауттюйнии 77%, вода, глицерин, бетаин, пантенол, аллантоин.",
    },
    usage: {
      az: "Yumadan sonra ovuca və ya pambığa tökün və üzə vurun. Kompres kimi də istifadə olunur.",
      ru: "После умывания нанести ладонями или ватным диском. Можно использовать как компресс.",
    },
  },
  cleanser: {
    description: {
      az: "Yumşaq üz yuma geli makiyaj qalıqlarını və çirki təmizləyir, dərini qurutmur.",
      ru: "Мягкий гель для умывания удаляет остатки макияжа и загрязнения, не сушит кожу.",
    },
    ingredients: {
      az: "Su, kokoqlükozid, gliserin, pantenol, aloe ekstraktı, limon turşusu.",
      ru: "Вода, кокоглюкозид, глицерин, пантенол, экстракт алоэ, лимонная кислота.",
    },
    usage: {
      az: "Nəm üzə köpüklədirib masaj edin, ilıq su ilə yuyun. Səhər və axşam.",
      ru: "Вспенить на влажном лице, помассировать, смыть тёплой водой. Утром и вечером.",
    },
  },
  balm: {
    description: {
      az: "Təmizləyici balzam makiyajı və SPF-i əridir, suya toxunanda südə çevrilir. İkiqat təmizləmənin ilk addımı.",
      ru: "Очищающий бальзам растворяет макияж и SPF, при контакте с водой превращается в молочко. Первый шаг двойного очищения.",
    },
    ingredients: {
      az: "Bitki yağları, polietilen qlikol, şi yağı, C vitamini, ətir.",
      ru: "Растительные масла, полиэтиленгликоль, масло ши, витамин C, отдушка.",
    },
    usage: {
      az: "Quru üzə masaj edin, az su ilə emulsiyalaşdırıb yuyun, sonra gel ilə yuyun.",
      ru: "Помассировать на сухом лице, эмульгировать небольшим количеством воды и смыть, затем умыться гелем.",
    },
  },
  soap: {
    description: {
      az: "Kömürlü bərk sabun məsamələri dərindən təmizləyir və artıq yağı götürür. Yağlı və qarışıq dəri üçün.",
      ru: "Твёрдое мыло с углём глубоко очищает поры и убирает излишки жира. Для жирной и комбинированной кожи.",
    },
    ingredients: {
      az: "Zeytun yağı, hindistan cevizi yağı, aktivləşdirilmiş kömür, gil, efir yağları.",
      ru: "Оливковое масло, кокосовое масло, активированный уголь, глина, эфирные масла.",
    },
    usage: {
      az: "Köpüklədib üzə və bədənə sürtün, su ilə yuyun. Həftədə 2–3 dəfə.",
      ru: "Вспенить, нанести на лицо и тело, смыть водой. 2–3 раза в неделю.",
    },
  },
  mist: {
    description: {
      az: "Sabitləyici sprey makiyajı gün boyu saxlayır, dərini təravətləndirir və toz effektini aradan qaldırır.",
      ru: "Фиксирующий спрей держит макияж весь день, освежает кожу и убирает эффект пудры.",
    },
    ingredients: {
      az: "Su, spirt denat., gliserin, PVP, aloe ekstraktı, ətir.",
      ru: "Вода, спирт денат., глицерин, PVP, экстракт алоэ, отдушка.",
    },
    usage: {
      az: "Makiyajdan sonra 20–25 sm məsafədən «X» və «T» şəklində çiləyin.",
      ru: "После макияжа распылить с расстояния 20–25 см по схеме «X» и «T».",
    },
  },
  hairSerum: {
    description: {
      az: "Saç serumu uclarını hamarlayır, parıltı verir və qıvrılmanı azaldır. Yağlı iz qoymur.",
      ru: "Сыворотка для волос сглаживает кончики, придаёт блеск и уменьшает пушистость. Не оставляет жирного следа.",
    },
    ingredients: {
      az: "Siklopentasiloksan, dimetikonol, arqan yağı, keratin, E vitamini.",
      ru: "Циклопентасилоксан, диметиконол, аргановое масло, кератин, витамин E.",
    },
    usage: {
      az: "Nəm və ya quru saçın uclarına 1–2 damla vurun, kökə dəyməyin.",
      ru: "1–2 капли на кончики влажных или сухих волос, не затрагивая корни.",
    },
  },
  brushSet: {
    description: {
      az: "Fırça dəsti üz və göz makiyajı üçün: yumşaq sintetik tüklər, rahat tutacaq, tük tökmür.",
      ru: "Набор кистей для лица и глаз: мягкий синтетический ворс, удобная ручка, не осыпается.",
    },
    ingredients: {
      az: "Sintetik tük, alüminium qoltuq, taxta tutacaq.",
      ru: "Синтетический ворс, алюминиевая обойма, деревянная ручка.",
    },
    usage: {
      az: "Həftədə bir dəfə yumşaq şampunla yuyun və üfüqi vəziyyətdə qurudun.",
      ru: "Раз в неделю мыть мягким шампунем и сушить горизонтально.",
    },
  },
  brush: {
    description: {
      az: "İkitərəfli yanaq fırçası: bir tərəf ənlik və bronzer, digəri highlighter üçün.",
      ru: "Двусторонняя кисть для щёк: одна сторона для румян и бронзера, другая для хайлайтера.",
    },
    ingredients: {
      az: "Sintetik tük, alüminium qoltuq, plastik tutacaq.",
      ru: "Синтетический ворс, алюминиевая обойма, пластиковая ручка.",
    },
    usage: {
      az: "Məhsulu fırçaya götürüb artığını çırpın, yumşaq dairəvi hərəkətlərlə paylayın.",
      ru: "Набрать продукт, стряхнуть излишки, растушевать мягкими круговыми движениями.",
    },
  },
  sponge: {
    description: {
      az: "Makiyaj süngəri tonal kremi və konsileri izsiz paylayır. Nəm halda genişlənir və yumşalır.",
      ru: "Спонж для макияжа растушёвывает тон и консилер без следов. Во влажном виде увеличивается и становится мягче.",
    },
    ingredients: {
      az: "Lateks tərkibsiz poliuretan köpük.",
      ru: "Полиуретановая пена без латекса.",
    },
    usage: {
      az: "Su ilə isladıb sıxın, məhsulu döyəcləyici hərəkətlərlə vurun. Hər istifadədən sonra yuyun.",
      ru: "Смочить водой и отжать, наносить похлопывающими движениями. Мыть после каждого использования.",
    },
  },
  bag: {
    description: {
      az: "Üç ölçüdə kosmetik çanta dəsti: böyüyü səyahət üçün, kiçiyi çantaya. Su keçirməyən astar.",
      ru: "Набор из трёх косметичек разного размера: большая для путешествий, маленькая в сумку. Водонепроницаемая подкладка.",
    },
    ingredients: {
      az: "Polyester, PU astar, metal zəncir.",
      ru: "Полиэстер, подкладка PU, металлическая молния.",
    },
    usage: {
      az: "Nəm salfetlə silin, maşında yumayın.",
      ru: "Протирать влажной салфеткой, не стирать в машине.",
    },
  },
  giftSet: {
    description: {
      az: "Hədiyyə dəsti bəzəkli qutuda: hazır hədiyyə, əlavə heç nə lazım deyil.",
      ru: "Подарочный набор в красивой коробке: готовый подарок, ничего докупать не нужно.",
    },
    ingredients: {
      az: "Dəstin tərkibi mağazada dəqiqləşdirilir.",
      ru: "Состав набора уточняйте в магазине.",
    },
    usage: {
      az: "Hər məhsulu öz təyinatı üzrə istifadə edin.",
      ru: "Каждый продукт использовать по назначению.",
    },
  },
} satisfies Record<string, Texts>;

export const products: Product[] = [
  {
    id: 1,
    slug: "missha-bb-50",
    brand: "Missha",
    name: {
      az: "M Perfect Cover BB Cream SPF42 No.31, 50 ml",
      ru: "M Perfect Cover BB Cream SPF42 No.31, 50 мл",
    },
    price: 19.9, // подтверждена
    category: "uz",
    images: ["/products/missha-bb-50.jpg"],
    isBestseller: true,
    ...T.bb,
  },
  {
    id: 2,
    slug: "missha-bb-20",
    brand: "Missha",
    name: {
      az: "M Perfect Cover BB Cream, 20 ml",
      ru: "M Perfect Cover BB Cream, 20 мл",
    },
    price: 13.5, // подтверждена
    category: "uz",
    images: ["/products/missha-bb-20.png"],
    ...T.bb,
  },
  {
    id: 3,
    slug: "skinsensual-bb",
    brand: "SkinSensual",
    name: { az: "BB krem", ru: "BB-крем" },
    price: 18.9, // подтверждена
    oldPrice: 27, // подтверждена
    category: "uz",
    images: [],
    ...T.bb,
  },
  {
    id: 4,
    slug: "technic-triple-wave",
    brand: "Technic",
    name: {
      az: "Triple Wave serum tonal krem",
      ru: "Triple Wave тональный крем-сыворотка",
    },
    price: 24.9, // qiymət dəqiqləşdirilməlidir
    category: "uz",
    images: ["/products/technic-triple-wave.png"],
    isNew: true,
    ...T.foundation,
  },
  {
    id: 5,
    slug: "topface-matte",
    brand: "Topface",
    name: {
      az: "Skin Editor Matte tonal krem",
      ru: "Skin Editor Matte тональный крем",
    },
    price: 22.9, // qiymət dəqiqləşdirilməlidir
    category: "uz",
    images: ["/products/topface-matte.jpg"],
    ...T.foundation,
  },
  {
    id: 6,
    slug: "relouis-foundation",
    brand: "Relouis",
    name: {
      az: "Y.O.U. Really Second Skin tonal krem",
      ru: "Y.O.U. Really Second Skin тональный крем",
    },
    price: 18.5, // qiymət dəqiqləşdirilməlidir
    category: "uz",
    images: ["/products/relouis-foundation.jpeg"],
    ...T.foundation,
  },
  {
    id: 7,
    slug: "skinsensual-concealer",
    brand: "SkinSensual",
    name: { az: "Magic Face konsiler", ru: "Magic Face консилер" },
    price: 16.9, // qiymət dəqiqləşdirilməlidir
    category: "uz",
    images: [],
    ...T.concealer,
  },
  {
    id: 8,
    slug: "topface-concealer",
    brand: "Topface",
    name: {
      az: "Instyle Lasting Finish konsiler",
      ru: "Instyle Lasting Finish консилер",
    },
    price: 20.9, // подтверждена
    category: "uz",
    images: ["/products/topface-concealer.jpg"],
    isBestseller: true,
    ...T.concealer,
  },
  {
    id: 9,
    slug: "sheglam-powder",
    brand: "Sheglam",
    name: {
      az: "Hydro-Touch şəffaf pudra",
      ru: "Hydro-Touch прозрачная пудра",
    },
    price: 21.9, // qiymət dəqiqləşdirilməlidir
    category: "uz",
    images: ["/products/sheglam-powder.jpg"],
    isNew: true,
    ...T.powder,
  },
  {
    id: 10,
    slug: "technic-palette",
    brand: "Technic",
    name: {
      az: "Üz paleti: bronzer, kontur, 2 pudra, 2 ənlik, 2 highlighter",
      ru: "Палетка для лица: бронзер, контур, 2 пудры, 2 румян, 2 хайлайтера",
    },
    price: 30, // подтверждена
    category: "enlik",
    // Оба кадра с mcgrocer.com не скачались (HTTP-ошибка) — плитка-плейсхолдер.
    images: [],
    isBestseller: true,
    ...T.facePalette,
  },
  {
    id: 11,
    slug: "sheglam-highlighter",
    brand: "Sheglam",
    name: { az: "Lunar Glow highlighter", ru: "Lunar Glow хайлайтер" },
    price: 19.9, // qiymət dəqiqləşdirilməlidir
    category: "enlik",
    images: ["/products/sheglam-highlighter.jpg"],
    isNew: true,
    ...T.highlighter,
  },
  {
    id: 12,
    slug: "sheglam-blush",
    brand: "Sheglam",
    name: {
      az: "Cheeky Color Jam krem ənlik",
      ru: "Cheeky Color Jam кремовые румяна",
    },
    price: 17.9, // qiymət dəqiqləşdirilməlidir
    category: "enlik",
    images: ["/products/sheglam-blush.jpg", "/products/sheglam-blush-2.jpg"],
    isBestseller: true,
    ...T.blush,
  },
  {
    id: 13,
    slug: "huda-lovefest",
    brand: "Huda Beauty",
    name: { az: "Lovefest ənlik", ru: "Lovefest румяна" },
    price: 32, // qiymət dəqiqləşdirilməlidir
    category: "enlik",
    images: [],
    ...T.blush,
  },
  {
    id: 14,
    slug: "ct-mega-mat",
    brand: "Charlotte Tilbury",
    name: { az: "Mega Mat bronzer", ru: "Mega Mat бронзер" },
    price: 89, // qiymət dəqiqləşdirilməlidir
    category: "enlik",
    images: [],
    ...T.bronzer,
  },
  {
    id: 15,
    slug: "technic-mascara",
    brand: "Technic",
    name: { az: "Mega Lash maskara", ru: "Mega Lash тушь" },
    price: 16, // подтверждена
    category: "goz",
    images: ["/products/technic-mascara.jpg"],
    isBestseller: true,
    ...T.mascara,
  },
  {
    id: 16,
    slug: "technic-mascara-wr",
    brand: "Technic",
    name: { az: "Suya davamlı maskara", ru: "Водостойкая тушь" },
    price: 14.9, // qiymət dəqiqləşdirilməlidir
    category: "goz",
    images: ["/products/technic-mascara-wr.jpg"],
    ...T.mascara,
  },
  {
    id: 17,
    slug: "eyeliner-fine",
    brand: "",
    name: { az: "İncə uclu eyeliner qələmi", ru: "Подводка-фломастер с тонким кончиком" },
    price: 11.9, // qiymət dəqiqləşdirilməlidir
    category: "goz",
    images: [],
    ...T.eyePencil,
  },
  {
    id: 18,
    slug: "white-pencil",
    brand: "",
    name: { az: "Ağ göz qələmi", ru: "Белый карандаш для глаз" },
    price: 6.9, // qiymət dəqiqləşdirilməlidir
    category: "goz",
    images: [],
    ...T.eyePencil,
  },
  {
    id: 19,
    slug: "eyeshadow-15",
    brand: "",
    name: { az: "15 tonluq göz kölgəsi paleti", ru: "Палетка теней, 15 оттенков" },
    price: 27.9, // qiymət dəqiqləşdirilməlidir
    category: "goz",
    images: [],
    ...T.eyeshadow,
  },
  {
    id: 20,
    slug: "topface-maestro",
    brand: "Topface",
    name: {
      az: "Maestro Academy göz kölgəsi paleti",
      ru: "Maestro Academy палетка теней",
    },
    price: 24.9, // qiymət dəqiqləşdirilməlidir
    category: "goz",
    images: ["/products/topface-maestro.jpg"],
    isNew: true,
    ...T.eyeshadow,
  },
  {
    id: 21,
    slug: "lip-combo",
    brand: "",
    name: { az: "Lip combo dəsti, 4 ədəd", ru: "Lip combo набор, 4 шт." },
    price: 24, // qiymət dəqiqləşdirilməlidir
    category: "dodaq",
    images: [],
    isBestseller: true,
    ...T.lipCombo,
  },
  {
    id: 22,
    slug: "clear-lip-balm",
    brand: "",
    name: { az: "Şəffaf lip balm", ru: "Прозрачный бальзам для губ" },
    price: 9.9, // qiymət dəqiqləşdirilməlidir
    category: "dodaq",
    images: [],
    ...T.lipBalm,
  },
  {
    id: 23,
    slug: "sheglam-gloss",
    brand: "Sheglam",
    name: { az: "Immortal Love lip gloss", ru: "Immortal Love блеск для губ" },
    price: 13.9, // qiymət dəqiqləşdirilməlidir
    category: "dodaq",
    images: ["/products/sheglam-gloss.jpg"],
    isNew: true,
    ...T.lipGloss,
  },
  {
    id: 24,
    slug: "anua-azelaic",
    brand: "Anua",
    name: {
      az: "Azelaic Acid 10% + Hyaluron serum",
      ru: "Azelaic Acid 10% + Hyaluron сыворотка",
    },
    price: 34.9, // qiymət dəqiqləşdirilməlidir
    category: "baxim",
    images: ["/products/anua-azelaic.png"],
    isNew: true,
    description: {
      az: "Azelain turşusu 10% və hialuronla serum: qızartını və ləkələri azaldır, məsamələri təmizləyir, dərini nəmləndirir.",
      ru: "Сыворотка с азелаиновой кислотой 10% и гиалуроном: уменьшает покраснения и пятна, очищает поры, увлажняет.",
    },
    ingredients: {
      az: "Su, azelain turşusu 10%, hialuron turşusu, niasinamid, pantenol, allantoin, betain.",
      ru: "Вода, азелаиновая кислота 10%, гиалуроновая кислота, ниацинамид, пантенол, аллантоин, бетаин.",
    },
    usage: T.serum.usage,
  },
  {
    id: 25,
    slug: "anua-heartleaf",
    brand: "Anua",
    name: { az: "Heartleaf 77 Soothing Toner", ru: "Heartleaf 77 Soothing Toner" },
    price: 29.9, // qiymət dəqiqləşdirilməlidir
    category: "baxim",
    images: ["/products/anua-heartleaf-toner.png"],
    isNew: true,
    isBestseller: true,
    ...T.toner,
  },
  {
    id: 26,
    slug: "anua-peach",
    brand: "Anua",
    name: { az: "Peach 70 Niacin Serum", ru: "Peach 70 Niacin Serum" },
    price: 32.9, // qiymət dəqiqləşdirilməlidir
    category: "baxim",
    images: ["/products/anua-peach-serum.jpg"],
    isNew: true,
    description: {
      az: "Şaftalı ekstraktı 70% və niasinamidlə serum: tonu işıqlandırır, ləkələri azaldır, dərini nəmləndirir və yumşaldır.",
      ru: "Сыворотка с экстрактом персика 70% и ниацинамидом: выравнивает тон, уменьшает пятна, увлажняет и смягчает кожу.",
    },
    ingredients: {
      az: "Şaftalı meyvə ekstraktı 70%, niasinamid, gliserin, pantenol, hialuron turşusu, betain.",
      ru: "Экстракт персика 70%, ниацинамид, глицерин, пантенол, гиалуроновая кислота, бетаин.",
    },
    usage: T.serum.usage,
  },
  {
    id: 27,
    slug: "creamco-vitc",
    brand: "Cream Co.",
    name: { az: "Vitamin C 15% serum", ru: "Сыворотка с витамином C 15%" },
    price: 29.9, // qiymət dəqiqləşdirilməlidir
    category: "baxim",
    images: [],
    description: {
      az: "C vitamini 15% serum: tonu işıqlandırır, ləkələri azaldır və dərini sərbəst radikallardan qoruyur.",
      ru: "Сыворотка с витамином C 15%: придаёт сияние, уменьшает пигментацию и защищает от свободных радикалов.",
    },
    ingredients: {
      az: "Su, askorbin turşusu 15%, ferul turşusu, E vitamini, gliserin, hialuron turşusu.",
      ru: "Вода, аскорбиновая кислота 15%, феруловая кислота, витамин E, глицерин, гиалуроновая кислота.",
    },
    usage: T.serum.usage,
  },
  {
    id: 28,
    slug: "biobalance-wash",
    brand: "Biobalance",
    name: { az: "Hello Clean üz yuma geli", ru: "Hello Clean гель для умывания" },
    price: 16.9, // qiymət dəqiqləşdirilməlidir
    category: "baxim",
    images: ["/products/biobalance-wash.png"],
    isNew: true,
    ...T.cleanser,
  },
  {
    id: 29,
    slug: "biobalance-balm",
    brand: "Biobalance",
    name: {
      az: "Hello Clean təmizləyici balzam",
      ru: "Hello Clean очищающий бальзам",
    },
    price: 19.9, // qiymət dəqiqləşdirilməlidir
    category: "baxim",
    images: ["/products/biobalance-balm.jpg"],
    isNew: true,
    ...T.balm,
  },
  {
    id: 30,
    slug: "dermokil-sabun",
    brand: "Dermokil",
    name: { az: "Kömürlü detoks sabunu", ru: "Детокс-мыло с углём" },
    price: 7.9, // qiymət dəqiqləşdirilməlidir
    category: "baxim",
    images: ["/products/dermokil-sabun.webp"],
    ...T.soap,
  },
  {
    id: 31,
    slug: "hoppa-mist",
    brand: "HOPPA",
    name: { az: "Mist və fix sprey", ru: "Мист и фиксирующий спрей" },
    price: 15.9, // qiymət dəqiqləşdirilməlidir
    category: "baxim",
    images: [],
    isNew: true,
    ...T.mist,
  },
  {
    id: 32,
    slug: "sport-fix",
    brand: "Sport Fix",
    name: { az: "Makiyaj sabitləyici sprey", ru: "Спрей-фиксатор макияжа" },
    price: 17.9, // подтверждена
    category: "baxim",
    images: [],
    isBestseller: true,
    ...T.mist,
  },
  {
    id: 33,
    slug: "kamali-serum",
    brand: "Kamali",
    name: { az: "Liama saç serumu", ru: "Liama сыворотка для волос" },
    price: 13.5, // подтверждена
    category: "sac",
    images: [],
    isBestseller: true,
    ...T.hairSerum,
  },
  {
    id: 34,
    slug: "technic-brushes",
    brand: "Technic",
    name: { az: "Flawless fırça dəsti", ru: "Flawless набор кистей" },
    price: 24.9, // qiymət dəqiqləşdirilməlidir
    category: "firca",
    images: ["/products/technic-brushes.jpg"],
    isBestseller: true,
    ...T.brushSet,
  },
  {
    id: 35,
    slug: "technic-duo-brush",
    brand: "Technic",
    name: {
      az: "PRO ikitərəfli yanaq fırçası",
      ru: "PRO двусторонняя кисть для щёк",
    },
    price: 12.9, // qiymət dəqiqləşdirilməlidir
    category: "firca",
    images: [],
    ...T.brush,
  },
  {
    id: 36,
    slug: "makeup-sponge",
    brand: "",
    name: { az: "Makiyaj süngəri", ru: "Спонж для макияжа" },
    price: 5.9, // qiymət dəqiqləşdirilməlidir
    category: "firca",
    images: [],
    ...T.sponge,
  },
  {
    id: 37,
    slug: "cosmetic-bag-3",
    brand: "",
    name: { az: "Kosmetik çanta, 3 ədəd dəst", ru: "Косметички, набор 3 шт." },
    price: 29.9, // qiymət dəqiqləşdirilməlidir
    category: "firca",
    images: [],
    ...T.bag,
  },
  {
    id: 38,
    slug: "sheglam-gift",
    brand: "Sheglam",
    name: { az: "Hədiyyə dəsti", ru: "Подарочный набор" },
    price: 22, // подтверждена
    oldPrice: 25.5, // подтверждена
    category: "dest",
    images: [],
    isBestseller: true,
    ...T.giftSet,
  },
  {
    id: 39,
    slug: "wonka-set",
    brand: "",
    name: {
      az: "Willy Wonka kosmetika dəsti",
      ru: "Набор косметики Willy Wonka",
    },
    price: 155, // подтверждена
    oldPrice: 215, // подтверждена
    category: "dest",
    images: [],
    description: {
      az: "Willy Wonka mövzulu böyük kosmetika dəsti: göz kölgələri, dodaq məhsulları, ənlik və aksesuarlar bir qutuda. Böyük hədiyyə üçün.",
      ru: "Большой набор косметики в стиле Willy Wonka: тени, средства для губ, румяна и аксессуары в одной коробке. Для большого подарка.",
    },
    ingredients: T.giftSet.ingredients,
    usage: T.giftSet.usage,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Уникальные бренды в порядке появления; пустой бренд в список не входит. */
export function getBrands(): string[] {
  const seen = new Set<string>();
  for (const p of products) if (p.brand) seen.add(p.brand);
  return [...seen].sort((a, b) => a.localeCompare(b));
}

/** Значение фильтра для товаров без бренда. */
export const NO_BRAND = "_none";
