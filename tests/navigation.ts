const mockPathname = jest.fn();
const mockRouter = jest.fn();
const mockSearchParams = jest.fn();
const mockNotFound = jest.fn();

jest.mock('next/navigation', () => ({
  notFound: () => mockNotFound(),
  useSearchParams: () => mockSearchParams(),
  usePathname: () => mockPathname(),
  useRouter: () => mockRouter(),
}));

beforeEach(() => {
  mockNotFound.mockClear();
  mockSearchParams.mockClear();
  mockPathname.mockClear();
  mockRouter.mockClear();
});

const mockNavigation = {
  notFound: mockNotFound,
  searchParams: mockSearchParams,
  pathname: mockPathname,
  router: mockRouter,
};

export default mockNavigation;
