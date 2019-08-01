
window.addEventListener("DOMContentLoaded", init);


class Pokemon {
	//TODO: would be nice to prevent people from easily changing the variables :thinking: 
	//#id 
	constructor(id, name = "?????", sprite = "assets/images/unknown-sprite.png",
		types = ["???", "???"], weight = "?", height = "?", seen = 0, caught = 0,
		images = ["assets/images/placeholder.png"], bio = "???", story = "???",
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
		this.images 		= images;
		this.bio 			= bio;
		this.story 			= story;
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
	image:  		undefined,
	imageIndex:   	undefined, 
	bio: 			undefined,
	story:  		undefined,
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
	state.bio 				= document.getElementById("bio-text");
	state.story 			= document.getElementById("story-text");
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
	
	state.imageIndex = 0;
	
	const pokemans = state.pokemans = new Map();
	
	const list = document.getElementById("pokelist");

	addPokemans(pokemans);
	calculateResistances(pokemans);
	addUnknownPokemans(pokemans);

	//create 151 li elements within the pokelist ul
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

	const prev = document.getElementById("prev");
	const next = document.getElementById("next");

	prev.addEventListener("click", changeImage);
	next.addEventListener("click", changeImage);

	console.log(state);
}//init


function addPokemans(map){

	let bulbasaur, charmander, squirtle, pikachu;

	//TODO: future change to store all pokemon details in external JSON file would be nice
	bulbasaur = new Pokemon(
		1, "Bulbasaur",  "assets/images/bulbasaur-sprite.png", 
		["Grass", "Poison"], 0.7, 6.9, 1, 1,
		["assets/images/bulbasaur.png", "assets/images/squirtle.png",
		"assets/images/charmander.png", "assets/images/pikachu.png"], 
		"Bulbasaur is a small, quadruped Pokémon that has blue-green skin with darker patches.",
		`Bulbasaur is a small, quadruped Pokémon that has blue-green skin with darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are visible in the upper jaw when its mouth is open. Each of its thick legs ends with three sharp claws. On its back is a green plant bulb, which is grown from a seed planted there at birth. The bulb provides it with energy through photosynthesis as well as from the nutrient-rich seeds contained within.
		
		As mentioned in the anime, starter Pokémon are raised by Breeders to be distributed to new Trainers. Having been domesticated from birth, Bulbasaur is regarded as both a rare and well-behaved Pokémon. It is known to be extremely loyal, even after long-term abandonment. Bulbasaur has also shown itself to be an excellent caretaker, even having a special technique called the "Bulba-by." To perform this technique, Bulbasaur uses its vines to pick up a young Pokémon and soothingly rocks it in the air.`,
		45, 49, 49, 65, 65, 45, [], [], [], [], []);

	charmander = new Pokemon(
		4, "Charmander",  "assets/images/charmander-sprite.png",
		["Fire", ""], 0.6, 8.5, 1, 1,
		["assets/images/charmander.png", "assets/images/squirtle.png",
		"assets/images/bulbasaur.png", "assets/images/pikachu.png"],  
		"Charmander is a bipedal, reptilian Pokémon with a primarily orange body and blue eyes.",
		"Charmander is a bipedal, reptilian Pokémon with a primarily orange body and blue eyes.",
		39, 52, 43, 60, 50, 65, [], [], [], [], []);

	squirtle = new Pokemon(
		7, "Squirtle", "assets/images/squirtle-sprite.png",
		["Water", ""], 0.5, 9.0, 1, 1,
		["assets/images/squirtle.png", "assets/images/bulbasaur.png",
		"assets/images/charmander.png", "assets/images/pikachu.png"], 
		"Squirtle is a small Pokémon that resembles a light blue turtle.",
		"Squirtle is a small Pokémon that resembles a light blue turtle.",
		44, 48, 65, 50, 64, 43, [], [], [], [], []);

	pikachu = new Pokemon(
		25, "Pikachu", "assets/images/pikachu-sprite.png",
		["Electric", ""], 0.4, 6.0, 5, 2,
		["assets/images/pikachu.png", "assets/images/squirtle.png",
		"assets/images/charmander.png", "assets/images/bulbasaur.png"], 
		"Pikachu is a short, chubby rodent Pokémon.",
		"Pikachu is a short, chubby rodent Pokémon.",
		35, 55, 30, 50, 40, 90, [], [], [], [], []);

	//using the pokemon ID as the key for the map, could be name instead (it might be more readable)
	map.set(bulbasaur.id, bulbasaur);
	map.set(charmander.id, charmander);
	map.set(squirtle.id, squirtle);
	map.set(pikachu.id, pikachu);

}//addPokemans

function calculateResistances(map){

	for(let key = 1; key < 152; key++){
		let pokemon = map.get(key);
		
		if(pokemon !== undefined){
			//grab first type of pokemon
			let pType = pokemon.types[0];	
			let types = typeResistances[pType];
			//grab the value of each type, the values representing resistance
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

}//calculateResistances

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
		height, seen, caught, image, imageIndex, bio, story,
		hp, attack, defense, spAttack, spDefense, speed,
		immune, resistant, normal, weak, superWeak } 
		= state;

	const key = parseInt(event.target.dataset.id);
	const selectedPokemon = state.pokemans.get(key);

	const { name: pName, id: pId, sprite: pSprite, types: pTypes, 
			weight: pWeight, height: pHeight, seen: pSeen, 
			caught: pCaught, images: pImage, bio: pBio, story: pStory,
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
	
	//Handle showing 1 or 2 types depending on pokemon
	if(pTypes[1]!==""){
		types[1].innerText 		= `/ ${pTypes[1]}`;	
	} 
	else{
		types[1].innerText 		= "";
	}
	
	weight.innerText 			= pWeight;
	height.innerText 			= pHeight;
	seen.innerText				= pSeen;
	caught.innerText   			= pCaught;
	image.src					= pImage[0];
	image.alt    				= `Image of ${pName}`;
	bio.innerText				= pBio;
	story.innerText				= pStory;
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

function changeImage(event){
	let index = state.imageIndex;
	console.log(index);

	event.target.id === "prev" ? index -= 1 : index += 1;

	if(index < 0) index = 3;
	else if(index > 3) index = 0;

	const currPokemonId = state.currSelection.dataset.id;

	const currPokemon = state.pokemans.get(parseInt(currPokemonId));

	let currImage = state.image;

	currImage.src = currPokemon.images[index];

	state.imageIndex = index;

}//changeImage