import React from "react";
import {shallow} from "enzyme";
import TodoList from "../../../containers/TodoList";

it("TodoList 初始化列表为空", () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper.state("undoList")).toEqual([]);
})

it("TodoList Header 应该有一个增加undoList的方法", () => {
    const wrapper = shallow(<TodoList />);
    const header = wrapper.find("Header");
    expect(header.prop("addUndoItem")).toBe(wrapper.instance().addUndoItem);
})

it("TodoList Header 调用回车时，应该新增内容", () => {
    const wrapper = shallow(<TodoList />);
    const header = wrapper.find("Header");
    const addFn = header.prop("addUndoItem");
    addFn("add item one");
    expect(wrapper.state("undoList").length).toBe(1);
    expect(wrapper.state("undoList")[0]).toBe("add item one")
})