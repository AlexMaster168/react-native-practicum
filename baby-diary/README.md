# Дневник малыша: дневник сна (baby-diary)

Мобильное приложение для отслеживания **сна ребёнка**: фиксация засыпаний и
пробуждений, расчёт времени бодрствования, разбивка день/ночь, статистика и
графики, несколько детей, события, напоминания, калькулятор норм сна,
справочник-рекомендации, экспорт/импорт в Excel и мультиязычный интерфейс.

Бэкенд — **Firebase Realtime Database** (живой, в отличие от учебных проектов
рядом). Бесплатная версия показывает рекламу (Google Mobile Ads), полная — нет.

Проект изначально жил на **Expo SDK 46** (React Native 0.69, React 18, графики на
`victory` v36, сборка через yarn). В 2026 году обновлён до **Expo SDK 56**:
RN 0.85, React 19, обязательная **New Architecture**, графики переписаны на
**Skia** (`victory-native` v41), пакетный менеджер переведён на **pnpm**.

> ⚠️ Это **не Expo Go**-приложение. Внутри нативные модули (Skia, Google Mobile
> Ads, datetimepicker, gesture-handler и др.), которых нет в Expo Go. Для
> разработки нужен **собственный dev-client** (см. «Установка и запуск»).

---

## Стек

| Слой | Технология |
|------|-----------|
| Платформа | Expo **SDK 56** (managed, **New Architecture** обязательна) |
| Рантайм | React Native **0.85** (Hermes), React **19** |
| Язык | JavaScript |
| Навигация | **@react-navigation v7** (Drawer + Stack + Material Top Tabs) |
| Состояние | **Redux 5** + **redux-thunk** + **react-redux 9** |
| Бэкенд | **Firebase Realtime Database** (`firebase/compat`) |
| Графики | **victory-native v41** (на базе `@shopify/react-native-skia`) |
| Анимации/жесты | **react-native-reanimated 4** + **react-native-worklets** + **gesture-handler** |
| Реклама | **react-native-google-mobile-ads** (только в production-сборке) |
| Напоминания | **expo-notifications** (локальные) |
| Экспорт | **exceljs** (ленивый `require`), **expo-sharing**, **expo-document-picker** |
| Даты | **date-fns**, **moment**, **luxon** |
| Сборка | **EAS Build** (облако) |
| Пакетный менеджер | **pnpm** (`node-linker=hoisted`) |

---

## Возможности

- **Запись сна** — старт/стоп засыпания, авторасчёт времени бодрствования между снами.
- **День/ночь** — сны автоматически относятся к дневным/ночным по настройке границ ночи.
- **Несколько детей** — переключение активного ребёнка, у каждого свои данные.
- **Статистика и графики** — суммарные показатели сна и **Skia-диаграммы** (линейные и stacked-bar).
- **События** — отдельная лента событий по датам.
- **Напоминания** — локальные уведомления (expo-notifications), настраиваемые каналы.
- **Калькулятор** норм сна по возрасту.
- **Справочник/рекомендации** — контент по уходу и сну.
- **Экспорт/импорт Excel** — резервная копия данных через `exceljs` + шеринг файла.
- **Мультиязычность** — ru / en / fr / de / it / ja / ko / pt.
- **Темы** — светлая/тёмная.
- **Полная версия** — отключает рекламу (бесплатная показывает баннеры Google Mobile Ads).

---

## Требования

- **Node.js ≥ 20.19.4**
- **pnpm** (`npm i -g pnpm` или через corepack)
- Аккаунт **Expo (EAS)** — для сборки dev-client и релизов
- **Android-устройство/эмулятор** с установленным dev-client APK (Expo Go **не подойдёт**)
- Телефон и компьютер в одной Wi-Fi сети (для подключения Metro по LAN)
- Для production-сборки/публикации — `google-services.json` и креденшелы (см. «Секреты»)

---

## Установка и запуск

### 1. Зависимости

```bash
pnpm install
```

