import React from "react";
import Header from "../../components/Header"

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            undoList: []
        }
        this.addUndoItem = this.addUndoItem.bind(this);
    }
    addUndoItem(value) {
        this.setState({
            undoList: [...this.state.undoList, value]
        })
    }
    render() {
        return (
            <div><Header addUndoItem={this.addUndoItem}/>
            {this.state.undoList.map((item, index) => {
                return <div key="index">{item}</div>
            })}
            </div>
        )
    }
}