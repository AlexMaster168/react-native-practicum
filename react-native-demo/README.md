# Todo App (react-native-demo)

Мобильный список дел: добавление задач, отметка выполнения, редактирование,
удаление, поиск и фильтрация. Данные хранятся локально на устройстве.

Проект изначально был написан в 2020 году на **Expo SDK 38** (React Native 0.62,
React 16, JavaScript, самописная навигация через Context, данные в Firebase
Realtime Database). В 2026 году полностью переписан под **Expo SDK 56**, а мёртвый
Firebase заменён на локальное хранилище — теперь приложение работает из коробки
без бэкенда.

---

## Стек

| Слой | Технология |
|------|-----------|
| Платформа | Expo **SDK 56** (managed) |
| Рантайм | React Native **0.85**, React **19** |
| Язык | **TypeScript** (strict) |
| Навигация | **expo-router** (Stack: список → задача) |
| Состояние | **React Context + useReducer** (без Redux — для тудушника избыточен) |
| UI | **react-native-paper v5** (Material Design 3) |
| Хранилище | **@react-native-async-storage/async-storage** |
| Пакетный менеджер | **pnpm** (`node-linker=hoisted`) |

> Почему Context, а не Redux Toolkit (как в соседнем `rn-self-posts`)? Состояние
> здесь — один список задач. Тащить сюда Redux было бы избыточно: `useReducer` + Context
> покрывают задачу полностью и без лишнего веса.

---

## Возможности

- **Добавление** задачи (поле ввода + кнопка).
- **Отметка «выполнено»** чекбоксом (зачёркивание) — новая фича, которой не было в оригинале.
- **Редактирование** названия (диалог, минимум 3 символа).
- **Удаление** с подтверждением.
- **Поиск** по названию.
- **Фильтр**: Все / Активные / Готовые.
- **Тёмная / светлая тема** (+ «как в системе») — кнопка в правом верхнем углу.
- **Сохранение между запусками** — задачи лежат в AsyncStorage и не теряются.

---

## Требования

- **Node.js ≥ 20.19.4**
- **pnpm** (`npm i -g pnpm` или через corepack)
- Приложение **Expo Go** на телефоне (версия с поддержкой SDK 56) — для разработки
- Телефон и компьютер в одной Wi-Fi сети (для подключения по LAN)

---

## Установка и запуск

```bash
pnpm install      # установка зависимостей
pnpm start        # запуск dev-сервера Metro
```

> Используй именно `pnpm`, а не `npm`. При вызове `npm` появятся предупреждения
> `Unknown project config "node-linker"` — npm не понимает pnpm-настройки из `.npmrc`
> (безвредно, но через `pnpm` их нет).

После `pnpm start`:
1. Открой **Expo Go** на телефоне.
2. Отсканируй QR из терминала **или** введи адрес вручную: «Enter URL manually» → `exp://<IP-компьютера>:8081`.
3. Дождись первой сборки бандла.

Другие команды:

```bash
pnpm android      # запуск в Android-эмуляторе
pnpm ios          # запуск в iOS-симуляторе (только macOS)
pnpm web          # запуск в браузере
pnpm typecheck    # проверка типов (tsc --noEmit)
pnpm lint         # линт
```

### Если телефон не подключается

На Windows входящие соединения на порт 8081 часто блокирует брандмауэр.
Варианты:
- разрешить Node.js в брандмауэре Windows, **или**
- запустить через туннель: `pnpm start --tunnel` (идёт через интернет, обходит
  файрвол и требования к общей сети; нужен пакет `@expo/ngrok`, подтянется сам).

---

## Структура проекта

```
react-native-demo/
├── app/                          # маршруты expo-router
│   ├── _layout.tsx               # корень: провайдеры (Todo, тема, Paper), шрифты, splash, Stack
│   ├── index.tsx                 # главный экран: добавление, поиск, фильтр, список
│   └── todo/
│       └── [id].tsx              # экран задачи: чекбокс, редактирование, удаление
├── src/
│   ├── components/
│   │   ├── AddTodo.tsx           # поле ввода + кнопка добавления
│   │   ├── TodoItem.tsx          # строка списка с чекбоксом
│   │   ├── EditTodoDialog.tsx    # диалог редактирования (валидация ≥3 символов)
│   │   ├── FilterBar.tsx         # переключатель Все/Активные/Готовые
│   │   ├── EmptyState.tsx        # пустое состояние с картинкой
│   │   └── ThemeToggleButton.tsx # кнопка смены темы в хедере
│   ├── context/
│   │   ├── TodoContext.tsx       # состояние задач (useReducer) + автосохранение в AsyncStorage
│   │   └── ThemeContext.tsx      # режим темы (system/light/dark) + persist
│   ├── storage/
│   │   └── todos.ts              # загрузка/сохранение задач в AsyncStorage
│   ├── theme/
│   │   └── index.ts              # темы Paper MD3 (свет/тьма) + навигационные темы
│   └── types/
│       └── todo.ts               # модель Todo, TodoFilter
├── assets/                       # шрифты Roboto, иконки, splash, no-items.png
├── app.json                      # конфиг Expo
├── tsconfig.json                 # alias `@/*` → `src/*`
└── .npmrc                        # node-linker=hoisted (pnpm + RN)
```

---

## Как устроено

### Состояние (`src/context/TodoContext.tsx`)
Список задач живёт в `useReducer` внутри `TodoProvider`. Действия: `addTodo`,
`removeTodo`, `updateTodo`, `toggleTodo`. При любом изменении список автоматически
сохраняется в AsyncStorage; при старте — подгружается обратно (`HYDRATE`).
Доступ к состоянию — через хук `useTodos()`.

### Хранилище (`src/storage/todos.ts`)
Простой слой над AsyncStorage: весь список задач сериализуется в JSON под одним
ключом. Заменил мёртвый Firebase Realtime Database из старой версии — приложению
больше не нужен внешний бэкенд.

### Тема (`src/context/ThemeContext.tsx` + `src/theme/index.ts`)
Режим темы (`system`/`light`/`dark`) хранится в отдельном контексте и сохраняется
в AsyncStorage. Кнопка в хедере переключает его по кругу. Сами темы — на базе
Material Design 3 (Paper), шрифт Roboto.

### Навигация (`app/`)
Файловая навигация expo-router, два экрана: список (`index`) и детали задачи
(`todo/[id]`). В SDK 56 expo-router отвязан от `react-navigation`, поэтому
`ThemeProvider` и темы импортируются из `expo-router`.
