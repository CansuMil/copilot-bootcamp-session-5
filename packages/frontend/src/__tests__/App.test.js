import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
    ok: true,
  })
);

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('displays empty state message when no todos', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
      ok: true,
    })
  );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const emptyMessage = await screen.findByText(/no todos yet/i);
  expect(emptyMessage).toBeInTheDocument();
});

test('calculates and displays correct stats for incomplete todos', async () => {
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: false },
    { id: 3, title: 'Todo 3', completed: true },
  ];

  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockTodos),
      ok: true,
    })
  );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/2 items left/i)).toBeInTheDocument();
  });
  
  expect(screen.getByText(/1 completed/i)).toBeInTheDocument();
});

test('delete button calls API and removes todo', async () => {
  const mockTodos = [
    { id: 1, title: 'Todo to delete', completed: false },
  ];

  global.fetch
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTodos),
        ok: true,
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        ok: true,
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
        ok: true,
      })
    );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Todo to delete')).toBeInTheDocument();
  });

  const deleteButton = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/todos/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('displays error message when API fetch fails', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error('API Error'))
  );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const errorMessage = await screen.findByText(/error loading todos/i);
  expect(errorMessage).toBeInTheDocument();
});

afterEach(() => {
  jest.clearAllMocks();
});
