function degToRad(d) {
    return (d * Math.PI) / 180;
  }
class Structure {
  constructor(depth, width, height, center) {
    this.depth = depth / 2;
    this.height = height;
    this.width = width / 2;
    this.structures = {
        translation: [0, 0, -360],
        rotation: [degToRad(0), degToRad(0), degToRad(180)],
        scale: [1, 1, 1],
        positions: this.getPositions({x: center.x, y:center.y}),
        colors: this.getColor()
      };
  }

  getPositions(center) {
    var northEastBelow = [
      center.x - this.depth,
      center.y - this.width,
      this.height
    ];
    var northEastAbove = [center.x - this.depth, center.y - this.width, 0];
    var northWestBelow = [
      center.x + this.depth,
      center.y - this.width,
      this.height
    ];
    var northWestAbove = [center.x + this.depth, center.y - this.width, 0];

    var southEastBelow = [
      center.x - this.depth,
      center.y + this.width,
      this.height
    ];
    var southEastAbove = [center.x - this.depth, center.y + this.width, 0];
    var southWestBelow = [
      center.x + this.depth,
      center.y + this.width,
      this.height
    ];
    var southWestAbove = [center.x + this.depth, center.y + this.width, 0];

    return northEastBelow.concat(
      /* top */ 
      northWestBelow,
      southEastBelow,
      northWestBelow,
      southEastBelow,
      southWestBelow,
      /* right */ 
      northEastBelow,
      southEastBelow,
      northEastAbove,
      northEastAbove,
      southEastBelow,
      southEastAbove,
      /* bottom */ 
      southEastBelow,
      southEastAbove,
      southWestBelow,
      southWestBelow,
      southEastAbove,
      southWestAbove,
      /* left */ 
      southWestBelow,
      southWestAbove,
      northWestBelow,
      northWestBelow,
      southWestAbove,
      northWestAbove,
      /* top */ 
      northWestBelow,
      northWestAbove,
      northEastBelow,
      northEastBelow,
      northWestAbove,
      northEastAbove
    );
  }

  getColor() {
    return [
        109, 98, 38,
        109, 98, 38,
        109, 98, 38,
        109, 98, 38,
        109, 98, 38,
        109, 98, 38,

        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,
        125,125,125,

    ];
  }

  getObj(){
      return this.structures;
  }
}

class Ball {
    constructor(){
        this.ball ={
            translation: [0, 0, -360],
            rotation: [degToRad(0), degToRad(0), degToRad(180)],
            scale: [1, 1, 1],
            positions: this.getPositions(),
            colors: this.getColor(),
            egim: 0,
            tFlag: false,
            sTime: Date.now(),
            frame:0
          };
          
    }

  getPositions() {
    
    var p = [
        45, -5, 0,
        45, 5, 0, 
        55, 5, 0,

        45, -5, 0, 
        55, 5, 0,
        55, -5, 0,]; 
        
    return p;
  }

  getColor() {
    return [
      240, 136, 18,
      240, 136, 18,
      240, 136, 18,
      240, 136, 18,
      240, 136, 18,
      240, 136, 18,
    ];
  }

  getObj(){
      return this.ball;
  }
}

class Tank {

    constructor(){
        this.tank = {
            translation: [0, 0, -360],
            rotation: [degToRad(0), degToRad(0), degToRad(180)],
            scale: [1, 1, 1],
            positions: this.getPositions(),
            colors: this.getColor()
          };

    }

getObj(){
      return this.tank;
}
  getPositions() {
    var positions = [
        30,20,0,
      -30,-20,0,
      -30,20,0,

      30,20,0,
      -30,-20,0,
      30,-20,0,

      5,-5,10,
      45,-5,10,
      5,5,10,

      45,-5,10,
      5,5,10,
      45,5,10,

      8, -8,20,
      -8, 8, 20,
      8, 8, 20,

      -8, 8, 20,
      8, -8, 20,
      -8, -8, 20,

    ];
    return positions;
  }

  getColor() {
    var colors = [
      200,100,100,
      200,100,100,
      200,100,100,
      200,100,100,
      200,100,100,
      200,100,100,

      120,120,120,
      120,120,120,
      120,120,120,
      120,120,120,
      120,120,120,
      120,120,120,
      
      90,90,90,
      90,90,90,
      90,90,90,
      90,90,90,
      90,90,90,
      90,90,90,
      0,0,0,
      0,0,0,
      0,0,0,
      0,0,0,
      0,0,0
    ];
    return colors;
  }
}

