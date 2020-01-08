console.log("Chrome extension ready to go");

// let paragraphs = document.getElementsByTagName('p');
// for(elt of paragraphs) {
//     elt.style['background-color'] = '#FF00FF';
// }

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
    // if(message.txt === "hello") {
    let paragraphs = document.getElementsByTagName('p');
    for(elt of paragraphs) {
        elt.innerHTML = message.txt;
        // elt.style['background-color'] = '#FF00FF';
    }
    // }
}