import React from "react";

class ChatTable extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          {this.props.messages.map(message => (
            <tr key={message.key}>
              <td className="name-column">{message.name}</td>
              <td>{message.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ChatTable;
