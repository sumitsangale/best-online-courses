import { environment } from '../../environments/environment';

export const CONFIG: any = {
  SERVER_URL: environment.server_url,

  PER_PAGE: 4,
  endpoints: {
    getCourseData: 'assets/data.json',
  },
  messages: {
    http_error: 'Unknown error. Please try again later.',
  },
};
