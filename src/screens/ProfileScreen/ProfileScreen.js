import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {register, updateProfile} from '../../services/api/user.api';
import SuccessModal from '../../components/SuccessModal';
import FailureModal from '../../components/FailureModal';
import {useDispatch} from 'react-redux';
import {saveUpdatedUser} from '../../store/user.slice';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

let initialErrorObj = {
  status: false,
  message: '',
};
let initialGoodObj = {
  status: false,
  message: '',
};

const ProfileScreen = ({route, navigation}) => {
  const {id, email, first_name, last_name} = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(email);
  const [userFname, setUserFname] = useState(first_name);
  const [userLname, setUserLname] = useState(last_name);
  const {control, handleSubmit, setValue} = useForm();
  const [error, setError] = useState(initialErrorObj);
  const [good, setGood] = useState(initialGoodObj);
  const dispatch = useDispatch();

  //
  useEffect(() => {
    // console.log("called when screen open and also on close");

    if (id) {
      //called when screen open or when back on screen
      setValue('email', userEmail, {shouldTouch: true});
      setValue('first_name', userFname, {shouldTouch: true});
      setValue('last_name', userLname, {shouldTouch: true});
    }
  }, [id, userLname]);

  const onUpdatePressed = async data => {
    if (isLoading) {
      return;
    }

    setError(initialErrorObj);

    // validate user
    let updateProfileFunc;
    let payload;
    let from = 'edit-profile';

    if (
      !data.email.trim() ||
      !data.first_name.trim() ||
      !data.last_name.trim() ||
      from === 'edit-profile'
    ) {
      updateProfileFunc = updateProfile;
      payload = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      };
    } else {
      alert('You are not Authorized');
      return;
    }
    setIsLoading(true);

    await updateProfileFunc(id, payload)
      .then(data => {
        // console.log('UPDATE DATA;;>>>', data?.data);
        if (data?.status === 200) {
          dispatch(
            saveUpdatedUser({
              updatedUser: data?.data,
            }),
          );
          setUserEmail(data?.data?.email);
          setUserFname(data?.data?.first_name);
          setUserLname(data?.data?.last_name);
          setGood({
            status: true,
            message: 'profile updated Successfully!',
          });
        }
      })
      .catch(error => {
        console.log('UPDATE-PROFILE-ERROR:>>>>', error?.response?.data);
        if (error?.response?.status === 400) {
          setError({
            status: true,
            message: error?.response?.data?.error,
          });
        } else {
          setError({status: true, message: 'Network Error'});
        }
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeSuccessModal = () => {
    setGood(initialGoodObj);
  };

  const closeFailureModal = () => {
    setError(initialErrorObj);
  };

  //
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SuccessModal
        title={'Ok'}
        isModalVisible={good.status}
        closeModal={() => {
          closeSuccessModal();
          navigation.goBack();
        }}
        message={good.message}
      />
      <FailureModal
        isModalVisible={error.status}
        closeModal={closeFailureModal}
        message={error.message}
      />
      <View style={styles.root}>
        <Text style={styles.title}>Edit Profile</Text>

        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />
        <CustomInput
          name="first_name"
          control={control}
          placeholder="firstname"
          rules={{
            required: 'FirstName is required',
          }}
        />
        <CustomInput
          name="last_name"
          control={control}
          placeholder="lastname"
          rules={{
            required: 'LastName is required',
          }}
        />

        <View style={{height: 30}} />

        <CustomButton
          text="Update profile"
          disable={isLoading}
          onPress={handleSubmit(onUpdatePressed)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    marginTop: 50,
    marginBottom: 50,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ProfileScreen;
