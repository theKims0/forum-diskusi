/**
 * testing secenario commponent comment item
 * should display the content correctly
 * should display the owner information correctly
 * should display the createdAt date correctly
 * renders correctly
 */
import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import CommentItem from './CommentItem';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Mocking the postedAt function
vi.mock('../utils', () => ({
  default: (date) => `Posted at ${date}`,
}));

describe('CommentItem component', () => {
  const owner = {
    id: 'user123',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
  };

  const commentProps = {
    content: 'This is a comment',
    createdAt: '2024-06-12T12:00:00Z',
    owner,
  };

  it('should display the content correctly', () => {
    // Arrange
    render(<CommentItem {...commentProps} />);

    // Assert
    expect(screen.getByText('This is a comment')).toBeInTheDocument();
  });

  it('should display the owner information correctly', () => {
    // Arrange
    render(<CommentItem {...commentProps} />);

    // Assert
    expect(screen.getByText('@user123')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText(owner)).toBeInTheDocument();
  });

  it('should display the createdAt date correctly', () => {
    // Arrange
    render(<CommentItem {...commentProps} />);

    // Assert
    expect(screen.getByText('Posted at 2024-06-12T12:00:00Z')).toBeInTheDocument();
  });

  it('renders correctly', () => {
    // Arrange
    const { container } = render(<CommentItem {...commentProps} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
