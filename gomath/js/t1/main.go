package main

import (
	"fmt"
	"time"

	dom "github.com/siongui/godom"
)

func main() {
	dom.Document.Write("<div id='root'></div>")
	root := dom.Document.GetElementById("root")

	h2 := dom.Document.CreateElement("h2")
	h2.SetInnerHTML("h2")

	root.AppendChild(h2)

	root.AppendChild(timer())
	timerAfter()
	fmt.Println("Hi")
}

func timer() *dom.Object {
	h3 := dom.Document.CreateElement("h3")

	h3.SetInnerHTML("h3")
	return h3
}

func timerAfter() {
	go func() {
		i := 0
		for {
			h3 := dom.Document.GetElementsByTagName("h3")[0]
			h3.SetInnerHTML(fmt.Sprint(i))
			time.Sleep(1)
		}
	}()
}
