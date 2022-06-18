//getting element
const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('#quote');
const author = document.querySelector('#author');
const twitterButton = document.querySelector('#twitter-button');
const newQuoteButton = document.querySelector('#new-quote');
const loder = document.querySelector('#loader');


let apiQuotes ;

//loder start function
function loader(){
    loder.hidden = false;
    quoteContainer.hidden = true
    
}

//loader complete functon
function complete(){
    loder.hidden = true;
    quoteContainer.hidden = false
}

//Generatig new quote
function randomQuote(){
    loader()
    
    let index = Math.floor(Math.random()*(apiQuotes.length));
        //showing random quote
    quoteText.textContent = apiQuotes[index].text;

        //check if author name is null or not and display
    if (apiQuotes[index].author == null){
        author.textContent = 'Unknown';
    }else{
        author.textContent = apiQuotes[index].author;
        }

    if (apiQuotes[index].text.length > 100){
        quoteText.classList.add("long-text");
    } else{
        quoteText.classList.remove("long-text");
    }
    complete()
}

//getting data from api
async function getQuote(){
    loader()
    const quoteUrl = "https://type.fit/api/quotes"
    try{
        const response = await fetch(quoteUrl);
        apiQuotes = await response.json();
        randomQuote()
        
    }catch(error){
        console.log(error);
    }

    complete()

}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${author.textContent}`
   window.open(twitterUrl, '_blank')
}
newQuoteButton.addEventListener("click", randomQuote);
twitterButton.addEventListener("click", tweetQuote);

getQuote();
