class RomanNum {
    constructor() {
        this.scaleToLetterMap = new Map();
        this.scaleToLetterMap.set(1, "I");
        this.scaleToLetterMap.set(10, "X");
        this.scaleToLetterMap.set(100, "C");
        this.scaleToLetterMap.set(1000, "M");

        this.midLetterMap = new Map();
        this.midLetterMap.set(1, "V");
        this.midLetterMap.set(10, "L");
        this.midLetterMap.set(100, "D");
        this.midLetterMap.set(1000, "V")
    }

    intToRomanLetters(intVal, scale) {
        // console.info("Enter intToRomanLetters: " + intVal + ", " + scale);
        let letter = this.scaleToLetterMap.get(scale);
        let nextLetter = this.scaleToLetterMap.get(scale * 10);
        let midLetter = this.midLetterMap.get(scale);
        let result = "";

        if (intVal == 4) {
            return (letter + midLetter);
        } else if (intVal == 5) {
            return midLetter;
        } else if (intVal == 6) {
            return midLetter + letter;
        } else if (intVal == 7) {
            return midLetter + letter + letter;
        } else if (intVal == 8) {
            return midLetter + letter + letter + letter;
        } else if (intVal === 9) {
            return letter + nextLetter;
        } else  {
            for (let i=0; i<intVal; i++) {
                result += letter;
            }
        }

        // console.info("Exit intToRomanLetters: " + result);

        return result;
    }

    convert (decimal) {
        // console.log ("enter convert with: " + decimal);
        var result = "";
        if ((decimal / 1000) >= 1) {
            // console.log ("/1000: " + decimal / 1000);
            let thousands = Math.floor(decimal / 1000);
            result += this.intToRomanLetters(thousands, 1000);
            result += this.convert (decimal % 1000);
        } else if ((decimal / 100) >= 1) {
            // console.log ("/100: " + decimal / 100);
            let hundreds = Math.floor(decimal / 100);
            result += this.intToRomanLetters(hundreds, 100);
            result += this.convert (decimal % 100);
        } else if ((decimal / 10) >= 1) {
            // console.log ("/10: " + decimal / 10);
            let tens = Math.floor(decimal / 10);
            result += this.intToRomanLetters(tens, 10);
            result += this.convert (decimal % 10);
        } else if ((decimal / 1) >= 1) {
            // console.log ("/1: " + decimal / 1);
            let ones = Math.floor(decimal / 1);
            result += this.intToRomanLetters(ones, 1);
        }

        return result;
        // console.log ("hundreds: " + letters);
    }

    print () {
        console.log ("hello world");
    }
}

let rn = new RomanNum();
let decimal = process.argv[2];
let result = rn.convert(decimal);
console.log (result);
