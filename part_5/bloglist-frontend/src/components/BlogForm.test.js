import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  let user;
  let container;
  let createBlogMockHandler;
  const newBlog = {
    title: 'new title',
    author: 'new author',
    url: 'new url',
  };

  beforeEach(() => {
    createBlogMockHandler = jest.fn();
    container = render(
      <BlogForm createBlog={createBlogMockHandler} />,
    ).container;

    user = userEvent.setup();
  });

  test('on submitting new blog, form calls event handler recieved as props with right data', async () => {
    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const urlInput = container.querySelector('#url');

    const createBtn = screen.getByRole('button');

    await user.type(titleInput, newBlog.title);
    await user.type(authorInput, newBlog.author);
    await user.type(urlInput, newBlog.url);

    await user.click(createBtn);

    const mockCalls = createBlogMockHandler.mock.calls;
    expect(mockCalls).toHaveLength(1);
    expect(mockCalls[0][0]).toEqual(newBlog);
  });
});
