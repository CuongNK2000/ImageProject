import LocalizedStrings from 'react-native-localization';
import {en} from './en';
import {vn} from './vn';

const languages = {en, vn};

const i18n = new LocalizedStrings(languages);

export default i18n;
