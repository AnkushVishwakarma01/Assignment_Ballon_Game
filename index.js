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
        constructor(){
            this.keys = {x: -268, y: 60};

            document.addEventListener('mousedown', (e) => {
                this.keys.x = e.offsetX;
                this.keys.y = e.offsetY;
            })
            document.addEventListener('mouseup', (e) => {
                this.keys.x = -468;
                this.keys.y = null;
            })
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
            this.width = 8;
            this.height = 8;
            this.charWidth = 12;
            this.charHeight = 12;
            this.x = 468;
            this.y = 164;
            this.cx = this.x - this.width / 2;
            this.cy = this.y - this.height;
            this.velocityX = 1;
            this.velocityY = 1;
            this.pressure = 1;
            this.picker = Math.floor(Math.random() * 10);
            this.picker2 = Math.floor(Math.random() * 25);
            this.img = this.game.image[this.picker];
            this.char = this.game.char[this.picker2];
            this.burst = false;
            this.event = new EventHandler();
        }
        draw(ctx) {
            ctx.drawImage(this.img, this.cx, this.cy, this.width, this.height);
            ctx.drawImage(this.char, (this.x - this.width*0.3), this.y - this.height*0.8, this.charWidth, this.charHeight);
        }
        update() {
            this.cx = this.x - this.width / 2;
            this.cy = this.y - this.height;

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

            this.isBurst();

            if(this.goFloat()){
                this.x -= this.velocityX;
                this.y -= this.velocityY*this.pressure;
                if (this.y - this.height <= 0) {
                    this.pressure = -4;
                }
                if(this.pressure < 1){
                    this.pressure += 0.1;
                }
            }

        }
        goFloat() {
            if (this.width == 85) return true;
            else return false;
        }
        isBurst(){
            if((this.cx < this.event.keys.x && this.cx + this.width > this.event.keys.x) && 
            (this.cy < this.event.keys.y && this.cy + this.height > this.event.keys.y)){
                this.burst = true;
            }
        }
    }

    class Game {
        constructor(canvas) {
            this.cvs = canvas;
            this.width = this.cvs.width;
            this.height = this.cvs.height;
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
            this.machine = new Machine(this);
            this.ballons = [new Ballon(this)];
        }
        render(ctx) {
            this.machine.draw(ctx);
            this.machine.update();

            this.ballons.forEach(ballon => {
                ballon.draw(ctx);
                ballon.update();
            })
        }
        update(){
            for(let i = 0; i < this.ballons.length; i++){
                if(this.ballons[i].burst == true){
                    this.ballons.splice(i, 1);
                }
            }

            if (this.ballons[this.ballons.length-1].goFloat()) {
                this.ballons.push(new Ballon(this));
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