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
    //expect(header.prop("addUndoItem")).toBe(wrapper.instance().addUndoItem);
    expect(header.prop("addUndoItem")).toBeTruthy();
})

it("TodoList Header 调用回车时，即addUndoItem执行时，应该新增内容", () => {
    const wrapper = shallow(<TodoList />);
    /**
     * const header = wrapper.find("Header");
     * const addFn = header.prop("addUndoItem");
     * addFn("add item one");
     * 这样操作，测试就会跟Header组件耦合（像集成测试），应该修改为一下方案
     */
    wrapper.instance().addUndoItem("add item one")
    expect(wrapper.state("undoList").length).toBe(1);
    expect(wrapper.state("undoList")[0]).toBe("add item one")
})

it("TodoList UndoList 应该有一个list和deleteItem两个属性", () => {
    const wrapper = shallow(<TodoList />);
    const undoList = wrapper.find("UndoList");
    expect(undoList.prop("list")).toBeTruthy();
    expect(undoList.prop("deleteItem")).toBeTruthy();
})

it("TodoList 当deleteItem执行时，应该删除对应内容", () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
        undoList: ["react", "jest", "enzyme"]
    });
    wrapper.instance().deleteItem(1);
    expect(wrapper.state("undoList")).toEqual(["react", "enzyme"])
})