import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import SpeechRecognition from 'react-speech-recognition' 

import {
  Header,
  MainSection,
  model,
  addTodo,
  editTodo,
  clearCompleted,
  completeAll,
  completeTodo,
  deleteTodo
} from '../../todos';

interface AppProps {
  todos: model.Todo[];
  dispatch: Dispatch<{}>;
  startListening: any; //TODO handle
}

class App extends React.Component<AppProps> {
  render() {
    const { todos, dispatch, startListening } = this.props;

    return (
      <div className="todoapp">
        <Header addTodo={(text: string) => dispatch(addTodo(text))} startListening={startListening} />
        <MainSection
            todos={todos}
            editTodo={(t,s) => dispatch(editTodo(t, s))}
            deleteTodo={(t: model.Todo) => dispatch(deleteTodo(t))}
            completeTodo={(t: model.Todo) => dispatch(completeTodo(t))}
            clearCompleted={() => dispatch(clearCompleted())}
            completeAll={() => dispatch(completeAll())}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const speechRecognitionoptions = {autoStart: false}
export default connect(mapStateToProps)(SpeechRecognition(speechRecognitionoptions)(App));
