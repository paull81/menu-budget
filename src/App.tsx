import { useState, useMemo } from 'react';
import { dishes, days, meals } from './data';
import Settings, { type SettingsData } from './Settings';

function roundByUnit(value: number, unit: string): number {
  if (unit === 'шт' || unit === 'зуб') return Math.max(1, Math.round(value));
  if (unit === 'г') return Math.round(value / 5) * 5;
  if (unit === 'мл') return Math.round(value / 10) * 10;
  return Math.round(value);
}

type Plan = Record<string, Record<string, string | undefined>>;

export default function App() {
  const [plan, setPlan] = useState<Plan>(() => {
    const saved = localStorage.getItem('weekPlan');
    return saved ? JSON.parse(saved) : {};
  });

  const [budget, setBudget] = useState<number>(() => {
    const saved = localStorage.getItem('budget');
    return saved ? Number(saved) : 3000;
  });

  const [settings, setSettings] = useState<SettingsData | null>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeDay, setActiveDay] = useState<string>(days[0]);

  function saveSettings(data: SettingsData) {
    
    setSettings(data);
    localStorage.setItem('settings', JSON.stringify(data));
  }

  function setDish(day: string, meal: string, dishId: string) {
    const updated = {
      ...plan,
      [day]: { ...plan[day], [meal]: dishId || undefined },
    };
    setPlan(updated);
    localStorage.setItem('weekPlan', JSON.stringify(updated));
  }

  function updateBudget(value: number) {
    setBudget(value);
    localStorage.setItem('budget', String(value));
  }

  const selectedDishes = useMemo(() => {
    if (!settings) return [];
    const result: typeof dishes = [];
    Object.values(plan).forEach((day) => {
      Object.values(day).forEach((id) => {
        if (!id) return;
        const dish = dishes.find((d) => d.id === id);
        if (!dish) return;
       
        const hasExcluded = dish.ingredients.some((ing) =>
          ing.tags.some((tag) => settings.excluded.includes(tag))
        );
        if (hasExcluded) return;
        result.push(dish);
      });
    });
    return result;
  }, [plan, settings]);

  const portionFactor = settings
    ? settings.adults * 1.0 + settings.children * 0.6
    : 1;

  const shoppingList = useMemo(() => {
    const map = new Map<
      string,
      { name: string; amount: number; unit: string; price: number }
    >();

    

    selectedDishes.forEach((dish) => {
      dish.ingredients.forEach((ing) => {
        const existing = map.get(ing.name);
        const scaledAmount = ing.amount * portionFactor;
        const scaledPrice = ing.basePrice * portionFactor;

        if (existing && existing.unit === ing.unit) {
          existing.amount += scaledAmount;
          existing.price += scaledPrice;
        } else if (existing) {
          existing.price += scaledPrice;
        } else {
          map.set(ing.name, {
            name: ing.name,
            amount: scaledAmount,
            unit: ing.unit,
            price: scaledPrice,
          });
        }
      });
    });

    return Array.from(map.values());
  }, [selectedDishes, settings]);

  const total = shoppingList.reduce((sum, item) => sum + item.price, 0);
  const overBudget = total > budget;

  if (!settings) {
    return (
      <Settings
        initial={{
          adults: 2,
          children: 0,
          store: 'pyaterochka',
          mealMode: 'shared',
          excluded: [],
          
        }}
        onSave={saveSettings}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream text-brown p-6">
      <header className="max-w-6xl mx-auto mb-6 text-center">
        <h1 className="font-display text-4xl text-terracotta-dark mb-2">
          Меню на неделю
        </h1>
        <p className="text-brown/70 mb-2">Составь план — а я соберу список покупок</p>
        <button
          onClick={() => {
            localStorage.removeItem('settings');
            setSettings(null);
          }}
          className="text-sm text-terracotta hover:underline"
        >
          Изменить настройки
        </button>
      </header>

      {/* Переключатель дней */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((d) => {
            const filled = plan[d] && Object.values(plan[d]).some(Boolean);
            return (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition ${
                  activeDay === d
                    ? 'bg-terracotta text-white'
                    : 'bg-white/60 text-brown hover:bg-white'
                }`}
              >
                {d}
                {filled && (
                  <span
                    className={`ml-2 inline-block w-2 h-2 rounded-full ${
                      activeDay === d ? 'bg-white' : 'bg-sage'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Приёмы пищи выбранного дня */}
      <div className="max-w-6xl mx-auto mb-10 space-y-4">
        {meals.map((meal) => {
          const options = dishes.filter((d) => {
            if (d.mealType !== meal.key) return false;
            
            const hasExcluded = d.ingredients.some((ing) =>
              ing.tags.some((tag) => settings.excluded.includes(tag))
            );
            return !hasExcluded;
          });
          const value = plan[activeDay]?.[meal.key] ?? '';
          const selectedDish = value
            ? dishes.find((d) => d.id === value)
            : null;

          return (
            <div
              key={meal.key}
              className="bg-white/70 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="font-display text-xl text-terracotta-dark md:w-40">
                  {meal.label}
                </div>
                <select
                  value={value}
                  onChange={(e) => setDish(activeDay, meal.key, e.target.value)}
                  className="flex-1 p-2 rounded-lg bg-warm/50 border border-warm focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                >
                  <option value="">— выбери блюдо —</option>
                  {options.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDish && (
                <details className="mt-3 group">
                  <summary className="cursor-pointer text-sm text-terracotta hover:underline list-none">
                    📖 Показать рецепт и ингредиенты
                  </summary>
                                    <div className="mt-3 pl-4 border-l-2 border-warm">
                    <h4 className="font-medium mb-1">
                      Ингредиенты{' '}
                      <span className="text-xs text-brown/50 font-normal">
                        (на {settings.adults} взр.
                        {settings.children > 0
                          ? ` + ${settings.children} реб.`
                          : ''}
                        )
                      </span>
                    </h4>
                    <ul className="text-sm text-brown/80 mb-3 space-y-0.5">
                      {selectedDish.ingredients.map((ing) => {
                        const scaled = ing.amount * portionFactor;
                        return (
                          <li key={ing.name}>
                            • {ing.name} —{' '}
                            <span className="font-medium text-brown">
                              {roundByUnit(scaled, ing.unit)} {ing.unit}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    <h4 className="font-medium mb-1">Приготовление</h4>
                    <p className="text-sm text-brown/80 leading-relaxed">
                      {selectedDish.recipe}
                    </p>
                  </div>
                </details>
              )}
            </div>
          );
        })}
      </div>

      {/* Список покупок + бюджет */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <section className="bg-white/70 rounded-2xl p-6 shadow-sm">
          <h2 className="font-display text-2xl text-terracotta-dark mb-4">
            Список покупок
          </h2>
          {shoppingList.length === 0 ? (
            <p className="text-brown/60">
              Выбери блюда в плане — здесь появится список.
            </p>
          ) : (
            <ul className="space-y-2">
              {shoppingList.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-between items-center border-b border-warm pb-2 last:border-0"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-brown/60">
                      {Math.round(item.amount)} {item.unit}
                    </div>
                  </div>
                  <div className="text-terracotta-dark font-medium">
                    {Math.round(item.price)} ₽
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-white/70 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="font-display text-2xl text-terracotta-dark mb-4">
            Бюджет
          </h2>
          <label className="block mb-2 text-sm text-brown/70">
            Лимит на неделю, ₽
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => updateBudget(Number(e.target.value))}
            className="w-full p-2 rounded-lg bg-warm/50 border border-warm mb-4 focus:outline-none focus:ring-2 focus:ring-terracotta/40"
          />
          <div className="flex justify-between text-lg mb-2">
            <span>Итого:</span>
            <span className="font-display text-terracotta-dark">
              {Math.round(total)} ₽
            </span>
          </div>
          <div
            className={`p-3 rounded-lg text-center font-medium ${
              overBudget ? 'bg-red-100 text-red-700' : 'bg-sage/20 text-sage'
            }`}
          >
            {overBudget
              ? `Перерасход на ${Math.round(total - budget)} ₽`
              : `В бюджете, осталось ${Math.round(budget - total)} ₽`}
          </div>
        </section>
      </div>
    </div>
  );
}
