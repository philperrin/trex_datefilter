/*global tableau*/

function updateDrange() {
  tableau.extensions.initializeAsync().then(() => {
    let dashboard = tableau.extensions.dashboardContent.dashboard;
    let selectedWorksheet = dashboard.worksheets.find(
      w => w.name === "Historical Trend Sheet"
    );
    console.log("Dashboard: ", dashboard);
    console.log("Worksheet: ", selectedWorksheet);
    let fieldName = "Date";
    let today = new Date();
    let mindate = new Date();

    let drange = document.getElementById("drange").value;
    console.log(drange);

    if (drange === "Year") {
      mindate.setFullYear(today.getFullYear() - 1);
    } else if (drange === "Month") {
      mindate.setMonth(today.getMonth() - 1);
    } else if (drange === "Week") {
      mindate.setDate(today.getDate() - 7);
    } else if (drange === "All") {
      mindate.setFullYear(2000, 0, 3); 
    } else if (drange === "YTD") {
      mindate.setFullYear(today.getFullYear(),0,1)
    } else if (drange === "LastCal") {
      mindate.setFullYear(today.getFullYear()-1,0,1)
      today.setFullYear(today.getFullYear()-1,11,31)
    }
//I cheated a little here, since I know the min date - clearing the filter would be better for the "All" - Keisha has a good solution, but maybe a little too robust
//I'll ponder on an easy way to clear the date filter... pull in the min date from the field?
    updateFilterRange(selectedWorksheet, fieldName, mindate, today);
  });
}

function updateFilterRange(worksheet, fieldName, mindate, today) {

  worksheet.applyRangeFilterAsync(fieldName, { min: mindate, max: today });
  console.log("Today: ", today);
  console.log("Min Date: ", mindate);
}
