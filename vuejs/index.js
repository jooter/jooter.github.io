var app = new Vue({
    el: '#app',

    data: {
        a: 1,
        b: 2,
        operation: "*", 
        timeRemaining: 30, 
        score: 0,
        answer: "",
        correctList: [],
        incorrectList: []
    },

    methods: {
        addScore: function () {
            this.score++
        },

        checkAnswer: function () {
            if (this.operation == "+") {
                return this.a + this.b == this.answer
            }
            if (this.operation == "-") {
                return this.a - this.b == this.answer
            }
            if (this.operation == "*") {
                return this.a * this.b == this.answer
            }
            if (this.operation == "/") {
                return this.a / this.b == this.answer
            }
            return false
        },

        check: function () {
            isCorrect = this.checkAnswer()
            item = "" + this.a + " " + this.operation + " " + this.b + " = " + this.answer
            if (isCorrect) {
                this.addScore()
                this.correctList.push(item)
            } else {
                this.incorrectList.push(item)
            }
            this.clear()
        }, 

        clear: function () {
            this.answer = ""
            this.a = getRandom()
            this.b = getRandom()
            if (this.operation == "-") {
                if (this.a < this.b) {
                    [this.a, this.b] = [this.b, this.a]
                }
            }
            if (this.operation == "/") {
                if (this.b == 0) {
                    this.b = 2
                }
                this.a = this.a * this.b
            }
        }
    }
})


const input = document.getElementById("input")
input.addEventListener("keyup", updateValue)

function updateValue(e) {
    if (e.keyCode == 13) {
        app.check()
    }
}

function onload() {
    app.clear()
}

var intervalID = setInterval(myCallback, 1000);

function myCallback()
{
    app.timeRemaining--

    if (app.timeRemaining == 0 ){
        clearInterval(intervalID)
        input.disabled = true
        input.placeholder = "Timeout"
        app.clear()
    }
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
operation = urlParams.get('o')

if (operation === null) {
    operation = "+"
}
app.operation = operation

maxInt = urlParams.get('m')
if (maxInt === null) {
    maxInt = 10
}

function getRandom() {
    return Math.round(Math.random() * maxInt)
}
