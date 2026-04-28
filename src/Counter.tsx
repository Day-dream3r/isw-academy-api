import type { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/counterSlice';
import { View, Pressable, Text } from 'react-native';

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <View>
        <Pressable onPress={() => dispatch(increment())}>
          <Text>Increment</Text>
        </Pressable>
        <Text>{`Count: ${count}`}</Text>
        <Pressable onPress={() => dispatch(decrement())}>
          <Text>Decrement</Text>
        </Pressable>
      </View>
    </View>
  );
}
