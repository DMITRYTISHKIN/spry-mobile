import 'react-native';
import React from 'react';
import App from '../src/app';
import renderer from 'react-test-renderer';

describe('App snapshot', () => {
  it('renders the loading screen', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
