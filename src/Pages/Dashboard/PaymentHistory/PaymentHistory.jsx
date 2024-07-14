import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const {user} = useAuth(); 
    const axiosSecure = useAxiosSecure(); 
    
    const {data : payments = [] } = useQuery({
        queryKey : ['payments', user?.email],
        queryFn : async ()=> {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data; 
        }
    
    })
    // console.log(payments);
  return (
    <section>
      <div className="mx-auto text-center w-1/2 my-2">
        <p className="text-yellow-600 mb-2 text-xl">---At a Glance!---</p>
        <h3 className="text-5xl uppercase border-y-4 py-4">Payment History</h3>
      </div>

      <div>
        <h2 className="text-4xl">Total Payments : {payments.length}</h2>
        <table className="table mt-3">
        <thead className="bg-[#D1A054] text-white uppercase py-2 text-xl ">
            <tr>
             
              <th>Email</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

            {
                payments.map(payment => <tr key={payment._id}>
                    <td>{payment.email}</td>
                    <td>${payment.price}</td>
                    <td>{payment.transactionId}</td>
                    <td>{payment.date.split('T')[0]}</td>
                    <td>{payment.status}</td>

                </tr>)
            }

          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PaymentHistory;
