import React from "react";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleKeyUp(e) {
        const { value } = this.state;
        if (e.keyCode === 13 && value) {
            this.props.addUndoItem(value)
            this.setState({value: ""})
        }
    }
    handleInputChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        const { value } = this.state;
        return (
            <div>
                <input
                    value={value}
                    data-test="input"
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleInputChange}
                />
            </div>
        )
    }
}