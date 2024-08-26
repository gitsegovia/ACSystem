// ** Third Party Import
import { Trans, useTranslation } from "react-i18next";
import i18n from "i18next";

interface Props {
  text: string;
  arg?: object;
  uppercase?: boolean;
  lowercase?: boolean;
  components?: readonly React.ReactElement[] | { readonly [tagName: string]: React.ReactElement };
}

const Translations = ({ text, arg, uppercase = false, lowercase = false, components }: Props) => {
  // ** Hook
  const { t } = useTranslation();
  if (!components) {
    let textTranslated = t(text);

    if (arg) {
      textTranslated = t(text, arg);
    }

    if (uppercase) {
      textTranslated = textTranslated.toUpperCase();
    }

    if (lowercase) {
      textTranslated = textTranslated.toLowerCase();
    }

    return <>{`${textTranslated}`}</>;
  } else {
    return <Trans i18nKey={text} components={components} />;
  }
};

export default Translations;

export const OnlyTextTranslation = (key: string | string[]) => i18n.t(key);
