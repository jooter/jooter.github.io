package main

import (
	"bufio"
	"fmt"
	"log"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"
)

var (
	operation = "x"
	maxInt    = 10
)

func main() {
	rand.Seed(time.Now().UTC().UnixNano())

	lenOptions := len(os.Args)

	if lenOptions >= 2 {
		operation = os.Args[1]
	}

	if lenOptions >= 3 {
		maxInt, _ = strconv.Atoi(os.Args[2])
	}

	reader := bufio.NewReader(os.Stdin)

	score := 0

	go func() {
		for {
			a := rand.Intn(maxInt)
			b := rand.Intn(maxInt)
			if operation == "/" && b == 0 {
				continue
			}
			fmt.Printf("%d %s %d = ", a, operation, b)
			answerText, _ := reader.ReadString('\n')
			answer, err := strconv.Atoi(strings.TrimSpace(answerText))
			if err != nil {
				log.Println(err)
			}
			if checkAnswer(a, b, answer) {
				score++
			}
		}
	}()
	time.Sleep(30 * time.Second)
	fmt.Println()
	fmt.Println("score =", score)
}

func checkAnswer(a, b, answer int) bool {
	switch operation {
	case "+":
		return a+b == answer
	case "-":
		return a-b == answer
	case ".", "x":
		return a*b == answer
	case "/":
		return a/b == answer
	}
	return true
}
