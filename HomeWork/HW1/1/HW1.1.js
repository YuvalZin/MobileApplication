var MainCounter;

class Counter{

    //Initiazlizing the number when creating a new Counter
    constructor(Value){
        this.Initialize(Value);
    }

    get Num() { return this.num; }

    set Num(Value) { this.num = Value; }


    Initialize(Value){
        this.num = Value;
    }

    Increment(){
        this.num++;
    }

}

function Start(){
    console.log("Number: " + document.getElementById('InputNum').value);

    var Input = document.getElementById('InputNum');
    var InputValue = document.getElementById('InputNum').value;

    //Check if the input value is a number and not empty
    if(isNaN(InputValue)){
        window.alert("The input value has to be a number!");
        return;
    }

    //Check that the input value is not null
    if(InputValue.trim() === ""){
        window.alert("The input value cannot be empty!");
        return;
    }
    
    MainCounter = new Counter(InputValue);
    
    //Setting the display
    var StartButton = document.getElementById('Start');
    var GoButton = document.getElementById('Go');
    var IncrementButton = document.getElementById('Increment');
    StartButton.style.display = "none";
    GoButton.style.display = "";
    IncrementButton.style.display = "";

    Input.readOnly = true;
    Input.Value = InputValue;

}

function Increment(){

    if (MainCounter) {
        MainCounter.Increment();
        var Input = document.getElementById('InputNum');
        Input.value = MainCounter.Num; 
    }
}

function Go(){
    var WriteDiv = document.getElementById("Write");
    var MaxNumber = parseInt(document.getElementById("InputNum").value);
    let displayText = "";

    var StartButton = document.getElementById('Start');
    var GoButton = document.getElementById('Go');
    var IncrementButton = document.getElementById('Increment');
    StartButton.style.display = "";
    GoButton.style.display = "none";
    IncrementButton.style.display = "none";

    for (let i = 0; i <= MaxNumber; i++) {

        displayText += i;

        if(i != MaxNumber){
            displayText += ", ";
        }
    }

    WriteDiv.textContent = displayText;
    document.getElementById('InputNum').readOnly = false;

} 
