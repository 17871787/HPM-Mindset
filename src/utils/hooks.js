import { useState, useEffect } from 'react';
import { loadState, saveState } from './helpers';

export function useLocalState() {
  const [state, setState] = useState(loadState());
  useEffect(() => saveState(state), [state]);
  return [state, setState];
}