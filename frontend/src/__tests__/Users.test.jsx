import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockAxios from 'axios';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import UserForm from '../components/UserForm';

jest.mock('axios');

describe('Users Component', () => {

  const mockData = {
    data: [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John",
        "age": "30",
        "email": "jonh@doe",
        "interests": "x",
        "address": "x",
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Jane",
        "age": "30",
        "email": "jane@doe",
        "interests": "x",
        "address": "x",
      },
    ],
    total: 2,
    page: 1,
    per_page: 10,
  };

  test('renders records fetched from API', async () => {

    mockAxios.get.mockResolvedValueOnce({ data: mockData });

    render( <App /> );

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
      expect(screen.getByText(`Total: ${mockData.data.length} users`)).toBeInTheDocument();
    });

  });

  test('opens modal with userForm to create a new user', async () => {

    render( <App /> );

    fireEvent.click(screen.getByText('Create New User'));

    await waitFor(() => {
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

  });

  test('opens modal with userForm to update user', async () => {

    mockAxios.get.mockResolvedValueOnce({ data: mockData });

    render( <App /> );

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    const testUser = mockData.data[0];
    mockAxios.get.mockResolvedValueOnce({
      data: testUser,
    });

    fireEvent.click(screen.getAllByText('Edit')[0]);

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue(testUser.name);
      expect(screen.getByText('Update')).toBeInTheDocument();
    });

  });

  test('deletes a user when delete button is clicked', async () => {

    mockAxios.get.mockResolvedValueOnce({ data: mockData });

    render( <App /> );

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    // mock axios delete action and confirm dialog action
    mockAxios.delete.mockResolvedValueOnce({});
    window.confirm = jest.fn(() => true);

    fireEvent.click(screen.getAllByText('Delete')[0]);

    expect(window.confirm).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText('John')).not.toBeInTheDocument();
    });

  });

});
