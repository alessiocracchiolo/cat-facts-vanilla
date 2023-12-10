const loading = document.querySelector('.loading');

const factCatsArray = [];

let page = 1;

const textFact = document.querySelector('.text-container p');

const facts = document.querySelectorAll('.menu div span');

let prevent = 0;

const border = document.querySelector('.border');

let rotation = [0, 45, 90, 135, 180, 225, 270, 315];

const btn = document.querySelector('button');

const tutorial = document.querySelector('.tutorial');
  
// Funzione per ottenere i fatti sui gatti dall'API
function getCatFacts() {
    fetch(`https://catfact.ninja/facts?page=${page}&limit=8&max_length=150`)
    .then(response => response.json())
    .then(data => {
        setTimeout(() => {
            loading.classList.add('hide');
        }, 2000);
        factCatsArray.splice(0, factCatsArray.length);
        factCatsArray.push(data.data);
        displayCatFacts(data.data);
    })
    .catch((error) => {
        console.error("Errore durante il recupero dei dati funzione getCatFacts:", error);
    });
}

// Funzione per visualizzare i fatti sui gatti nella lista
function displayCatFacts(catFacts) {

    const menuDivs = document.querySelectorAll('.menu div span');
    
    textFact.innerHTML = catFacts[0].fact;

    catFacts.forEach(function (fact, index) {

        const spanText = fact.fact;
        if(index === 0){
            menuDivs[index].innerHTML = spanText;
        }
        else{
            menuDivs[index].innerHTML = spanText;
        }
    });
}    

// Random image
function randomImage(index){
    const sliderImage = document.querySelector('.slider img');
    const imageSrc = `https://placekitten.com/400/400?image=${index}`;
    
    sliderImage.src = imageSrc;
}

// Driver
function driverStart(){

    const driver = window.driver.js.driver;

    const driverObj = driver({
        showProgress: true,
        doneBtnText: 'Done',
        closeBtnText: 'Close',
        nextBtnText: 'Next',
        prevBtnText: 'Previous',
        allowClose: true,
        animation: true,
        keyboardControl: true,
        steps: [
            {
                
                element: '#container', 
                popover: { 
                    title: 'Welcome to Cat Facts!', 
                    description: 'You can click on the facts to see more, and click the button to load more facts!', 
                    side: "left",
                    align: 'center',
                },
            },
            {
                element: '#welcome_driver',
                popover: {
                    title: 'Click the fact!',
                    description: 'Click on the fact to see more!',
                    side: "left",
                    align: 'center',
                },
            },
            {
                element: '#text_driver',
                popover: {
                    title: 'Read the fact!',
                    description: 'Enjoy the fact!',
                    side: "left",
                    align: 'center',
                },
            }, {
                element: '#btn_driver',
                popover: {
                    title: 'Click the button!',
                    description: 'Click the button to load more facts!',
                    side: "left",
                    align: 'center',
                },
            }
        ],
    });

    driverObj.drive();

}

// Chiamata iniziale per ottenere i dati dall'API
getCatFacts();

// Chiamata per il driver
setTimeout(() => {
    driverStart();
}, 2500);


// Event listeners
// Fatti
facts.forEach((fact, index) => {
    fact.addEventListener('click', (e) => {
        
        facts.forEach((fact, i) => {
            if(fact.classList.contains('active')){
                prevent = i;
            }
            fact.classList.remove('active');
        });

        e.target.classList.add('active');


        if(prevent === 7){
            if(index === 0){
                rotation = rotation.map(valore => valore + 360);
            }
        }
        
        border.style.transform = `translate(-50%, -50%) rotate(${rotation[index]}deg)`;

        randomImage(index);

        textFact.innerHTML = factCatsArray[0][index].fact;

    });
});
// Bottone
btn.addEventListener('click', () => {
    loading.classList.remove('hide');
    page++;
    setTimeout(() => {
        getCatFacts();
        init();
    }, 200);

});
// Tutorial
tutorial.addEventListener('click', () => {
    driverStart();
});


function init() {

    facts.forEach((fact, index) => {
        fact.classList.remove('active');
    });

    facts[0].classList.add('active');

    border.style.transform = `translate(-50%, -50%) rotate(${rotation[0]}deg)`;

}

