
class Point{

    constructor(_x, _y){

        this.x = _x;
        this.y = _y;
    }

    get X(){return this.x;}
    get Y(){return this.y;}

    Show(){
        return `(${this.x},${this.y})`;
    }

    Equals(P){

        if(this.x == P.X && this.y == P.Y){
            return true;
        }

        return false;
    }

}//End of Point class


let PointArray = [
    new Point(1,9),
    new Point(2,5),
    new Point(7,8),
    new Point(4,9),
    new Point(7,1)
]

let PointSuccess = new Point(2,5);
let PointFail = new Point(3,3);


function SimilairPointsWithValues(Points, X, Y) {
    
    let SuccessP = document.getElementById("Q2SuccessP");
    let FailP = document.getElementById("Q2SFailP");
    let P = new Point(X,Y)

    for (let i = 0; i < Points.length ; i++) {
        if(Points[i].Equals(P)){
            console.log(Points[i]);
            SuccessP.innerHTML = "The point: (" + parseInt(Points[i].X) + ", " + parseInt(Points[i].Y) + ") is similair!"
            return true;
        }
    }
    FailP.innerHTML = "There were no points that are similair."
    return false;
}

function SimilairPointsWithPoint(Points, P) {

    let SuccessP = document.getElementById("Q3SuccessP");
    let FailP = document.getElementById("Q3SFailP");

    for (let i = 0; i < Points.length ; i++) {
        if(Points[i].Equals(P)){
            SuccessP.innerHTML = "The point: (" + parseInt(Points[i].X) + ", " + parseInt(Points[i].Y) + ") is similair!"
            return true;
        }
    }
    FailP.innerHTML = "There were no points that are similair."
    return false;
}

function TripDistance(Points) {

    let SuccessP = document.getElementById("Q4SuccessP");

    let NewSortedPoints = Points.sort((a, b) => a.x - b.x);
    let DistanceSum = 0;

    for (let i = 0; i < NewSortedPoints.length - 1; i++) {
        DistanceSum += calculateDistance(NewSortedPoints[i], NewSortedPoints[i + 1]);
    }

    SuccessP.innerHTML = "The route length is: " + DistanceSum;
    return DistanceSum;
}

function calculateDistance(pointA, pointB) {
    return Math.sqrt((pointB.x - pointA.x) ** 2 + (pointB.y - pointA.y) ** 2);
}





