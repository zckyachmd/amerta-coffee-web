import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export const loader = async (): Promise<any> => {
  try {
    const response = await apiFetch("/orders", {}, (error) => {
      throw new Error(error.message || "Failed to fetch order history!");
    });

    const data = await response.json();
    return data.data;
  } catch (error: Error | any) {
    throw new Response("Failed to load order history.", {
      status: error.status || 404,
      statusText: error.message || "An unexpected error occurred.",
    });
  }
};

export const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const orders = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  useDocumentTitle('Order History');

  return (
    <main className="flex-1 w-full pt-8 px-0 py-0">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl md:text-md font-bold mb-4">Order History</h1>
          <hr className="mb-6" />

          {orders.length > 0 ? (
            <Table>
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2">Invoice No.</th>
                  <th className="text-left p-2">Order Date</th>
                  <th className="text-left p-2">Total Amount</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-2">{order.noInvoice}</td>
                    <td className="p-2">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="p-2">
                      Rp {order.totalAmount.toLocaleString("id-ID")}
                    </td>
                    <td className="p-2">
                      <Button
                        variant="link"
                        className="text-blue-500 hover:underline flex items-center"
                        onClick={() => {
                          navigate(`/order/${order.id}`);
                        }}
                      >
                        <FaEye className="mr-1" /> View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </div>

        <div className="sm:ml-11 ml-0 mt-6">
          <Link
            to="/products"
            className="inline-flex text-sm items-center px-4 py-2 bg-coffee text-white hover:bg-coffee-hover font-semibold rounded-lg shadow-md"
          >
            <FaShoppingCart className="mr-2 w-3 h-3" />
            Buy More Coffee
          </Link>
        </div>
      </div>
    </main>
  );
};
