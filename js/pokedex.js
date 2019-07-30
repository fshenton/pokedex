
window.addEventListener("DOMContentLoaded", init);


class Pokemon {
	//TODO: would be nice to prevent people from easily changing the variables :thinking: 
	//#id 
	constructor(id, name = "???", image = "assets/images/placeholder.png", 
		type = "???", weight = "???", height = "???", description = "???"){
		
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
	//all values start undefined 
	listButtons: 	undefined, 
	currSelection: 	undefined,
	pokemans: 		undefined,
	// unknownPokemon: undefined,
	splash: 		undefined,
	image: 			undefined,
	desclist:  		undefined,
	id: 			undefined,
	name:			undefined,
	type: 			undefined,
	weight: 		undefined,
	height: 		undefined,
	desc: 			undefined
}

function init(){
	//using a map for future proofing (when using all 151 pokemon)
	const pokemans = state.pokemans = new Map();
	
	addPokemans(pokemans);

	// console.log(pokemans.get(1));
	
	// setUpUnknownPokemon(state); //used for filling ??? entries

	//assign all of the needed dom elements to the state for later use
	state.splash 	= document.getElementById("splash");
	state.image 	= document.getElementById("image");
	state.desclist 	= document.getElementById("infoList");
	state.id 		= document.getElementById("id");
	state.name 		= document.getElementById("name");
	state.type 		= document.getElementById("type");
	state.weight 	= document.getElementById("weight");
	state.height 	= document.getElementById("height");
	state.desc 		= document.getElementById("bio");
	

	const list = document.getElementById("glosslist");

	//create 151 li elements within the glossary ul
	for(let count = 1; count < 152; count++){
		const listItem = createListItem(count);
		list.appendChild(listItem);
	}

	const listButtons 	= state.listButtons = document.getElementsByClassName("listbutton");

	//for every li button (entry in pokedex), grab the id and 
	//grab the pokemon with that id from pokemans
	for(let listButton of listButtons){

		let buttonText = listButton.innerText;
		const key = parseInt(listButton.dataset.id);
		//TODO: instead of the ones we've entered, it should be the ones that have been seen or caught
	
		listButton.innerText = `${buttonText} ${pokemans.get(key).name}`;

		//add event listener that will update pokemon details when button clicked
		listButton.addEventListener("click", updateCurrDetails);
	}

	console.log(state);
}//init


function addPokemans(map){

	let bulbasaur, charmander, squirtle, pikachu;

	//TODO: future change to store all pokemon details in external JSON file would be nice
	bulbasaur = new Pokemon(
		1, "Bulbasaur", "assets/images/Bulbasaur.png", 
		["Grass", "Poison"], 0.7, 6.9, 
		"Bulbasaur is a small, quadruped Pokémon that has blue-green skin with darker patches.");

	charmander = new Pokemon(
		4, "Charmander", "assets/images/Charmander.png", 
		["Fire"], 0.6, 8.5, 
		"Charmander is a bipedal, reptilian Pokémon with a primarily orange body and blue eyes.");

	squirtle = new Pokemon(
		7, "Squirtle", "assets/images/Squirtle.png", 
		["Water"], 0.5, 9.0, 
		"Squirtle is a small Pokémon that resembles a light blue turtle.");

	pikachu = new Pokemon(
		25, "Pikachu", "assets/images/Pikachu.png", 
		["Electric"], 0.4, 6.0, 
		"Pikachu is a short, chubby rodent Pokémon.");



	//using the pokemon ID as the key for the map, could be name instead (it might be more readable)
	map.set(bulbasaur.id, bulbasaur);
	map.set(charmander.id, charmander);
	map.set(squirtle.id, squirtle);
	map.set(pikachu.id, pikachu);

	//add ??? entries for each undefined map entry (151-num defined)
	addUnknownPokemans(map);
}//addPokemans


//call this loads of time for each entry you want
function createListItem(data){
	const id = data;

	const listItem = document.createElement("li");
	const button = document.createElement("button");

	button.setAttribute("data-id", id);
	button.classList.add("listbutton");
	button.innerText = `${id}.`;
	// button.addEventListener("click", updateCurrDetails);

	listItem.appendChild(button);

	return listItem;
}//createListItem


function addUnknownPokemans(map){

	//want this to run 151 times, once for each pokemon entry`
	for(let key = 1; key < 152; key++){

		//if we don't have a proper pokemon entry, add a placeholder
		if(map.get(key) === undefined){
			//the only value we need to pass is the key, which === id
			//the rest of the values default to ???
			let unknownPokemon = new Pokemon(key);

			//add the unknownpokemon entry to the pokedex map
			map.set(key, unknownPokemon);
		}
	}

}//addUnknownPokemon


function updateCurrDetails(event){

	let { image, id, name, type, weight, height, desc } = state;

	const key = parseInt(event.target.dataset.id);

	const { image: pImage, name: pName, id: pId, type: pType, weight: pWeight,
			height: pHeight, description: pDesc }
		= state.pokemans.get(key);

	image.src				= pImage;
	image.alt    			= pName;
	id.innerText 			= pId;
	name.innerText 			= pName; //placeholder for now
	type.innerText 			= pType;
	weight.innerText 		= pWeight;
	height.innerText 		= pHeight;
	desc.innerText 			= pDesc;

	updateCurrSelection(event);
}

function updateCurrSelection(event){

	let currSel = state.currSelection;

	//we must make sure that previously selected item is now unselected
	if(currSel !== undefined){
		currSel.classList.remove("selected");
	}

	//change currSelection to be the newly selected button
	state.currSelection = event.target;

	//update the new buttons class so that it's styled appropriately
	state.currSelection.classList.add("selected");
}