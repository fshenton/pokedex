
window.addEventListener("DOMContentLoaded", init);


class Pokemon {
	//TODO: would be nice to prevent people from easily changing the variables :thinking: 
	//#id 
	constructor(id, name, image, type, weight, height, description){
		this.id 			= id;
		this.name 			= name;
		this.image 			= image;
		this.type 			= type;
		this.weight 		= weight;
		this.height 		= height;
		this.description 	= description;
	}
	//TODO: update details function
}

//TODO: likely will want to do some spring cleaning here, seems overly large
const state = {
	listButtons: undefined, //probs not needed?
	pokemans: undefined,
	image: undefined,
	id: undefined,
	name: undefined,
	type: undefined,
	weight: undefined,
	height: undefined,
	desc: undefined
}

function init(){
	//using a map for future proofing (when using all 151 pokemon)
	const pokemans = state.pokemans = new Map();
	addPokemans(pokemans);

	state.image 	= document.getElementById("image");
	state.id 		= document.getElementById("idfield");
	state.name 		= document.getElementById("namefield");
	state.type 		= document.getElementById("typefield");
	state.weight 	= document.getElementById("weightfield");
	state.height 	= document.getElementById("heightfield");
	state.desc 		= document.getElementById("descfield");

	const listButtons 	= state.listButtons = document.getElementsByClassName("list button");

	//for every li button (entry in pokedex), grab the id and 
	//grab the pokemon with that id from pokemans
	for(listButton of listButtons){
		const key = listButton.dataset.id;
		listButton.innerText = pokemans.get(key).name;
		listButton.addEventListener("click", (event) => {
			updateCurrDetails(event, key);
			});
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


function updateCurrDetails(event, key){

	let pokemonEntry = undefined;

	console.log(state.pokemans);

	try {
		pokemonEntry 			= state.pokemans.get(key);
		console.log(pokemonEntry);
		state.image.src 		= pokemonEntry.image;
		state.id.innerText 		= pokemonEntry.id;
		state.name.innerText 	= pokemonEntry.name;
		//TODO: Support multi-types
		state.type.innerText 	= pokemonEntry.type;
		state.weight.innerText 	= pokemonEntry.weight;
		state.height.innerText 	= pokemonEntry.height;
		//TODO: Sort the description prefix for the paragraph, don't like duping
		state.desc.innerText = "Description: " + pokemonEntry.description;
	} catch(e) {
		console.log("Must be using an invalid key? " + e);
	}
}
