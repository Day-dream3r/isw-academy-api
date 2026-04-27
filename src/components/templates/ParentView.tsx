import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TParentViewProps = {
  children: React.ReactElement;
};

export default function ParentView({ children }: TParentViewProps) {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
