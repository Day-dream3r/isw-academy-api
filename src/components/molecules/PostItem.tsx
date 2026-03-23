import { Text, View } from 'react-native';

export type PostProps = {
  id?: number;
  userId?: number;
  title: string;
  body: string;
};

export default function PostItem({ title, body }: PostProps) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
}
