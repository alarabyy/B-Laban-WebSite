import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * authGuard: وظيفة حماية تمنع الوصول إلى صفحات معينة إلا إذا كان المستخدم مسجل دخول.
 * تُستخدم داخل تعريف المسارات (routes) في الراوتر.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthorized = localStorage.getItem('authorized') === 'true';

  if (isAuthorized) {
    return true;
  }

  // المستخدم غير مسجل دخول، يتم توجيهه إلى صفحة تسجيل الدخول
  router.navigate(['/auth/Login']);
  return false; // مهم: نمنع الوصول للصفحة
};
