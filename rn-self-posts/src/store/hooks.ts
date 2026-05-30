import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './index';

// Типизированные обёртки (react-redux 9 withTypes) — используем их вместо
// голых useDispatch/useSelector по всему приложению.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
