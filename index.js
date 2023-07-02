/** @type {HTMLCanvasElement} */
window.addEventListener('load', function () {
    const cvs = document.getElementById('canvas');
    const ctx = cvs.getContext('2d');
    cvs.width = 1280 / 2;
    cvs.height = 576 / 2;

    var fps = 60;
    var interval;

    console.log('loaded', ctx);

    class EventHandler {
        constructor(game){
            this.keys = [{x: 0, y: 0}];

            document.addEventListener('click', (e) => {
                this.keys.push({x: e.offsetX, y: e.offsetY});   
            })
        }
        check(){
            if(this.keys.length > 1){
                this.keys.shift();
            }
        }
    }

    class Machine {
        constructor(game) {
            this.game = game;
            this.image = document.getElementById('machinePart1');
            this.image2 = document.getElementById('machinePart2');
            this.image3 = document.getElementById('machinePart3');
            this.width = 128;
            this.height = 128;
            this.imgY = 96;
            this.pos = {
                x: this.game.width - this.width,
                y: this.game.height - this.height
            }
            this.x = (this.game.width - this.width);
            this.y = (this.game.height - this.height * 1.5);
            this.pump = true;
        }
        draw(ctx) {
            ctx.drawImage(this.image, this.pos.x, this.imgY, this.width, this.height);
            ctx.drawImage(this.image2, this.pos.x - this.width * 0.6, this.pos.y - this.height * 0.2, this.width, this.height);
            ctx.drawImage(this.image3, this.pos.x, this.pos.y, this.width, this.height);
        }
        update() {
            if (this.pump == true) {
                this.imgY += 1;
            }
            if (this.imgY == 126) {
                this.pump = false;
            }

            if (this.pump == false) {
                this.imgY -= 5;
            }
            if (this.imgY == 96) {
                this.pump = true;
            }

        }
    }

    class Ballon {
        constructor(game) {
            this.game = game;
            this.image = [
                document.getElementById('ballon1'),
                document.getElementById('ballon2'),
                document.getElementById('ballon3'),
                document.getElementById('ballon4'),
                document.getElementById('ballon5'),
                document.getElementById('ballon6'),
                document.getElementById('ballon7'),
                document.getElementById('ballon8'),
                document.getElementById('ballon9'),
                document.getElementById('ballon10'),
                document.getElementById('ballon11')
            ];
            this.char = [
                document.getElementById('char'),
                document.getElementById('char1'),
                document.getElementById('char2'),
                document.getElementById('char3'),
                document.getElementById('char4'),
                document.getElementById('char5'),
                document.getElementById('char6'),
                document.getElementById('char7'),
                document.getElementById('char8'),
                document.getElementById('char9'),
                document.getElementById('char10'),
                document.getElementById('char11'),
                document.getElementById('char12'),
                document.getElementById('char13'),
                document.getElementById('char14'),
                document.getElementById('char15'),
                document.getElementById('char16'),
                document.getElementById('char17'),
                document.getElementById('char18'),
                document.getElementById('char19'),
                document.getElementById('char20'),
                document.getElementById('char21'),
                document.getElementById('char22'),
                document.getElementById('char23'),
                document.getElementById('char24'),
                document.getElementById('char25'),
            ];
            this.width = 8;
            this.height = 8;
            this.charWidth = 12;
            this.charHeight = 12;
            this.x = 468;
            this.y = 164;
            this.velocityX = 1;
            this.velocityY = 1
            this.pressure = 0;
            this.click = false;
            this.picker = Math.floor(Math.random() * 10);
            this.picker2 = Math.floor(Math.random() * 25);
            this.myIndex = this.game.ballonIndex;
        }
        draw(ctx) {
            ctx.drawImage(this.image[this.picker], this.x - this.width / 2, this.y - this.height, this.width, this.height);
            ctx.drawImage(this.char[this.picker2], (this.x - this.width*0.3), this.y - this.height*0.8, this.charWidth, this.charHeight);
        }
        update() {
            if (this.width < 85) {
                this.width++;
                this.height++;
            }

            if(this.width > 44){
                if(this.charWidth < 51){
                    this.charWidth++;
                    this.charHeight++;
                }
            }

            if(this.goFloat()){
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                if (this.y - this.height <= 0) {
                    this.velocityY = 0;
                } else if (this.y >= this.game.height) {
                    this.velocityY = -this.velocityY;
                }
            }
        }
        goFloat() {
            if (this.width == 85) return true;
            else return false;
        }
    }

    class Game {
        constructor(canvas) {
            this.cvs = canvas;
            this.width = this.cvs.width;
            this.height = this.cvs.height;
            this.eventHandler = new EventHandler(this);
            this.machine = new Machine(this);
            this.ballonIndex = 0;
            this.ballons = [new Ballon(this)];
        }
        render(ctx) {
            this.lastIndex = this.ballons.length - 1;

            this.eventHandler.check();

            this.machine.draw(ctx);
            this.machine.update();

            this.ballons.forEach(ballon => {
                ballon.draw(ctx);
                ballon.update();
            })
        }
        update(){
            if (this.ballons[this.lastIndex].goFloat()) {
                this.ballonIndex++;
                this.ballons.push(new Ballon(this));
            }

            if(this.ballons[0].x + this.ballons[0].width <= 0){
                this.ballons.shift();
            }

            this.destroy();

        }
        destroy(){
            var condition = this.eventHandler.keys[0].x > (this.ballons[0].x - this.ballons[0].width);
            var condition2 = this.eventHandler.keys[0].x < (this.ballons[0].x + this.ballons[0].width);
    
            console.log(condition, condition2);

            if(condition && condition2){
                this.ballons.shift();
                this.eventHandler.keys.push({x: 0, y: 0})
            }
        }
    }

    var game = new Game(cvs);

    function animate() {
        ctx.clearRect(0, 0, cvs.width, cvs.height);

        game.render(ctx);
        game.update();

    } 
    interval = this.setInterval(animate, 1000/fps);
})