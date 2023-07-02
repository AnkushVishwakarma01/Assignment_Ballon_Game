export default class Ballon {
    constructor(imgArr, alphabet){
        this.coord = {
            x: 588,
            y: 328
        }
        this.coord2 = {
            x: 575,
            y: 312
        }
        this.width = 12;
        this.height = 12;
        this.Cwidth = 10;
        this.Cheight = 10;
        this.imageArr = imgArr;
        this.alphabet = alphabet;
        //this.random = Math.floor(Math.random() * 25);
        
    }
    draw(ctx){
        ctx.drawImage(this.imageArr[1], this.coord.x - this.width, this.coord.y - this.height, this.width, this.height);
        ctx.drawImage(this.alphabet, this.coord2.x - this.Cwidth, this.coord2.y - this.Cheight, this.Cwidth, this.Cheight);
    }
    update(ctx){
        if(this.width < 128) {
            this.width += 2;
            this.height += 2;
        }
        if(this.Cwidth < 102){
            this.Cwidth += 1;
            this.Cheight += 1
        }
    }
}

//Background
var bg = new Image();
bg.src = "./Assets/Graphics/Symbol 3 copy.png";

//Ballons
var ballon1 = new Image();
ballon1.src = './Assets/Graphics/Symbol 100001.png';
var ballon2 = new Image();
ballon2.src = './Assets/Graphics/Symbol 100002.png';
var ballon3 = new Image();
ballon3.src = './Assets/Graphics/Symbol 100003.png';
var ballon4 = new Image();
ballon4.src = './Assets/Graphics/Symbol 100004.png';
var ballon5 = new Image();
ballon5.src = './Assets/Graphics/Symbol 100005.png';
var ballon6 = new Image();
ballon6.src = './Assets/Graphics/Symbol 100006.png';
var ballon7 = new Image();
ballon7.src = './Assets/Graphics/Symbol 100007.png';
var ballon8 = new Image();
ballon8.src = './Assets/Graphics/Symbol 100008.png';
var ballon9 = new Image();
ballon9.src = './Assets/Graphics/Symbol 100009.png';
var ballon10 = new Image();
ballon10.src = './Assets/Graphics/Symbol 100010.png';
var ballon11 = new Image();
ballon11.src = './Assets/Graphics/Symbol 100011.png';

var ballonsArr = [ballon1, ballon2, ballon3, ballon4, ballon5, ballon6, ballon7, ballon8, ballon9, ballon10, ballon11];
var alphabets = [
    './Assets/Graphics/Symbol 10001.png',
    './Assets/Graphics/Symbol 10002.png',
    './Assets/Graphics/Symbol 10003.png',
    './Assets/Graphics/Symbol 10004.png',
    './Assets/Graphics/Symbol 10005.png',
    './Assets/Graphics/Symbol 10006.png',
    './Assets/Graphics/Symbol 10007.png',
    './Assets/Graphics/Symbol 10008.png',
    './Assets/Graphics/Symbol 10009.png',
    './Assets/Graphics/Symbol 10010.png',
    './Assets/Graphics/Symbol 10011.png',
    './Assets/Graphics/Symbol 10012.png',
    './Assets/Graphics/Symbol 10013.png',
    './Assets/Graphics/Symbol 10014.png',
    './Assets/Graphics/Symbol 10015.png',
    './Assets/Graphics/Symbol 10016.png',
    './Assets/Graphics/Symbol 10017.png',
    './Assets/Graphics/Symbol 10018.png',
    './Assets/Graphics/Symbol 10019.png',
    './Assets/Graphics/Symbol 10020.png',
    './Assets/Graphics/Symbol 10021.png',
    './Assets/Graphics/Symbol 10022.png',
    './Assets/Graphics/Symbol 10023.png',
    './Assets/Graphics/Symbol 10024.png',
    './Assets/Graphics/Symbol 10025.png',
    './Assets/Graphics/Symbol 10026.png',
]

console.log(alphabets[Math.floor(Math.random() * 25)]);
var alphabet = new Image();
alphabet.src = './Assets/Graphics/Symbol 10026.png';

//Machine parts
var machinePart_1 = new Image();
machinePart_1.src = './Assets/Graphics/Symbol 320002.png';
var machinePart_2 = new Image();
machinePart_2.src = './Assets/Graphics/Symbol 320001.png';
var machinePart_3 = new Image();
machinePart_3.src = './Assets/Graphics/Symbol 320003.png';
var imageObj = {
    part1: machinePart_1,
    part2: machinePart_2,
    part3: machinePart_3
}
