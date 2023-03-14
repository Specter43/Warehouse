import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography
} from "@mui/material";
import axios from "axios";
import Swal from 'sweetalert2';

export const WarehouseSubmitForm = () => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const BoxesRcvd=(document.getElementById("BoxesRcvd")as HTMLInputElement).value;
    const Date=(document.getElementById("Date")as HTMLInputElement).value;
    const ShipmentID=(document.getElementById("ShipmentID")as HTMLInputElement).value;
    const ShippingPO=(document.getElementById("ShippingPO")as HTMLInputElement).value;
    const WarehouseID=(document.getElementById("WarehouseID")as HTMLInputElement).value;
    const ShipperID=(document.getElementById("ShipperID")as HTMLInputElement).value;

    // Call your API POST function here with shipmentStatus
    try {
      const res = await axios.post(
        "https://warehouseyangzhey.azurewebsites.net/api/Post?",
        {  
          "Date": Date,
          "WarehouseID": WarehouseID,
          "ShippingPO": ShippingPO,
          "ShipperID": ShipperID,
          "ShipmentID": ShipmentID,
          "BoxesRcvd": BoxesRcvd
        },
        {
          params: {
            code: ""
          }
        }
      );
      Swal.fire(
        'Success!',
        'Shipment Data Logged!',
        'success'
      )
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={2} style={{ padding: "1rem" }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Enter shipment data
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="BoxesRcvd"
            required
            fullWidth
            label="BoxesRcvd"
            name="BoxesRcvd"
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            id="Date"
            required
            fullWidth
            label="Date"
            name="Date"
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            id="ShipmentID"
            required
            fullWidth
            label="ShipmentID"
            name="ShipmentID"
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            id="ShipperID"
            required
            fullWidth
            label="ShipperID"
            name="ShipperID"
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            id="ShippingPO"
            required
            fullWidth
            label="ShippingPO"
            name="ShippingPO"
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            id="WarehouseID"
            required
            fullWidth
            label="WarehouseID"
            name="WarehouseID"
            style={{ marginBottom: "1rem" }}
          />
          <Button type="submit" variant="contained" color="primary">
            Log new shipment
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default WarehouseSubmitForm;
