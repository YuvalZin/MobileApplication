var TempClock;
var ClockArray = [];
var formSubmitted = false;


class Clock{

    constructor(Hour, Minute, Second, Country){
        this.hour = Hour;
        this.minute = Minute;
        this.second = Second;
        this.country = Country
    }
    get Country(){return this.country};

    ConvetToSeconds(){
        return this.hour*3600 + this.minute*60 + this.second;
    }

    Show(){
        let formattedHours = ('0' + this.hour).slice(-2);
        let formattedMinutes = ('0' + this.minute).slice(-2);
        let formattedSeconds = ('0' + this.second).slice(-2);

    // Concatenate formatted time parts into hh:mm:ss format
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    }

}

    document.getElementById('ClockForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the default form submission
        
        // Get form values
        let hour = document.getElementById('hour').value;
        if(!isNumberInRange(hour, 0, 23)){
            window.alert("The hour needs to be within the correct range");
            return;
        }
        let minute = document.getElementById('minute').value;
        if(!isNumberInRange(minute, 0, 59)){
            window.alert("The minute needs to be within the correct range");
            return;
        }
        let second = document.getElementById('second').value;
        if(!isNumberInRange(second, 0, 59)){
            window.alert("The second needs to be within the correct range");
            return;
        }
        let country = document.getElementById('country').value;

        // Log or use the collected information as needed
        console.log("Clock Information:");
        console.log("Hour: " + hour);
        console.log("Minute: " + minute);
        console.log("Second: " + second);
        console.log("Country: " + country);

        TempClock = new Clock(hour, minute, second, country);
        ClockArray.unshift(TempClock);

        document.getElementById('hour').value = "";
        document.getElementById('minute').value = "";
        document.getElementById('second').value = "";
        document.getElementById('country').value = "";

        if(ClockArray.length == 2){

            let PresntationDiv = document.getElementById("Presntation");
            PresntationDiv.style.display = "";

            for(let i = 0; i < 5; i++){
                let square = document.createElement('div');
                square.classList.add('square');

                let countryName = document.createElement('div');
                countryName.textContent = "Country: " + ClockArray[i].Country;
      
                let Time = document.createElement('div');
                Time.textContent = "Time: " + ClockArray[i].Show();

                let Converted = document.createElement('div');
                Converted.textContent = "Time converted to seconds: " + ClockArray[i].ConvetToSeconds();
      
                square.appendChild(countryName);
                square.appendChild(Time);
                square.appendChild(Converted);
                PresntationDiv.appendChild(square);
            }
            
        }

    })

function isNumberInRange(value, min, max) {
    var ParsedValue = parseInt(value);
    if((typeof ParsedValue === 'number' && ParsedValue >= min && ParsedValue <= max)){
        return true;
    }

    return false;
    
}