> Только `pnpm`, не `npm`/`yarn`. Метро и нативная сборка завязаны на
> `node-linker=hoisted` (см. `.npmrc`). Через `npm` посыпятся предупреждения о
> неизвестном конфиге и может сломаться разрешение Skia/worklets.

### 2. Сборка dev-client (один раз, в облаке EAS)

Приложение содержит нативные модули, поэтому работает только в собственном
dev-client, а не в Expo Go:

```bash
pnpm dlx eas-cli login
pnpm dlx eas-cli build --profile development --platform android
```

По завершении EAS даст ссылку/QR на **APK** — установи его на телефон/эмулятор.
Пересобирать dev-client нужно только при изменении нативных зависимостей; обычный
JS-код подхватывается Metro на лету.

### 3. Запуск Metro и подключение

```bash
pnpm start          # = expo start --dev-client
```

Открой установленный **dev-client** (не Expo Go), отсканируй QR или введи адрес
вручную: `<IP-компьютера>:8081` (например `192.168.0.102:8081`). Дождись первой сборки бандла.

### Прочие команды

```bash
pnpm android        # expo run:android (локальная нативная сборка, нужен Android SDK)
pnpm ios            # expo run:ios (только macOS)
pnpm web            # запуск в браузере
pnpm prebuild       # expo prebuild --clean (регенерация android/ios)
pnpm doctor         # expo-doctor — проверка зависимостей
```

### Если телефон не подключается

Windows-брандмауэр часто блокирует входящие на порт 8081:
- разреши Node.js в брандмауэре Windows, **или**
- подними туннель: `pnpm start --tunnel` (через интернет, в обход файрвола и
  требования общей сети; пакет `@expo/ngrok` подтянется сам).

---

## Структура проекта

```
baby-diary/
├── App.js                         # корень: провайдеры (Redux, Gesture, SafeArea), шрифты,
│                                  #   splash (expo-splash-screen), настройка уведомлений
├── index.js                       # точка входа (registerRootComponent)
├── src/
│   ├── components/                # переиспользуемые UI-компоненты
│   │   ├── ChartField/            # линейный Skia-график (CartesianChart + Line + useFont)
│   │   ├── DreamStatisticSummary/ # stacked-bar Skia-график (день/ночь)
│   │   ├── AdBanner/              # баннер рекламы; в DEV — заглушка <View/>,
│   │   │                          #   реальный модуль грузится только в production
│   │   └── ...                    # Calculator, Child, ActionSheet, Button и т.д.
│   ├── screens/                   # экраны (Main, Statistics, NewDream, Children,
│   │                              #   Settings*, Calculator, Recommendations, Languages …)
│   ├── navigators/                # навигаторы react-navigation (Drawer/Tabs/Stack)
│   ├── redux/
│   │   ├── store/store.js         # createStore + applyMiddleware(thunk)
│   │   └── reducers/              # ads, app, backup, child, directory,
│   │                              #   events, main, statistics, time
│   ├── firebase/index.js          # обёртка над Firebase RTDB (класс Fire): сны,
│   │                              #   дети, события; конфиг + initializeApp
│   ├── translations/              # словари: ru / en / fr / italy / japan / korea / portugal
│   ├── core/                      # colors.js, languages.js
│   ├── hooks/                     # useTheme, useNavigator, useDeviceWidth, useTopTabNavigator
│   └── utils/                     # calcStatistics, calcTime, dreams, notifications,
│                                  #   firebaseHelpers, share, renderTime …
├── content/                       # текстовый контент рекомендаций (10 языков)
├── assets/                        # шрифты PTSans, иконки, splash
├── google-services.json           # конфиг Firebase для Android (нужен EAS-сборке — см. «Секреты»)
├── app.json                        # конфиг Expo (плагины, ads appId, EAS projectId)
├── eas.json                         # профили EAS Build/Submit
├── babel.config.js                  # preset: babel-preset-expo
├── metro.config.js                  # + assetExts: "db"
├── .npmrc                           # node-linker=hoisted (pnpm + RN)
└── .easignore                       # что не грузить в облако EAS
```

