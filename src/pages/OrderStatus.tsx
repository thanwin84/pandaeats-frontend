import { useGetMyOrders } from "@/api/OrderApi";
import OrderCard from "@/components/order-status/OrderCard";
import Spinner from "@/components/Spinner";
import { Separator } from "@/components/ui/separator";
import Layout from "@/layouts/Layout";

type Props = {
  className?: string;
};

export default function OrderStatus({}: Props) {
    const {isLoading,myOrders} = useGetMyOrders('present')
    const {isLoading:pastOrderLoading,myOrders:pastOders} = useGetMyOrders('past')
    if (isLoading || !myOrders){
        <div>Loading....</div>
    }
  return (
    <Layout showHero={false}  className="py-4 px-4 flex flex-col gap-4 bg-gray-1-0">
        <h2 className="text-lg font-bold text-gray-500">Active Orders</h2>
        <Separator/>
        {isLoading && <Spinner/>}
        {myOrders && myOrders.length === 0 && (
          <div>
            <p className="text-center text-lg ">Your order list is empty</p>
          </div>
        )}
        {myOrders?.map(order=>(
            <OrderCard
                className="w-[90%] md:w-[80%] mx-auto"
                key={order._id}
                order={order}
            />
        ))}
        <h2 className="text-lg font-bold text-gray-500">Past Orders</h2>
        <Separator/>
        {pastOrderLoading && <Spinner />}
        {pastOders?.map(order=>(
            <OrderCard
                className="w-[90%] md:w-[80%] mx-auto"
                key={order._id}
                order={order}
            />
        ))}
    </Layout>
  );
}