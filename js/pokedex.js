
window.addEventListener("DOMContentLoaded", init);


class Pokemon {
	//TODO: would be nice to prevent people from easily changing the variables :thinking: 
	//#id 
	constructor(id, name = "?????", sprite = "assets/images/unknown-sprite.png",
		types = ["???", "???"], weight = "?", height = "?", seen = 0, caught = 0,
		image = "assets/images/placeholder.png", description = "???",
		hp = 0 , attack = 0, defense = 0, spAttack = 0, spDefense = 0, 
		speed = 0, immune = ["???"], resistant = ["???"], normal = ["???"],
		weak = ["???"], superWeak = ["???"]
		){
		
		this.id 			= id;
		this.name 			= name;
		this.sprite 		= sprite;
		this.types 			= types;
		this.weight 		= weight;
		this.height 		= height;
		this.seen   		= seen;
		this.caught 		= caught;
		this.image 			= image;
		this.description 	= description;
		this.hp 			= hp;
		this.attack			= attack;
		this.defense 		= defense;
		this.spAttack		= spAttack;
		this.spDefense 		= spDefense;
		this.speed 			= speed;
		this.immune			= immune;
		this.resistant		= resistant;
		this.normal			= normal;
		this.weak			= weak;
		this.superWeak		= superWeak;
		
		//TODO: could use arrays or similar to hold similar items? (info, stats etc.)
	}
	//TODO: update details function
}

const typeResistances = {
	Water: {Bug: 1, Dark: 1, Dragon: 1, Electric: 2, Fairy: 1,Fighting: 1, Fire: 0.5,
		Flying: 1, Ghost: 1, Grass: 2, Ground: 1, Ice: 0.5, Normal: 1, Poison: 1, 
		Psychic: 1, Rock: 1, Steel: 0.5, Water: 0.5},
	Grass: {Fire: 2, Grass: 0.5, Dragon: 0.5},
	Poison: {Fire: 1, Grass: 1, Dragon: 1},
	Fire: {Fire: 1, Grass: 1, Dragon: 1},
	Electricity: {Fire: 1, Grass: 1, Dragon: 1},
};


