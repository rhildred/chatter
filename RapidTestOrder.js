class RapidTestOrder {
  constructor(sFrom) {
    this.menuItems = [
      { name: 'poutine', sizes: ['small', 'medium', 'large'], toppings: ['chicken', 'vegetables', 'pulled pork'] },
      { name: 'nachos', sizes: ['small', 'medium', 'large'], toppings: ['jalapenos', 'ground beef', 'extra cheese'] }
    ];
    
    this.stateCur = this.OrderState.WELCOMING;
    this.isDone = false;
    this.sFrom = sFrom;
  }

  OrderState = {
    WELCOMING: () => {
      let aReturn = [];
      this.stateCur = this.OrderState.SELECT_FOOD;
      aReturn.push("Welcome to Mike's Dream Restaurant");
      aReturn.push("What would you like to order? We have poutine or nachos.");
      return aReturn;
    },

    SELECT_FOOD: (sInput) => {
      let aReturn = [];
      let item = this.menuItems.find(i => i.name === sInput);
      if (item) {
        this.selectedItem = item;
        aReturn.push(`You would like a ${item.name}. What size would you like? We have: ${item.sizes.join(', ')}`);
        this.stateCur = this.OrderState.SELECT_SIZE;
      } else {
        aReturn.push("Sorry, we don't have that here! Please try another option.");
      }
      return aReturn;
    },

    SELECT_SIZE: (sInput) => {
      let aReturn = [];
      if (this.selectedItem.sizes.includes(sInput)) {
        this.selectedSize = sInput;
        aReturn.push(`You have selected a ${sInput} ${this.selectedItem.name}. What toppings would you like? We have: ${this.selectedItem.toppings.join(', ')}`);
        this.stateCur = this.OrderState.SELECT_TOPPINGS;
      } else {
        aReturn.push(`Sorry, we don't have that size. Please choose from: ${this.selectedItem.sizes.join(', ')}`);
      }
      return aReturn;
    },

    SELECT_TOPPINGS: (sInput) => {
      let aReturn = [];
      aReturn.push("Would you like to add a chocolate chip cookie to your order? (yes/no)");
      this.stateCur = this.OrderState.SELECT_COOKIE;
      return aReturn;
    },

    SELECT_COOKIE: (sInput) => {
      let aReturn = [];
      if (sInput.toLowerCase() === 'yes') {
        aReturn.push("You've added a chocolate chip cookie to your order. Thanks for your order!");
      } else if (sInput.toLowerCase() === 'no') {
        aReturn.push("Thanks for your order!");
      } else {
        aReturn.push("Please reply with 'yes' or 'no' if you'd like to add a chocolate chip cookie.");
      }
      this.isDone = true;
      return aReturn;
    }
  };

  handleInput(sInput) {
    return this.stateCur(sInput);
  }

  isDone() {
    return this.isDone;
  }
}

export { RapidTestOrder };