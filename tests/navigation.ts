const mockPathname = jest.fn();
const mockRouter = jest.fn();
const mockSearchParams = jest.fn();
const mockNotFound = jest.fn();
const mockI18nPathname = jest.fn();
const mockI18nRouter = jest.fn();
const mockRedirect = jest.fn();
const mockGetPathname = jest.fn();

jest.mock('next/navigation', () => ({
  notFound: () => mockNotFound(),
  useSearchParams: () => mockSearchParams(),
  usePathname: () => mockPathname(),
  useRouter: () => mockRouter(),
}));

// Mock only the hooks, keep Link implementation from next-intl
jest.mock('@/i18n/navigation', () => {
  const actual = jest.requireActual('@/i18n/navigation');
  return {
    ...actual,
    usePathname: () => mockI18nPathname(),
    useRouter: () => mockI18nRouter(),
    redirect: () => mockRedirect(),
    getPathname: () => mockGetPathname(),
  };
});

beforeEach(() => {
  mockNotFound.mockClear();
  mockSearchParams.mockClear();
  mockPathname.mockClear();
  mockRouter.mockClear();
  mockI18nPathname.mockClear();
  mockI18nRouter.mockClear();
  mockRedirect.mockClear();
  mockGetPathname.mockClear();
  mockI18nPathname.mockReturnValue('/');
});

const mockNavigation = {
  notFound: mockNotFound,
  searchParams: mockSearchParams,
  pathname: mockI18nPathname,
  router: mockI18nRouter,
};

export default mockNavigation;
