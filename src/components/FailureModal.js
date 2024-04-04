import React from 'react';
import {COLORS, SIZES} from '../constants/Colors';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

// import Icon from 'react-native-vector-icons/EvilIcons';
import Modal from 'react-native-modal';
import danger from '../../assets/images/danger.png';

const FailureModal = ({isModalVisible, closeModal, message}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      coverScreen={true}
      // hasBackdrop={false}
      backdropColor={COLORS.primary}
      backdropOpacity={0.5}
      propagateSwipe
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      style={{margin: 0}}>
      <View
        style={{
          //    flex: 1,

          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding / 2.2,
          //  opacity: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: SIZES.radius,
            width: '70%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: SIZES.padding,
          }}>
          <Image
            source={danger}
            style={{width: 40, height: 40, resizeMode: 'contain'}}
          />
          <Text
            style={{
              // ...FONTS.body3,
              fontSize: 18,
              color: 'rgba(30, 50, 78, 1)',
              fontFamily: 'HelveticaNeueBold',
              marginTop: SIZES.margin,
              marginBottom: 15,
              textAlign: 'center',
            }}>
            {message}
            {/* Incorrect username and password entered, please check and try again */}
          </Text>
          <CustomButton
            text={'Ok'}
            bgColor={COLORS.darkBlue}
            active
            style={{height: 45, width: '100%', marginTop: 10}}
            onPress={closeModal}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FailureModal;

const CustomButton = ({
  loading,
  text,
  bgColor,
  active,
  onPress,
  style,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      // loading={loading}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: active ? bgColor : COLORS.gray2,
        paddingVertical: SIZES.padding / 6,
        paddingHorizontal: SIZES.padding / 1.5,
        borderRadius: SIZES.radius / 2,
        ...style,
      }}>
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <Text
          style={{
            // ...FONTS.body4,
            fontSize: SIZES.body4,
            fontWeight: active ? '600' : '700',
            color: active ? COLORS.white : COLORS.gray,
          }}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
