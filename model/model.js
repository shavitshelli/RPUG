class UserGenerator{
  constructor(){
    this._baseUrl = 'https://randomuser.me/api/'
  }
  async _getUsers(numOfUsers){
      return fetch(this._baseUrl+`?results=${numOfUsers}`)
              .then((res) => res.json())
              .then((data) => data.results)
  }

  async getUsersData(numOfUsers = 0){
      try{
        let users = await this._getUsers(numOfUsers)
        users = this._arrangeData(users)
        return users
      }catch(e){
        console.log(e)
      }
  }

  _arrangeData(users){
    let mainUser = {
      firstName: users[0].name.first,
      lastName: users[0].name.last,
      city: users[0].location.city,
      state: users[0].location.state,
      picture: users[0].picture.medium
    }
     users = users.map( u =>{
      return{
        firstName: u.name.first,
        lastName: u.name.last
      }  
     })
     users = {
      mainUser:mainUser,
      friends:users.splice(1)
     }
     return users
  }
}

class QuoteGenerator{
  constructor(){
    this._baseUrl = 'https://api.kanye.rest'
  }

  getRandomQuote(){
    return fetch(this._baseUrl)
              .then((res) => res.json())
  }
}
class PokemonGenerator{
  constructor(){
    this._baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
  }

  async _fetchPokemon(){
    return fetch(this._baseUrl+`${Math.floor(Math.random() * 100) + 1}`)
              .then((res) => res.json())
  }

  async getRandomPokemon(){
    const randPokemon = await this._fetchPokemon()
    return {name: randPokemon.name,image:randPokemon.sprites.front_default }
  }
}


class LoremGenerator{
  constructor(){
    this._baseUrl = 'https://baconipsum.com/api/?type=meat-and-filler'
  }

  getLoremText(maxLen=1){
    return fetch(this._baseUrl).then((res) => res.json())
  }
}


class DataFetcher{
  constructor(){

  }

  async getUserPageData(){
    const u = new UserGenerator()
    const q = new QuoteGenerator()
    const p = new PokemonGenerator()
    const l = new LoremGenerator()
    
    const data = await Promise.all([u.getUsersData(7),q.getRandomQuote(),p.getRandomPokemon(),l.getLoremText(3)])
    return data
  }
}

/*
class APIManager {
    fetch() {
        return $.get('/data')
    }
}

class Renderer {
    render(dataPromise) {
        dataPromise.then(function (data) {
            $("#body").append(`<div>${data}</div>`)
        })
    }
}

const apiManager = new APIManager()
const renderer = new Renderer()

let initialDataPromise = apiManager.fetch()
renderer.render(initialDataPromise) //initial page load

$(".some-thing").on("click", function () {
    let newDataPromise = apiManager.fetch()
    renderer.render(newDataPromise)
})
*/


// const u = new UserGenerator()
// u.getUsersData(7)
//   .then(u => console.log(u))
// const q = new QuoteGenerator()
// q.getRandomQuote()
//   .then(data => console.log(data.quote) )
// const p = new PokemonGenerator()
// p.getRandomPokemon()
//   .then(data => {
//     console.log(data)
//     const name = data.name
//     const image = data.image
//     console.log(name)
//     console.log(image)
//   } )
// const l = new LoremGenerator()
// l.getLoremText(40)
//   .then(data => {
//     data.forEach(d => console.log(d)) 
//   } )

const d = new DataFetcher()
d.getUserPageData()
  .then((data) => {
    console.log(data)
  })