import { useState, useMemo } from 'react';
import { dishes, days, meals } from './data';
import Settings, { type SettingsData } from './Settings';

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

  function saveSettings(data: SettingsData) {
    // Если кухня изменилась — очищаем план, он больше неактуален
    if (settings && settings.cuisine !== data.cuisine) {
      setPlan({});
      localStorage.removeItem('weekPlan');
    }

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
    const result: typeof dishes = [];
    Object.values(plan).forEach((day) => {
      Object.values(day).forEach((id) => {
        if (!id) return;
        const dish = dishes.find((d) => d.id === id);
        if (dish) result.push(dish);
      });
    });
    return result;
  }, [plan]);

  const shoppingList = useMemo(() => {
    const map = new Map<
      string,
      { name: string; amount: number; unit: string; price: number }
    >();

    // коэффициент: взрослый = 1.0, ребёнок = 0.6
    const portionFactor = settings
      ? settings.adults * 1.0 + settings.children * 0.6
      : 1;

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
          cuisine: 'russian',
        }}
        onSave={saveSettings}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream text-brown p-6">
      <header className="max-w-6xl mx-auto mb-8 text-center">
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

      <div className="max-w-6xl mx-auto overflow-x-auto mb-10">
        <table className="w-full border-collapse bg-white/60 rounded-2xl shadow-sm">
          <thead>
            <tr>
              <th className="p-3 text-left text-brown/60 font-normal"></th>
              {days.map((d) => (
                <th key={d} className="p-3 text-center font-display text-lg">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal.key} className="border-t border-warm">
                <td className="p-3 font-medium text-terracotta-dark">
                  {meal.label}
                </td>
                {days.map((day) => {
                  const options = dishes.filter((d) => {
  if (d.mealType !== meal.key) return false;
  if (d.cuisine !== settings.cuisine) return false;
  const hasExcluded = d.ingredients.some((ing) =>
    ing.tags.some((tag) => settings.excluded.includes(tag))
  );
  return !hasExcluded;
});
                  const value = plan[day]?.[meal.key] ?? '';
                  return (
                    <td key={day} className="p-2">
                      <select
                        value={value}
                        onChange={(e) => setDish(day, meal.key, e.target.value)}
                        className="w-full p-2 rounded-lg bg-warm/50 border border-warm text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                      >
                        <option value="">—</option>
                        {options.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
            <span className="font-display text-terracotta-dark">{Math.round(total)} ₽</span>
          </div>
          <div
            className={`p-3 rounded-lg text-center font-medium ${
              overBudget
                ? 'bg-red-100 text-red-700'
                : 'bg-sage/20 text-sage'
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
