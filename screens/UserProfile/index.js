import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const UserProfile = ({route}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${route.params.name}`)
      .then(res => res.json())
      .then(userData => {
        setUser(userData);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Image
            source={require('../../assets/images/github.png')}
            style={styles.banner}
            resizeMode="contain"
          />
          <View style={styles.follow}>
            <Text style={styles.followerTxt}>Following : {user.following}</Text>
            <Text style={styles.followerTxt}>Followers : {user.followers}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoTxt}>Name : {user.name}</Text>
            <Text style={styles.infoTxt}>Company : {user.company}</Text>
            <Text style={styles.infoTxt}>blog : {user.blog}</Text>
          </View>
          <View style={{width: '80%', alignSelf: 'center', marginTop: 50}}>
            <Text>Notes</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={6}
            />
            <TouchableOpacity style={styles.btn}>
              <Text style={{color: '#fff'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ActivityIndicator
          color="#333"
          size={30}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      )}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: 200,
  },
  follow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  followerTxt: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoTxt: {
    fontSize: 16,
    marginVertical: 4,
    color: '#000',
  },
  infoCard: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#333',
    width: '30%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'center',
  },
});
