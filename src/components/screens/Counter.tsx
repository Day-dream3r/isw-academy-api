import React from 'react';
import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../redux/counterSlice';
import ParentView from '../templates/ParentView';
import { Pressable, Text, View } from 'react-native';

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <ParentView>
      <View>
        <Pressable onPress={() => dispatch(increment())}>Increment</Pressable>
        <Text>{count}</Text>
        <Pressable onPress={() => dispatch(decrement())}>Decrement</Pressable>
      </View>
    </ParentView>
  );
}
