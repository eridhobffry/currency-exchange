import React, { Component } from 'react';
// import './App.css';
import axios from "axios";
import TodoList from './itemList';


class List extends Component {
  
    constructor(){
        super();
        
        this.state={
            result: null,
        initToCurrency: null,
      fromCurrency: "USD",
      toCurrency: "GBP",
      amount: 10,
      currencies: [],
      initCurrencies: [],
            items:[
                {id: Date.now(), value: 154630.05, label: "IDR", fromCurrency: "USD", initCurrency: 15463.05},
                {id: Date.now(), value: 8.5694, label: "EUR", fromCurrency: "USD", initCurrency: 0.8},
                {id: Date.now(), value: 8.6158, label: "GBP", fromCurrency: "USD", initCurrency: 0.86158},
                {id: Date.now(), value: 15.002, label: "SGD", fromCurrency: "USD", initCurrency: 1.5002},
            ]
        }
        
 
        
    }
    componentDidMount() {
        axios
          .get("https://api.exchangeratesapi.io/latest ")
          .then(response => {
            const currencyAr = ["USD"];
            const initCurrencyAr = ["USD"];
            for (const key in response.data.rates) {
              currencyAr.push(key);
            }
            for (const key in response.data.rates) {
                if (key === "IDR" || key === "EUR" || key === "GBP" || key === "SGD" )
                initCurrencyAr.push(key);
            }
            this.setState({ currencies: currencyAr });
            this.setState({ initCurrencies: initCurrencyAr });
          })
          .catch(err => {
            console.log("oppps", err);
          });
      }

      handleTodoItemAdded = value => {
        this.setState(prevState => {
          return {
            items: prevState.items.concat([{
              id: new Date(),
              value: this.state.result,
                label: this.state.toCurrency, 
              fromCurrency: this.state.fromCurrency,
              initCurrency: this.state.initToCurrency
            }])
          }
        })
      }
    
      handleTodoItemRemoved = id => {
        this.setState(prevState => {
          return {
            items: prevState.items.filter(item => {
              return item.id !== id
            })
          }
        })
      }


      convertHandler = () => {
        if (this.state.fromCurrency !== this.state.toCurrency) {
          axios
            .get(
              `https://api.exchangeratesapi.io/latest?base=${
                this.state.fromCurrency
              }&symbols=${this.state.toCurrency}`
            )
            .then(response => {
                const initToCurrency = response.data.rates[this.state.toCurrency]
                this.setState({ initToCurrency: initToCurrency });
              const result =
                this.state.amount * response.data.rates[this.state.toCurrency];
              this.setState({ result: result.toFixed(5) });
            })
            .catch(error => {
              console.log("Opps", error.message);
            });
        } else {
          this.setState({ result: "You cant convert the same currency!" });
        }
      };
      selectHandler = event => {
        if (event.target.name === "from") {
          this.setState({ fromCurrency: event.target.value });
        } else {
          if (event.target.name === "to") {
            this.setState({ toCurrency: event.target.value });
          }
        }
      };
    render() {
        
        const btn_style={
            marginLeft:"10px",
            marginBottom:"5px"
        }
        
        const input_style={
            width:"250px",
            padding:"5px"
        }  

    return (
        <div className="container-fluid">
        <div className="row">
        
        <div className="col-md-4"></div> 
        <div className="col-md-4">
        <div className="body">
        <h2 className="heading">Foreign Exchange Currency</h2>   
        <div className="From">
          <input
            name="amount"
            type="text"
            value={this.state.amount}
            onChange={event => this.setState({ amount: event.target.value })}
          />
          <select
            name="from"
            onChange={event => this.selectHandler(event)}
            value={this.state.fromCurrency}
          >
            {this.state.currencies.map(cur => (
                <>
                  <option key={cur}>{cur}</option>
                </>
            ))}
            {/* <option key={this.state.currencies[0]}>{this.state.currencies[1]}</option> */}
           
          </select>
          <select
            name="to"
            onChange={event => this.selectHandler(event)}
            value={this.state.toCurrency}
          >
            {this.state.currencies.map(cur => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
          <button onClick={this.convertHandler}>Convert</button>
          {this.state.result && <h3>{this.state.result}</h3>}
          <br />
          <button style={btn_style} type="button" className="btn btn-primary btn-md" onClick={this.handleTodoItemAdded}>Add ?</button>

        </div>
        <TodoList items={this.state.items} deleteItem={this.handleTodoItemRemoved} />
        </div>
        </div>
        <div className="col-md-4"></div> 
        
        </div>
        </div>
    );
  }
}

export default List;




