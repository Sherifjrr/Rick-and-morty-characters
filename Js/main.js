// Declaring Dom Elements

let searchBox = document.getElementById("searchFilter");
let gender = document.getElementById("gender");
let status = document.getElementById("status");
let species = document.getElementById("species");
let search = document.getElementById("search");
let searchButton = document.getElementById("search-button");
let Reset = document.getElementById("reset");
let resultsArea = document.getElementsByClassName("results");
let InvalidText = document.getElementById("invalid");
let resultsImg = document.getElementsByClassName("img");
let characterStatus = document.getElementsByClassName("liveStatus");
let characterSpecies = document.getElementsByClassName("liveSpecies");
let characterLocation = document.getElementsByClassName("location");
let characterName = document.getElementsByClassName("name");
let characterFiled = document.getElementsByClassName("result");
let characterEpisode = document.getElementsByClassName("episode");
let randomCharacterName = document.getElementsByClassName("randomName");
let randomCharacterImg =document.getElementsByClassName("randomCharacterImg");
let randomLiveStatus = document.getElementsByClassName("randomLiveStatus");
let refreshButton = document.getElementById("refresh");
let randomLiveSpecies = document.getElementsByClassName("randomLiveSpecies");
let randomLocation = document.getElementsByClassName("randomLocation");
let randomEpisode = document.getElementsByClassName("randomEpisode");
let apiKey = 'https://rickandmortyapi.com/api/character/?name=';
let characterApiKey = "https://rickandmortyapi.com/api/character/";


// Search Filter toggle Visibility by eventListener
let  searchFilter = document.getElementById("filter").addEventListener("click" ,myFun => {
    if (searchBox.style.visibility == "visible") {
        searchBox.style.visibility = "hidden"; 
    }
    else {
        searchBox.style.visibility ="visible";
    }
});

// Reset Button for Filter
Reset.addEventListener("click", function myfun(){
    gender.selectedIndex = 0 ;
    status.selectedIndex = 0 ;
    species.selectedIndex = 0 ;
});



// Button for fetching And append Data to the UI 

searchButton.addEventListener("click" , foo);
function foo() {
    //Getting the user input values
    let values = `${search.value}&gender=${gender.value}&status=${status.value}&species=${species.value}`;
    fetch(`${apiKey}${values}`)
    .then((response) => {
        // Check if the Data Is found
    if(response.status == 200 & search.value !== ""){
        InvalidText.innerHTML = "";
        // scroll into result
        resultsArea[0].scrollIntoView();
        return response.json();
    }
    else {
        InvalidText.innerHTML = "Invalid Character!";    
        console.log("error", err);
    }
    })
    .then(data => {
                //arrays for store data from iteration
                let myData = data.results.length;
                let arrayName = [];
                let arrayImg = [];
                let arrayStatus = [];
                let arraySpecies = [];
                let arrayLocation = [];
                let arrayEpisode = [];  
                
                // Display Cards by search number result
                for (i=0; i< characterFiled.length; i++){
                    characterFiled[i].style.display = "none";
                }
                
                // handing the data if it > 1 
                if (myData > 1) {
                    for (i = 0; i < characterName.length; i++) {
                    
                        //fetch the episode name cuz the api doesn't provide 
                    fetch(data.results[i].episode[0])
                    .then((res)=>{
                        return res.json();
                    })
                    .then (EpisodesData =>{
                        let episodeVal = arrayEpisode.push(EpisodesData.name);
                        for (i = 0; i < characterEpisode.length ; i++){ 
                            characterEpisode[i].innerHTML = arrayEpisode[i];
                        }
                    })
                    .catch((error) =>{
                        console.log("error", error);
                    });
                    
                        let img = arrayImg.push(data.results[i].image);
                        let name = arrayName.push(data.results[i].name);
                        let statusVal = arrayStatus.push(data.results[i].status);
                        let speciesVal = arraySpecies.push(data.results[i].species);
                        let location = arrayLocation.push(data.results[i].location.name);
                        
                        //append data to Ui 
                        characterFiled[i].style.display = "flex";
                        characterName[i].innerHTML= arrayName[i];
                        resultsImg[i].src= arrayImg[i];
                        characterSpecies[i].innerHTML= `${arrayStatus[i]} - ${arraySpecies[i]}`;
                        characterLocation[i].innerHTML = arrayLocation[i];
                        
                        // color by status
                        if (arrayStatus[i] == "Alive") {
                            characterStatus[i].style.backgroundColor = "#00b35a";
                        }
                        else if (arrayStatus[i] == "Dead") {
                            characterStatus[i].style.backgroundColor = "#DC143C";
                        }
                        else {
                            characterStatus[i].style.backgroundColor = "#ADD8E6";
                        }
                       
                    }
                } 
                else {

                    let img = data.results[0].image;
                    let name =data.results[0].name;
                    let statusVal =data.results[0].status;
                    let speciesVal = data.results[0].species;
                    let location =data.results[0].location.name;
                    
                    if (statusVal == "Alive") {
                        characterStatus[0].style.backgroundColor = "#00b35a";
                    }
                    else if (statusVal == "Dead") {
                        characterStatus[0].style.backgroundColor = "#DC143C";
                    }
                    else {
                        characterStatus[0].style.backgroundColor = "#ADD8E6";
                    }
                    resultsImg[0].src=`${img}`;
                    characterName[0].innerHTML= `${name}`;
                    characterSpecies[0].innerHTML= `${statusVal} - ${speciesVal}`;
                    characterLocation[0].innerHTML =`${location}`;
                    characterFiled[0].style.display = "flex";


                    fetch(data.results[0].episode[0])
                    .then((res)=>{
                        return res.json();
                    })
                    .then (EpisodesData =>{
                        let episodeVal = EpisodesData.name;
                        characterEpisode[0].innerHTML = `${episodeVal}`;
                    })
                    .catch((error) =>{
                        console.log("error", error);
                    });
                }
                   
        })
        
}



