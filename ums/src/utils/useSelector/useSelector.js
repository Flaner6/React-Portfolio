import { useSelector as reduxUseSelector } from 'react-redux';

export function useSelector(...params) {
  return reduxUseSelector(...params)
}