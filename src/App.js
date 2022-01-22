//feature-1
import React from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

class App extends React.Component {
  constructor()
    {
      super();
      this.state = {
        products  : data.products,
        cartItems :[],
        size :"",
        sort :"",

      };
    }

    removeFromCart = (product) => {
      const cartItems = this.state.cartItems.slice();
      this.setState({cartItems : cartItems.filter(x=>x._id !== product._id),
       })
      
    }

    addToCart = (product) =>
    {
      const cartItems = this.state.cartItems.slice();
      let alreadyInCart = false;
      cartItems.forEach((item) => {
        if(item._id === product._id){
          item.count++;
          alreadyInCart = true;
        }
      })
      if(!alreadyInCart){
        cartItems.push({...product,count: 1})
      }
      this.setState({cartItems});
    }

    sortProducts = (event) =>
    {
console.log(event.target.value);
const sort = event.target.value;
this.setState((state) => ({
  sort : sort,
  products :this.state.products
  .slice()
  .sort((a,b) => 
    sort === "Lowest" ? 
    ((a.price > b.price) ? 1 : -1) : 
    sort ==="Highest" ? ((a.price < b.price) ? 1 : -1):
    ((a._id < b._id) ? 1 : -1)
  ),

}));

    }

    filterProducts  = (event) =>
    {
      if(event.target.value === "")
      {
        this.setState({size : event.target.value, products : data.products});
      }
      else 
      {
      this.setState({
        size : event.target.value ,
        products : data.products.filter((product) => product.availablesizes.indexOf(event.target.value)>=0),
      });
    }

    };

  render()
  {
    return (
      <div class = "grid-container">
        <header>
          <a href = "/"> Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className = "main">
              <Filter count = {this.state.products.length} 
              size = {this.state.size}
              sort = {this.state.sort}
              filterProducts = {this.filterProducts}
              sortProducts = {this.sortProducts}> </Filter> 
              
             <Products products = {this.state.products} addToCart={this.addToCart}> </Products>
            

            </div>
            <div className = "sidebar">
              <Cart cartItems={this.state.cartItems}  removeFromCart = {this.removeFromCart}/>
            </div>
          </div>
          
        </main>
        <footer>
          Copyright, All rights reserved
        </footer>
      </div>
        );

  }

}

export default App;
