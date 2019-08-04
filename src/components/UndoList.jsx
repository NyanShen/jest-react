import React from "react";
import "./style.css";

export default class UndoList extends React.Component {

    render() {
        const { list, deleteItem, changeStatus, handleBlur, handleValueChange } = this.props;
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
                                    onClick={() => changeStatus(index)}
                                >
                                    {item.status === "div" ? item.value : (
                                        <input 
                                        value={item.value}
                                        data-test="input"
                                        className="undo-list-input"
                                        onBlur={() => handleBlur(index)}
                                        onChange={(e) => handleValueChange(index, e.target.value)}
                                        />
                                    )}
                                    <span
                                        className="undo-list-delete"
                                        data-test="deleteItem"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deleteItem(index)
                                        }}>-</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}