const path = require('path')

// встановлюємо express
const express = require('express')
const server = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
server.use(express.static(__dirname))
// налаштовуємо роботу із шаблонізаотором
server.set('views', path.join(__dirname, '/static/views'))
server.set('view engine', 'pug')

// налаштовуємо маршрутизацію
server.get('/', function (request, response) {
    response.render('pages/index', { title: 'Home' })
})
server.get('/shop', function (request, response) {
    response.render('pages/shop', { title: 'Shop' })
})

// запускаємо аплікацію
server.listen(process.env.PORT || 8080)