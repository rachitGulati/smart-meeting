import { render, screen, fireEvent } from '@testing-library/react';
import Button from './';

test('button render', () => {
  const text = "dummy text";
  render(<Button text={text}/>)
  const linkElement = screen.getByText(text);
  expect(linkElement).toBeInTheDocument();
});

test('button click', () => {
    const text = "dummy text";
    const onClick = jest.fn();
    render(<Button text={text} onClick={onClick}/>)
    fireEvent.click(screen.getByText(text));
    expect(onClick).toHaveBeenCalled();
  });
