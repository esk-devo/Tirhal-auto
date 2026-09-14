import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Runs a service call and exposes { data, error, loading, reload }.
 * Every page reads its data through this so loading/error/empty states are
 * consistent, and so the eventual switch to real HTTP changes nothing here.
 *
 * @param {Function} task     async function returning the data
 * @param {Array} deps        re-run when these change
 * @param {object} [options]  { initialData, enabled }
 */
export function useAsync(task, deps = [], { initialData = null, enabled = true } = {}) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(enabled);
  const [nonce, setNonce] = useState(0);
  const taskRef = useRef(task);
  taskRef.current = task;

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return undefined;
    }

    let active = true;
    setLoading(true);
    setError(null);

    taskRef
      .current()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((caught) => {
        if (active) setError(caught);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, enabled, nonce]);

  const reload = useCallback(() => setNonce((value) => value + 1), []);

  return { data, error, loading, reload };
}
