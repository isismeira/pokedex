//Selecionamos no DOM cada elemento com que vamos trabalhar e o atribuímos à uma const específica
const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

//Definimos a variável searchPokemon como 1 inicialmente (Referente ao Bulbasauro/Número 1)
let searchPokemon = 1

//Criamos uma função que busca os dados específicos do pokémon/parâmetro na API PokéAPI
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    //... e retorna os dados em formato de Objeto JavaScript
    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

//É criada uma função com o objetivo de renderizar nome, número e foto do pokémon na tela
const renderPokemon = async (pokemon) => {
    //Enquanto a busca está sendo feita...
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if (data) {     
        //Retorna o nome, número e imagem do Pokémon pesquisado
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        //Atualiza o valor de searchPokemon para o número do novo Pokémon pesquisado
        searchPokemon = data.id
    } else {
        //Caso o valor pesquisado seja inválido...
        pokemonName.innerHTML = 'Not found'
        pokemonNumber.innerHTML = ''
    }
}

//Inicia-se um evento ao enviar o formulário
form.addEventListener('submit', (event) =>{
    event.preventDefault()
    //função renderPokemon chamada com o parâmetro 'pokemon' igual ao valor digitado no input
    renderPokemon(input.value.toLowerCase())
    input.value = ''
})

//À seguir os eventos desencadeados após o botão de Prev ou Next serem clicados..
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1
      renderPokemon(searchPokemon)
    }
  })  
buttonNext.addEventListener('click', () => {
    //aumenta searchPokemon em 1 e chama renderPokemon
    searchPokemon += 1
    renderPokemon(searchPokemon)
});

//Chama renderPokemon inicialmente para exibir o Pokémon correspondente ao valor inicial de searchPokemon(1/Bulbassauro)
renderPokemon(searchPokemon)


