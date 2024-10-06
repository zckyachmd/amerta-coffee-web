import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { FaArrowLeft } from "react-icons/fa";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const { orderId } = params;

    const response = await apiFetch(`/orders/${orderId}`, {}, (error) => {
      throw new Error(error.message || "Failed to fetch order details!");
    });

    const { data } = await response.json();

    return data || {};
  } catch (error: Error | any) {
    throw new Response("Failed to load order details.", {
      status: error.status || 404,
      statusText: error.message || "An unexpected error occurred.",
    });
  }
};

export const OrderDetail: React.FC = () => {
  const orderDetail = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { noInvoice, totalAmount, createdAt, items } = orderDetail;

  useDocumentTitle(`Order #${noInvoice}`);

  return (
    <main className="flex-1 w-full pt-8 px-0 py-0">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="max-w-6xl mx-auto p-4 sm:p-6" id="invoice">
          <h1 className="text-2xl md:text-md font-bold mb-4">
            Invoice #{noInvoice}
          </h1>
          <hr className="mb-6" />
          <div className="mb-6">
            <p className="text-lg font-semibold">Order Date:</p>
            <p className="text-gray-700">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <hr className="mb-4" />
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total Amount:</span>
              <span className="text-xl text-green-600">
                Rp {totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Payment Method:</span>
              <span>Cash on Delivery</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Items Ordered</h2>
          <div className="space-y-4">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="border shadow-lg rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between"
              >
                <img
                  src={
                    item.product.image_url[0] ||
                    "https://placehold.co/150x150?text=No+Image"
                  }
                  alt={item.product.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md mr-4"
                />
                <div className="flex-grow sm:mt-0 mt-4">
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600 mb-1 text-sm">
                    Rp {item.price.toLocaleString("id-ID")} x {item.quantity}
                  </p>
                </div>
                <div className="text-right flex flex-col font-semibold">
                  Rp {(item.quantity * item.price).toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              to="/orders"
              className="inline-flex text-sm items-center px-4 py-2 bg-coffee text-white hover:bg-coffee-hover font-semibold rounded-lg shadow-md"
            >
              <FaArrowLeft className="mr-2 w-3 h-3" />
              Back to Order History
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
