let taskValues;
let name = "...";
initValues();
console.log("background running");




chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    let msg = {
        txt: "hello"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}


function initValues() {
    taskValues = ["-"];
    for (i = 0; i < 95; i++) {
        taskValues.push("-");
    }
}

chrome.runtime.onMessage.addListener(newTaskSubmited);
function newTaskSubmited(request, sender, sendResponse) {
    if (request.purpose == "storeNewTask") {
        console.log("task is stored in index " + request.index);
        taskValues[request.index] = request.task;
        console.log("New task revcieved: " + taskValues[request.index]);
        sendResponse({ notUsed: "notUsed" });
    } else if (request.purpose == "getHistory") {
        console.log("History sended");
        console.log(taskValues);
        sendResponse({ history: taskValues });
    } else if (request.purpose == "newName") {
        console.log("new name recieved is " + request.name);
        name = request.name;
        sendResponse({ notUsed: "notUsed" });
    } else if (request.purpose == "getName") {
        sendResponse({ name: name });
    } else if (request.purpose == "post") {
        // console.log("background recieved the message");
        // // create XMLHttpRequest Object
        // let xhttp = new XMLHttpRequest();
        // // variables we nned to send
        // let url = "http://localhost:8080/chromeTimeTracker/website/record.php";

        // let vars = "?hour=" + request.hour + "&min=" + request.min + "&newTaskName=" + request.name;
        // xhttp.open("GET", url+vars, true);
        // console.log("xhttp opended");
        // console.log(url+vars);
        // // get response and do something with it
        // xhttp.onreadystatechange = function () {
        //     if (xhttp.readyState == 4 && xhttp.status == 200) {
        //         var return_data = xhttp.responseText;
        //         sendResponse(return_data);
        //     }
        //     // send data to php and wait for response to update status div
        //     xhttp.send(vars);
        // }
    }
}