---

## Как устроено

### Бэкенд — Firebase Realtime Database (`src/firebase/index.js`)
Класс `Fire` инкапсулирует всю работу с RTDB через `firebase/compat`: запись/чтение
снов по пути `<childId>/dateTime/<год>/<месяц>/<день>`, дети (`children`), события
(`events`). `initializeApp` вызывается один раз в конструкторе. Время бодрствования
между снами считается на лету (`_calcWakefulness`).

> Импорт строго `firebase/compat/app` + `import "firebase/compat/database"` —
> без подмодуля `database` метод `firebase.database()` отваливается как `undefined`.

### Состояние — Redux (`src/redux/`)
Классический Redux 5 + `redux-thunk` (именованный импорт `{ thunk }`), без
`composeWithDevTools`. Редьюсеры разбиты по доменам: сны/статистика, дети, события,
справочник, время, реклама, бэкап, общее состояние приложения.

### Графики — Skia (`src/components/ChartField`, `DreamStatisticSummary`)
Переписаны со старого `victory` v36 на **victory-native v41** (Skia):
`CartesianChart` + `Line` / `StackedBar`, шрифт подключается через
`useFont(require(".../PTSans-Regular.ttf"), 11)`. Рендер идёт на GPU через Skia.

### Реклама — гейт по `__DEV__` (`src/components/AdBanner`)
В dev-режиме `AdBanner` — пустая заглушка `<View/>`: нативный модуль
`react-native-google-mobile-ads` не грузится (его нет в dev-client без ребилда и
он ронял старт). Реальный баннер (`AdBannerImpl`) подключается только в
production-сборке. ID баннера в dev — тестовый Google.

### Уведомления (`src/utils/notifications.js`, `App.js`)
Только **локальные** напоминания: каналы Android + запрос разрешений. Удалённый
push (`getExpoPushTokenAsync`) убран. Хендлер использует новые
`shouldShowBanner` / `shouldShowList` (вместо устаревшего `shouldShowAlert`).

### Экспорт Excel (`src/navigators/HomeNavigator`)
`exceljs` подключается **лениво** (`const ExcelJS = require("exceljs")` внутри
функции экспорта) — node-библиотека уходила в бесконечную рекурсию на Hermes при
загрузке на старте, поэтому грузится только в момент экспорта.

### Мультиязычность (`src/translations`, `src/core/languages.js`)
Словари по языкам; язык по умолчанию определяется из системной локали
(`NativeModules`, с защитой через `Platform.OS` и try/catch).

---

## Секреты и сборка

Репозиторий **приватный**, но критичные секреты держим вне git (см. корневой
`.gitignore` и `.gitignore` проекта):

| Что | Где | В git? |
|-----|-----|--------|
| Пароли от Android keystore | `credentials/androidKeystore/…` | ❌ игнорируется (`**/credentials/`) |
| Google service-account ключ (EAS Submit) | `credentials/serviceKey/*.json` | ❌ игнорируется |
| `*.keystore` / `*.jks` / `*.p8` / `*.p12` | — | ❌ игнорируется по маске |
| `google-services.json` | корень проекта | ✅ **закоммичен осознанно** |

**Почему `google-services.json` в git.** Он нужен облачной EAS-сборке
(`android.googleServicesFile` в `app.json`). Android-API-ключ внутри ограничен
именем пакета + подписью приложения и всё равно лежит в любом распакованном APK —
это не критичный секрет. Те же ключи Firebase продублированы в исходнике
`src/firebase/index.js`, так что прятать только этот файл смысла нет. Если нужна
максимальная строгость — вынеси его в EAS File Environment Variables и добавь в
`.gitignore`.

**EAS.** Проект привязан к `projectId` в `app.json` (`extra.eas.projectId`),
владелец — `alexmaster168`. Профили сборки/публикации — в `eas.json`
(`development` / `preview` / `production`). Путь к service-account ключу для
автопубликации в Google Play указан в `eas.json` → `submit.production.android`.
