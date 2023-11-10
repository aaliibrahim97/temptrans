import { HttpHeaders } from '@angular/common/http';
export const x_skip_bearer_interceptor = 'x-skip-bearer-interceptor';
export const InterceptorSkipHeader = new HttpHeaders({
  // 'x-skip-bearer-interceptor': '',
  [x_skip_bearer_interceptor]: '',
});
