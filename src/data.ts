export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
  basePrice: number;
  tags: string[]; // теги для фильтрации исключений
};

export type Dish = {
  id: string;
  name: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  cuisine: 'russian' | 'belarusian' | 'ukrainian';
  ingredients: Ingredient[];
  recipe: string;
};

export const dishes: Dish[] = [
  // ─── Русская кухня ───
  {
    id: 'oatmeal',
    name: 'Овсяная каша с ягодами',
    mealType: 'breakfast',
    cuisine: 'russian',
    ingredients: [
      { name: 'Овсяные хлопья', amount: 200, unit: 'г', basePrice: 40, tags: ['Глютен'] },
      { name: 'Молоко', amount: 500, unit: 'мл', basePrice: 35, tags: ['Молоко'] },
      { name: 'Замороженные ягоды', amount: 200, unit: 'г', basePrice: 90, tags: [] },
    ],
    recipe: 'Сварить хлопья в молоке 5–7 минут, добавить ягоды.',
  },
  {
    id: 'omelette',
    name: 'Омлет с сыром',
    mealType: 'breakfast',
    cuisine: 'russian',
    ingredients: [
      { name: 'Яйца', amount: 3, unit: 'шт', basePrice: 22, tags: ['Яйца'] },
      { name: 'Сыр', amount: 50, unit: 'г', basePrice: 55, tags: ['Молоко'] },
      { name: 'Молоко', amount: 50, unit: 'мл', basePrice: 4, tags: ['Молоко'] },
    ],
    recipe: 'Взбить яйца с молоком, вылить на сковороду, посыпать сыром.',
  },
  {
    id: 'syrniki-rus',
    name: 'Сырники со сметаной',
    mealType: 'breakfast',
    cuisine: 'russian',
    ingredients: [
      { name: 'Творог', amount: 400, unit: 'г', basePrice: 120, tags: ['Молоко'] },
      { name: 'Яйца', amount: 1, unit: 'шт', basePrice: 8, tags: ['Яйца'] },
      { name: 'Мука', amount: 60, unit: 'г', basePrice: 6, tags: ['Глютен'] },
      { name: 'Сметана', amount: 100, unit: 'г', basePrice: 25, tags: ['Молоко'] },
    ],
    recipe: 'Смешать творог, яйцо, муку. Сформировать сырники, обжарить, подать со сметаной.',
  },
  {
    id: 'buckwheat-milk',
    name: 'Гречневая каша с молоком',
    mealType: 'breakfast',
    cuisine: 'russian',
    ingredients: [
      { name: 'Гречка', amount: 200, unit: 'г', basePrice: 30, tags: [] },
      { name: 'Молоко', amount: 300, unit: 'мл', basePrice: 21, tags: ['Молоко'] },
      { name: 'Масло сливочное', amount: 20, unit: 'г', basePrice: 15, tags: ['Молоко'] },
    ],
    recipe: 'Сварить гречку, добавить горячее молоко и масло.',
  },
  {
    id: 'borscht',
    name: 'Борщ',
    mealType: 'lunch',
    cuisine: 'russian',
    ingredients: [
      { name: 'Свёкла', amount: 2, unit: 'шт', basePrice: 30, tags: [] },
      { name: 'Капуста', amount: 300, unit: 'г', basePrice: 10, tags: [] },
      { name: 'Картофель', amount: 4, unit: 'шт', basePrice: 20, tags: [] },
      { name: 'Мясо (говядина)', amount: 500, unit: 'г', basePrice: 350, tags: ['Мясо', 'Говядина'] },
      { name: 'Морковь', amount: 1, unit: 'шт', basePrice: 8, tags: [] },
    ],
    recipe: 'Сварить бульон, добавить овощи по очереди, варить до готовности.',
  },
  {
    id: 'shchi',
    name: 'Щи из свежей капусты',
    mealType: 'lunch',
    cuisine: 'russian',
    ingredients: [
      { name: 'Капуста', amount: 400, unit: 'г', basePrice: 14, tags: [] },
      { name: 'Картофель', amount: 3, unit: 'шт', basePrice: 15, tags: [] },
      { name: 'Морковь', amount: 1, unit: 'шт', basePrice: 8, tags: [] },
      { name: 'Лук', amount: 1, unit: 'шт', basePrice: 10, tags: [] },
      { name: 'Мясо (говядина)', amount: 400, unit: 'г', basePrice: 280, tags: ['Мясо', 'Говядина'] },
    ],
    recipe: 'Сварить бульон, добавить капусту и картофель, пассеровать лук с морковью, варить до готовности.',
  },
  {
    id: 'pelmeni',
    name: 'Пельмени домашние',
    mealType: 'lunch',
    cuisine: 'russian',
    ingredients: [
      { name: 'Мука', amount: 400, unit: 'г', basePrice: 40, tags: ['Глютен'] },
      { name: 'Яйца', amount: 1, unit: 'шт', basePrice: 8, tags: ['Яйца'] },
      { name: 'Мясо (говядина)', amount: 400, unit: 'г', basePrice: 280, tags: ['Мясо', 'Говядина'] },
      { name: 'Лук', amount: 1, unit: 'шт', basePrice: 10, tags: [] },
    ],
    recipe: 'Замесить тесто, сделать фарш с луком, слепить пельмени, отварить.',
  },
  {
    id: 'buckwheat',
    name: 'Гречка с грибами',
    mealType: 'dinner',
    cuisine: 'russian',
    ingredients: [
      { name: 'Гречка', amount: 300, unit: 'г', basePrice: 45, tags: [] },
      { name: 'Шампиньоны', amount: 300, unit: 'г', basePrice: 90, tags: [] },
      { name: 'Лук', amount: 1, unit: 'шт', basePrice: 10, tags: [] },
    ],
    recipe: 'Сварить гречку, обжарить грибы с луком, смешать.',
  },
  {
    id: 'salad-chicken',
    name: 'Салат с курицей',
    mealType: 'dinner',
    cuisine: 'russian',
    ingredients: [
      { name: 'Куриная грудка', amount: 300, unit: 'г', basePrice: 140, tags: ['Мясо'] },
      { name: 'Помидоры', amount: 2, unit: 'шт', basePrice: 40, tags: [] },
      { name: 'Огурцы', amount: 2, unit: 'шт', basePrice: 30, tags: [] },
      { name: 'Сметана', amount: 100, unit: 'г', basePrice: 25, tags: ['Молоко'] },
    ],
    recipe: 'Отварить курицу, нарезать овощи, заправить сметаной.',
  },
  {
    id: 'kotlety',
    name: 'Котлеты с пюре',
    mealType: 'dinner',
    cuisine: 'russian',
    ingredients: [
      { name: 'Мясо (говядина)', amount: 400, unit: 'г', basePrice: 280, tags: ['Мясо', 'Говядина'] },
      { name: 'Лук', amount: 1, unit: 'шт', basePrice: 10, tags: [] },
      { name: 'Яйца', amount: 1, unit: 'шт', basePrice: 8, tags: ['Яйца'] },
      { name: 'Картофель', amount: 5, unit: 'шт', basePrice: 25, tags: [] },
      { name: 'Молоко', amount: 100, unit: 'мл', basePrice: 7, tags: ['Молоко'] },
    ],
    recipe: 'Сделать фарш с луком и яйцом, обжарить котлеты. Сварить картофель, растолочь с молоком.',
  },
  {
    id: 'fish-baked',
    name: 'Рыба запечённая с овощами',
    mealType: 'dinner',
    cuisine: 'russian',
    ingredients: [
      { name: 'Рыба (минтай)', amount: 500, unit: 'г', basePrice: 250, tags: ['Рыба'] },
      { name: 'Морковь', amount: 2, unit: 'шт', basePrice: 16, tags: [] },
      { name: 'Лук', amount: 1, unit: 'шт', basePrice: 10, tags: [] },
      { name: 'Масло растительное', amount: 30, unit: 'мл', basePrice: 10, tags: [] },
    ],
    recipe: 'Выложить рыбу на противень с овощами, сбрызнуть маслом, запекать 25–30 минут при 180°C.',
  },

  // ─── Белорусская кухня ───
  {
    id: 'draniki',
    name: 'Драники',
    mealType: 'breakfast',
    cuisine: 'belarusian',
    ingredients: [
      { name: 'Картофель', amount: 6, unit: 'шт', basePrice: 30, tags: [] },
      { name: 'Яйца', amount: 1, unit: 'шт', basePrice: 8, tags: ['Яйца'] },
      { name: 'Мука', amount: 50, unit: 'г', basePrice: 5, tags: ['Глютен'] },
      { name: 'Лук', amount: 1, unit: 'шт', basePrice: 10, tags: [] },
    ],
    recipe: 'Натереть картофель, смешать с яйцом и мукой, жарить до золотистой корочки.',
  },
  {
    id: 'syrniki-bel',
    name: 'Сырники по-белорусски',
    mealType: 'breakfast',
    cuisine: 'belarusian',
    ingredients: [
      { name: 'Творог', amount: 400, unit: 'г', basePrice: 120, tags: ['Молоко'] },
      { name: 'Яйца', amount: 2, unit: 'шт', basePrice: 15, tags: ['Яйца'] },
      { name: 'Мука', amount: 80, unit: 'г', basePrice: 8, tags: ['Глютен'] },
      { name: 'Сметана', amount: 100, unit: 'г', basePrice: 25, tags: ['Молоко'] },
    ],
    recipe: 'Смешать творог, яйца, муку. Обжарить сырники, подать со сметаной.',
  },
  {
    id: 'kasha-mushroom',
    name: 'Каша перловая с грибами',
    mealType: 'breakfast',
    cuisine: 'belarusian',
    ingredients: [
      { name: 'Перловка', amount: 200, unit: 'г', basePrice: 25, tags: ['Глютен'] },
      { name: 'Шампиньоны', amount: 200, unit: 'г', basePrice: 60, tags: [] },
      { name: 'Лук', amount: 1, unit: 'шт', basePrice: 10, tags: [] },
      { name: 'Масло сливочное', amount: 20, unit: 'г', basePrice: 15, tags: ['Молоко'] },
    ],
    recipe: 'Сварить перловку, обжарить грибы с луком, смешать с маслом.',
  },
  {
    id: 'machanka',
    name: 'Мачанка с блинами',
    mealType: 'lunch',
    cuisine: 'belarusian',
    ingredients: [
      { name: 'Свинина', amount: 400, unit: 'г', basePrice: 250, tags: ['Мясо', 'Свинина'] },
      { name: 'Лук', amount: 2, unit: 'шт', basePrice: 20, tags: [] },
      { name: 'Мука', amount: 100, unit: 'г', basePrice: 10, tags: ['Глютен'] },
      { name: 'Молоко', amount: 300, unit: 'мл', basePrice: 21, tags: ['Молоко'] },
      { name: 'Яйца', amount: 2, unit: 'шт', basePrice: 15, tags: ['Яйца'] },
    ],
    recipe: 'Обжарить свинину с луком, залить соусом. Блины: смешать муку, молоко, яйца, жарить.',
  },
  {
    id: 'zhurek',
    name: 'Журек',
    mealType: 'lunch',
    cuisine: 'belarusian',
    ingredients: [
      { name: 'Мясо (говядина)', amount: 400, unit: 'г', basePrice: 280, tags: ['Мясо', 'Говядина'] },
      { name: 'Картофель', amount: 4, unit: 'шт', basePrice: 20, tags: [] },
      { name: 'Морковь', amount: 1, unit: 'шт', basePrice: 8, tags: [] },
      { name: 'Лук', amount: 1, unit: 'шт', basePrice: 10, tags: [] },
      { name: 'Сметана', amount: 100, unit: 'г', basePrice: 25, tags: ['Молоко'] },
    ],
    recipe: 'Сварить бульон с мясом, добавить картофель и овощи, заправить сметаной.',
  },
  {
    id: 'potato-pancakes',
    name: 'Картофельные оладьи',
    mealType: 'dinner',
    cuisine: 'belarusian',
    ingredients: [
      { name: 'Картофель', amount: 5, unit: 'шт', basePrice: 25, tags: [] },
      { name: 'Яйца', amount: 1, unit: 'шт', basePrice: 8, tags: ['Яйца'] },
      { name: 'Мука', amount: 40, unit: 'г', basePrice: 4, tags: ['Глютен'] },
    ],
    recipe: 'Натереть картофель, добавить яйцо и муку, жарить оладьи.',
  },
  {
    id: 'kolduny',
    name: 'Колдуны',
    mealType: 'dinner',
    cuisine: 'belarusian',
    ingredients: [
      { name: 'Картофель', amount: 8, unit: 'шт', basePrice: 40, tags: [] },
      { name: 'Мясо (свинина)', amount: 300, unit: 'г', basePrice: 200, tags: ['Мясо', 'Свинина'] },
      { name: 'Лук', amount: 1, unit: 'шт', basePrice: 10, tags: [] },
      { name: 'Сметана', amount: 150, unit: 'г', basePrice: 38, tags: ['Молоко'] },
    ],
    recipe: 'Натереть картофель, сделать фарш с луком, сформировать колдуны, обжарить и тушить со сметаной.',
  },
  {
    id: 'golubtsy-bel',
    name: 'Голубцы по-белорусски',
    mealType: 'dinner',
    cuisine: 'belarusian',
    ingredients: [
      { name: 'Капуста', amount: 500, unit: 'г', basePrice: 17, tags: [] },
      { name: 'Мясо (свинина)', amount: 400, unit: 'г', basePrice: 250, tags: ['Мясо', 'Свинина'] },
      { name: 'Рис', amount: 150, unit: 'г', basePrice: 20, tags: [] },
      { name: 'Лук', amount: 1, unit: 'шт', basePrice: 10, tags: [] },
    ],
    recipe: 'Завернуть фарш с рисом в капустные листья, тушить 40 минут.',
  },

  // ─── Украинская кухня ───
  {
    id: 'syrniki',
    name: 'Сырники',
    mealType: 'breakfast',
    cuisine: 'ukrainian',
    ingredients: [
      { name: 'Творог', amount: 400, unit: 'г', basePrice: 120, tags: ['Молоко'] },
      { name: 'Яйца', amount: 1, unit: 'шт', basePrice: 8, tags: ['Яйца'] },
      { name: 'Мука', amount: 60, unit: 'г', basePrice: 6, tags: ['Глютен'] },
    ],
    recipe: 'Смешать творог, яйцо и муку, сформировать сырники, обжарить.',
  },
  {
    id: 'nalesniki',
    name: 'Блины с творогом',
    mealType: 'breakfast',
    cuisine: 'ukrainian',
    ingredients: [
      { name: 'Мука', amount: 200, unit: 'г', basePrice: 20, tags: ['Глютен'] },
      { name: 'Молоко', amount: 400, unit: 'мл', basePrice: 28, tags: ['Молоко'] },
      { name: 'Яйца', amount: 2, unit: 'шт', basePrice: 15, tags: ['Яйца'] },
      { name: 'Творог', amount: 300, unit: 'г', basePrice: 90, tags: ['Молоко'] },
    ],
    recipe: 'Замесить тесто, испечь блины, завернуть творожную начинку.',
  },
  {
    id: 'vareniki',
    name: 'Вареники с картошкой',
    mealType: 'lunch',
    cuisine: 'ukrainian',
    ingredients: [
      { name: 'Мука', amount: 300, unit: 'г', basePrice: 30, tags: ['Глютен'] },
      { name: 'Картофель', amount: 5, unit: 'шт', basePrice: 25, tags: [] },
      { name: 'Лук', amount: 2, unit: 'шт', basePrice: 20, tags: [] },
      { name: 'Яйца', amount: 1, unit: 'шт', basePrice: 8, tags: ['Яйца'] },
    ],
    recipe: 'Замесить тесто, слепить вареники с картофельной начинкой, отварить.',
  },
  {
    id: 'borscht-ukr',
    name: 'Борщ украинский с пампушками',
    mealType: 'lunch',
    cuisine: 'ukrainian',
    ingredients: [
      { name: 'Свёкла', amount: 2, unit: 'шт', basePrice: 30, tags: [] },
      { name: 'Капуста', amount: 300, unit: 'г', basePrice: 10, tags: [] },
      { name: 'Картофель', amount: 4, unit: 'шт', basePrice: 20, tags: [] },
      { name: 'Мясо (говядина)', amount: 500, unit: 'г', basePrice: 350, tags: ['Мясо', 'Говядина'] },
      { name: 'Мука', amount: 200, unit: 'г', basePrice: 20, tags: ['Глютен'] },
      { name: 'Чеснок', amount: 3, unit: 'зуб', basePrice: 10, tags: [] },
    ],
    recipe: 'Сварить борщ. Пампушки: замесить дрожжевое тесто, испечь, смазать чесночным соусом.',
  },
  {
    id: 'deruny',
    name: 'Деруны',
    mealType: 'lunch',
    cuisine: 'ukrainian',
    ingredients: [
      { name: 'Картофель', amount: 6, unit: 'шт', basePrice: 30, tags: [] },
      { name: 'Яйца', amount: 1, unit: 'шт', basePrice: 8, tags: ['Яйца'] },
      { name: 'Мука', amount: 50, unit: 'г', basePrice: 5, tags: ['Глютен'] },
      { name: 'Сметана', amount: 150, unit: 'г', basePrice: 38, tags: ['Молоко'] },
    ],
    recipe: 'Натереть картофель, смешать с яйцом и мукой, жарить деруны, подать со сметаной.',
  },
  {
    id: 'golubtsy',
    name: 'Голубцы',
    mealType: 'dinner',
    cuisine: 'ukrainian',
    ingredients: [
      { name: 'Капуста', amount: 500, unit: 'г', basePrice: 17, tags: [] },
      { name: 'Мясо (говядина)', amount: 400, unit: 'г', basePrice: 280, tags: ['Мясо', 'Говядина'] },
      { name: 'Рис', amount: 150, unit: 'г', basePrice: 20, tags: [] },
      { name: 'Лук', amount: 1, unit: 'шт', basePrice: 10, tags: [] },
    ],
    recipe: 'Завернуть мясной фарш с рисом в капустные листья, тушить.',
  },
  {
    id: 'chicken-kiev',
    name: 'Котлета по-киевски',
    mealType: 'dinner',
    cuisine: 'ukrainian',
    ingredients: [
      { name: 'Куриная грудка', amount: 400, unit: 'г', basePrice: 180, tags: ['Мясо'] },
      { name: 'Масло сливочное', amount: 50, unit: 'г', basePrice: 38, tags: ['Молоко'] },
      { name: 'Яйца', amount: 2, unit: 'шт', basePrice: 15, tags: ['Яйца'] },
      { name: 'Мука', amount: 100, unit: 'г', basePrice: 10, tags: ['Глютен'] },
    ],
    recipe: 'Отбить грудку, завернуть масло, обвалять в муке и яйце, обжарить.',
  },
  {
    id: 'stew-potato',
    name: 'Тушёная картошка с мясом',
    mealType: 'dinner',
    cuisine: 'ukrainian',
    ingredients: [
      { name: 'Картофель', amount: 6, unit: 'шт', basePrice: 30, tags: [] },
      { name: 'Мясо (свинина)', amount: 400, unit: 'г', basePrice: 250, tags: ['Мясо', 'Свинина'] },
      { name: 'Морковь', amount: 1, unit: 'шт', basePrice: 8, tags: [] },
      { name: 'Лук', amount: 1, unit: 'шт', basePrice: 10, tags: [] },
    ],
    recipe: 'Обжарить мясо, добавить овощи и картофель, тушить 30–40 минут.',
  },
];

export const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const meals = [
  { key: 'breakfast', label: 'Завтрак' },
  { key: 'lunch', label: 'Обед' },
  { key: 'dinner', label: 'Ужин' },
] as const;
