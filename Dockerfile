# Используем официальный Node.js образ
FROM node:18

# Проверяем, что Node.js и npm установлены
RUN node -v
RUN npm -v

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы
COPY . .

# Устанавливаем зависимости
RUN npm install

# Открываем порт для фронтенда
EXPOSE 8080

# Запускаем Vite с hot reload
CMD ["npm", "run", "dev"]
