// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Home",
      icon: "mdi:home-outline",
      children: [
        {
          title: "Analiticas",
          path: "/dashboards/analytics",
        },
        {
          title: "Libro de asistencia",
          path: "/attendance",
        },
      ],
    },
    {
      sectionTitle: "Usuarios",
    },
    {
      title: "Personal",
      icon: "mdi:account-outline",
      children: [
        {
          title: "Administrativos",
          path: "/apps/administrative/list",
        },
        {
          title: "Administrador",
          path: "/apps/user/list",
        },
      ],
    },
    {
      sectionTitle: "QR",
    },
    {
      title: "Registrar asistencia",
      icon: "mdi:chart-donut",
      path: "/scan/",
      openInNewTab: true,
    },
  ];
};

export default navigation;
