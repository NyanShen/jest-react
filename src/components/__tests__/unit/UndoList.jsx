import React from "react";
import { shallow } from "enzyme";
import UndoList from "../../UndoList";
import { findTestWrapper } from "../../../common/util/testUtils";

describe("UndoList Component Test", () => {
    it("当数据为空数组时，count为0，列表无内容", () => {
        const undoList = [];
        const wrapper = shallow(<UndoList list={undoList} />);
        const countElem = findTestWrapper(wrapper, "count");
        const listItems = findTestWrapper(wrapper, "listItem");
        expect(countElem.text()).toBe("0");
        expect(listItems.length).toEqual(0);
    })

    it("当数据不为空数组时，显示count，列表内容不为空", () => {
        const undoList = [
            { status: "div", value: "react" },
            { status: "div", value: "ject" },
            { status: "div", value: "enzyme" },
        ];
        const wrapper = shallow(<UndoList list={undoList} />);
        const countElem = findTestWrapper(wrapper, "count");
        const listItems = findTestWrapper(wrapper, "listItem");
        expect(countElem.text()).toBe("3");
        expect(listItems.length).toEqual(3);
    })

    it("当数据不为空数组时，应该有删除按钮", () => {
        const undoList = [
            { status: "div", value: "react" },
            { status: "div", value: "ject" },
            { status: "div", value: "enzyme" },
        ];
        const wrapper = shallow(<UndoList list={undoList} />);
        const deleteItem = findTestWrapper(wrapper, "deleteItem");
        expect(deleteItem.length).toEqual(3);
    })

    it("当数据不为空数组时，点击某个删除按钮，调用删除方法", () => {
        const fn = jest.fn();
        const index = 1;
        const undoList = [
            { status: "div", value: "react" },
            { status: "div", value: "ject" },
            { status: "div", value: "enzyme" },
        ];
        const wrapper = shallow(<UndoList list={undoList} deleteItem={fn} />);
        const deleteItem = findTestWrapper(wrapper, "deleteItem");
        deleteItem.at(index).simulate("click", {
            stopPropagation: () => { } // 阻止事件冒泡
        });
        expect(fn).toHaveBeenCalledWith(index);
    })

    it("当某一项被点击时，触发执行changeStatus函数", () => {
        const fn = jest.fn();
        const index = 1;
        const undoList = [
            { status: "div", value: "react" },
            { status: "div", value: "ject" },
            { status: "div", value: "enzyme" },
        ];
        const wrapper = shallow(<UndoList list={undoList} changeStatus={fn} />);
        const changeStatus = findTestWrapper(wrapper, "listItem");
        changeStatus.at(index).simulate("click");
        expect(fn).toHaveBeenCalledWith(index);
    })

    it("当某一项的状态为‘input’时，存在一个输入框", () => {
        const undoList = [
            { status: "input", value: "react" },
            { status: "div", value: "ject" },
            { status: "div", value: "enzyme" },
        ];
        const wrapper = shallow(<UndoList list={undoList} />);
        const inputElem = findTestWrapper(wrapper, "input");
        expect(inputElem.length).toBe(1);
    })

    it("当某一项失去焦点时，执行handleBlur函数", () => {
        const fn = jest.fn();
        const undoList = [
            { status: "input", value: "react" },
            { status: "div", value: "ject" },
            { status: "div", value: "enzyme" },
        ];
        const wrapper = shallow(<UndoList list={undoList} handleBlur={fn} />);
        const inputElem = findTestWrapper(wrapper, "input");
        inputElem.simulate("blur");
        expect(fn).toHaveBeenCalledWith(0);
    })
    
  it('当某一个输入框变更时，触发 handleValueChange 方法', () => {
    const listData = [
      { status: 'input',value: 'jest' },
    ]
    const value = 'react';
    const fn = jest.fn();
    const wrapper = shallow(<UndoList handleValueChange={fn} list={listData}/>);
    const inputElem = findTestWrapper(wrapper, "input");
    inputElem.simulate('change', {
      target: {value}
    });
    expect(fn).toHaveBeenLastCalledWith(0, value);
  });
})
