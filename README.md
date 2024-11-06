# Parseit

Parseit — это настольное приложение для парсинга веб-страниц по URL и сохранения их в виде статей в формате Markdown. Статьи сохраняются локально в файловой системе, после чего их можно редактировать и управлять ими.

## Использованные технологии

- <img src="https://vuejs.org/images/logo.png" width="14"> **Vue 3** — фронтенд.
- <img src="https://www.electronjs.org/assets/img/logo.svg" width="14"/> **Electron** — сборка настольного приложения, взаимодействие с операционной системой.
- <img src="https://vitejs.dev/logo.svg" width="14"/> **Vite** — сборка проекта для разработки.
- <img src="./public/gui.svg" width="14"/> **GUI** — собственная [библиотека компонентов](https://github.com/kirillgalushko/gui), созданная для Parseit. Не использует готовые UI Kit's.
- <img src="https://pinia.vuejs.org/logo.svg" width="14"/> **Pinia** — управление состоянием Vue приложения.
- 🐶 **Husky** — pre-commit хуки.
- <img src="https://github.githubassets.com/favicons/favicon-dark.png" width="14"/> **Github Actions** — автоматическая сборка приложения после релиза.

## Разработка

### Запуск приложения

Для запуска Parseit в демо-режиме в браузере используйте команду:

```bash
npm run dev
```

Для запуска Parseit в режиме разработки Electron-приложения используйте команду:

```bash
npm run dev-app
```

### Релиз

Для релиза новой версии Parseit используйте команду:

```bash
npm run release
```

Эта команда предложит выбрать тип изменений `major/minor/patch`, автоматически обновит версию приложения в `package.json`. После создаст новый тег, что автоматически запустит сборку приложения с помощью **GitHub Actions**.


## Примечание

Это проект был создан с целью ознакомления с Vue 3 и не является production ready решением.
В нём намеренно упрощены и опущены некоторые важные аспекты разработки с целью экономии времени.

