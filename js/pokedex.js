
window.addEventListener("DOMContentLoaded", init);


class Pokemon {
	constructor(id, name, image, types, weight, height, description){
		this.id 			= id;
		this.name 			= name;
		this.image 			= image;
		this.types 			= types;
		this.weight 		= weight;
		this.height 		= height;
		this.description 	= description;
	}
	//TODO: update details function
	//TODO: would be nice to prevent people from easily changing the variables :thinking: 
}

const state = {
	listButtons: undefined, //probs not needed?
	pokemans: undefined,
	image: undefined
}

function init(){

	const listButtons = state.listButtons = document.getElementsByClassName("list button");
	//TODO: grab img, pokemon details etc

	//using a map for future proofing (when using all 151 pokemon)
	const pokemans = state.pokemans = new Map();
	addPokemans(pokemans);

	//for every li button (entry in pokedex), grab the id and 
	//grab the pokemon with that id from pokemans
	for(listButton of listButtons){
		let key = listButton.dataset.id;
		listButton.innerText = pokemans.get(key).name;
	}

	console.log(state);
}//init

function addPokemans(map){

	let bulbasaur, charmander, squirtle, pikachu;

	//TODO: future change to store all pokemon details in external JSON file would be nice
	bulbasaur = new Pokemon("001", "Bulbasaur", "assets/images/Bulbasaur.png", ["Grass", "Poison"], 0.7, 6.9, 
		"Bulbasaur is a small, quadruped Pokémon that has blue-green skin with darker patches.");

	charmander = new Pokemon("004", "Charmander", "assets/images/Charmander.png", ["Fire"], 0.6, 8.5, 
		"Charmander is a bipedal, reptilian Pokémon with a primarily orange body and blue eyes.");

	squirtle = new Pokemon("007", "Squirtle", "assets/images/Squirtle.png", ["Water"], 0.5, 9.0, 
		"Squirtle is a small Pokémon that resembles a light blue turtle.");

	pikachu = new Pokemon("025", "Pikachu", "assets/images/Pikachu.png", ["Electric"], 0.4, 6.0, 
		"Pikachu is a short, chubby rodent Pokémon.");

	//using the pokemon ID as the key for the map, could be name instead (it might be more readable)
	map.set(bulbasaur.id, bulbasaur);
	map.set(charmander.id, charmander);
	map.set(squirtle.id, squirtle);
	map.set(pikachu.id, pikachu);

}//addPokemans


//state
//const list, img, info, description
//pokemans

//class definition
//id, name, types, weight, height, image

//init
//grab all of the dom objects and assign them to state
//fill the pokemans map
//add id and name to li elements for each pokemon

//add event listeners to all lis -> show info
// 