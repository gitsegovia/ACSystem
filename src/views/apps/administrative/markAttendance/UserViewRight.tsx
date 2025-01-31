// ** React Imports
import { SyntheticEvent, useState, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiTab, { TabProps } from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Demo Components Imports
import ActivityTimeline from "src/views/apps/administrative/markAttendance/ActivityTimeline";

// ** Types
import { InvoiceType } from "src/types/apps/invoiceTypes";
import { Attendance } from "src/services/graphql/types";

interface Props {
  data: Attendance;
  type: string;
}

const UserViewRight = ({ data, type }: Props) => {
  return (
    <Box sx={{ mt: 0 }}>
      <ActivityTimeline data={data} type={type} />
    </Box>
  );
};

export default UserViewRight;
