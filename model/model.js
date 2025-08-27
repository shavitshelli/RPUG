class UserGenerator{
  constructor(){
    this._baseUrl = 'https://randomuser.me/api/'
  }
  _getUsers(numOfUsers){
      return new Promise((res,rej) => {
        $.ajax({
          url: this._baseUrl+`?results=${numOfUsers}`,
          dataType: 'json',
          success: function(data){
            res(data.results)
          },
          error: function(xhr, status, error) {
            rej(error); // ✅ Reject with error
        }
        });  
      })
  }

  async getUsersData(numOfUsers = 0){
      try{
        let users = await this._getUsers(numOfUsers)
        users = this._arrangeData(users)
        return users
      }catch(e){
        console.log(e.message)
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
    return new Promise((res,rej) =>{
      $.ajax({
        url: this._baseUrl,
        dataType: 'json',
        success: function(data){
          res(data)
        },
        error: function(xhr, status, error) {
          rej(error); // ✅ Reject with error
      }
      })
    })
  }
}
class PokemonGenerator{
  constructor(){
    this._baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
  }

  _fetchPokemon(){
    return new Promise((res,rej) =>{
      $.ajax({
        url: this._baseUrl+`${Math.floor(Math.random() * 100) + 1}`,
        dataType: 'json',
        success: function(data){
          res(data)
        },
        error: function(xhr, status, error) {
          rej(error);
      }
      })
    })
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
    return new Promise((res,rej) =>{
      $.ajax({
        url: this._baseUrl,
        dataType: 'json',
        success: function(data){
          res(data)
        },
        error: function(xhr, status, error) {
          rej(error);
      }
      })
    })
  }
}

const u = new UserGenerator()
u.getUsersData(7)
  .then(u => console.log(u))
const q = new QuoteGenerator()
q.getRandomQuote()
  .then(data => console.log(data.quote) )
const p = new PokemonGenerator()
p.getRandomPokemon()
  .then(data => {
    console.log(data)
    const name = data.name
    const image = data.image
    console.log(name)
    console.log(image)
  } )
const l = new LoremGenerator()
l.getLoremText(40)
  .then(data => {
    data.forEach(d => console.log(d))
    
  } )