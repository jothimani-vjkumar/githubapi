import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import Search from './Component/Search';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dubData, setDubData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [since, setSince] = useState(0);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    setLoading(true);
    fetch(`https://api.github.com/users?since=${since}&per_page=8`)
      .then(res => res.json())
      .then(userData => {
        setData([...data, ...userData]),
          setDubData([...data, ...userData]),
          setLoading(false);
      })
      .catch(err => console.log(err));
  };

  const loadMore = () => {
    setSince(state => state + 9);
    fetchUser();
  };

  const User = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Profile', {name: item.login})}>
      {item.avatar_url ? (
        <Image source={{uri: item.avatar_url}} style={styles.avatar} />
      ) : (
        <Icon name="user-circle" type="font-awesome" size={45} />
      )}
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{item.login}</Text>
        <Text>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{flex: 1}}>
      <Search
        data={data}
        setData={setData}
        query={query}
        setQuery={setQuery}
        dubData={dubData}
      />
      {data.length !== 0 ? (
        <FlatList
          data={data}
          renderItem={User}
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            loading && (
              <ActivityIndicator
                color="#333"
                size={30}
                style={styles.loadMore}
              />
            )
          }
          keyExtractor={(item, index) => index.toString()}
          onEndReached={query === '' && loadMore}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <ActivityIndicator
          color="#333"
          size={50}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  listContainer: {
    width: '90%',
    marginVertical: 20,
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    borderColor: '#ccc',
    marginVertical: 5,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  userDetails: {
    marginHorizontal: 15,
    justifyContent: 'space-around',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  loadMore: {
    marginVertical: 20,
  },
});
