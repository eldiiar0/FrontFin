import React, { Component } from 'react';

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  handleTextChange = (event) => {
    const text = event.target.value;
    const encodedText = this.encodeText(text);
    this.setState({ inputText: encodedText });
  };

  encodeText = (text) => {
    return text
      .split('')
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          // introduce randomness by shifting letters randomly in a range
          const shift = Math.floor(Math.random() * 3) - 1; // randomly shift by -1, 0, or 1
          const charCode = char.charCodeAt(0);
          const shiftedCharCode = charCode + shift;
          return String.fromCharCode(shiftedCharCode);
        }
        return char;
      })
      .join('');
  };

  render() {
    return (
      <textarea
        value={this.state.inputText}
        onChange={this.handleTextChange}
        placeholder="Type any word"
        rows={6}
        cols={40}
      />
    );
  }
}

export default TextArea;