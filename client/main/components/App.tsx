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
  dispatch: Dispatch<{}>
  transcript: string;
  startListening: any; //TODO handle
  stopListening: any;
}

class App extends React.Component<AppProps> {
  render() {
    const { todos, dispatch, startListening, transcript, stopListening } = this.props;
    const headerProps = {
      addTodo: (text: string) => dispatch(addTodo(text)),
      startListening,
      stopListening,
      transcript
    }
    return (
      <div className="todoapp">
        <Header {...headerProps}  />
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
