import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon, Input} from 'react-native-elements';

const Search = ({data, setData, query, setQuery, dubData}) => {
  const searchQuery = async txt => {
    if (txt !== '') {
      setQuery(txt);
      let filteredData = await data.filter(item => {
        return item.login.includes(txt);
      });
      setData(filteredData);
    } else {
      setData(dubData);
      setQuery(txt);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        leftIcon={<Icon type="feather" name="search" size={20} color="#fff" />}
        placeholder="search user"
        value={query}
        inputContainerStyle={styles.inputTextContainer}
        inputStyle={styles.inputStyle}
        containerStyle={styles.inputContainer}
        onChangeText={searchQuery}
        rightIcon={
          false ? <Icon type="Ionicons" name="close" size={20} /> : null
        }
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#333',
  },
  inputTextContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  inputContainer: {
    width: '90%',
  },
  inputStyle: {
    color: '#fff',
  },
});
