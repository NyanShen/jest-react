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
        wrapper.instance().addUndoItem("add item one")
        expect(wrapper.state("undoList").length).toBe(1);
        expect(wrapper.state("undoList")[0]).toBe("add item one")
    })

    it("UndoList 组件应该有接收list和deleteItem两个属性", () => {
        const wrapper = shallow(<TodoList />);
        const undoList = wrapper.find("UndoList");
        expect(undoList.prop("list")).toBeTruthy();
        expect(undoList.prop("deleteItem")).toBeTruthy();
    })

    it("deleteItem被执行时，应该删除对应数据项", () => {
        const wrapper = shallow(<TodoList />);
        wrapper.setState({
            undoList: ["react", "jest", "enzyme"]
        });
        wrapper.instance().deleteItem(1);
        expect(wrapper.state("undoList")).toEqual(["react", "enzyme"])
    })
})
