import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../../store/user.slice';

let initialErrorObj = {
  status: false,
  message: '',
};
let initialGoodObj = {
  status: false,
  message: '',
};

const Home = ({route, navigation}) => {
  const {allUsers, updatedUser, email} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(true);
  // const [allUsers, setAllUsers] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(initialErrorObj);
  const [good, setGood] = useState(initialGoodObj);
  const dispatch = useDispatch();
  const isVisible = useIsFocused();

  //
  const handleBackButton = () => {
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }),
  );
  //
  const handleSearch = e => {
    setIsLoading(true);
    const val = e?.toLowerCase();
    const filter = allUsers.filter(c => {
      return c.email === email;
    });
    setUserDetails(filter);
    setIsLoading(false);
  };

  //
  useEffect(() => {
    // console.log("called when screen open and also on close");

    //
    if (email && allUsers) {
      //called when screen open or when back on screen
      // handleSearch(email);
      setTimeout(() => {
        handleSearch(email);
      }, 500);
      () => clearTimeout();
    }
  }, [email, allUsers]);

  //
  useEffect(() => {
    // console.log("called when screen open and also on close");

    if (updatedUser && userDetails) {
      //called when screen open or when back on screen
      let newArray = userDetails.map(item => {
        return {
          id: item.id,
          avatar: item.avatar,
          email: updatedUser?.email,
          first_name: updatedUser?.first_name,
          last_name: updatedUser?.last_name,
        };
      });
      // console.log('UPDATED-USER--PROFILES', newArray);
      setUserDetails(newArray);
    }
  }, [updatedUser]);

  //
  const logOutHandler = async () => {
    //
    try {
      dispatch(logOut());
      console.log('>>>>>>>>>>>>>>>>>>JET>>>OUT 🚀//');
      // return navigation.navigate('SignIn');
      //
    } catch (error) {
      console.log('🚀 ~ file: Head.js:89 ~ logOutHandler ~ error', error);
    }
  };

  if (isLoading || allUsers === null || email === null || undefined) {
    return (
      <ActivityIndicator
        size="large"
        style={{flex: 1, alignContent: 'center'}}
      />
    );
  }

  //
  return (
    <View style={styles.container}>
      {userDetails[0]?.avatar && (
        <Image
          source={{uri: userDetails[0]?.avatar}}
          style={{width: 200, height: 200, borderRadius: 100}}
        />
      )}
      <Text
        style={{
          textAlign: 'center',
          fontSize: 25,
          fontWeight: 'bold',
          color: COLORS.primary,
          paddingVertical: 10,
        }}>
        {`${userDetails[0]?.first_name} ${userDetails[0]?.last_name}`}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 30,
          marginVertical: 30,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
              id: `${userDetails[0]?.id}`,
              email: `${userDetails[0]?.email}`,
              first_name: `${userDetails[0]?.first_name}`,
              last_name: `${userDetails[0]?.last_name}`,
            })
          }
          style={[styles.buttonStyles, {backgroundColor: COLORS.green}]}>
          <Text style={styles.textStyles}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logOutHandler}
          style={[styles.buttonStyles, {backgroundColor: COLORS.red}]}>
          <Text style={styles.textStyles}>SignOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyles: {
    backgroundColor: COLORS.primary,
  },
  textStyles: {
    fontSize: 20,
    color: COLORS.white,
    padding: 10,
  },
});

export default Home;
