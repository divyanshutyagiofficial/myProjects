import React from "react";

export class Main extends React.Component {
  state = {
    text1:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    text2: "",
    expand: false
  };

  render() {
    return (
      <div className="App noselect">
        <div className="row">
          {this.state.expand == false ? (
            <div className="col-md-6">
              <div className="controls">
                <button
                  class="primary"
                  onClick={() => {
                    localStorage.setItem("text", this.state.text1);
                    alert("Text copied successfully!");
                  }}
                >
                  Copy
                </button>
                <button
                  onClick={() => {
                    window.open("/pop");
                    this.setState({ expand: true });
                  }}
                >
                  Pop
                </button>
                <div className="content">
                  <div className="content2">{this.state.text1}</div>
                </div>
              </div>
            </div>
          ) : null}
          <div className={this.state.expand == true ? "col-md-12" : "col-md-6"}>
            <button
              class="primary"
              onClick={() => {
                this.setState({ text2: localStorage.getItem("text") });
              }}
            >
              Paste
            </button>
            <div className="content2">{this.state.text2}</div>
          </div>
        </div>
      </div>
    );
  }
}
