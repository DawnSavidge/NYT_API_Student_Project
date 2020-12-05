const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //1
const key = 'PIXAChxVxwvj8wenSyZ1KUVCbhjsSoyb'; //2
let url; //3

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

//RESULTS SECTION
const section = document.querySelector('section');


nav.style.display = 'none';

let pageNumber = 0;
console.log('PageNumber:', pageNumber);     //To show the page number
let displayNav = false;

function nextPage(e) {
  pageNumber++; //1
  fetchResults(e);  //2
  console.log("Page number:",pageNumber); //3
};

function previousPage(e) {
  if(pageNumber > 0) { //1
    pageNumber--; //2
  } else {
    return; //3
  }
  fetchResults(e); //4
  console.log("Page:", pageNumber); //5

};



searchForm.addEventListener('submit', fetchResults); 
nextBtn.addEventListener('click', nextPage); //3
previousBtn.addEventListener('click', previousPage); //3

//Accessing a REST API
 //1
function fetchResults(e) {
    e.preventDefault();
    //Assemble the full URL
    url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value;
    console.log("URL:", url);    // previously this was console.log(e); - not sure if I was supposed to take that out.


// Assemble the full URL
    url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value; //3

//INSERT HERE  
    if(startDate.value !== '') {
      console.log(startDate.value)
      url += '&begin_date=' + startDate.value;
    };

    if(endDate.value !== '') {
      url += '&end_date=' + endDate.value;
    };
//END HERE

// console.log(url); //4
 
//1
    fetch(url)
    .then(function(result) {
    //  console.log(result)
      return result.json(); //2
    })
    .then(function(json) {
      console.log(json);
      displayResults(json);
    });
}

//2 Logging the JSON
function displayResults(json) {
  while (section.firstChild) {
    section.removeChild(section.firstChild);    //Removing the prior results list before new search results are delivered.
  }
    let articles = json.response.docs;

    if(articles.length >= 10) {
      nav.style.display = 'block';            // Shows the nav display if [at least?] 10 items are in the array.   
    } else {
      nav.style.display = 'none';             //Hides the nav display if less than 10 items are in the array.
    }

    if(articles.length === 0) {
      console.log("No results");
    } else { 
      for(let i=0; i < articles.length; i++) {
        let article = document.createElement('article'); 
        let heading = document.createElement('h2'); 
        let link = document.createElement('a');           // Create variable named 'link'
        let img = document.createElement('img');
        let para = document.createElement('p');
        let clearfix = document.createElement('div');

        let current = articles[i];                        // Create variable named "current" - holds the value of the current articles - 'i'
        console.log("Current:", current);                 // Log the current data so we can see it in the console.

        link.href = current.web_url;                      // ' current.web_url - grabs the hyperlink for the current article out of the json result. This will set the value for the link.href each time we iterate.
        link.textContent = current.headline.main;

        para.textContent = 'Keywords: ';

        for(let j = 0; j < current.keywords.length; j++) {
          let span = document.createElement('span');
          span.textContent += current.keywords[j].value + ' ';
          para.appendChild(span);
        }

        if(current.multimedia.length > 0) {
          img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
          img.alt = current.headline.main;
        }

        clearfix.setAttribute('class', 'clearfix');

        article.appendChild(heading); 
        heading.appendChild(link);
        article.appendChild(img);
        article.appendChild(para);
        article.appendChild(clearfix);
        section.appendChild(article); 
      }
    }
        //Display the data       //console.log("DisplayResults", json);   // Watch this line.
};


function nextPage(){
console.log("Next button clicked");
} //5
                  
function previousPage(){
console.log("Next button clicked");
} //5



//
// const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //1
// const key = 'PIXAChxVxwvj8wenSyZ1KUVCbhjsSoyb'; //2
// let url; //3

// //SEARCH FORM
// const searchTerm = document.querySelector('.search');
// const startDate = document.querySelector('.start-date');
// const endDate = document.querySelector('.end-date');
// const searchForm = document.querySelector('form');
// const submitBtn = document.querySelector('.submit');

// //RESULTS NAVIGATION
// const nextBtn = document.querySelector('.next');
// const previousBtn = document.querySelector('.prev');
// const nav = document.querySelector('nav');

// //RESULTS SECTION
// const section = document.querySelector('section');

// nav.style.display = 'none';

// let pageNumber = 0;
// let displayNav = false;

//         //1                     //2   
// searchForm.addEventListener('submit', fetchResults); 
// nextBtn.addEventListener('click', nextPage); //3
// previousBtn.addEventListener('click', previousPage); //3
