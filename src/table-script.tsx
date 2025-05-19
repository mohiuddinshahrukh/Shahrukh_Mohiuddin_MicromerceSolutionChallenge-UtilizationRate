import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import sourceData from "./source-data.json";
import type { SourceDataType, TableDataType } from "./types";

/**
 * Example of how a tableData object should be structured.
 *
 * Each `row` object has the following properties:
 * @prop {string} person - The full name of the employee.
 * @prop {number} past12Months - The value for the past 12 months.
 * @prop {number} y2d - The year-to-date value.
 * @prop {number} may - The value for May.
 * @prop {number} june - The value for June.
 * @prop {number} july - The value for July.
 * @prop {number} netEarningsPrevMonth - The net earnings for the previous month.
 */

const tableData: TableDataType[] = (sourceData as unknown as SourceDataType[]).map((dataRow, index) => {
  // Added last name so we know who we are looking at, if there's 3 shahrukhs, we can distinguish them by their last names (hopefully)

  // Here, the data contains teams (which is not a person) as-well, we need to filter the data this means. 
  const person = dataRow?.employees ? `${dataRow?.employees?.name}` : `${dataRow?.externals?.name}`;
  const pastTwelveMonths = `${dataRow?.employees?.workforceUtilisation?.utilisationRateLastTwelveMonths}`;

  /* Add serial number to know how many instances i have and which instance i am currently looking at.
   This also helps in sorting the instances asc/desc depending on how i want to look at the data/ show it to an interested party*/

  const row: TableDataType = {
    serialNumber: index + 1,
    person: `${person}`,
    past12Months: `past12Months ${index} placeholder`,
    y2d: `y2d ${pastTwelveMonths} placeholder`,
    may: `may ${index} placeholder`,
    june: `june ${index} placeholder`,
    july: `july ${index} placeholder`,
    netEarningsPrevMonth: `netEarningsPrevMonth ${index} placeholder`,
  };

  return row;
});

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<TableDataType>[]>(
    () => [
      {
        accessorKey: "serialNumber",
        header: "Serial #",
      },
      {
        accessorKey: "person",
        header: "Person",
      },
      {
        accessorKey: "past12Months",
        header: "Past 12 Months",
      },
      {
        accessorKey: "y2d",
        header: "Y2D",
      },
      {
        accessorKey: "may",
        header: "May",
      },
      {
        accessorKey: "june",
        header: "June",
      },
      {
        accessorKey: "july",
        header: "July",
      },
      {
        accessorKey: "netEarningsPrevMonth",
        header: "Net Earnings Prev Month",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
