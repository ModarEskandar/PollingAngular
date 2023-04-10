import { createAction, props } from '@ngrx/store';

export const alertMsg = createAction(
  '[Alert Component] Alert',
  props<{ Message: string }>()
);
export const resetMsg = createAction('[Alert Component] Reset');
