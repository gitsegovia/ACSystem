// ** MUI Components
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";

interface FooterIllustrationsProp {
  image?: string;
}

// Styled Components
const MaskImg = styled("img")(({ theme }) => ({
  zIndex: -1,
  bottom: "0%",
  width: "100%",
  position: "absolute",
  height: "100%",
  [theme.breakpoints.down("lg")]: {
    bottom: "10%",
  },
}));

const FooterIllustrations = (props: FooterIllustrationsProp) => {
  // ** Props
  const { image } = props;

  // ** Hook
  const theme = useTheme();

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  const src = image || `/images/logos/background_consulta_trabajadores.webp`;

  if (!hidden) {
    return <MaskImg alt="mask" src={src} />;
  } else {
    return null;
  }
};

export default FooterIllustrations;
