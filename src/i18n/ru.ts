import type { Dict } from "./az";

const ru: Dict = {
  code: "ru",
  label: "RU",
  htmlLang: "ru",

  demo: {
    banner: "Демо-версия: заказы не обрабатываются, деньги не списываются.",
  },

  nav: {
    home: "Главная",
    catalog: "Каталог",
    cart: "Корзина",
    language: "Язык",
    menu: "Меню",
  },

  benefits: {
    delivery: "Доставка по Баку",
    post: "Почта в регионы",
    installment: "Беспроцентная рассрочка BÖL ÖDƏ",
  },

  hero: {
    title: "ORX beauty",
    subtitle:
      "Магазин косметики в Баку. Корейский уход, декоративная косметика и подарочные наборы — в беспроцентную рассрочку до 35 месяцев.",
    cta: "В каталог",
  },

  home: {
    categories: "Категории",
    tabNew: "Новинки",
    tabBest: "Хиты продаж",
    tabSale: "Со скидкой",
    seeAll: "Смотреть все",
    prev: "Назад",
    next: "Вперёд",
  },

  bolOde: {
    title: "BÖL ÖDƏ",
    subtitle: "Беспроцентная внутренняя рассрочка до {months} месяцев",
    text:
      "Любой товар в магазине можно взять по частям: без банка и без процентов, нужно только удостоверение личности. Условия уточняйте в магазине или в Instagram.",
    example: "Например, {price} — всего {monthly} в месяц",
    cta: "В каталог",
  },

  categories: {
    uz: "Лицо",
    goz: "Глаза",
    dodaq: "Губы",
    enlik: "Румяна и хайлайтер",
    baxim: "Уход",
    sac: "Волосы",
    firca: "Кисти и аксессуары",
    dest: "Наборы",
  },

  product: {
    new: "Новинка",
    addToCart: "В корзину {price}",
    added: "Добавлено",
    inStock: "В наличии",
    outOfStock: "Нет в наличии",
    qty: "Количество",
    decrease: "Меньше",
    increase: "Больше",
    ingredients: "Состав",
    usage: "Способ применения",
    related: "С этим покупают",
    noBrand: "Без бренда",
    installmentHint: "В BÖL ÖDƏ на {months} мес.: {monthly}/мес.",
    notFound: "Товар не найден",
    imageAlt: "{name} — фото",
    count: "{n} тов.",
  },

  catalog: {
    title: "Каталог",
    filters: "Фильтры",
    category: "Категория",
    brand: "Бренд",
    sort: "Сортировка",
    sortDefault: "По умолчанию",
    sortAsc: "Цена: по возрастанию",
    sortDesc: "Цена: по убыванию",
    clearAll: "Очистить всё",
    results: "{n} тов.",
    empty: "По выбранным фильтрам ничего не найдено.",
    close: "Закрыть",
    apply: "Показать: {n}",
    removeFilter: "Убрать фильтр: {name}",
  },

  cart: {
    title: "Корзина",
    items: "{n} тов.",
    empty: "Корзина пуста",
    emptyText: "Добавьте понравившиеся товары из каталога.",
    goCatalog: "В каталог",
    subtotal: "Товары",
    delivery: "Доставка",
    deliveryCalc: "при оформлении",
    total: "Итого",
    checkout: "Оформить заказ",
    remove: "Удалить",
    continueShopping: "Продолжить покупки",
  },

  checkout: {
    title: "Оформление заказа",
    step1: "Контакты и доставка",
    step2: "Подтверждение",
    name: "Имя",
    namePlaceholder: "Ваше имя",
    phone: "Телефон",
    phonePlaceholder: "+994 XX XXX XX XX",
    method: "Способ получения",
    pickup: "Самовывоз из магазина",
    pickupHint: "Şəmsi Bədəlbəyli 100A, ежедневно 10:00–20:00",
    baku: "Доставка по Баку",
    bakuHint: "Курьером, 1–2 дня",
    post: "Почта в регионы",
    postHint: "Azərpoçt, 3–5 дней",
    address: "Адрес",
    addressPlaceholder: "Город, улица, дом, квартира",
    comment: "Комментарий",
    commentPlaceholder: "Примечание к заказу (необязательно)",
    next: "Продолжить",
    back: "Назад",
    free: "Бесплатно",
    orderSummary: "Состав заказа",
    contact: "Контакты",
    pay: "Оплатить {total}",
    paying: "Обрабатываем оплату…",
    demoPay:
      "Демонстрационный режим: деньги не списываются, заказ никуда не отправляется. В реальном магазине здесь откроется платёжная система.",
    emptyCart: "Корзина пуста — оформлять нечего.",
    errors: {
      nameRequired: "Укажите имя",
      phoneInvalid: "Введите телефон в формате +994 XX XXX XX XX",
      addressRequired: "Укажите адрес доставки",
    },
  },

  success: {
    title: "Заказ принят",
    orderNumber: "Номер заказа",
    text: "Это демонстрация: в реальном магазине вам бы пришло SMS или позвонил менеджер.",
    home: "На главную",
    catalog: "В каталог",
  },

  footer: {
    address: "Адрес",
    addressValue: "Баку, Насими, Şəmsi Bədəlbəyli 100A",
    near: "рядом с Neptun market",
    phone: "Телефон",
    hours: "Часы работы",
    hoursValue: "Ежедневно 10:00–20:00",
    instagram: "Instagram",
    note: "© 2026 ORX beauty · Демо-версия",
  },

  common: {
    home: "Главная",
    close: "Закрыть",
    loading: "Загрузка…",
  },
};

export default ru;
