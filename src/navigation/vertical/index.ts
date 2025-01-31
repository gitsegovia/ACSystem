// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (role: string): VerticalNavItemsType => {

  const result = [
    {
      title: "Home",
      icon: "mdi:home-outline",
      roles: ["administrator"],
      children: [
        {
          title: "Analiticas",
          path: "/dashboards/analytics",
          roles: ["administrator"]
        },
        {
          title: "Libro de asistencia",
          path: "/attendance",
          roles: ["administrator"]
          
        },
        {
          title: "Permissions",
          path: "/apps/permissions",
          roles: ["administrator"]
          
        },
        {
          title: "Roles",
          path: "/apps/roles",
          roles: ["administrator"]
          
        },
      ],
    },
    {
      sectionTitle: "Usuarios",
      roles: ["administrator"],
    },
    {
      title: "Personal",
      icon: "mdi:account-outline",
      roles: ["administrator"],
      children: [
        {
          title: "Administrativos",
          path: "/apps/administrative/list",
          roles: ["administrator"],
        },
        {
          title: "Administrador",
          path: "/apps/user/list",
          roles: ["administrator"],
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
      roles: ["administrator"],
    },
  ].map(item => {
    if(item.children) {
      const children = item.children && item.children.filter(children => children.roles.includes(role))
      return {
        ...item,
        children
      }

    }
    return item;
  })

  return result
};

export default navigation;

function hasPermission(permissionRequired: string, userPermissions: string[]): boolean {
  return userPermissions.includes(permissionRequired)
}