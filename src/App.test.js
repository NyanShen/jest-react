import React from 'react';
// import ReactDOM from 'react-dom';
import {shallow} from "enzyme";
import App from './App';

it('renders without crashing', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  // const container = div.getElementsByClassName('App');
  // expect(container.length).toBe(1);
  // ReactDOM.unmountComponentAtNode(div);
  const wrapper = shallow(<App />)
  //expect(wrapper.find('[data-test="container"]').length).toBe(1);
  //console.log(wrapper.debug())
  //expect(wrapper.find('[data-test="container"]').prop('title')).toBe('test');
  expect(wrapper.find('[data-test="container"]')).toExist();
});
