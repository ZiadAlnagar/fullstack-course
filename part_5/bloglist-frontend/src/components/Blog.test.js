import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let user;
  let container;
  let likeMockHandler;

  beforeEach(() => {
    const blog = {
      id: 'id', // required by proptypes
      title: 'awesome title',
      author: 'awesome author',
      url: 'awesome url',
      likes: 10,
      user: {
        username: 'awesomeusername',
        name: 'awesome name',
      },
    };
    likeMockHandler = jest.fn();
    const destroyMockHandler = jest.fn(); // required by proptypes
    container = render(
      <Blog blog={blog} like={likeMockHandler} destroy={destroyMockHandler} />,
    ).container;

    user = userEvent.setup();
  });

  test('at start only title and author are displayed', () => {
    const extendableDiv = container.querySelector('.extendable');
    screen.getByText('awesome title awesome author');

    expect(extendableDiv).toHaveStyle('display: none');
  });

  test('when show button is clicked, blog details are displayed', async () => {
    const extendTriggerBtn = container.querySelector('.trigger button');
    await user.click(extendTriggerBtn);

    const extendableDiv = container.querySelector('.extendable');
    expect(extendableDiv).not.toHaveStyle('display: none');
  });

  test('the like event handler recieved as props is called as many times as the like button is pressed', async () => {
    const likeBtn = screen.getByText('like');

    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});