search.addEventListener("keyup", function fo(e){
    if(e.keyCode === 13) {
        foo();
    }
});



// Getting Random data from Api
function Random (){
    let arrayRandomCharacters = [];
    let arrayRandomName = [];
    let arrayRandomImg = [];
    let arrayRandomStatus = [];
    let arrayRandomSpecies = [];
    let arrayRandomLocation = [];
    let arrayRandomEpisode = [];


    for (i = 0; i < 6 ; i++ ) {
        //random number between characters
    let randomNumber = Math.floor(Math.random() * 670 + 1);
        // fetch by character 
    fetch(`${characterApiKey}${randomNumber}`)
    .then(res => {return res.json()})
    .then (data => { 
        fetch(data.episode[0])
            .then((res)=>{
                return res.json();
            })
            .then (EpisodesData =>{
                let episodes = arrayRandomEpisode.push(EpisodesData.name);
                for (i = 0; i < randomEpisode.length ; i++){ 
                    randomEpisode[i].innerHTML = arrayRandomEpisode[i];
                }
            })
            .catch((error) =>{
                console.log("error", error);
            });

            console.log(data)
        
        let randomImg = arrayRandomImg.push(data.image);
        let randomName = arrayRandomName.push(data.name);
        let randomStatus = arrayRandomStatus.push(data.status);
        let randomSpecies = arrayRandomSpecies.push(data.species);
        let randomLocations = arrayRandomLocation.push(data.location.name);
        

        for (i = 0; i < randomCharacterName.length ; i++){ 
            randomCharacterName[i].innerHTML = arrayRandomName[i];
            randomCharacterImg[i].src = arrayRandomImg[i];
            randomLiveSpecies[i].innerHTML = `${arrayRandomSpecies[i]} - ${arrayRandomStatus[i]}`;
            randomLocation[i].innerHTML = arrayRandomLocation[i];
        
            if (arrayRandomStatus[i] == "Alive") {
                randomLiveStatus[i].style.backgroundColor = "#00b35a";
            }
            else if (arrayRandomStatus[i] == "Dead") {
                randomLiveStatus[i].style.backgroundColor = "#DC143C";
            }
            else {
                randomLiveStatus[i].style.backgroundColor = "#ADD8E6";
            }
        }
        
        })
    }
}

Random();

// refresh button
refreshButton.addEventListener("click", fu =>{
    Random();
})
       

