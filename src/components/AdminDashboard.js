import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Chart from "chart.js/auto";
import {
  getAdminDetailsAsync,
  updatePriceAsync,
} from "../redux/adminDashboardSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const id = useSelector((store) => store.auth.user);
  const graphRef = useRef(null);
  // State for fetched data
  const [name, setSocial] = useState("");
  const [location, setHebbal] = useState("");
  const [isCharging, setIsCharging] = useState(null);
  const [customAmount, setCustomAmount] = useState(0);
  const [regularAmounts, setRegularAmounts] = useState({
    category_7: 0,
    category_8: 0,
    category_9: 0,
    category_10: 0,
  });

  // State for graph visibility
  const [isGraphVisible, setIsGraphVisible] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getAdminDetailsAsync(id)); // Replace 4 with the actual admin ID received from login response
  }, [dispatch]);

  // Get data from the Redux store
  const adminDetails = useSelector(
    (store) => store.adminDashboard.adminDetails
  );
  console.log(adminDetails);
  // Update local state when adminDetails change
  useEffect(() => {
    if (adminDetails) {
      setSocial(adminDetails.name);
      setHebbal(adminDetails.location);
      setIsCharging(adminDetails.charge_customers);
      setCustomAmount(adminDetails.amount.category_6);
      setRegularAmounts({
        category_7: adminDetails.amount.category_7,
        category_8: adminDetails.amount.category_8,
        category_9: adminDetails.amount.category_9,
        category_10: adminDetails.amount.category_10,
      });
    }
  }, [adminDetails]);

  useEffect(() => {
    if (graphRef.current) {
      const ctx = graphRef.current.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Custom",
            "Category 1",
            "Category 2",
            "Category 3",
            "Category 4",
          ],
          datasets: [
            {
              label: "Song Request Amounts",
              data: [
                customAmount,
                regularAmounts.category_7,
                regularAmounts.category_8,
                regularAmounts.category_9,
                regularAmounts.category_10,
              ],
              backgroundColor: [
                "#F0C3F1",
                "#F0C3F1",
                "#F0C3F1",
                "#F0C3F1",
                "#F0C3F1",
              ],
            },
          ],
        },
        options: {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
          indexAxis: "x", // Specify the bar chart is vertical
          elements: {
            bar: {
              barPercentage: 0.2, // Adjust this value to control the bar width
            },
          },
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [customAmount, regularAmounts]);

  const handleSave = () => {
    if (isCharging) {
      const updatedAdmin = {
        name, // Add other fields as needed
        location,
        charge_customers: isCharging,
        amount: {
          category_6: customAmount,
          category_7: regularAmounts.category_7,
          category_8: regularAmounts.category_8,
          category_9: regularAmounts.category_9,
          category_10: regularAmounts.category_10,
        },
      };

      dispatch(updatePriceAsync(id, updatedAdmin));
    }
  };

  return (
    <div className="bg-[#030303] h-screen">
      <div className="text-4xl text-center text-white mb-8 font-['Poppins']">
        {`${name}, ${location} on Dhun Jam`}
      </div>
      <center>
        <div className="flex items-center justify-center mt-6 ">
          <label
            className="mr-28 my-2 font-['Poppins']"
            style={{ fontSize: "16px", color: "#FFFFFF" }}
          >
            Do you want to charge your <br /> customers for requesting songs?
          </label>
          <div className="mx-4">
            <input
              type="radio"
              id="yes"
              name="chargeCustomers"
              value="yes"
              checked={isCharging}
              onChange={() => setIsCharging(true)}
              style={{ backgroundColor: "#FFFFFF" }}
            />
            <label htmlFor="yes" style={{ fontSize: "16px", color: "#FFFFFF" }}>
              Yes
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="no"
              name="chargeCustomers"
              value="no"
              checked={!isCharging}
              onChange={() => setIsCharging(false)}
              style={{ backgroundColor: "#FFFFFF" }}
            />
            <label htmlFor="no" style={{ fontSize: "16px", color: "#FFFFFF" }}>
              No
            </label>
          </div>
        </div>

        {isCharging && (
          <div className="flex justify-center items-center mx-auto my-2 md:ml-28 mr-6 font-['Poppins']">
            <label style={{ fontSize: "16px", color: "#FFFFFF" }}>
              Custom song request amount:
            </label>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(parseInt(e.target.value, 10))}
              className="border-2 rounded-md border-solid border-white bg-transparent w-44 text-white ml-20 "
            />
          </div>
        )}

        {isCharging && (
          <div className="flex items-center justify-center my-2">
            <label
              className="md:ml-40 font-['Poppins']"
              style={{ fontSize: "16px", color: "#FFFFFF" }}
            >
              Regular song request amounts, <br /> from high to low:
            </label>
            <div className="md:ml-20 mr-14">
              <input
                type="number"
                value={regularAmounts.category_7}
                onChange={(e) =>
                  setRegularAmounts({
                    ...regularAmounts,
                    category_7: parseInt(e.target.value, 10),
                  })
                }
                className="border-2 rounded-md border-solid border-white bg-transparent w-12 text-white ml-1 "
              />
              <input
                type="number"
                value={regularAmounts.category_8}
                onChange={(e) =>
                  setRegularAmounts({
                    ...regularAmounts,
                    category_8: parseInt(e.target.value, 10),
                  })
                }
                className="border-2 rounded-md border-solid border-white bg-transparent  w-12 text-white ml-1 "
              />
              <input
                type="number"
                value={regularAmounts.category_9}
                onChange={(e) =>
                  setRegularAmounts({
                    ...regularAmounts,
                    category_9: parseInt(e.target.value, 10),
                  })
                }
                className="border-2 rounded-md border-solid border-white bg-transparent w-12 text-white ml-1"
              />
              <input
                type="number"
                value={regularAmounts.category_10}
                onChange={(e) =>
                  setRegularAmounts({
                    ...regularAmounts,
                    category_10: parseInt(e.target.value, 10),
                  })
                }
                className="border-2 rounded-md border-solid border-white bg-transparent w-12 text-white ml-1 "
              />
            </div>
          </div>
        )}

        {isCharging && (
          <div className="w-[600px]">
            {/* <label style={{ fontSize: "16px", color: "#FFFFFF" }}>Graph:</label> */}
            <canvas
              id="myChart"
              ref={graphRef}
              width="600"
              height="400"
              style={{ border: "1px solid #FFFFFF" }}
            ></canvas>
          </div>
        )}

        <button
          onClick={handleSave}
          className="rounded-md my-8 p-2"
          style={{
            backgroundColor: "#6741D9",
            color: "#FFFFFF",
            width: "600px",
            marginTop: "10px",
          }}
        >
          Save
        </button>

        <style>
          {`
input[disabled] {
background-color: #c2c2c2;
color: #c2c2c2;
}
`}
        </style>
      </center>
    </div>
  );
};

export default AdminDashboard;
