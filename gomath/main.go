package main

import (
	"time"

	"github.com/gopherjs/gopherjs/js"
	vue "github.com/oskca/gopherjs-vue"
)

type Model struct {
	*js.Object     // this is needed for bidirectional data bindings
	IntValue   int `js:"IntValue" ` // `js:"integer"`
	ch         chan int
}

// this would be recognized as Inc in html
func (m *Model) Inc() {
	m.IntValue += 1
	println("inc called")
}

// this would be recognized as Repeat in html
func (m *Model) Repeat() {
	go func() {
		for {
			select {
			case <-m.ch:
				return
			case <-time.After(time.Second):
				m.Inc()
			}
		}
	}()
}

// this would be recognized as Reset in html
func (m *Model) Reset() {
	m.IntValue = 0
	m.ch <- 0
}

func main() {
	m := &Model{
		Object: js.Global.Get("Object").New(),
	}
	// field assignment is required in this way to make data passing works
	m.IntValue = 100
	m.ch = make(chan int)
	// create the VueJS viewModel using a struct pointer
	vue.New("#app", m)
	m.Repeat()
}
