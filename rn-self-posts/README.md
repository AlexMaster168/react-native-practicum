# Self Blog (rn-self-posts)

Мобильное приложение «личный блог»: посты с фотографиями и текстом, избранное,
теги, поиск, сортировка и шеринг. Данные хранятся локально на устройстве в SQLite.

Проект изначально был написан в 2020 году на **Expo SDK 38** (React Native 0.62,
React 16, JavaScript, `react-navigation` v4, голый Redux). В 2026 году полностью
переписан под **Expo SDK 56** на современном стеке.

---

## Стек

| Слой | Технология |
|------|-----------|
| Платформа | Expo **SDK 56** (managed) |
| Рантайм | React Native **0.85**, React **19** |
| Язык | **TypeScript** (strict) |
| Навигация | **expo-router** (файловая: Drawer → Tabs → Stack) |
| Состояние | **Redux Toolkit** (`createSlice` + `createAsyncThunk`) |
| UI | **react-native-paper v5** (Material Design 3) |
| Хранилище | **expo-sqlite** (async API) |
| Камера/галерея | **expo-image-picker** |
| Файлы | **expo-file-system** (новый `File`/`Paths` API) |
| Шеринг | RN `Share` + `expo-sharing` (фоллбэк) |
| Пакетный менеджер | **pnpm** (`node-linker=hoisted`) |

---

## Возможности

- **Создание поста** — текст + фото (камера или галерея) + теги.
- **Лента постов** с обложками-карточками.
- **Избранное** — пометить пост звёздочкой, отдельная вкладка.
- **Теги** — присваиваются при создании, фильтрация лентой чипов на главной.
- **Поиск** по тексту и тегам.
- **Сортировка** — сначала новые / сначала старые.
- **Шеринг** поста (текст + хэштеги; на iOS прикрепляется фото).
- **Тёмная / светлая тема** (+ режим «как в системе») — переключатель на экране «О приложении».
- **Удаление** поста с подтверждением.

Фотографии при создании поста переносятся из временного кэша в постоянный
каталог приложения, чтобы ОС их не удалила.

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
rn-self-posts/
├── app/                          # маршруты expo-router (файловая навигация)
│   ├── _layout.tsx               # корень: провайдеры (Redux, Paper, тема), шрифты, splash, init БД
│   ├── (drawer)/                 # боковое меню
│   │   ├── _layout.tsx           # Drawer-навигатор
│   │   ├── (tabs)/               # нижние вкладки
│   │   │   ├── _layout.tsx       # Tabs-навигатор (бургер + кнопка «создать»)
│   │   │   ├── index.tsx         # «Все» — лента, поиск, сортировка, фильтр тегов
│   │   │   └── booked.tsx        # «Избранное»
│   │   ├── create.tsx            # создание поста
│   │   └── about.tsx             # «О приложении» + переключатель темы
│   └── post/
│       └── [id].tsx              # экран поста: фото, текст, теги, избранное, шеринг, удаление
├── src/
│   ├── components/               # переиспользуемые компоненты
│   │   ├── PostCard.tsx          # карточка поста в ленте
│   │   ├── PostList.tsx          # FlatList постов + пустое состояние
│   │   ├── PhotoPicker.tsx       # выбор фото (камера/галерея, разрешения)
│   │   ├── TagInput.tsx          # ввод тегов при создании
│   │   ├── TagFilterBar.tsx      # лента тегов-фильтров на главной
│   │   ├── HeaderIcon.tsx        # кнопка-иконка для хедера
│   │   └── DrawerMenuButton.tsx  # бургер (открытие Drawer)
│   ├── db/
│   │   └── posts.ts              # слой SQLite (async API) + миграция схемы
│   ├── store/                    # Redux Toolkit
│   │   ├── index.ts              # configureStore, типы RootState/AppDispatch
│   │   ├── hooks.ts              # типизированные useAppDispatch / useAppSelector
│   │   ├── postsSlice.ts         # slice постов + async thunks + селекторы
│   │   ├── uiSlice.ts            # тема, поиск, сортировка, активный тег
│   │   └── selectors.ts          # selectVisiblePosts (поиск+тег+сортировка)
│   ├── theme/
│   │   └── index.ts              # темы Paper MD3 (свет/тьма) + навигационные темы
│   └── types/
│       └── post.ts               # модель Post, NewPost, SortOrder
├── assets/                       # шрифты OpenSans, иконки, splash
├── app.json                      # конфиг Expo (плагины, схема, разрешения)
├── tsconfig.json                 # alias `@/*` → `src/*`
└── .npmrc                        # node-linker=hoisted (pnpm + RN)
```

---

## Как устроено

### Хранилище (`src/db/posts.ts`)
Таблица `posts` в SQLite. Доступ через современный async-API expo-sqlite
(`openDatabaseAsync` / `runAsync` / `getAllAsync`). `booked` хранится как `0/1`,
`tags` — как JSON-строка. При старте `initDb()` создаёт таблицу и при необходимости
мигрирует старую схему (добавляет колонку `tags` через `ALTER TABLE`).

### Состояние (`src/store/`)
- `postsSlice` — список постов и статус загрузки. Async thunks `loadPosts`,
  `addPost`, `removePost`, `toggleBooked` ходят в слой БД.
- `uiSlice` — состояние интерфейса: тема, поисковый запрос, сортировка, активный тег.
- `selectors.ts` — мемоизированный `selectVisiblePosts` собирает итоговую ленту
  (фильтр по поиску → фильтр по тегу → сортировка).

### Навигация (`app/`)
Файловая навигация expo-router: `Drawer` (меню) → `Tabs` («Все»/«Избранное») →
`Stack` (экран поста поверх). В SDK 56 expo-router отвязан от `react-navigation`,
поэтому `ThemeProvider`, темы и `Drawer` импортируются из `expo-router`/`expo-router/drawer`.

### Тема (`src/theme/index.ts`)
Светлая и тёмная темы на базе Material Design 3 (Paper). Шрифт OpenSans подключён
ко всем вариантам типографики. Навигационные темы собраны вручную из палитры Paper.
Режим темы (`system`/`light`/`dark`) хранится в `uiSlice` и реагирует на системную тему.
