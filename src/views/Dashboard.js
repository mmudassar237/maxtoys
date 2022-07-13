import React, { useEffect, useCallback, useState } from "react";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import MaterialTable from "material-table";
import Avatar from "@mui/material/Avatar";
//--------------------------------------------table icon-----------------------
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
//--------------------------------------------table icon-----------------------

//-----------------------------------popover-----------------
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
//---------------------------------For Image popup-----------------------------------
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Typography from "@material-ui/core/Typography";

const MyNewTitle = ({ text, variant }) => (
  <Typography
    variant={variant}
    style={{
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
  >
    {text}
  </Typography>
);

//**************************************** Component **************************************************************/
function Dashboard() {
  //-----------------------------------------table icon-----------------------
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  //-----------------------------------------End table icon-----------------------

  const [state, setstate] = React.useState(false);
  const [image, setImage] = React.useState();
  const [pageSize, setpageSize] = useState(5);

  //---------------------------------For logout-----------------------------------
  let history = useHistory();

  const logoutBtn = () => {
    sessionStorage.removeItem("MAXTOYS");
    history.push("/login");
    // history.push("maxtoys/admin/");
    window.location.reload();
  };
  //---------------------------------For logout-----------------------------------

  //-----------------------------------------exporting--------------------------------------------
  //-----------------------------------------exporting--------------------------------------------
  //-----------------------------------------exporting--------------------------------------------
  var tableToExcel = (data) => {
    let Rows = "";
    data.forEach((e, i) => {
      Rows += `<tr height=47><td align=center width=100 height=47><img src={url${i}} height=45 width=100 /></td><td align=center width=100 height=47><img src={url_img${i}} height=45 width=100 /></td><td>{time${i}}</td><td width=85>{length${i}}</td><td width=85>{width${i}}</td><td width=85>{height${i}}</td><td width=85>{barcode${i}}</td><td width=115>{shape${i}}</td><td width=115>{device${i}}</td><td width=85>{name${i}}</td><td width=85>{customer${i}}</td><td width=85>{supplier${i}}</td></tr>`;
    });

    var uri = "data:application/vnd.ms-excel;base64,",
      template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table><tr><th>image</th><th>time</th><th>l</th><th>w</th><th>h</th><th>barcode</th><th>shape</th><th>device</th><th>name</th><th>customer</th><th>supplier</th></tr>' +
        Rows +
        "</table></body></html>",
      base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      };

    var ctx = {
      worksheet: name || "MaxToys_Table",
    };

    for (var n = 0; n < data.length; n++) {
      // ctx[`url${n}`] = data[n].url;
      ctx[`url${n}`] = data[n].url_imgseg;
      ctx[`url_img${n}`] = data[n].url;
      ctx[`time${n}`] = data[n].timestamp;
      ctx[`length${n}`] = data[n].l;
      ctx[`width${n}`] = data[n].w;
      ctx[`height${n}`] = data[n].h;
      ctx[`barcode${n}`] = data[n].barcode;
      ctx[`shape${n}`] = data[n].shape;
      ctx[`device${n}`] = data[n].device;
      ctx[`name${n}`] = data[n].name ?? "";
      ctx[`customer${n}`] = data[n].customer ?? "";
      ctx[`supplier${n}`] = data[n].supplier ?? "";
    }
    // console.log(ctx);

    var blob = new Blob([format(template, ctx)]);
    var blobURL = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobURL;
    a.download = "MaxToys.xls";
    a.click();
  };

  //-----------------------------------------End exporting-----------------------------------------------------------
  //-----------------------------------------End exporting-----------------------------------------------------------
  //-----------------------------------------End exporting-----------------------------------------------------------

  //---------------------------------For suggestions-----------------------------------

  let suggestionName = [];
  const SuggestionData = useCallback(async (nameSuggestion, fieldName) => {
    const form = new FormData();
    form.append("field_name", fieldName);
    form.append("search_term", nameSuggestion);

    const response = await axios({
      method: "post",
      url: "http://97.74.83.195/maxtoys/get_suggestions.php",
      data: form,
    });
    const obj = response.data.qboid_data
      ? response.data.qboid_data?.map((label) => ({ label }))
      : [];
    suggestionName = obj;
  });

  const [loadingSwal, setloadingSwal] = useState(false);

  const fetchImage = async (id) => {
    try {
      setloadingSwal(true);
      const form = new FormData();
      form.append("id", id);
      const response = await axios({
        method: "post",
        // url: "http://qboid.herokuapp.com/get_image_by_id.php",
        url: "http://97.74.83.195/maxtoys/get_image_by_id.php",
        data: form,
      });
      setstate(true);
      // console.log(response.data.qboid_data);
      setImage(response.data.qboid_data);
      setloadingSwal(false);
    } catch (error) {
      setloadingSwal(false);
      error.response
        ? NotificationManager.error(error.response.data.message)
        : NotificationManager.error(error.message);
    }
  };
  //---------------------------------End For suggestions-----------------------------------

  const [TotalAllData, setTotalAllData] = useState();
  const columns = [
    {
      title: "Image",
      field: "image",
      editable: "never",
      export: false,
      render: (rowData) =>
      <span style={{ display:'flex', flexDirection:'row'}}>
        {rowData.url_imgseg ? (
          <div
            onClick={(e) => {
              // setImage(rowData.url);
              setImage(rowData.url_imgseg);
              setstate(true);
            }}
          >
            <Avatar
              variant="rounded"
              // src={rowData.url}
              src={rowData.url_imgseg}
              style={{ cursor: "pointer" }}
            />
          </div>
        ) : (
          <Avatar
            variant="rounded"
            alt=""
            src=""
            style={{ cursor: "default" }}
          />
        )}
        {/* ----------------------2nd image---------------- */}
        {rowData.url ? (
          <div
            onClick={(e) => {
              setImage(rowData.url);
              setstate(true);
            }}
            style={{marginLeft:'10px'}}
          >
            <Avatar
              variant="rounded"
              // src={rowData.url}
              src={rowData.url}
              style={{ cursor: "pointer" }}
            />
          </div>
        ) : (
          <Avatar
            variant="rounded"
            alt=""
            src=""
            style={{ cursor: "default" }}
          />
        )}
        </span>
    },
    { title: "Time", field: "timestamp", editable: "never" },
    { title: "L", field: "l", cellStyle: { maxWidth: 60 }, editable: "never" },
    { title: "W", field: "w", cellStyle: { maxWidth: 60 }, editable: "never" },
    { title: "H", field: "h", cellStyle: { maxWidth: 60 }, editable: "never" },
    {
      title: "Barcode",
      field: "barcode",
      cellStyle: { maxWidth: 100 },
      editComponent: (props) => (
        <input
          type="text"
          placeholder=""
          size="10"
          style={{ border: "none", backgroundColor: "white" }}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          disabled
        />
      ),
    },
    { title: "Shape", field: "shape", editable: "never" },
    { title: "Device", field: "device", editable: "never" },
    {
      title: "Name",
      cellStyle: { minWidth: 130 },
      field: "name",
      editable: "onUpdate",
      editComponent: (props) => (
        <Autocomplete
          id="Agent Emails"
          freeSolo
          options={suggestionName}
          inputValue={props.value}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                InputProps={{ ...params.InputProps, endAdornment: null }}
                variant="standard"
                // value={}
                onChange={(e) => {
                  e.target.value && SuggestionData(e.target.value, "name");
                  props.onChange(e.target.value);
                }}
              />
            );
          }}
          onChange={(e) => {
            SuggestionData(e.target.innerText);
            props.onChange(e.target.innerText);
          }}
        />
      ),
    },
    {
      title: "Customer",
      cellStyle: { minWidth: 130 },
      field: "customer",
      editable: "onUpdate",
      editComponent: (props) => (
        <Autocomplete
          id="Agent Emails"
          freeSolo
          options={suggestionName}
          inputValue={props.value}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                InputProps={{ ...params.InputProps, endAdornment: null }}
                variant="standard"
                onChange={(e) => {
                  e.target.value && SuggestionData(e.target.value, "customer");
                  props.onChange(e.target.value);
                }}
              />
            );
          }}
          onChange={(e) => {
            SuggestionData(e.target.innerText);
            props.onChange(e.target.innerText);
          }}
        />
      ),
    },
    {
      title: "Supplier",
      cellStyle: { minWidth: 130 },
      field: "supplier",
      editable: "onUpdate",
      editComponent: (props) => (
        <Autocomplete
          id="Agent Emails"
          freeSolo
          options={suggestionName}
          inputValue={props.value}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                InputProps={{ ...params.InputProps, endAdornment: null }}
                variant="standard"
                onChange={(e) => {
                  e.target.value && SuggestionData(e.target.value, "supplier");
                  props.onChange(e.target.value);
                }}
              />
            );
          }}
          onChange={(e) => {
            SuggestionData(e.target.innerText);
            props.onChange(e.target.innerText);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <NotificationContainer />
      {loadingSwal && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            marginLeft: "50%",
            height: "100vh",
            zIndex: 1,
            position: "fixed",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {state && (
        <Lightbox
         mainSrc={image}
          onCloseRequest={() => setstate(false)} />
      )}
      {/* ----------------------------------Data Table------------------------------------ */}
      <div
        style={{
          display: "flex",
          marginTop: "0px",
          width: "100%",
          paddingRight: "2px",
          paddingLeft: "2%",
          paddingRight: "2%",
        }}
      >
        <h4 style={{ color: "#2C3E50", fontWeight: "bold" }}> MAXTOYS DATA</h4>
        <span style={{ marginLeft: "auto" }}>
          <Button
            onClick={logoutBtn}
            color="info"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{
              marginBottom: "-70px",
              paddingLeft: "20px",
              backgroundColor: "#EAEDED",
              color: "#85929E",
              paddingTop: "5px",
              paddingBottom: "5px",
              fontWeight: "bold",
              borderRadius: "5px",
              paddingRight: "20px",
            }}
          >
            <PowerSettingsNewOutlinedIcon /> &nbsp; Logout
          </Button>
        </span>
      </div>
      <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <MaterialTable
          // title="MAXTOYS DATA"
          title=""
          options={{
            search: true,
            exportFileName: "Maxtoys Data",
            rowStyle: { overflowWrap: "break-word" },
            actionsColumnIndex: -1,
            exportButton: true,
            exportAllData: true,
            exportButton: { csv: true, pdf: false },
            loadingType: "linear",
            emptyRowsWhenPaging: false,
            pageSize: pageSize,
            pageSizeOptions: [
              5,
              10,
              20,
              { value: TotalAllData > 0 ? TotalAllData : 1, label: "All" },
            ],
            exportCsv: (columns, data) => {
              tableToExcel(data);
            },
          }}
          localization={{ body: { emptyDataSourceMessage: "",
            editRow: { deleteText: 'are you really want to delete ?' } }, }}
          columns={columns}
          icons={tableIcons}
          data={(query) =>
            new Promise((resolve, reject) => {
              // let url = "http://qboid.herokuapp.com/get_request_data.php?";
              let url = "http://97.74.83.195/maxtoys/get_request_data.php?";
              url += "page_no=" + (query.page + 1);
              url += "&per_page=" + query.pageSize;
              setpageSize(query.pageSize);
              if (query.search) {
                url += "&search_term=" + query.search;
              }
              if (query.orderBy) {
                url +=
                  "&sort_type=" +
                  query.orderDirection +
                  "&colom_name=" +
                  query.orderBy.field;
              }
              fetch(url)
                .then((result) => result.json())
                .then((resp) => {
                  resolve({
                    data: resp.qboid_data, // your data array
                    page: resp.page_no ? resp.page_no - 1 : 0, // current page number
                    totalCount: resp.total ?? 0, // total row number
                  });
                  // console.log(resp.total);
                  setTotalAllData(resp.total);
                });
            })
          }
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(async (resolve, reject) => {
                const { id, name, customer, supplier } = newData;
                console.log(customer);
                try {
                  const form = new FormData();
                  form.append("id", id);
                  form.append("name", name);
                  form.append("customer", customer);
                  form.append("supplier", supplier);

                  const response = await axios({
                    method: "post",
                    url: "http://97.74.83.195/maxtoys/update_request_data.php",
                    data: form,
                  });
                  resolve();
                } catch (error) {
                  alert(error.message);
                  resolve();
                }
              }),
              onRowDelete: oldData =>
              new Promise(async(resolve, reject) => {
                console.log(oldData.id);
                try {
                  const response = await axios({
                    method: "get",
                    url: `http://97.74.83.195/maxtoys/delete.php?request_id=${oldData.id}`,
                  });
                  console.log(response);
                  resolve();
                } catch (error) {
                  alert(error.message);
                  resolve();
                }
                  resolve()
              }),
          }}
          
        />
      </div>
    </>
  );
}

export default Dashboard;
