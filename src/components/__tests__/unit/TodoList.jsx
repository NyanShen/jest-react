import React from "react";
import {shallow} from "enzyme";
import TodoList from "../../../containers/TodoList";

it("TodoList 初始化列表为空", () => {
    const wrapper = shallow(<TodoList />);
})