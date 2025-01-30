//CODE CITATIONS==============================
//A total of 3 code snippets have been borrowed. These include:
//1) A random number generator (Lines 51-53) borrowed from GeeksforGeeks:
//https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
//2) A formula for getting a random array value (Line 67) from stackoverflow: 
//https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
//3) Code for having a function run on page load (line 156) from stackoverflow:
//https://stackoverflow.com/questions/3842614/how-do-i-call-a-javascript-function-on-page-load
//==============================================

//Initial ranges for the random number generator are for Kanto pokemon (1-151)
let rangeOne=1;
let rangeTwo=151;

//A function to see which generation link the user clicked: kanto, johto, hoenn, or sinnoh
let chosenGen;
function checkGen(link){

chosenGen = link.innerHTML;
  console.log("you clicked a gen button. It was the " + chosenGen + " button" );

  if(chosenGen=="Kanto"){
    console.log("KANTOOOO");
    rangeOne=1;
    rangeTwo=151;
    console.log("Your range is now: " + rangeOne +" - " + rangeTwo)
  }
  else if(chosenGen=="Johto"){
    console.log("JOHTOOO");
    rangeOne=152;
    rangeTwo=251;
    console.log("Your range is now: " + rangeOne +" - " + rangeTwo)
  }
  else if(chosenGen=="Hoenn"){
    console.log("HOENNN");
    rangeOne=252;
    rangeTwo=386;
    console.log("Your range is now: " + rangeOne +" - " + rangeTwo)
  }
  else if(chosenGen=="Sinnoh"){
    console.log("SINOHHHH");
    rangeOne=387;
    rangeTwo=493;
    console.log("Your range is now: " + rangeOne +" - " + rangeTwo)
  }
}
let chosenPoke;
let pokeAnswer;
//function to generate the random numbers from GeekforGeeks: https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
function generateNumbers() {
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  //choices is an array to store the randomly generated numbers for each multiple choice option
  let choices = [];
  let choiceOne = randomNumber(rangeOne, rangeTwo);
  let choiceTwo = randomNumber(rangeOne, rangeTwo);
  let choiceThree = randomNumber(rangeOne, rangeTwo);
  let choiceFour = randomNumber(rangeOne, rangeTwo);

  choices.push(choiceOne);
  choices.push(choiceTwo);
  choices.push(choiceThree);
  choices.push(choiceFour);

  //Forumula for getting a random array value from: https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
  const randomPoke = Math.floor(Math.random() * choices.length);

  //chosenPoke is the PokeDex number of the Pokemon that the user is trying to guess, while randomPoke is the its index in the array
  chosenPoke = choices[randomPoke];

  //Below is purely for troubleshooting purposes. I wanted to see if a single array item was being randomly chosen as the answer. There is no borrowed code here, I used my previously knowledge of for loops. 
  var incorrectAns = [];

  for (let i = 0; i < choices.length; i++) {
    if (choices[i] - 1 != chosenPoke) {
      incorrectAns.push(choices[i]);
    } else {
      console.log("this is the correct answer = " + choices[i]);
    }
  }

  console.log("These are the incorrect answers = " + incorrectAns);

  //declaring for pokemon NAMES from their number (choice values)
  let firstPoke;
  let secondPoke;
  let thirdPoke;
  let fourthPoke;

  function getPokemon() {
    document.getElementById("result").innerHTML = "Select an answer below.";
    //first fetch pokemon for the choices
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=493&limit=none")
      .then((response) => response.json())
      .then((pokemonList) => {
        firstPoke = pokemonList.results[choices[0]-1].name;
        secondPoke = pokemonList.results[choices[1]-1].name;
        thirdPoke = pokemonList.results[choices[2]-1].name;
        fourthPoke = pokemonList.results[choices[3]-1].name;
        //pokeAnswer is the NAME of the pokemon being tested
        pokeAnswer = pokemonList.results[chosenPoke-1].name;

        document.querySelector("#choiceOne").innerHTML = firstPoke;
        document.querySelector("#choiceTwo").innerHTML = secondPoke;
        document.querySelector("#choiceThree").innerHTML = thirdPoke;
        document.querySelector("#choiceFour").innerHTML = fourthPoke;

        console.log(choiceOne + ", " + firstPoke);
        console.log("the name of the correct pokemon is: " + pokeAnswer);
        console.log(pokemonList);
      });

    //ansUrl is the endpoint of the Pokemon being tested (as in, the question/answer to the quiz); can get its specific data like type, weight, move set, etc.

    let ansUrl = `https://pokeapi.co/api/v2/pokemon/${chosenPoke}`;
    fetch(ansUrl)
      .then((response) => response.json())
      .then((pokemon) => {
        console.log(
          "chosen poke number = " + chosenPoke + " name = " + pokemon.name
        );

        //Display API data into HTML
        document.getElementById(
          "pokemonDisplay"
        ).innerHTML = `<img class="pokeImg" src="${pokemon.sprites.other.dream_world.front_default}">
   
     `;
      });
  }
  getPokemon();
}

let answer;
let wrong = document.getElementById("sfxWrong"); 
let right = document.getElementById("sfxRight"); 

function checkAns(answer) {
  console.log("your answer is " + answer);
  console.log("the correct answer is " + chosenPoke + ", " + pokeAnswer);

  if (answer == pokeAnswer) {
    console.log("CORRECT!");
    document.getElementById("result").innerHTML = "CORRECT!";
    right.play(); 
  } else {
    console.log("SORRY, TRY AGAIN!");
    document.getElementById("result").innerHTML = "SORRY, TRY AGAIN!";
    wrong.play(); 
  }
}


//load the random number function (generateNumbers()) on page load: https://stackoverflow.com/questions/3842614/how-do-i-call-a-javascript-function-on-page-load
window.onload = generateNumbers;