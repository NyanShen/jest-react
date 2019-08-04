import React from "react";
import Header from "../../components/Header"
import UndoList from "../../components/UndoList";

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            undoList: []
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addUndoItem = this.addUndoItem.bind(this);
    }
    addUndoItem(value) {
        this.setState({
            undoList: [...this.state.undoList, value]
        })
    }
    deleteItem(index) {
        const newUndoList = [...this.state.undoList]
        newUndoList.splice(index, 1)
        this.setState({
            undoList: newUndoList
        })
    }
    render() {
        const {undoList} = this.state;
        return (
            <>
                <Header addUndoItem={this.addUndoItem} />
                <UndoList list={undoList} deleteItem={this.deleteItem}/>
            </>
        )
    }
}