// const typeResistances = new Map(
// 	["Bug", 
// 	new Map(
// 		["Bug", 1],
// 		["Dark", 1],
// 		["Dragon", 1],
// 		["Electric", 1],
// 		["Fairy", 1],
// 		["Fighting", 0.5],
// 		["Fire", 2],
// 		["Flying", 2],
// 		["Ghost", 1],
// 		["Grass", 0.5],
// 		["Ground", 0.5],
// 		["Ice", 1],
// 		["Normal", 1],
// 		["Poison", 1],
// 		["Psychic", 1],
// 		["Rock", 2],
// 		["Steel", 1],
// 		["Water", 1]
// 	)], 
// 	["Dark", 
// 	new Map(
// 		["Bug", 2],
// 		["Dark", 0.5],
// 		["Dragon", 1],
// 		["Electric", 1],
// 		["Fairy", 2],
// 		["Fighting", 2],
// 		["Fire", 1],
// 		["Flying", 1],
// 		["Ghost", 0.5],
// 		["Grass", 1],
// 		["Ground", 1],
// 		["Ice", 1],
// 		["Normal", 1],
// 		["Poison", 1],
// 		["Psychic", 0],
// 		["Rock", 1],
// 		["Steel", 1],
// 		["Water", 1]
// 	)], 
// 	// ["Dragon", 
// 	// new Map(
// 	// 	["Bug", 1],
// 	// 	["Dark", 1],
// 	// 	["Dragon", 2],
// 	// 	["Electric", 0.5],
// 	// 	["Fairy", 2],
// 	// 	["Fighting", 1],
// 	// 	["Fire", 0.5,
// 	// 	["Flying", 1],
// 	// 	["Ghost", 1],
// 	// 	["Grass", 0.5],
// 	// 	["Ground", 1],
// 	// 	["Ice", 2],
// 	// 	["Normal", 1],
// 	// 	["Poison", 1],
// 	// 	["Psychic", 1],
// 	// 	["Rock", 1],
// 	// 	["Steel", 1],
// 	// 	["Water", 0.5]
// 	// )], 
// 	["Electric", 
// 	new Map(
// 		["Bug", 1],
// 		["Dark", 1],
// 		["Dragon", 1],
// 		["Electric", 0.5],
// 		["Fairy", 1],
// 		["Fighting", 1],
// 		["Fire", 1],
// 		["Flying", 0.5],
// 		["Ghost", 1],
// 		["Grass", 1],
// 		["Ground", 2],
// 		["Ice", 1],
// 		["Normal", 1],
// 		["Poison", 1],
// 		["Psychic", 1],
// 		["Rock", 1],
// 		["Steel", 0.5],
// 		["Water", 1]
// 	)], 
// 	["Fairy", 
// 	new Map(
// 		["Bug", 0.5],
// 		["Dark", 0.5],
// 		["Dragon", 0],
// 		["Electric", 1],
// 		["Fairy", 1],
// 		["Fighting", 1],
// 		["Fire", 1],
// 		["Flying", 0.5],
// 		["Ghost", 1],
// 		["Grass", 1],
// 		["Ground", 1],
// 		["Ice", 1],
// 		["Normal", 1],
// 		["Poison", 2],
// 		["Psychic", 1],
// 		["Rock", 1],
// 		["Steel", 2],
// 		["Water", 1]
// 	)], 
// 	["Fighting", 
// 	new Map(
// 		["Bug", 0.5],
// 		["Dark", 1],
// 		["Dragon", 0.5],
// 		["Electric", 1],
// 		["Fairy", 2],
// 		["Fighting", 1],
// 		["Fire", 1],
// 		["Flying", 2],
// 		["Ghost", 1],
// 		["Grass", 1],
// 		["Ground", 1],
// 		["Ice", 1],
// 		["Normal", 1],
// 		["Poison", 1],
// 		["Psychic", 2],
// 		["Rock", 0.5],
// 		["Steel", 1],
// 		["Water", 1]
// 	)], 
// 	["Fire", 
// 	new Map(
// 		["Bug", 0.5],
// 		["Dark", 1],
// 		["Dragon", 1],
// 		["Electric", 1],
// 		["Fairy", 0.5],
// 		["Fighting", 1],
// 		["Fire", 0.5],
// 		["Flying", 1],
// 		["Ghost", 1],
// 		["Grass", 0.5],
// 		["Ground", 2],
// 		["Ice", 0.5],
// 		["Normal", 1],
// 		["Poison", 1],
// 		["Psychic", 1],
// 		["Rock", 2],
// 		["Steel", 0.5],
// 		["Water", 2]
// 	)], 
// 	["Flying", 
// 	new Map(
// 		["Bug", 0.5],
// 		["Dark", 1],
// 		["Dragon", 1],
// 		["Electric", 2],
// 		["Fairy", 1],
// 		["Fighting", 0.5],
// 		["Fire", 1],
// 		["Flying", 1],
// 		["Ghost", 1],
// 		["Grass", 0.5],
// 		["Ground", 0],
// 		["Ice", 2],
// 		["Normal", 1],
// 		["Poison", 1],
// 		["Psychic", 1],
// 		["Rock", 2],
// 		["Steel", 1],
// 		["Water", 1]
// 	)], 
// 	["Ghost", 
// 	new Map(
// 		["Bug", 0.5],
// 		["Dark", 2],
// 		["Dragon", 1],
// 		["Electric", 1],
// 		["Fairy", 1],
// 		["Fighting", 0],
// 		["Fire", 1],
// 		["Flying", 1],
// 		["Ghost", 2],
// 		["Grass", 1],
// 		["Ground", 1],
// 		["Ice", 1],
// 		["Normal", 0],
// 		["Poison", 0.5],
// 		["Psychic", 1],
// 		["Rock", 1],
// 		["Steel", 1],
// 		["Water", 1]
// 	)], 
// 	["Grass", 
// 	new Map(
// 		["Bug", 2],
// 		["Dark", 1],
// 		["Dragon", 1],
// 		["Electric", 0.5],
// 		["Fairy", 1],
// 		["Fighting", 1],
// 		["Fire", 2],
// 		["Flying", 2],
// 		["Ghost", 1],
// 		["Grass", 0.5],
// 		["Ground", 0.5],
// 		["Ice", 2],
// 		["Normal", 1],
// 		["Poison", 2],
// 		["Psychic", 1],
// 		["Rock", 1],
// 		["Steel", 1],
// 		["Water", 0.5]
// 	)], 
// 	["Ground", 
// 	new Map(
// 		["Bug", 1],
// 		["Dark", 1],
// 		["Dragon", 1],
// 		["Electric", 0],
// 		["Fairy", 1],
// 		["Fighting", 1],
// 		["Fire", 1],
// 		["Flying", 1],
// 		["Ghost", 1],
// 		["Grass", 2],
// 		["Ground", 1],
// 		["Ice", 2],
// 		["Normal", 1],
// 		["Poison", 0.5],
// 		["Psychic", 1],
// 		["Rock", 0.5],
// 		["Steel", 1],
// 		["Water", 2]
// 	)], 
// 	["Ice", 
// 	new Map(
// 		["Bug", 1],
// 		["Dark", 1],
// 		["Dragon", 1],
// 		["Electric", 1],
// 		["Fairy", 1],
// 		["Fighting", 2],
// 		["Fire", 2],
// 		["Flying", 1],
// 		["Ghost", 1],
// 		["Grass", 1],
// 		["Ground", 1],
// 		["Ice", 0.5],
// 		["Normal", 1],
// 		["Poison", 1],
// 		["Psychic", 1],
// 		["Rock", 2],
// 		["Steel", 2],
// 		["Water", 1]
// 	)], 
// 	["Normal", 
// 	new Map(
// 		["Bug", 1],
// 		["Dark", 1],
// 		["Dragon", 1],
// 		["Electric", 1],
// 		["Fairy", 1],
// 		["Fighting", 2],
// 		["Fire", 1],
// 		["Flying", 1],
// 		["Ghost", 0],
// 		["Grass", 1],
// 		["Ground", 1],
// 		["Ice", 1],
// 		["Normal", 1],
// 		["Poison", 1],
// 		["Psychic", 1],
// 		["Rock", 1],
// 		["Steel", 1],
// 		["Water", 1]
// 	)], 
// 	["Poison", 
// 	new Map(
// 		["Bug", 0.5],
// 		["Dark", 1],
// 		["Dragon", 1],
// 		["Electric", 1],
// 		["Fairy", 0.5],
// 		["Fighting", 0.5],
// 		["Fire", 1],
// 		["Flying", 1],
// 		["Ghost", 1],
// 		["Grass", 0.5],
// 		["Ground", 1],
// 		["Ice", 1],
// 		["Normal", 1],
// 		["Poison", 0.5],
// 		["Psychic", 1],
// 		["Rock", 1],
// 		["Steel", 1],
// 		["Water", 1]
// 	)], 
// 	["Psychic", 
// 	new Map(
// 		["Bug", 2],
// 		["Dark", 2],
// 		["Dragon", 1],
// 		["Electric", 1],
// 		["Fairy", 1],
// 		["Fighting", 0.5],
// 		["Fire", 1],
// 		["Flying", 1],
// 		["Ghost", 2],
// 		["Grass", 1],
// 		["Ground", 1],
// 		["Ice", 1],
// 		["Normal", 1],
// 		["Poison", 1],
// 		["Psychic", 0.5],
// 		["Rock", 1],
// 		["Steel", 1],
// 		["Water", 1]
// 	)], 
// 	["Rock", 
// 	new Map(
// 		["Bug", 1],
// 		["Dark", 1],
// 		["Dragon", 1],
// 		["Electric", 1],
// 		["Fairy", 1],
// 		["Fighting", 2],
// 		["Fire", 0.5],
// 		["Flying", 0.5],
// 		["Ghost", 1],
// 		["Grass", 2],
// 		["Ground", 2],
// 		["Ice", 1],
// 		["Normal", 0.5],
// 		["Poison", 0.5],
// 		["Psychic", 1],
// 		["Rock", 1],
// 		["Steel", 2],
// 		["Water", 2]
// 	)], 
// 	["Steel", 
// 	new Map(
// 		["Bug", 0.5],
// 		["Dark", 1],
// 		["Dragon", 0.5],
// 		["Electric", 1],
// 		["Fairy", 0.5],
// 		["Fighting", 2],
// 		["Fire", 2],
// 		["Flying", 0.5],
// 		["Ghost", 1],
// 		["Grass", 0.5],
// 		["Ground", 2],
// 		["Ice", 0.5],
// 		["Normal", 0.5],
// 		["Poison", 0],
// 		["Psychic", 0.5],
// 		["Rock", 0.5],
// 		["Steel", 0.5],
// 		["Water", 1]
// 	)], 
// 	["Water", 
// 	new Map(
// 		["Bug", 1],
// 		["Dark", 1],
// 		["Dragon", 1],
// 		["Electric", 2],
// 		["Fairy", 1],
// 		["Fighting", 1],
// 		["Fire", 0.5],
// 		["Flying", 1],
// 		["Ghost", 1],
// 		["Grass", 2],
// 		["Ground", 1],
// 		["Ice", 0.5],
// 		["Normal", 1],
// 		["Poison", 1],
// 		["Psychic", 1],
// 		["Rock", 1],
// 		["Steel", 0.5],
// 		["Water", 0.5]
// 	)]
// );

