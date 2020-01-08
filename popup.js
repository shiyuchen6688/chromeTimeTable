let prevTasks = ["-"];
let name = "...";
initValues();
initName();
initTables();


function initName() {
    // send a message to background to get prev name if there is one
    chrome.runtime.sendMessage({ purpose: "getName" }, getNameFromBkgScript);
}

function getNameFromBkgScript(response) {
    let greeting = "Hello " + response.name;
    document.getElementById("greet").innerHTML = greeting;
}

function setInitialValues() {
    for (k = 0; k < 12; k++) {
        // j is 4th position of element id 
        for (j = 0; j < 4; j++) {
            // console.log(getIndex("AM", k,  j));
            document.getElementById(k + "AM" + j).innerHTML = prevTasks[getIndex("AM", k, j)];
        }
    }

    for (k = 1; k < 13; k++) {
        // j is 4th position of element id 
        for (j = 0; j < 4; j++) {
            // console.log(getIndex("PM", k,  j));
            document.getElementById(k + "PM" + j).innerHTML = prevTasks[getIndex("PM", k, j)];
        }
    }
}

function getIndex(AMorPM, hour, min) {
    if (AMorPM == "AM") {
        if (hour == 0) {
            return min;
        } else {
            return ((hour * 4) - 1) + min;
        }

    } else if (AMorPM == "PM") {
        if (hour == 12) {
            return ((hour * 4) - 1) + min;
        } else {
            hour = hour + 12;
            return ((hour * 4) - 1) + min;
        }
    }
}


function initValues() {
    prevTasks = ["-"];
    for (i = 0; i < 95; i++) {
        prevTasks.push("-");
    }
}

function getTasksFromBkgrdScript(response) {
    console.log("history recieved");
    console.log(response.history);
    prevTasks = response.history;
    setInitialValues();
}

function initTables() {
    // send a message to background and get history here
    chrome.runtime.sendMessage({ purpose: "getHistory" }, getTasksFromBkgrdScript);
}








// happen when name button is clicked
var nameBtn = document.getElementById("nameBtn");

nameBtn.onclick = function () {
    newName();
};

function newName() {
    // send a message to the content script
    let params = {
        active: true,
        currentWindow: true
    }
    let message = document.getElementById("name").value // get value from user input box

    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {


        let msg = {
            txt: message
        }
        console.log("messabe sended");
        chrome.tabs.sendMessage(tabs[0].id, msg);
    }
    console.log("new text is working"); // for dubug

    // send a message to background script to remember   
    chrome.runtime.sendMessage({ purpose: "newName", name: message }, function () { });

    // change current greeting
    greet(message);
}

function greet(message) {
    console.log("greet has been called"); // for dubug
    document.getElementById("greet").innerHTML = "Hello " + message;
}



// happen when update buttonis clicked
var updateBtn = document.getElementById("updateButton");

updateBtn.onclick = function () {
    updateTable();
    // noticeBkgForPost();
    post();
}

// send data to data base
function noticeBkgForPost() {
    let hour = document.getElementById("hourList").value;
    let min = document.getElementById("min").value;
    let name = document.getElementById("newTaskName").value;
    let msg = {
        purpose: "post",
        hour: hour,
        min: min,
        name: name
    }

    console.log("message sended");
    chrome.runtime.sendMessage(msg, function (response) {
        console.log(response);
    })
}

function post() {
    // create XMLHttpRequest Object
    let xhttp = new XMLHttpRequest();
    // variables we nned to send
    let url = "http://localhost:8080/chromeTimeTracker/website/record.php";

    let hour = document.getElementById("hourList").value;
    let min = document.getElementById("min").value;
    let name = document.getElementById("newTaskName").value;
    let vars = "?hour=" + hour + "&min=" + min + "&newTaskName=" + name;
    xhttp.open("GET", url + vars, true);
    console.log("xhttp opended");
    console.log(url + vars);
    // get response and do something with it
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var return_data = xhttp.responseText;
            console.log(return_data);
            document.getElementById('status').innerHTML = "Task Succesfully Saved.";
        }
    }
    // send data to php and wait for response to update status div 
    xhttp.send(vars);
        document.getElementById('status').innerHTML = "waiting...";
}





// this function will only execute once the update button(submit) is clicked
// and call sendTaskValue to send message to bkg script
function updateTable() {

    // get task value
    console.log(document.getElementById("newTaskName"));
    let taskValue = document.getElementById("newTaskName").value;
    console.log("Waiting for task value to be printed");
    console.log(taskValue);

    // get matchingTDID
    let hourFromForm = document.getElementById("hourList").value;
    let minFromFormList = document.getElementsByName("min");
    let hourID = formHourToID(hourFromForm);
    let minID = formMinToID(minFromFormList);
    let matchingTDId = hourID + minID;

    document.getElementById(matchingTDId).innerHTML = taskValue;

    let arrayIndex = getArrayIndex(hourID, minID);
    sendTaskValue(taskValue, arrayIndex);
}

function formHourToID(hourFromForm) {
    return hourFromForm;
}

function formMinToID(minFromFormList) {
    if (minFromFormList[0].checked) {
        return 0;
    } else if (minFromFormList[1].checked) {
        return 1;
    } else if (minFromFormList[2].checked) {
        return 2;
    } else if (minFromFormList[3].checked) {
        return 3;
    }
}


function getArrayIndex(hourID, minID) {
    let AMorPM;
    let hour;
    let min;
    // check if  it is 10,11 or 12
    let temp = hourID.substring(0, 2);
    if (temp == "10" || temp == "11" || temp == "12") {
        AMorPM = hourID.substring(2, 4);
        switch (temp) {
            case "10":
                hour = 10;
                break;
            case "11":
                hour = 11;
                break;
            case "12":
                hour = 12;
                break;
        }
    } else {
        AMorPM = hourID.substring(1, 3);
        hour = parseInt(hourID.substring(0, 1));
    }
    min = parseInt(minID);

    // get index
    let index = getIndex(AMorPM, hour, min);
    console.log("AMorPM: " + AMorPM + " hour: " + hour + " min: " + min + " index: " + index);
    return index;
}


// send a msg to background script with new taskValue and its index
function sendTaskValue(taskValue, index) {
    console.log("sendTaskValue has been called");
    let msg = {
        purpose: "storeNewTask",
        task: taskValue,
        index: index
    }
    chrome.runtime.sendMessage(msg, function () { console.log("task value already sended to background script"); });
}

// // happen when login button is clicked
// var loginBtn = document.getElementById("login");

// loginBtn.onclick = function () {
//     handleLoginButton();
// }

// function handleLoginButton() {
//     console.log("handleLoginButton is called");
//     let loginURL = "http://localhost:8080/chromeTimeTracker/login.php";
//     chrome.tabs.create({ url: loginURL });
//     // chrome.browserAction.setPopup({
//     //     popup :"test.html"
//     // });
// }

// this function will only execute once the signin button is clicked
document.getElementById('signupBtn').onclick = function() {
    handleSignupButton();
}

function handleSignupButton() {
    let signupURL = "http://localhost:8080/chromeTimeTracker/website/signup.php";
    chrome.tabs.create({ url: signupURL });
}


// this function will only execute once the seeMore button is clicked
document.getElementById('seeMoreBtn').onclick = function() {
    handleSeeMoreButton();
}

function handleSeeMoreButton() {
    let homeURL = "http://localhost:8080/chromeTimeTracker/website/home.php";
    chrome.tabs.create({ url: homeURL });
}