class Wall{
    constructor(x1, y1, x2, y2){
        this.startPoint = createVector(x1, y1);
        this.endPoint   = createVector(x2, y2);
    }

    show(){
        stroke(255);
        line(this.startPoint.x, 
             this.startPoint.y, 
             this.endPoint.x, 
             this.endPoint.y);
    }
}
