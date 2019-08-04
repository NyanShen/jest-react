import React from "react";
import {shallow} from "enzyme";
import UndoList from "../../UndoList";
import {findTestWrapper} from "../../../common/util/testUtils";

it("当数据为空数组时，count为0，列表无内容", () => {
    const undoList = [];
    const wrapper = shallow(<UndoList list={undoList}/>);
    const countElem = findTestWrapper(wrapper, "count");
    const listItems = findTestWrapper(wrapper, "listItem"); 
    expect(countElem.text()).toBe("0");
    expect(listItems.length).toEqual(0);
})

it("当数据不为空数组时，显示count，列表内容不为空", () => {
    const undoList = ["react", "jest", "enzyme"];
    const wrapper = shallow(<UndoList list={undoList}/>);
    const countElem = findTestWrapper(wrapper, "count");
    const listItems = findTestWrapper(wrapper, "listItem"); 
    expect(countElem.text()).toBe("3");
    expect(listItems.length).toEqual(3);
})

it("当数据不为空数组时，应该有删除按钮", () => {
    const undoList = ["react", "jest", "enzyme"];
    const wrapper = shallow(<UndoList list={undoList}/>);
    const deleteItem = findTestWrapper(wrapper, "deleteItem"); 
    expect(deleteItem.length).toEqual(3);
})

it("当数据不为空数组时，点击某个删除按钮，调用删除方法", () => {
    const fn = jest.fn();
    const index = 1;
    const undoList = ["react", "jest", "enzyme"];
    const wrapper = shallow(<UndoList list={undoList} deleteItem={fn}/>);
    const deleteItem = findTestWrapper(wrapper, "deleteItem"); 
    deleteItem.at(index).simulate("click");
    expect(fn).toHaveBeenCalledWith(index);
})