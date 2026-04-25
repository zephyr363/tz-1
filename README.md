# Инструкция 

ВАЖНО! Необходимо иметь установленную node или docker, желательно последней версии
## 1. Клонируем репозиторий 
```
git clone https://github.com/zephyr363/tz-1.git
```

## 2. Запускаем проект 
![alt text](screens\sample3.png)
Переходим в деприкторию проекта и вводим следующую команду:
```
npm i 
npm run dev
```
Или можно запустить с помощью Docker:
```
docker build -t tz1 .
docker run -p 5173:5173 tz1
```

Готово. Переходим на http://localhost:5173
![alt text](screens\sample4.png)
