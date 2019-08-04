import React from "react";
import {shallow} from "enzyme";
import Header from "../../Header";

it("Header 样式渲染正常", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
})

it("Header 组件包含一个 input 输入框", () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find("[data-test='input']");
    expect(inputElem.length).toBe(1);
})

it("Header input 输入框, 初始化应该为空", () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find("[data-test='input']");
    expect(inputElem.prop("value")).toEqual("");
})

it("Header input 输入框, 当输入时会发生改变", () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find("[data-test='input']");
    /**
     * 模拟change事件，输入test nyan
     */
    inputElem.simulate("change", {
        target: {
            value: "test nyan"
        }
    })
    expect(wrapper.state("value")).toEqual("test nyan");
})

it("Header input 输入框，回车时，将没有内容，也没有操作", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn}/>);
    const inputElem = wrapper.find("[data-test='input']");
    wrapper.setState({value: ""})
    inputElem.simulate("kepUp", {
        keyCode: 13
    })
    expect(fn).not.toHaveBeenCalled();
})

it("Header input 输入框，回车时，有内容，函数应该被调用", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn}/>);
    const inputElem = wrapper.find("[data-test='input']");
    // 准备数据
    wrapper.setState({value: "jest react"})
    /**
     * 设置keyUp的keyCode模拟回车
     */
    inputElem.simulate("keyUp", {
        keyCode: 13
    })
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith("jest react"); // 最后的参数
})

it("Header input 输入框，回车时，有内容，内容应该被清除", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn}/>);
    const inputElem = wrapper.find("[data-test='input']");
    // 准备数据
    wrapper.setState({value: "jest react add one"})
    /**
     * 设置keyUp的keyCode模拟回车
     */
    inputElem.simulate("keyUp", {
        keyCode: 13
    })
    const newInputElem = wrapper.find("[data-test='input']");
    expect(newInputElem.prop("value")).toBe("");
})