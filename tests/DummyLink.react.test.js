// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import DummyLink from '../DummyLink.react';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <DummyLink page="http://www.facebook.com">Facebook</DummyLink>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});