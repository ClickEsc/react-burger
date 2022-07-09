import React, { useEffect } from 'react';
import { useDispatch } from '../services/hooks';
import { wsConnectionStart, wsConnectionClose } from '../services/actions/wsActions';
import Feed from '../components/feed/feed';

export function FeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart('/all'));
    return () => {
      dispatch(wsConnectionClose());
    }
  }, [dispatch]);

  return (
    <Feed />
  );
}