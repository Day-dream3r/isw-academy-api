import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { decrement, increment, isEvenSelector } from '../../redux/counter';

const Counter = () => {
  const insets = useSafeAreaInsets(); 
  const count = useSelector((state: RootState) => state.counter.value);
  const isEven = useSelector(isEvenSelector);
  const dispatch = useDispatch();
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingHorizontal : 14  }]}>
      <Text>Counter</Text>
      <Pressable onPress={() => dispatch(increment())}>
        <Text>Increase Me</Text>
      </Pressable>
      <Text> {count}</Text>
      <Pressable onPress={() => dispatch(decrement())}>
        <Text>Decrease Me </Text>
      </Pressable>
      <Text> {isEven ? 'Even' : 'Odd'}</Text>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
