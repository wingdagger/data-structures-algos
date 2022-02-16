/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function(s) {
     let calc = new Calculator(s);
     calc.convertToRPN(calc.parse(s));
     calc.print();
     let result = calc.calculate();
     console.log("Result: " + result);

     return result;
};

class Calculator {
    constructor(str) {
        this.str = str;
        this.delimitersArray = ['/', '*', '+', '-'];
        this.operators = [];
        this.output = [];
    }

    arithmetic (operator, operand1, operand2) {
        if (operator === '*') {
            return +operand2 * +operand1;
        } else if (operator === '/') {
            return Math.floor(+operand2 / +operand1);
        } else if (operator === '+') {
            return +operand2 + +operand1;
        } else if (operator === '-') {
            return +operand2 - +operand1;
        } else {
            throw Exception ("Unknown operator: " + operator);
        }
    }

    calculate() {
        let stack = [];
        for (let i=0; i<this.output.length; i++) {
            if (this.delimitersArray.includes(this.output[i])) {
                stack.push(this.arithmetic (this.output[i], stack.pop(), stack.pop()));
                console.log("stack: " + stack);
            } else {
                stack.push(this.output[i]);
            }
        }

        // console.log("stack: " + stack);
        return stack.pop();
    }

    parse(str) {
        // let words = str.split(" ");
        let words = [];
        let num = '';

        for (let i=0; i<str.length; i++) {
            let c = str.substring(i, i+1)
            if (c === ' ') {
                // next
            } else if (this.delimitersArray.includes(c)) {
                if (num.length > 0) {
                    words.push(num);
                    num = '';
                }
                words.push(c);
            } else {
                num += c;
            }
        }
        
        // should be a last number to add
        if (num.length > 0) {
            words.push(num);
        }

        console.log("words: " + words);
        return words;
    }

    convertToRPN(words) {
        for (let i=0; i<words.length; i++) {
            if (this.delimitersArray.includes(words[i].trim())) {
                if (this.operators.length > 0) {
                    if (this.getPrecedence(words[i].trim()) <= this.getPrecedence(this.operators[this.operators.length - 1])) {
                        while ((this.operators.length > 0) && (this.getPrecedence(words[i].trim()) <= this.getPrecedence(this.operators[this.operators.length - 1]))) {
                            this.output.push(this.operators.pop());
                        }
                    } 
                    this.operators.push(words[i].trim());
                } else {
                    this.operators.push(words[i].trim());
                }
            } else {
                // console.log("else branch");
                // unshift is 'enqueue'
                this.output.push(words[i].trim());
            }
        }

        while (this.operators.length > 0) {
            this.output.push(this.operators.pop());
        }
    }

    getPrecedence(operator) {
        if ((operator === '+') || (operator === '-')) {
            return 1;
        } else {
            return 2;
        }
    }

    print() {
        console.log("input: " + this.str);
        console.log("RPN output array: " + this.output);
    }
}

// calculate("5 * 3 + 1");
// calculate("5 - 2 + 1");
// calculate("5 + 2 * 3");
// calculate("5 / 2 * 3");
// calculate("11 + 21 + 3 * 5 - 1 / 2");
// calculate("3/2");
// calculate(" 3+ 5 /2 ");
calculate("1*2-3/4+5*6-7*8+9/10");