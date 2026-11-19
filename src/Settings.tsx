import { useState } from 'react';

export type SettingsData = {
  adults: number;
  children: number;
  store: 'pyaterochka' | 'magnit';
  mealMode: 'shared' | 'separate';
  excluded: string[];
  cuisine: 'russian' | 'belarusian' | 'ukrainian';
};

const EXCLUDED_OPTIONS = [
  'Молоко',
  'Яйца',
  'Мясо',
  'Рыба',
  'Глютен',
  'Орехи',
  'Свинина',
  'Говядина',
];

const CUISINES = [
  { value: 'russian', label: 'Русская' },
  { value: 'belarusian', label: 'Белорусская' },
  { value: 'ukrainian', label: 'Украинская' },
] as const;

type Props = {
  initial: SettingsData;
  onSave: (data: SettingsData) => void;
};

export default function Settings({ initial, onSave }: Props) {
  const [data, setData] = useState<SettingsData>(initial);

  function toggleExcluded(name: string) {
    setData((prev) => ({
      ...prev,
      excluded: prev.excluded.includes(name)
        ? prev.excluded.filter((x) => x !== name)
        : [...prev.excluded, name],
    }));
  }

  return (
    <div className="min-h-screen bg-cream text-brown p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/70 rounded-2xl p-8 shadow-sm">
        <h1 className="font-display text-3xl text-terracotta-dark mb-6 text-center">
          Настройка меню
        </h1>

        {/* Состав семьи */}
        <section className="mb-6">
          <h2 className="font-display text-xl mb-3">Состав семьи</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-brown/70">Взрослые</span>
              <input
                type="number"
                min={1}
                value={data.adults}
                onChange={(e) =>
                  setData({ ...data, adults: Number(e.target.value) })
                }
                className="w-full mt-1 p-2 rounded-lg bg-warm/50 border border-warm focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              />
            </label>
            <label className="block">
              <span className="text-sm text-brown/70">Дети</span>
              <input
                type="number"
                min={0}
                value={data.children}
                onChange={(e) =>
                  setData({ ...data, children: Number(e.target.value) })
                }
                className="w-full mt-1 p-2 rounded-lg bg-warm/50 border border-warm focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              />
            </label>
          </div>
        </section>

        {/* Магазин */}
        <section className="mb-6">
          <h2 className="font-display text-xl mb-3">Магазин</h2>
          <div className="flex gap-4">
            {[
              { value: 'pyaterochka', label: 'Пятёрочка' },
              { value: 'magnit', label: 'Магнит' },
            ].map((s) => (
              <label
                key={s.value}
                className={`flex-1 p-3 rounded-lg border cursor-pointer text-center transition ${
                  data.store === s.value
                    ? 'bg-terracotta text-white border-terracotta'
                    : 'bg-warm/50 border-warm'
                }`}
              >
                <input
                  type="radio"
                  name="store"
                  value={s.value}
                  checked={data.store === s.value}
                  onChange={() =>
                    setData({ ...data, store: s.value as SettingsData['store'] })
                  }
                  className="hidden"
                />
                {s.label}
              </label>
            ))}
          </div>
        </section>

        {/* Приёмы пищи */}
        <section className="mb-6">
          <h2 className="font-display text-xl mb-3">Приёмы пищи</h2>
          <div className="flex gap-4">
            {[
              { value: 'shared', label: 'Совместные' },
              { value: 'separate', label: 'Раздельные' },
            ].map((m) => (
              <label
                key={m.value}
                className={`flex-1 p-3 rounded-lg border cursor-pointer text-center transition ${
                  data.mealMode === m.value
                    ? 'bg-terracotta text-white border-terracotta'
                    : 'bg-warm/50 border-warm'
                }`}
              >
                <input
                  type="radio"
                  name="mealMode"
                  value={m.value}
                  checked={data.mealMode === m.value}
                  onChange={() =>
                    setData({
                      ...data,
                      mealMode: m.value as SettingsData['mealMode'],
                    })
                  }
                  className="hidden"
                />
                {m.label}
              </label>
            ))}
          </div>
        </section>

        {/* Исключения */}
        <section className="mb-6">
          <h2 className="font-display text-xl mb-3">
            Исключить продукты
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {EXCLUDED_OPTIONS.map((name) => (
              <label
                key={name}
                className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition ${
                  data.excluded.includes(name)
                    ? 'bg-sage/20 border-sage'
                    : 'bg-warm/50 border-warm'
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.excluded.includes(name)}
                  onChange={() => toggleExcluded(name)}
                  className="accent-terracotta"
                />
                {name}
              </label>
            ))}
          </div>
        </section>

        {/* Кухня */}
        <section className="mb-8">
          <h2 className="font-display text-xl mb-3">Кухня</h2>
          <div className="flex gap-3">
            {CUISINES.map((c) => (
              <label
                key={c.value}
                className={`flex-1 p-3 rounded-lg border cursor-pointer text-center transition ${
                  data.cuisine === c.value
                    ? 'bg-terracotta text-white border-terracotta'
                    : 'bg-warm/50 border-warm'
                }`}
              >
                <input
                  type="radio"
                  name="cuisine"
                  value={c.value}
                  checked={data.cuisine === c.value}
                  onChange={() =>
                    setData({
                      ...data,
                      cuisine: c.value as SettingsData['cuisine'],
                    })
                  }
                  className="hidden"
                />
                {c.label}
              </label>
            ))}
          </div>
        </section>

        <button
          onClick={() => onSave(data)}
          className="w-full py-3 rounded-xl bg-terracotta text-white font-medium hover:bg-terracotta-dark transition"
        >
          Составить меню →
        </button>
      </div>
    </div>
  );
}