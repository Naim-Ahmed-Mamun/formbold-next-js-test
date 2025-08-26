import { isEmpty } from "lodash";
import React from "react";

const InvoicesTable = (props) => {
  const { invoices } = props;
  return (
    <div className="mb-6 w-full rounded-[10px] bg-white shadow-fb-one">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="rounded-t-[10px] border-b border-fb-stroke">
              {/* <th className="min-w-[250px] px-6 py-5 text-left font-heading text-sm font-medium text-body-color">Plan</th> */}
              <th className="min-w-[140px] px-6 py-5 text-left font-heading text-sm font-medium text-body-color">
                Order Number / Receipt
              </th>
              <th className="min-w-[210px] px-6 py-5 text-left font-heading text-sm font-medium text-body-color">
                Date
              </th>
              <th className="min-w-[140px] px-6 py-5 text-left font-heading text-sm font-medium text-body-color">
                Status
              </th>
              <th className="min-w-[140px] px-6 py-5 text-left font-heading text-sm font-medium text-body-color">
                Total amount
              </th>
              <th className="min-w-[250px] px-6 py-5 text-right font-heading text-sm font-medium text-body-color">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices &&
              !isEmpty(invoices) &&
              invoices.map((reciept, index) => (
                <tr
                  key={reciept.transaction_id}
                  className="border-b border-stroke last-of-type:border-b-0"
                >
                  {/* <td className="p-5 text-sm text-black">invoice.product_name</td> */}
                  <td className="p-5 text-sm text-black">
                    #{reciept.transaction_id}
                  </td>
                  <td className="p-5 text-sm text-black">{reciept.paid_at}</td>
                  <td className="p-5 text-sm text-black">
                    <span className="inline-flex h-6 items-center justify-center rounded-3xl bg-fb-green/10 px-2.5 text-center text-xs text-fb-green">
                      Completed
                    </span>
                  </td>
                  <td className="p-5 text-sm text-black">{reciept.amount}</td>
                  <td className="p-5 text-right text-base">
                    <a
                      href={reciept.receipt_url}
                      className="font-sm inline-flex h-[34px] items-center rounded-[5px] bg-primary px-4 font-heading font-medium text-white duration-300 hover:bg-primary/90"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesTable;
