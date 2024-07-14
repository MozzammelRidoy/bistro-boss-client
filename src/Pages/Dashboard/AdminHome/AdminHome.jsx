import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaWallet } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from "recharts";
import { PieChart, Pie } from "recharts";
import { FaBox, FaTruck, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  //for pie charts

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map(data => {
    return {name : data.category, value : data.totalRevinue}
  })

  return (
    <section>
      <h2 className="text-3xl ">
        Hi, Welcome {user?.displayName ? user.displayName : "Back"}
      </h2>

      <div className="grid grid-cols-4 gap-4 text-white mt-6">
        <div className="flex items-center justify-evenly p-5 rounded-lg bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF]">
          <FaWallet className="text-3xl"></FaWallet>
          <div>
            <p className="text-4xl font-semibold">{stats.revinue}</p>
            <p>Revinue</p>
          </div>
        </div>
        <Link to={"/dashboard/users"}>
          <div className="flex items-center justify-evenly p-5 rounded-lg bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]">
            <FaUsers className="text-3xl"></FaUsers>
            <div>
              <p className="text-4xl font-semibold">{stats.users}</p>
              <p>Customers</p>
            </div>
          </div>
        </Link>
        <Link to={"/dashboard/manageItems"}>
          <div className="flex items-center justify-evenly p-5 rounded-lg bg-gradient-to-r from-[#FE4880] to-[#FECDE9]">
            <FaBox className="text-3xl"></FaBox>
            <div>
              <p className="text-4xl font-semibold">{stats.menuItems}</p>
              <p>Product</p>
            </div>
          </div>
        </Link>
        <div className="flex items-center justify-evenly p-5 rounded-lg bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF]">
          <FaTruck className="text-3xl"></FaTruck>
          <div>
            <p className="text-4xl font-semibold">{stats.orders}</p>
            <p>Order</p>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-6">
        <div className="w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip></Tooltip>
            <Bar
              dataKey="totalQuantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div className="w-1/2">

        <PieChart width={400} height={300}>
          <Legend layout="horizontal" verticalAlign="top"></Legend>

          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            >
            {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
            <Tooltip></Tooltip>
        </PieChart>
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
