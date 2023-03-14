module.exports = async function (context, req) {
    var data = {
        "BoxesRcvd": req.body.BoxesRcvd,
        "Date": req.body.Date,
        "ShipmentID": req.body.ShipmentID,
        "ShipperID": req.body.ShipperID,
        "ShippingPO": req.body.ShippingPO,
        "WarehouseID": req.body.WarehouseID
    }
    context.bindings.inputDoc=JSON.stringify(data)
    //  try catch
    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        status: 200, /* Defaults to 200 */
        body: data
    };
}