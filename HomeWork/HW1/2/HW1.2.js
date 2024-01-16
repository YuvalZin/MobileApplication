var TempDuck;

class Duck{

    constructor(Name, Color, Age, Weight, Image){
        this.name = Name;
        this.color = Color;
        this.age = Age;
        this.weight = Weight
        this.image = Image;
    }

    Show(){

        let TextDiv = document.getElementById("TextDiv");
        TextDiv.textContent = "";
        let DisplayText = "Hi, I'm " + this.name + " and I am a Duck! My Color is " + this.color + " and my age is " + this.age + ". I weigh " + this.weight + "KG. Here is a pciture of me!" ;
        
        TextDiv.textContent = DisplayText;

        // Create an img element
        let img = document.createElement('img');
        img.src = this.image; // Set the image URL from the provided URL

        // Append the image to the div
        TextDiv.appendChild(img);
       
    }

    Quack() {
        let TextDiv = document.getElementById("TextDiv");
        TextDiv.textContent = "";
        let NumberOfQuacks = (this.age * this.weight) / 2;
        let DisplayText = "";
    
        let audio = document.getElementById('quackAudio');
    
        function playQuack(index) {
            setTimeout(function () {
                DisplayText += "Quack ";
                audio.currentTime = 0; // Reset audio to start
                audio.play(); // Play the audio for each "Quack"
                TextDiv.textContent = DisplayText;
            }, index * 1000); // Adjust the delay (1000ms = 1 second) if needed
        }
    
        for (let i = 0; i < NumberOfQuacks; i++) {
            playQuack(i);
        }
    }
    
}

function Temp(){
    document.getElementById('duckForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the default form submission
        
        // Get form values
        let name = document.getElementById('name').value;
        let color = document.getElementById('color').value;
        let age = document.getElementById('age').value;
        let weight = document.getElementById('weight').value;
        let image = document.getElementById('image').value;
        // Log or use the collected information as needed
        console.log("Duck Information:");
        console.log("Name: " + name);
        console.log("Color: " + color);
        console.log("Age: " + age);
        console.log("Weight: " + weight);
        console.log("Image File:", image);
        
        TempDuck = new Duck(name, color, age, weight, image);
        document.getElementById("DuckForm").style.display = "none";
        document.getElementById("Presntation").style.display = "";
        

    })
}
