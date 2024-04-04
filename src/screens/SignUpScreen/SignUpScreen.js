import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {register} from '../../services/api/user.api';
import SuccessModal from '../../components/SuccessModal';
import FailureModal from '../../components/FailureModal';

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

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(initialErrorObj);
  const [good, setGood] = useState(initialGoodObj);
  const navigation = useNavigation();

  const onRegisterPressed = async data => {
    if (isLoading) {
      return;
    }

    setError(initialErrorObj);

    // validate user
    let registerFunc;
    let payload;
    let from = 'register';

    if (data.email.trim() && data.password.trim() && from === 'register') {
      registerFunc = register;
      payload = {
        email: data.email,
        password: data.password,
      };
    } else {
      alert('You are not Authorized');
      return;
    }
    setIsLoading(true);

    await registerFunc(payload)
      .then(data => {
        console.log('REGISTER DATA;;>>>', data?.data);
        if (data?.status === 200 && data?.data?.token) {
          setGood({
            status: true,
            message: 'Registered Successfully!',
          });
        }
      })
      .catch(error => {
        console.log('REGISTER-ERROR:>>>>', error?.response?.data);
        // console.log("LOGIN-ERROR-DETAILS:>>>>", error?.response?.data);
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

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
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
        title={'Login'}
        isModalVisible={good.status}
        closeModal={() => {
          closeSuccessModal();
          navigation.navigate('SignIn');
        }}
        message={good.message}
      />
      <FailureModal
        isModalVisible={error.status}
        closeModal={closeFailureModal}
        message={error.message}
      />
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

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
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Password do not match',
          }}
        />

        <View style={{height: 20}} />
        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />

        <View style={{height: 30}} />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <CustomButton
          disable={isLoading}
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
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

export default SignUpScreen;
