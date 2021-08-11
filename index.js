//Подключаем экспресс
const express = require('express')
//Для работы с путями в ОС
const path = require('path')
const exphbs = require('express-handlebars') //подключаем пакет hbrs
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')

//Создание срвера на экспрессе
const app = express() //объект app аналог объекта сервер

//создание объекта hbrs
const hbs = exphbs.create({
  defaultLayout: 'main', 
  extname: 'hbs'
})

//Регистрация движка в экспрессе для рендеринга html страниц
app.engine('hbs', hbs.engine) //название, его значение

app.set('view engine', 'hbs') //с помощью метода set мы начинаем его использовать
app.set('views', 'views') //название переменной views- ее мы конфигурируем, второй параметр название папки где хранятся шаблоны, по умолчанию это папка view, но здесь мы явно ее укажем

app.use(express.static(path.join(__dirname, 'public'))) //делаем папку public статической для того, чтобы когда экспресс будет подгружать файлы с адресом /, он смотрит именно в нее
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)

//app.get('/', hendlers(обработчики), (req(запрос), res(ответ), nextFunction(продолжает выполнение следующих методов)) => {
//res.status(200) - ответ пользователю на запрос, его можно не прописывать, т.к. стату с ставится по умолчанию
//res.sendFile(path.join(__dirname, 'views', 'index.html')) //join объединяет все стоки массива в одну строку
//})

//Глобальная переменная process.env доступна приложению во время его 
//выполнения благодаря внутренним механизмам Node. Она представляет 
//собой состояние окружения системы в момент запуска приложения. 
//Например, если в системе задана переменная PATH, обратиться к ней 
//из приложения можно посредством конструкции process.env.PATH. 
//Её можно использовать, например, если вам нужно узнать место, 
//где можно найти исполняемые файлы, к которым требуется обратиться
// из кода.
//env - объект переменных, в данном случае берем переменную порт
const PORT = process.env.PORT || 3000 //если порт определен в переменной, 
                                      //передаем ее значение, если нет - 3000

//на каком порте мы будем слушать наше приложение
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})