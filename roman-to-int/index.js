class RomanToInt {

    constructor () {
        this.ones = new Set(['I', 'V']);
        this.tens = new Set(['X', 'L']);
        this.hundreds = new Set(['C', 'D']);
        this.thousands = new Set(['M']);
        
        this.counter = new Map();
        this.counter.set("I", 1);
        this.counter.set("II", 2);
        this.counter.set("III", 3);
        this.counter.set("IV", 4);
        this.counter.set("V", 5);
        this.counter.set("VI", 6);
        this.counter.set("VII", 7);
        this.counter.set("VIII", 8);
        this.counter.set("IX", 9);
        this.counter.set("X", 10);    
        this.counter.set("XX", 20);    
        this.counter.set("XXX", 30);    
        this.counter.set("XL", 40);    
        this.counter.set("L", 50);    
        this.counter.set("LX", 60);    
        this.counter.set("LXX", 70);    
        this.counter.set("LXXX", 80);
        this.counter.set("XC", 90);
        this.counter.set("C", 100);
        this.counter.set("CC", 200);
        this.counter.set("CCC", 300);
        this.counter.set("CD", 400);
        this.counter.set("D", 500);
        this.counter.set("DC", 600);
        this.counter.set("DCC", 700);
        this.counter.set("DCCC", 800);
        this.counter.set("CM", 900);
        this.counter.set("M", 1000);
        this.counter.set("MM", 2000);
        this.counter.set("MMM", 3000);
    }
    
        convertPrime (s, i) {
            if (i + 4 <= s.length) {
                let sub = s.substring(i, i+4);
                let intVal = this.counter.get(sub);
                if (intVal) {
                    return { intVal: intVal, i: i+4 }
                }
            }
    
            if (i + 3 <= s.length) {
                let sub = s.substring(i, i+3);
                let intVal = this.counter.get(sub);
                if (intVal) {
                    return { intVal: intVal, i: i+3 }
                }
            }
    
            if (i + 2 <= s.length) {
                let sub = s.substring(i, i+2);
                let intVal = this.counter.get(sub);
                if (intVal) {
                    return { intVal: intVal, i: i+2 }
                }
            }
    
            if (i + 1 <= s.length) {
                let sub = s.substring(i, i+1);
                let intVal = this.counter.get(sub);
                if (intVal) {
                    return { intVal: intVal, i: i+1 }
                }
            } else {
                console.log ("i: " + i + " s.length: " + s.length);
                console.log ("s[i]: " + s[i]);
            }
        }
        
        convert (s) {
            let i = 0;
            let sum = 0;
            while (i < s.length) {
                let result = this.convertPrime(s, i);
                i = result.i;
                sum += result.intVal;
            }
            
            return sum;
        }
        
    }
                   
    
    /**
     * @param {string} s
     * @return {number}
     */
    var romanToInt = function(s) {
        let ri = new RomanToInt();
        return ri.convert(s);
    };

    let result = romanToInt("MCMXCIV");
    console.log(result);