export const GET_INVOICES = "GET_INVOICES";
export const GET_INVOICES_SUCCESS = "GET_INVOICES_SUCCESS";
export const GET_INVOICES_FAILED = "GET_INVOICES_FAILED";

export function getInvoicesData() {
  return {
    type: GET_INVOICES,
  };
}
