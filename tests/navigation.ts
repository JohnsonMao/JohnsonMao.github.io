const mockPathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

beforeEach(() => {
  mockPathname.mockClear();
});

export default mockPathname;
