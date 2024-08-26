// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types"

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
                    title: "Profesores",
                    path: "/apps/teacher/list",
                },
                {
                    title: "Obreros",
                    path: "/apps/worker/list",
                },
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
        // {
        //     title: "Pages",
        //     icon: "mdi:file-document-outline",
        //     children: [
        //         {
        //             title: "Account Settings",
        //             children: [
        //                 {
        //                     title: "Account",
        //                     path: "/pages/account-settings/account",
        //                 },
        //                 {
        //                     title: "Security",
        //                     path: "/pages/account-settings/security",
        //                 },
        //                 {
        //                     title: "Billing",
        //                     path: "/pages/account-settings/billing",
        //                 },
        //                 {
        //                     title: "Notifications",
        //                     path: "/pages/account-settings/notifications",
        //                 },

        //                 {
        //                     title: "Connections",
        //                     path: "/pages/account-settings/connections",
        //                 },
        //             ],
        //         },
        //     ],
        // },
        {
            sectionTitle: "QR",
        },
        {
            title: "Registrar asistencia",
            icon: "mdi:chart-donut",
            path: "/scan/",
            openInNewTab: true,
        },
    ]
}

export default navigation
