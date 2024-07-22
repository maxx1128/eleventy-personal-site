class Grid {
  constructor() {
     this.coordinates = this.getCoordinatePairs();
     this.colors = [
        "#0074d9",
        "#e5dbac",
        "#FFDC00",
        "#ff851b",
        "#ff4136",
        "#f69acd",
        "#b10dc9",
        "#2ecc40",
        "#795c34",
        "#630536",
        "#038911",
        "#026063",
        "#e3b678",
        "#bb544a",
        "#85144b",
        "#ff1696",
        "#a45de4",
        "#9b7cb9",
        "#3cec96",
        "#7e491d",
        "#7d7c9c"
     ];
     this.coordinateLimit = 11;
  }

  createShapes() {
     const colors = getRandomItems(this.colors, 4, 11);

     colors.forEach((color, index) => {
        const baseCoordinates = this.coordinates.slice(
              index * this.coordinateLimit,
              (index + 1) * this.coordinateLimit
           ),
           fullCoordinates = this.getFullCoordinateRange(baseCoordinates);

        new ShapeTracing(
           color,
           fullCoordinates,
           this.getRandomDuration()
        ).animate();
     });
  }

  getCoordinatePairs() {
     let coordinatePairs = [];
     const xCoordinates = this.getCoordinates();
     const yCoordinates = this.getCoordinates();

     xCoordinates.forEach((x) => {
        yCoordinates.forEach((y) => {
           coordinatePairs.push([x, y]);
        });
     });

     return shuffleArray(coordinatePairs);
  }

  getFullCoordinateRange(coordinates) {
     const coordinatesSubset = getRandomItems(
           coordinates,
           3,
           coordinates.length
        ),
        firstItem = coordinatesSubset.slice(0, 1)[0];
     coordinatesSubset.push(firstItem);
     return coordinatesSubset;
  }

  getRandomDuration() {
     return (Math.floor(Math.random() * 10) + 10) / 10;
  }

  getCoordinates() {
     return [-500, -400, -300, -200, -100, 0, 100, 200, 300, 400, 500];
  }
}

class ShapeTracing {
  constructor(color, points, duration) {
     this.color = color;
     this.points = points;
     this.duration = duration;
     this.currentPoint = [0, 0];
  }

  animate() {
     this.drawLines();
     this.fadeAwayAll();
     new Polygon(this.color, this.points, this.duration).animate();
  }

  drawLines() {
     this.points.forEach((point, index) => {
        const nextX = point[0],
           nextY = point[1];

        if (index > 0) {
           new Line(
              this.currentPoint[0],
              this.currentPoint[1],
              nextX,
              nextY,
              this.color,
              index,
              this.duration
           ).animate();
        }

        new Circle(nextX, nextY, this.color, index, this.duration).animate();
        this.currentPoint = [nextX, nextY];
     });
  }

  fadeAwayAll() {
     this.points.forEach((points) => {
        const circle = `.circle_${points[0]}x${points[1]}`,
           line = `.line_${points[0]}x${points[1]}`;

        TweenLite.to(`${circle}, ${line}`, this.duration, {
           opacity: 0,
           delay: this.duration * this.points.length,
           ease: Linear.easeOut
        });
     });
  }
}

class Polygon {
  constructor(color, coordinates, duration) {
     this.color = color;
     this.coordinates = coordinates;
     this.duration = duration;
  }

  animate() {
     this.stylePolygon();
     this.fillPolygon();
  }

  fillPolygon() {
     TweenLite.to(this.polygonClass(), this.duration, {
        opacity: 0.3,
        delay: this.duration * this.coordinates.length,
        ease: Linear.easeNone
     });
  }

  stylePolygon() {
     const polygon = document.getElementsByClassName(
        this.polygonClass().replace(".", "")
     )[0];
     polygon.setAttribute("points", this.getPoints());
     polygon.setAttribute("fill", this.color);
  }

  polygonClass() {
     return `.polygon_${this.coordinates[0].join("x")}`;
  }

  getPoints() {
     return this.coordinates.map((pair) => pair.join(",")).join(" ");
  }
}

class Circle {
  constructor(x, y, color, index, duration) {
     this.x = x;
     this.y = y;
     this.color = color;
     this.index = index;
     this.duration = duration;
  }

  animate() {
     this.setCircleColors();
     this.animateMainCircle();
     this.animateBackCircle();
  }

  animateMainCircle() {
     TweenLite.to(this.mainClass(), 0.04, {
        opacity: 0.5,
        delay: this.delay()
     });
  }

  animateBackCircle() {
     const backCircleTl = gsap.timeline({ delay: this.delay() });
     backCircleTl
        .to(this.backClass(), {
           duration: 0.01,
           opacity: 1
        })
        .to(this.backClass(), {
           duration: 0.3,
           opacity: 0,
           attr: {
              r: 35
           },
           ease: Power2.easeOut
        });
  }

  mainClass() {
     return `.circle_${this.x}x${this.y}`;
  }

  backClass() {
     return `.circleBack_${this.x}x${this.y}`;
  }

  setCircleColors() {
     [this.mainClass(), this.backClass()].forEach((circle) => {
        document
           .getElementsByClassName(circle.replace(".", ""))[0]
           .setAttribute("fill", this.color);
     });
  }

  delay() {
     return this.duration * this.index + this.duration;
  }
}

class Line {
  constructor(x, y, nextX, nextY, color, index, duration) {
     this.x = x;
     this.y = y;
     this.nextX = nextX;
     this.nextY = nextY;
     this.color = color;
     this.index = index;
     this.duration = duration;

     this.timings = [
        Power1.easeOut,
        Power2.easeOut,
        Power3.easeOut,
        Power4.easeOut,
        Elastic.easeInOut.config(1, 0.3),
        Back.easeOut.config(3),
        Back.easeInOut.config(2),
        Circ.easeOut,
        Circ.easeInOut,
        Sine.easeIn
     ];
  }

  animate() {
     this.setLineColor();
     this.animateLine();
  }

  animateLine() {
     TweenLite.to(this.class(), this.duration, {
        attr: {
           x2: this.nextX,
           y2: this.nextY
        },
        delay: this.duration * this.index,
        ease: randomItem(this.timings)
     });
  }

  setLineColor() {
     document
        .getElementsByClassName(this.class().replace(".", ""))[0]
        .setAttribute("stroke", this.color);
  }

  class() {
     return `.line_${this.x}x${this.y}`;
  }
}

const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

const shuffleArray = (array) => {
  var currentIndex = array.length,
     temporaryValue,
     randomIndex;

  while (0 !== currentIndex) {
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
  }

  return array;
};

const getRandomItems = (array, min, max) => {
  const shuffledArray = shuffle(array),
     limit = Math.random() * (max - min) + min;

  return shuffledArray.slice(0, limit);
};

if (document.querySelector(".coordinates-wrapper")) {
   const grid = new Grid();
   grid.createShapes();
}
