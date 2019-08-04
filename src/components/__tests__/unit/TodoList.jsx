import React from "react";
import { shallow } from "enzyme";
import TodoList from "../../../containers/TodoList";

describe("TodoList Comonent Test", () => {

    it("初始化列表为空", () => {
        const wrapper = shallow(<TodoList />);
        expect(wrapper.state("undoList")).toEqual([]);
    })

    it("Header组件存在addUndoItem的属性", () => {
        const wrapper = shallow(<TodoList />);
        const header = wrapper.find("Header");
        //expect(header.prop("addUndoItem")).toBe(wrapper.instance().addUndoItem);
        expect(header.prop("addUndoItem")).toBeTruthy();
    })

    it("addUndoItem方法被调用时，undoList数据项新增", () => {
        const wrapper = shallow(<TodoList />);
        /**
         * const header = wrapper.find("Header");
         * const addFn = header.prop("addUndoItem");
         * addFn("add item one");
         * 这样操作，测试就会跟Header组件耦合（像集成测试），应该修改为一下方案
         */
        const content = "add item one"
        wrapper.instance().addUndoItem(content)
        expect(wrapper.state("undoList").length).toBe(1);
        expect(wrapper.state("undoList")[0]).toEqual({
            status: "div",
            value: content
        })
    })

    it("UndoList 组件应该有接收list，deleteItem，changeStatus, handleBlur属性", () => {
        const wrapper = shallow(<TodoList />);
        const undoList = wrapper.find("UndoList");
        expect(undoList.prop("list")).toBeTruthy();
        expect(undoList.prop("deleteItem")).toBeTruthy();
        expect(undoList.prop("changeStatus")).toBeTruthy();
        expect(undoList.prop("handleBlur")).toBeTruthy();
    })

    it("deleteItem被执行时，应该删除对应数据项", () => {
        const wrapper = shallow(<TodoList />);
        const data =[
            {status: "div",value: "react"},
            {status: "div",value: "ject"},
            {status: "div",value: "enzyme"},
        ]
        wrapper.setState({undoList: data});
        wrapper.instance().deleteItem(1);
        expect(wrapper.state("undoList")).toEqual([data[0], data[2]])
    })

     it("changeStatus被执行时，undoList数据项被修改", () => {
         const wrapper = shallow(<TodoList />);
        const data =[
            {status: "div",value: "react"},
            {status: "div",value: "ject"},
            {status: "div",value: "enzyme"},
        ]
         wrapper.setState({undoList: data});
         wrapper.instance().changeStatus(1);
         expect(wrapper.state("undoList")[1]).toEqual({
             ...data[1],
             status: "input"
         })
     })

     it("handleBlur被执行时，undoList数据项被修改", () => {
         const wrapper = shallow(<TodoList />);
        const data =[
            {status: "input",value: "react"},
            {status: "div",value: "ject"},
            {status: "div",value: "enzyme"},
        ]
         wrapper.setState({undoList: data});
         wrapper.instance().handleBlur(0);
         expect(wrapper.state("undoList")[0]).toEqual({
             ...data[0],
             status: "div"
         })
     })
})
