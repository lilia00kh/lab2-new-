const express = require('express');
const pug = require('pug');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded());


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'static', 'views','pages'));



class SpaceStation {
    constructor(number, necessity, capacity) {
        this.number = number;
        this.capacity = capacity;
        this.necessity = necessity;
    }
}

class Planet {
    constructor(name, mass, capacity) {
        this.name = name;
        this.mass = mass;
        this.capacity = capacity;
    }
}

class Cargo {
    constructor(cod, name, mass) {
        this.cod = cod;
        this.name = name;
        this.mass = mass;
    }
}

class DeliveryToThePlanet {
    constructor(planet, cargo) {
        this.planet = planet;
        this.cargo = cargo;
    }
}
class DeliveryToTheStation {
    constructor(spaceStation, cargo) {
        this.spaceStation = spaceStation;
        this.cargo = cargo;
    }
}

let planets=[
    new Planet('Earth',10,10),
    new Planet('Mars',10,10),
    new Planet('Venera',10,10),
]
let spaceStations=[
    new SpaceStation(1,10,10),
    new SpaceStation(2,10,10),
    new SpaceStation(3,10,10),
]

let cargoes=[
    new Cargo(111,'Одяг',10),
    new Cargo(222,'Їжа',100),
    new Cargo(333,'Книги',120),
]

let deliveryToThePlanet=[]
let deliveryToTheStation=[]
let deliveryFromStationToTheStation=[]
let deliveryFromStationToThePlanet=[]


app.get('/',(req,res)=>{
    res.render("SpaceStation",{data:spaceStations})
})
app.get('/SpaceStation',(req,res)=>{
    res.render("SpaceStation",{data:spaceStations})
})

app.get('/DeliveryToThePlanet',(req,res)=>{
    res.render("DeliveryToThePlanet",{data:cargoes,data2:planets})
})

app.get('/DeliveryToTheStation',(req,res)=>{
    res.render("DeliveryToTheStation",{data:cargoes,data2:spaceStations})
})

app.get('/DeliveryFromStationToTheStation',(req,res)=>{
    res.render("DeliveryFromStationToTheStation",{data:spaceStations,data2:spaceStations})
})
app.get('/DeliveryFromStationToThePlanet',(req,res)=>{
    res.render("DeliveryFromStationToThePlanet",{data:spaceStations,data2:planets})
})

app.get('/Planets',(req,res)=>{
    res.render("Planets",{data:planets})
})

app.get('/Cargo',(req,res)=>{
    res.render("Cargo",{data:cargoes})
})

app.post('/addNewStation',(req,res)=>{
    let body = req.body;//те що приходить з форми
    let check = spaceStations.filter((value, index) => {
        return value.number ===+body.number
    })
    if(check.length === 0)
    {
        console.log(check);
        spaceStations.push(new SpaceStation(+body.number,+body.necessity,+body.capacity))
        res.render("SpaceStation",{success:"Нову станцію додано",data:spaceStations})
    }
    else
    {
        console.log(check);
        res.render("SpaceStation",{success:"Нову станцію не додано, номер повинен бути унікальним",data:spaceStations})
    }
    console.log(spaceStations);

})

app.post('/editStation',(req,res)=>{
    let body = req.body;//те що приходить з форми

    let ourIndex = body.index[0];
    spaceStations[ourIndex]= new SpaceStation(spaceStations[ourIndex].number,body.necessity,body.capacity)
    res.render("SpaceStation",{newText:"Нашу станцію змінено",data:spaceStations})
})

app.post ('/deleteStation',(req, res) =>{
    let body = req.body;//те що приходить з форми
    let index = body.index[0];
    spaceStations.splice(index, 1)
    res.render("SpaceStation",{deleteText: `Станцію успішно видалено!`, data: spaceStations})
} )

app.post('/findSpaceStation',(req, res) =>{
    let body = req.body;//те що приходить з форми
    console.log(body);
    let check = spaceStations.filter((value, index) => {

        return value.number ===+body.number
    })
    if(check.length !== 0)
    {
        console.log(check);
        res.render("SpaceStation",{FindText:"Станцію знайдено",data:spaceStations})
    }
    else
    {
        console.log(check);
        res.render("SpaceStation",{FindText:"Станцію не знайдено",data:spaceStations})
    }
})

app.post('/addNewPlanet',(req,res)=>{
    let body = req.body;//те що приходить з форми
    let check = planets.filter((value, index) => {
        return value.name ===body.name
    })
    if(check.length === 0)
    {
        console.log(check);
        planets.push(new Planet(body.name,+body.mass,+body.capacity))
        res.render("Planets",{success:"Нову планету додано",data:planets})
    }
    else
    {
        console.log(check);
        res.render("Planets",{success:"Нову планету не додано, назва повинна бути унікальною",data:planets})
    }


})

