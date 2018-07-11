import * as React from 'react';

import TodoTextInput from './TodoTextInput';

interface HeaderProps {
  addTodo: (text:string)=> any;
  startListening: any;
  stopListening: any;
  transcript: string;
};
interface HeaderState { listening:  boolean }

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor() {
    super();
    this.state = {listening: false}
  }
  
  handleSave(text: string) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    const { startListening, stopListening, transcript } = this.props;
    return (
      <header className="header">
          <h1>todos</h1>
          <div style={{display: 'flex'}}>
            <TodoTextInput
              newTodo
              text={transcript}
              onSave={this.handleSave.bind(this)}
              placeholder="What needs to be done?" />
            <img src={`https://www.google.com/intl/en/chrome/assets/common/images/content/mic${ this.state.listening ? '-animate' : '' }.gif`}
              style={{padding: '8px 0px 7px 0px', cursor: 'pointer'}}
              onClick={() => {
                this.state.listening ? stopListening() : startListening();
                this.setState({listening: !this.state.listening})
              }}/>
          </div>
      </header>
    );
  }
}

export default Header;
