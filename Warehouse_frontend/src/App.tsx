import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

import { BASE_API_URL, GET_AXIOS_HEADERS, MY_BU_ID } from "./globals";
import { shipmentStatus } from "./types/api_types";
import { WarehouseTable } from "./components/WarehouseTable";
import { WarehouseSubmitForm } from "./components/WarehouseSubmitForm";

function App() {
  const [shipperList, setShipperList] = useState<string[]>([]);
  const [tableData, setTableData] = useState<Array<shipmentStatus>>([]);

  /**
   * Get all unique shipper ids there.
   */
  const getShipperIDs = async () => {
    try {
      const response = await axios.get("https://warehouseyangzhey.azurewebsites.net/api/GetShipperID?code=2YXyUbPgA3eUFpf3Y2oAF-AUMtFehuLPKRNfDd3WZ-1RAzFuAVe36w==&clientId=default");
      const uniqueShipperIDs = [...new Set(response.data.map((item: {ShipperID: string}) => item.ShipperID))];
      setShipperList(uniqueShipperIDs as string[]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => { getShipperIDs(); }, []);


  /**
   * Get all shipment for one selected shipper id.
   */
  const getWarehouseData = async (shipperID: string) => {
    try {
      const response = await axios.get(`https://warehouseyangzhey.azurewebsites.net/api/Get?code=UgcgelLs-R_Guho3X9V4deKiUW3FK-tuPBQ4rQ3_DCWnAzFuvjZ1AA==&ShipperID=${shipperID}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null; // or any other error handling logic you want to use
    }
  };


  /**
   * Create the data needed for one row of the table.
   */
  function createData(
    Date: any,
    WarehouseID: any,
    ShippingPO: any,
    ShipmentID: any,
    BoxesRcvd: any,
    ShipperID: string
  ): shipmentStatus {
    return { Date, WarehouseID, ShippingPO, ShipmentID, BoxesRcvd, ShipperID };
  }


  /**
   * Handle the changes happen after selecting a shipper.
   */
  const handleChangeSelect = async (event: any, value: React.ReactNode) => {
    // Get warehouse data
    const rows = await getWarehouseData(event.target.value.toString());
    setTableData(rows);
  };


  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Warehouse
          </Typography>
        </Grid>
        <Grid xs={12} md={4} maxWidth={400}>
          <Typography variant="h4" gutterBottom>
            Select a shipper
          </Typography>
          <div style={{ width: "100%" }}>
            <Select id="ShipperIDSelect" fullWidth={true} label="Class" onChange={handleChangeSelect}>
              {shipperList!.map(p => (<MenuItem value={p}> {p} </MenuItem>))}
            </Select>
          </div>
          <div>{WarehouseSubmitForm()}</div>
        </Grid>
        <Grid xs={12} md={8} minWidth={850}>
          <Typography variant="h4" gutterBottom>
            Shipment Data
          </Typography>
          <div>{WarehouseTable(tableData)}</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
