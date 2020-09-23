# React Input Select From LocalStorage

# 1.Features include:

- Get user's input from keyboard
- Store all user's input in localStorage
- Filter new input from old inputs stored in LocalStorage
- Is selectable

# 2.Installlation and usage

```bash
    npm i localstorage_input_select
```

or

```bash
    yarn add localstorage_input_select
```

After install,

- copy `assets` folder in `node_modules/localstorage_input_select/dist` and paste to `public` folder of project app

- copy `index.css` file in `node_modules/localstorage_input_select/dist` and import `index.css` to parrent component use `InputSelect` Component

Then use it in your app:

#### Example With React Component

```js
import React from "react";
import InputSelect from "localstorage_input_select/dist/InputSelect";
import "./index.css";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
    };
  }

  handleInputValue = (value) => {
    this.setState({ inputVal: value });
  };

  render() {
    return (
      <div>
        <InputSelect
          storeKey="search"
          placeholderName="Search"
          handleInput={this.handleInputValue}
        ></InputSelect>
        <div>chooseValue: {this.state.inputVal}</div>
      </div>
    );
  }
```

## Props

Common props you may want to specify include:

- `storeKey` - `string` -key to store to localStorage
- `placeholderName` - `string` - name of input's placeholder
- `handleInput` - `function` - handler pass value from InputSelect to parent Component

## Thanks

Thank you to everyone who has contributed to this project. It's been a wild ride.

## License

MIT Licensed. Copyright (c) Kieu Chi Cong 2020.
