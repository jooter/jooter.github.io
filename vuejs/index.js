var app = new Vue({
    el: '#app',

    data: {
        a: 1,
        b: 2,
        operation: "x", 
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
            if (this.operation == "x") {
                return this.a * this.b == this.answer
            }
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

function getRandom() {
    return Math.round(Math.random() * 10)
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