//TODO: likely will want to do some spring cleaning here, seems overly large
const state = {
	//all values start undefined 
	listButtons: 	undefined, 
	currSelection: 	undefined,
	pokemans: 		undefined,
	desclist:  		undefined,
	id: 			undefined,
	name:			undefined,
	sprite: 		undefined,
	types: 			[],
	weight: 		undefined,
	height: 		undefined,
	seen: 			undefined,
	caught:         undefined, 
	image: 			undefined,
	desc: 			undefined,
	hp: 			undefined,
	attack:  		undefined,
	defense:		undefined, 
	spAttack: 		undefined,
	spDefense: 		undefined,
	speed:  		undefined,
	immune:			undefined,
	resistant:		undefined,
	normal: 		undefined,
	weak: 			undefined,
	superWeak:		undefined

	//TODO: use arrays or similar to hold similar items
}

function init(){

	//assign all of the needed dom elements to the state for later use
	state.desclist 			= document.getElementById("infoList");
	state.id 				= document.getElementById("id");
	state.name 				= document.getElementById("name");
	state.image 			= document.getElementById("image");
	state.sprite 			= document.getElementById("sprite");
	state.types[0] 			= document.getElementById("type1");
	state.types[1]			= document.getElementById("type2");
	state.weight 			= document.getElementById("weight");
	state.height 			= document.getElementById("height");
	state.seen 				= document.getElementById("seen");
	state.caught 			= document.getElementById("caught");
	state.desc 				= document.getElementById("bio");
	state.hp  				= document.getElementById("hp");
	state.attack  			= document.getElementById("attack");
	state.defense 			= document.getElementById("defense");
	state.spAttack			= document.getElementById("spAttack");
	state.spDefense 		= document.getElementById("spDefense");
	state.speed  			= document.getElementById("speed");
	state.immune			= document.getElementById("immune");
	state.resistant			= document.getElementById("resistant");
	state.normal 			= document.getElementById("normal");
	state.weak 				= document.getElementById("weak");
	state.superWeak		    = document.getElementById("superWeak");
	
	
	const pokemans = state.pokemans = new Map();
	
	const list = document.getElementById("glosslist");

	addPokemans(pokemans);
	calculateResistances(pokemans);
	addUnknownPokemans(pokemans);

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
		1, "Bulbasaur",  "assets/images/bulbasaur-sprite.png", 
		["Grass", "Poison"], 0.7, 6.9, 1, 1,
		"assets/images/bulbasaur.png", 
		"Bulbasaur is a small, quadruped Pokémon that has blue-green skin with darker patches.",
		45, 49, 49, 65, 65, 45, [], [], [], [], []);

	charmander = new Pokemon(
		4, "Charmander",  "assets/images/charmander-sprite.png",
		["Fire", ""], 0.6, 8.5, 1, 1,
		"assets/images/charmander.png", 
		"Charmander is a bipedal, reptilian Pokémon with a primarily orange body and blue eyes.",
		39, 52, 43, 60, 50, 65, [], [], [], [], []);

	squirtle = new Pokemon(
		7, "Squirtle", "assets/images/squirtle-sprite.png",
		["Water", ""], 0.5, 9.0, 1, 1,
		"assets/images/squirtle.png", 
		"Squirtle is a small Pokémon that resembles a light blue turtle.",
		44, 48, 65, 50, 64, 43, [], [], [], [], []);

	pikachu = new Pokemon(
		25, "Pikachu", "assets/images/pikachu-sprite.png",
		["Electric", ""], 0.4, 6.0, 5, 2,
		"assets/images/pikachu.png", 
		"Pikachu is a short, chubby rodent Pokémon.",
		35, 55, 30, 50, 40, 90, [], [], [], [], []);

	//using the pokemon ID as the key for the map, could be name instead (it might be more readable)
	map.set(bulbasaur.id, bulbasaur);
	map.set(charmander.id, charmander);
	map.set(squirtle.id, squirtle);
	map.set(pikachu.id, pikachu);

}//addPokemans

