import React from "react";

export class Pop extends React.Component {
  state = {
    text1: ""
  };

  componentDidMount() {
    this.setState({ text1: localStorage.getItem("text") });
  }
  render() {
    return (
      <div className="App noselect">
        <div className="row">
          <div className="col-md-12">
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
              {window.location.href.includes("pop") == false ? (
                <button onClick={() => window.open('/pop')}>Pop</button>
              ) : null}
              <div className="content">
                <div className="content2">{this.state.text1}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
