let quotes = [
        {
            author: "Milton Berle",
            text: "If opportunity doesn't knock, build a door."
        },
        {
            author: "Mark Twain",
            text: "The secret of getting ahead is getting started."
        },
        {
            author: "Theodore Roosevelt",
            text: "Believe you can and you're halfway there."
        },
        {
            author: "Winston Churchill",
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts."
        },
        {
            author: "Benjamin Franklin",
            text: "Well done is better than well said."
        }
]    

let randomNum = Math.floor(Math.random() * 5);
let quote = quotes[randomNum];
document.getElementById("quoteText").innerHTML = '"'  + quote.text + '"';
document.getElementById("quoteAuthor").innerHTML = "-by " + '"'  + quote.author + '"';


// generate new quote when newQuote button is clicked
var newQuoteBtn = document.getElementById("newQuote");
newQuoteBtn.onclick = function() {
    handleNewQuote();
}

function handleNewQuote() {
    let randomNum2 = Math.floor(Math.random() * quotes.length);
    let quote2 = quotes[randomNum2];

    document.getElementById("quoteText").innerHTML = '"'  + quote2.text + '"';
    document.getElementById("quoteAuthor").innerHTML = "-by " + '"'  + quote2.author + '"';
}