import React from 'react';
import renderer from 'react-test-renderer';

import ProfileScreen from '../screens/profile/ProfileScreen';

test("Assert ProfileScreen exists", () => {
    expect(ProfileScreen).toBeDefined();
});

test("Assert ProfileScreen renders correctly", () => {
    const component = renderer.create(ProfileScreen);

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});