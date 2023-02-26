class Particle {
    constructor(){
        this.position = createVector(width / 2, height / 2);
        this.rays = [];
        for(let angle = 0; angle < 360; angle += 1){
            let a = p5.Vector.fromAngle(radians(angle))
            this.rays.push(new Ray(this.position, a));
        }
    }

    setPosition(x, y){
        this.position.set(x,y); 
    }
    
    doLinesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        /* 
        Function to see if to lines with a given length does intersect. Can be used for collison logic in the
        future
        */

        /* Calculate the slopes and y-intercepts of the two line segments */
        let m1 = (y2 - y1) / (x2 - x1);
        let m2 = (y4 - y3) / (x4 - x3);
        let b1 = y1 - m1 * x1;
        let b2 = y3 - m2 * x3;
        
        /* Check if the lines are parallel */
        if (m1 == m2) {
          return false;
        }
        
        /* Calculate the x-coordinate of the intersection point */
        let x;
        if (x2 - x1 == 0) {
          x = x1;
        } else if (x4 - x3 == 0) {
          x = x3;
        } else {
          x = (b2 - b1) / (m1 - m2);
        }
        
        /* Check if the intersection point is within the range of both line segments */
        if (x < Math.min(x1, x2) || x > Math.max(x1, x2) || x < Math.min(x3, x4) || x > Math.max(x3, x4)) {
          return false;
        }
        
        return true;
      }

    updatePosition(x, y){
        this.position.set(x,y);
    }

    calculateIntersections(ray, walls){
        let intersections = [];        
        intersections = 
            walls
                .map((wall) => {
                    const intersection = ray.calculateIntersection(wall);
                    return intersection 
                })
                .filter(intersection => intersection !== false)
                .sort((inter1, inter2) => {
                    const d1 = p5.Vector.dist(this.position, inter1); 
                    const d2 = p5.Vector.dist(this.position, inter2);
                    return d1 - d2;
                });
        return intersections;
    }

    pointAt(walls){
        
        this.rays.forEach((ray) => {
            let intersections = [];
            
            intersections = this.calculateIntersections(ray, walls);
            if(intersections.length < 1) return;

            let firstIntersection = intersections[0];
            /* Draw line from particle to first intersection */
            stroke(225, 100);
            line(
                this.position.x, 
                this.position.y, 
                firstIntersection.x, 
                firstIntersection.y
            );
            
            return;
            if(intersections.length < 2) return;
            let secondIntersection = intersections[1];
            /* Draw line from first intersection to second intersection */
            stroke(100, 100, 100);
            line(
                firstIntersection.x, 
                firstIntersection.y, 
                secondIntersection.x, 
                secondIntersection.y
            );
        });

    }

    show(){
        fill(255);
        ellipse(this.position.x, this.position.y, 16);
        this.rays.forEach(ray => ray.show);
    }
}