app.post('/editPlanet',(req,res)=>{
    let body = req.body;//те що приходить з форми
    let ourIndex = body.index[0];
    planets[ourIndex]= new Planet(planets[ourIndex].name,body.mass,body.capacity)
    res.render("Planets",{newText:"Нашу планету змінено",data:planets})
})

app.post ('/deletePlanet',(req, res) =>{
    let body = req.body;//те що приходить з форми
    let index = body.index[0];
    planets.splice(index, 1)
    res.render("Planets",{deleteText: `Планету успішно видалено!`, data: planets})
} )

app.post('/findPlanet',(req, res) =>{
    let body = req.body;//те що приходить з форми
    console.log(body);
    let check = planets.filter((value, index) => {

        return value.name ===body.name
    })
    if(check.length !== 0)
    {
        console.log(check);
        res.render("Planets",{FindText:"Планету знайдено",data:planets})
    }
    else
    {
        console.log(check);
        res.render("Planets",{FindText:"Планету не знайдено",data:planets})
    }
})

app.post('/addNewCargo',(req,res)=>{
    let body = req.body;//те що приходить з форми
    let check = cargoes.filter((value, index) => {
        return value.cod === +body.cod
    })
    if(check.length === 0)
    {
        console.log(check);
        cargoes.push(new Cargo(+body.cod,body.name,+body.mass))
        res.render("Cargo",{success:"Новий вантаж додано",data:cargoes})
    }
    else
    {
        console.log(check);
        res.render("Cargo",{success:"Новий вантаж не додано, код повинен бути унікальним",data:planets})
    }


})

app.post('/editCargo',(req,res)=>{
    let body = req.body;//те що приходить з форми
    let ourIndex = body.index[0];
    cargoes[ourIndex]= new Cargo(cargoes[ourIndex].cod,body.name,body.mass)
    res.render("Cargo",{newText:"Наш вантаж змінено",data:cargoes})
})

app.post ('/deleteCargo',(req, res) =>{
    let body = req.body;//те що приходить з форми
    let index = body.index[0];
    cargoes.splice(index, 1)
    res.render("Cargo",{deleteText: `Вантаж успішно видалено!`, data: cargoes})
} )

app.post('/findCargo',(req, res) =>{
    let body = req.body;//те що приходить з форми
    console.log(body);
    let check = cargoes.filter((value, index) => {

        return value.cod ===+body.cod
    })
    if(check.length !== 0)
    {
        console.log(check);
        res.render("Cargo",{FindText:"Вантаж знайдено",data:cargoes})
    }
    else
    {
        console.log(check);
        res.render("Cargo",{FindText:"Вантаж не знайдено",data:cargoes})
    }
})


app.post('/DeliveryToThePlanet',(req,res)=>{
    let body = req.body;
    let NewPlanet = body.index[0];
    let NewCargo = body.index[1];
    deliveryToThePlanet.push(new DeliveryToThePlanet(NewPlanet,NewCargo))
    console.log("Доставлено:");
    console.log(deliveryToThePlanet);
    res.render("DeliveryToThePlanet",{data:cargoes, data2:planets, newText:"Доставку успішно здійснено"})
})

app.post('/DeliveryToTheStation',(req,res)=>{
    let body = req.body;
    let NewStation = body.index[0];
    let NewCargo = body.index[1];
    deliveryToTheStation.push(new DeliveryToTheStation(NewStation,NewCargo))
    console.log("Доставлено:");
    console.log(deliveryToTheStation);
    res.render("DeliveryToTheStation",{data:cargoes, data2:spaceStations, newText:"Доставку успішно здійснено"})
})
app.post('/DeliveryFromStationToTheStation',(req,res)=>{
    let body = req.body;
    let Station1 = body.index[0];
    let Station2 = body.index[1];
    deliveryFromStationToTheStation.push(new DeliveryToTheStation(Station1,Station2))
    console.log("Перевезено:");
    console.log(deliveryFromStationToTheStation);
    res.render("DeliveryFromStationToTheStation",{data:spaceStations, data2:spaceStations, newText2:"Перевезення успішно здійснено"})
})

app.post('/DeliveryFromStationToThePlanet',(req,res)=>{
    let body = req.body;
    let Station = body.index[0];
    let Planet = body.index[1];
    deliveryFromStationToThePlanet.push(new DeliveryToTheStation(Station,Planet))
    console.log("Перевезено:");
    console.log(deliveryFromStationToThePlanet);
    res.render("DeliveryFromStationToThePlanet",{data:spaceStations, data2:planets, newText:"Перевезення успішно здійcнено"})
})








app.listen(3001, () => {
    console.log(3001)
});