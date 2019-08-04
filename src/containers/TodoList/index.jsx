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
        this.changeStatus = this.changeStatus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    addUndoItem(value) {
        this.setState({
            undoList: [...this.state.undoList, {
                status: "div",
                value
            }]
        })
    }
    deleteItem(index) {
        const newUndoList = [...this.state.undoList]
        newUndoList.splice(index, 1)
        this.setState({
            undoList: newUndoList
        })
    }
    changeStatus(index) {
        const newUndoList = this.state.undoList.map((item, listIndex) => {
            if (listIndex === index) {
                return {
                    ...item,
                    status: "input"
                }
            }
            return {
                ...item,
                status: "div"
            }
        })
        this.setState({
            undoList: newUndoList
        })
    }
    
    handleBlur(index) {
        const newUndoList = this.state.undoList.map((item, listIndex) => {
            if (listIndex === index) {
                return {
                    ...item,
                    status: "div"
                }
            }
            return item
        })
        this.setState({
            undoList: newUndoList
        })
    }
    handleValueChange(index, value) {
        const newUndoList = this.state.undoList.map((item, listIndex) => {
            if (listIndex === index) {
                return {
                    ...item,
                    value
                }
            }
            return item
        })
        this.setState({
            undoList: newUndoList
        })
    }
    render() {
        const { undoList } = this.state;
        return (
            <>
                <Header addUndoItem={this.addUndoItem} />
                <UndoList
                    list={undoList}
                    deleteItem={this.deleteItem}
                    changeStatus={this.changeStatus}
                    handleBlur={this.handleBlur}
                    handleValueChange={this.handleValueChange}
                />
            </>
        )
    }
}