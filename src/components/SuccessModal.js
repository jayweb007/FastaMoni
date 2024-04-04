import React from 'react';
import {COLORS, SIZES} from '../constants/Colors';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import greencheck from '../../assets/images/greencheck.png';

const SuccessModal = ({isModalVisible, closeModal, message, title}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      coverScreen={true}
      // hasBackdrop={false}
      // onBackdropPress={closeModal}
      backdropColor={COLORS.primary}
      backdropOpacity={0.5}
      propagateSwipe
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
            backgroundColor: COLORS.white,
            borderRadius: SIZES.radius,
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: SIZES.padding,
          }}>
          <Image
            source={greencheck}
            style={{width: 50, height: 50, resizeMode: 'contain'}}
          />
          {/* <Text
            style={{
              // ...FONTS.body3,
              fontSize: 20,
              color: 'rgba(30, 50, 78, 1)',
              fontWeight: 'bold',
              marginTop: 20,
              textAlign: 'center',
            }}>
            {title}
          </Text> */}
          <Text
            style={{
              // ...FONTS.body3,
              fontSize: 16,
              color: COLORS.gray,
              marginTop: 20,
              marginBottom: 20,
              textAlign: 'center',
            }}>
            {message}
          </Text>
          <CustomButton
            text={title}
            bgColor={COLORS.primary}
            active
            style={{height: 45, width: '100%', marginTop: 10}}
            onPress={closeModal}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

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
        <ActivityIndicator color={COLORS.white} />
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
