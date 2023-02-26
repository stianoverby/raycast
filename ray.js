class Ray {
    constructor(position, angle){
        this.position = position;
        this.direction = angle;
    }

    show(){
        stroke(255);
        push();
        translate(this.position.x, this.position.y);
        line(0, 0, this.direction.x * 10, this.direction.y * 10);
        pop();
    }

    setDirection(x, y){
        this.direction.x = x - this.position.x;
        this.direction.y = y - this.position.y;
        this.direction.normalize();
    }

    calculateIntersection(wall){

        const x1 = wall.startPoint.x;
        const y1 = wall.startPoint.y;
        const x2 = wall.endPoint.x;
        const y2 = wall.endPoint.y;

        const x3 = this.position.x;
        const y3 = this.position.y;
        const x4 = this.position.x + this.direction.x;
        const y4 = this.position.y + this.direction.y;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denominator == 0) return false;
        

        const t =   ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

        if(0 < t && t < 1 && 0 < u){
            const x = x1 + t * (x2 - x1);
            const y = y1 + t * (y2 - y1);
            return createVector(x, y);
        } 

        return false;
        

    }
}