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
];

export const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const meals = [
  { key: 'breakfast', label: 'Завтрак' },
  { key: 'lunch', label: 'Обед' },
  { key: 'dinner', label: 'Ужин' },
] as const;