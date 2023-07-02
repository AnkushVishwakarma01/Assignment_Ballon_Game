export default class Machine {
    constructor(imageObj) {
        this.blower = {
            x: 480,
            y: 290
        }
        this.pump = {
            x: 580,
            y: 230
        }
        this.box = {
            x: 580,
            y: 330
        }
        this.upPressure = 5;
        this.downPressure = 1;
        this.bool = true;
        this.imageObj = imageObj;
    }
    draw(ctx) {
        ctx.drawImage(this.imageObj.part1, this.blower.x, this.blower.y, 170, 170);
        ctx.drawImage(this.imageObj.part2, this.pump.x, this.pump.y, 170, 170);
        ctx.drawImage(this.imageObj.part3, this.box.x, this.box.y, 170, 170);
    }
    update(ctx) {
        this.press(this.bool);
        this.release(this.bool);
    }
    press(bool){
        if(bool == true){
            this.pump.y += this.downPressure;
        }
        
        if(this.pump.y == 280){
            bool=false
        } 
    }
    release(bool){
        if(this.pump.y == 230){
            bool = true;
        }
        if(this.bool == false){
            pump.y -= this.upPressure;
        } 
    }
}