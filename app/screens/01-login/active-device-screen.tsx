import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {color, spacing} from '../../themes';
import {
  dimensionsWidth,
  heightScreenFull,
  scale,
  verticalScale,
  widthScreenFull,
} from '../../themes/resize';
import {Screen, Text} from '../../components';
// import GroupAvatar from './components/groupAvatar';
import {icons} from '../../assets';
import theme from '../../themes/configs';
import {TextField} from '../../components/text-field/text-field';
import i18n from '../../i18n';
import {useForm} from 'react-hook-form';
import {Button} from '../../components/button/button';
import {RootNavigation} from '../../navigators/navigation-ultilities';
import {bottomTab} from '../../navigators';

export const ActiveDeviceScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const {control, handleSubmit} = useForm();

  const background = React.useMemo(() => {
    return {backgroundColor: theme.colors.background};
  }, [theme]);

  const [error, setError] = React.useState({
    username: false,
    usernameText: '',
    password: false,
    passwordText: '',
  });

  const goForgotPasswordScreen = React.useCallback(() => {
    // RootNavigation.navigate("");
  }, []);

  const goRegisterScreen = React.useCallback(() => {
    // RootNavigation.navigate('createNewAccount');
    // RootNavigation.navigate(registerNewAccount);
  }, []);

  const onsubmit = React.useCallback(async data => {
    console.log(data);
    const RULE = {
      username: {
        presence: {message: i18n.login.validateEmptyUsername},
        length: {
          minimum: 1,
          message: i18n.login.validateEmptyUsername,
        },
        format: {
          pattern: '[a-z0-9]+',
          flags: 'i',
          message: 'Can only contain a-z and 0-9',
        },
      },
      password: {
        presence: {message: i18n.login.validateEmptyPassword},
        length: {
          minimum: data.password === '' ? 1 : 6,
          message:
            data.password === ''
              ? i18n.login.validateEmptyPassword
              : i18n.login.atLeastCharacters,
        },
        // format: {
        //   pattern: PWD_REGEX,
        //   message: "Requires uppercase, lowercase,number and special characters",
        // },
      },
    };

    // const errorData = validate(RULE, data);
    RootNavigation.reset({index: 0, routes: [{name: bottomTab}]});
  }, []);

  const onDisableErrorUsername = React.useCallback(() => {
    error.username &&
      setError({
        ...error,
        username: false,
      });
  }, [error]);

  const onDisableErrorPwd = React.useCallback(() => {
    error.password &&
      setError({
        ...error,
        password: false,
      });
  }, [error]);

  return (
    <View style={[styles.container]}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios' ? 'padding' : undefined
        }></KeyboardAvoidingView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        keyboardShouldPersistTaps={'handled'}
        alwaysBounceVertical={false}
        bounces={false}>
        <ImageBackground
          resizeMode="stretch"
          source={icons.backGround}
          style={styles.imageBackgroundTop}>
          {/* <GroupAvatar /> */}
          <View style={styles.content}>
            <View style={styles.contentLogin}>
              <View style={styles.groupCenter}>
                <TextField
                  name="phoneNumber"
                  keyboardType="number-pad"
                  control={control}
                  label={i18n.accountInformation.phoneNumber}
                  placeholder={i18n.accountInformation.phoneNumber}
                  error={error.username}
                  errorText={error.usernameText}
                  style={styles.fieldUsername}
                  onDisableError={onDisableErrorUsername}
                  onSubmitEditing={handleSubmit(onsubmit)}
                />
                <TextField
                  name="password"
                  control={control}
                  label={i18n.accountInformation.passWord}
                  placeholder={i18n.accountInformation.passWord}
                  error={error.username}
                  errorText={error.usernameText}
                  style={styles.fieldPassword}
                  onDisableError={onDisableErrorPwd}
                  onSubmitEditing={handleSubmit(onsubmit)}
                />
                <Button
                  text={i18n.login.login}
                  onPress={handleSubmit(onsubmit)}
                  style={styles.bntLogin}
                  // textStyle={styles.textbntContinue}
                />
                <View style={styles.bntLinkContainer}>
                  <TouchableOpacity
                    style={styles.bntRegister}
                    onPress={goRegisterScreen}>
                    <Text style={styles.textRegister}>
                      {i18n.login.registerNow}
                    </Text>
                  </TouchableOpacity>

                  <Button
                    preset="link"
                    style={styles.bntForgotPassword}
                    onPress={goForgotPasswordScreen}>
                    <Text style={styles.textForgotPwd}>
                      {i18n.login.forgotPassword}
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textForgotPwd: {
    color: color.primary,
    fontSize: scale(14),
    fontWeight: '600',
  },
  textRegister: {
    color: color.primary,
    fontSize: scale(14),
    fontWeight: '600',
  },
  bntForgotPassword: {
    alignSelf: 'flex-end',
  },
  bntRegister: {
    alignSelf: 'center',
  },
  bntLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bntLogin: {
    backgroundColor: color.primary,
    height: verticalScale(52),
    marginBottom: verticalScale(spacing[5]),
  },
  groupCenter: {
    flex: 1,
    marginBottom: verticalScale(100),
    marginHorizontal: scale(20),
    marginTop: verticalScale(64),
  },
  contentLogin: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    width: dimensionsWidth,
  },
  fieldPassword: {
    marginBottom: verticalScale(spacing[6]),
  },
  fieldUsername: {
    marginBottom: verticalScale(spacing[6]),
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 0.75,
  },
  contentContainerStyle: {
    paddingBottom: verticalScale(20),
  },
  scrollStyle: {
    alignSelf: 'center',
    backgroundColor: color.palette.orangeEAC490,
    paddingTop: verticalScale(20),
    width: dimensionsWidth,
  },

  viewContainer: {
    height: heightScreenFull,
  },
  imageBackgroundTop: {
    backgroundColor: color.palette.blue1,
    height: heightScreenFull,
    width: widthScreenFull,
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  back: {backgroundColor: '#333333'},
});
