import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  mobileUserSelector,
  userSelector,
} from '../../redux/reduxSelectors/userSelectors';
import { addUser } from '../../redux/reduxSlices/userSlice';

const ProfileScreen = () => {
  const [name, setName] = useState<string>('');
  const [track, setTrack] = useState<string>('');

  console.log({ name, track });

  const dispatch = useDispatch();
  const { users: allUsers } = useSelector(userSelector);
  //console.log(allUsers);
  const mobileUsers = useSelector(mobileUserSelector);

  const addUserFuntion = () => {
    dispatch(addUser({ username: name, track }));

    setName('');
    setTrack('');
  };

  return (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}
    >
      <TextInput
        placeholder="username"
        placeholderTextColor={'blue'}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'Green',
          marginBottom: 30,
        }}
        onChangeText={x => setName(x)}
        value={name}
      />

      <TextInput
        placeholder="track"
        placeholderTextColor={'blue'}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'Green',
          marginBottom: 30,
        }}
        onChangeText={x => setTrack(x)}
        value={track}
      />

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity
          style={{
            marginBottom: 20,
            borderWidth: 1,
            marginRight: 20,
            padding: 10,
            borderRadius: 10,
            borderColor: 'green',
          }}
          onPress={addUserFuntion}
        >
          <Text>Save user</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'green',
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700' }}>All Users</Text>
      </View>
      <ScrollView>
        {allUsers.map(item => (
          <View key={item.username}>
            <Text>{item.username}</Text>
            <Text>{item.track}</Text>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'green',
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700' }}>
          Our Filtered Mobile Users
        </Text>
      </View>
      <ScrollView>
        {mobileUsers.map(item => (
          <View key={item.username}>
            <Text>{item.username}</Text>
            <Text>{item.track}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
