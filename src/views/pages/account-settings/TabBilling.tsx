// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types
import { PricingPlanType } from "src/@core/components/plan-details/types";

const TabBilling = ({ apiPricingPlanData }: { apiPricingPlanData: PricingPlanType[] }) => {
  return <Grid container spacing={6}></Grid>;
};

export default TabBilling;
