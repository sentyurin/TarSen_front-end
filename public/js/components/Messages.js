import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import { mapStateToProps, mapDispatchToProps } from '../connectToStore';

class Messages extends React.Component {

  constructor() {
    super();

    this.state = {
      messageName: 'Vladimir',
      messageText: '',
    }
  }

  handleMessage(e) {
    this.setState({
      messageText: e.target.value,
    });
  }

  handleMessageSubmit() {
    if (this.state.messageText !== '') {
      var message = {
        id: Date.now(),
        user_name: this.state.messageName,
        message: this.state.messageText,
      }

      this.props.addMessage(message);

      this.setState({
        messageText: '',
      });
    }
  }

  keyCodeMessage(e) {
    // if (e.ctrlKey && e.keyCode == 13) {
      // Ctrl-Enter pressed
    // }

    switch (e.which) {
      case 13: {
        e.preventDefault();
        this.handleMessageSubmit();

        break;
      }
    }
  }

  removeMessage(e) {
    e.preventDefault();
    this.props.removeMessage(e.target.closest('li').dataset.id);
  }

  render() {
    return (
      <div>
        <h1 className="title">Messages</h1>
        <ul>
        {
          this.props.messages.map((el) => {
            return <Message onClick={this.removeMessage.bind(this)} key={el.id}
                                                                    id={el.id}
                                                                    user_name={el.user_name}
                                                                    message={el.message} />
          })
        }
        </ul>
        <div id="addMessage">
          <h3>Add message:</h3>
          <textarea onKeyPress={this.keyCodeMessage.bind(this)} onChange={this.handleMessage.bind(this)}
                                                className="text"
                                                placeholder="Type your text here..."
                                                value={this.state.messageText}>
          </textarea>
          <button onClick={this.handleMessageSubmit.bind(this)} className="send icon-arrow-right2"></button>
        </div>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);