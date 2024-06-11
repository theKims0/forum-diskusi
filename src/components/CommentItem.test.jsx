import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import CommentItem from './CommentItem';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Mock the postedAt function
vi.mock('../utils', () => ({
  default: (date) => `Posted at ${date}`,
}));

describe('CommentItem component', () => {
  const mockOwner = {
    id: 'user123',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
  };

  it('renders correctly with provided props', () => {
    const mockContent = 'This is a comment';
    const mockCreatedAt = '2023-06-11';

    render(
      <CommentItem
        content={mockContent}
        createdAt={mockCreatedAt}
        owner={mockOwner}
      />,
    );

    // Check if the owner's avatar is rendered
    const avatarImg = screen.getByAltText(mockOwner);
    expect(avatarImg).toHaveAttribute('src', mockOwner.avatar);

    // Check if the owner's id and name are rendered
    expect(screen.getByText(`@${mockOwner.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockOwner.name)).toBeInTheDocument();

    // Check if the content is rendered
    expect(screen.getByText(mockContent)).toBeInTheDocument();

    // Check if the createdAt is rendered correctly by postedAt
    expect(screen.getByText(`Posted at ${mockCreatedAt}`)).toBeInTheDocument();
  });
});
