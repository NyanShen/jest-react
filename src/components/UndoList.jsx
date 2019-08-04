import React from "react";
import "./style.css";

export default class UndoList extends React.Component {

    render() {
        const { list, deleteItem } = this.props;
        return (
            <div className="undo-list">
                <div className="undo-list-title">
                    正在进行
                    <span className="undo-list-count" data-test="count">{list.length}</span>
                </div>

                <ul className="undo-list-content">
                    {
                        list.map((item, index) => {
                            return (
                                <li 
                                className="undo-list-item"
                                data-test="listItem" 
                                key={`${item}-${index}`}
                                >
                                    {item}
                                    <span 
                                    className="undo-list-delete"
                                    data-test="deleteItem" 
                                    onClick={() => { deleteItem(index) }}>-</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}