function calculateResistances(map){

	// let bulbasaur = map.get(1);
	// console.log(typeResistances["grass"]["fire"]);
	//bulbasaur.immune[0] = typeResistances["grass"]["fire"];

	for(let key = 1; key < 152; key++){
		let pokemon = map.get(key);
		
		if(pokemon !== undefined){
			let pType = pokemon.types[0];
			let types = typeResistances[pType];
			for(t in types){
				switch(types[t]){
					case 0:
						pokemon.immune.push(t);
						break;
					case 0.5:
						pokemon.resistant.push(t);
						break;
					case 1:
						pokemon.normal.push(t);
						break;
					case 2:
						pokemon.weak.push(t);
						break;
					case 4:
						pokemon.superWeak.push(t);
						break;	
					default:
						break;
				}
			}
		}
	}

}

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



function updateCurrDetails(event){

	let { id, name, sprite, types, weight, 
		height, seen, caught, image, desc,
		hp, attack, defense, spAttack, spDefense, speed,
		immune, resistant, normal, weak, superWeak } 
		= state;

	const key = parseInt(event.target.dataset.id);
	const selectedPokemon = state.pokemans.get(key);

	const { name: pName, id: pId, sprite: pSprite, types: pTypes, 
			weight: pWeight, height: pHeight, seen: pSeen, 
			caught: pCaught, image: pImage, description: pDesc,
			hp: pHp, attack: pAttack, defense: pDefense, 
			spAttack: pSpAttack, spDefense: pSpDefense, speed: pSpeed,
			immune: pImmune, resistant: pResistant, normal: pNormal,
			weak: pWeak, superWeak: pSuperWeak }
		= selectedPokemon;

	console.log(selectedPokemon);

	id.innerText 				= pId;
	name.innerText 				= pName; 
	sprite.src 					= pSprite;
	sprite.alt              	= `Sprite for ${pName}`;
	types[0].innerText			= pTypes[0];
	types[1].innerText			= pTypes[1];	
	weight.innerText 			= pWeight;
	height.innerText 			= pHeight;
	seen.innerText				= pSeen;
	caught.innerText   			= pCaught;
	image.src					= pImage;
	image.alt    				= `Image of ${pName}`;
	desc.innerText 				= pDesc;
	hp.value 					= pHp;
	attack.value 				= pAttack;
	defense.value 				= pDefense;
	spAttack.value 				= pSpAttack;
	spDefense.value 			= pSpDefense;
	speed.value 				= pSpeed;

	showResistance(immune, pImmune);
	showResistance(resistant, pResistant);
	showResistance(normal, pNormal);
	showResistance(weak, pWeak);
	showResistance(superWeak, pSuperWeak);

	updateCurrSelection(event);
}

function showResistance(resistance, pResistance){

	while(resistance.childNodes[2]){
		resistance.removeChild(resistance.childNodes[2]);
	}

	for(r in pResistance){
		let newType = document.createElement("td");
		newType.innerText = pResistance[r];
		resistance.appendChild(newType);
	}
}//showResistance


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