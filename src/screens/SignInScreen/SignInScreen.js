import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import Logo from '../../../assets/images/fastamoni.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useForm} from 'react-hook-form';
import {getAllUserz, login} from '../../services/api/user.api';
import FailureModal from '../../components/FailureModal';
import {useDispatch} from 'react-redux';
import {saveToken, saveUserEmail} from '../../store/user.slice';

let initialErrorObj = {
  status: false,
  message: '',
};
let initialGoodObj = {
  status: false,
  message: '',
};

const SignInScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(initialErrorObj);
  const [good, setGood] = useState(initialGoodObj);
  const {height} = useWindowDimensions();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = async data => {
    if (isLoading) {
      return;
    }
    setError(initialErrorObj);

    // validate user
    let loginFunc;
    let payload;
    let from = 'login';

    if (data.email.trim() && data.password.trim() && from === 'login') {
      loginFunc = login;
      payload = {
        email: data.email,
        password: data.password,
      };
    } else {
      alert('You are not Authorized');
      return;
    }
    setIsLoading(true);

    await loginFunc(payload)
      .then(data => {
        // console.log('LOGIN DATA;;>>>', data?.data);
        if (data?.status === 200) {
          dispatch(saveToken({token: data?.data?.token}));
          dispatch(saveUserEmail({email: payload.email}));
          getAllUserz();
          navigation.navigate('Home', {
            email: payload.email,
          });
        }
      })
      .catch(error => {
        console.log('LOGIN-ERROR:>>>>', error?.response?.data);
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

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const closeFailureModal = () => {
    setError(initialErrorObj);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FailureModal
        isModalVisible={error.status}
        closeModal={closeFailureModal}
        message={error.message}
      />
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <CustomInput
          name="email"
          placeholder="email"
          control={control}
          rules={{required: 'Email is required'}}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <View style={{height: 20}} />
        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />

        <View style={{height: 30}} />

        <CustomButton
          disable={isLoading}
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
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
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  error: {
    marginTop: 10,
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SignInScreen;
