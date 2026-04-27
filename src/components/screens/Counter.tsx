import React from 'react';
import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../redux/counterSlice';
import ParentView from '../templates/ParentView';
import { Button, Text, View } from 'react-native';

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <ParentView>
      <View>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Text>{count}</Text>
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
      </View>
    </ParentView>
  );
}
