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
    <div className="bg-[#030303] min-h-screen p-4">
      <div className="text-4xl text-center text-white mb-8 font-['Poppins']">
        {`${name}, ${location} on Dhun Jam`}
      </div>
      <div className="flex flex-col items-center justify-center mt-6 mb-6">
        <label className="my-2 font-['Poppins'] text-white">
          Do you want to charge your customers for requesting songs?
        </label>
        <div className="flex items-center justify-center space-x-4">
          <input
            type="radio"
            id="yes"
            name="chargeCustomers"
            value="yes"
            checked={isCharging}
            onChange={() => setIsCharging(true)}
          />
          <label htmlFor="yes" className="text-white">
            Yes
          </label>
          <input
            type="radio"
            id="no"
            name="chargeCustomers"
            value="no"
            checked={!isCharging}
            onChange={() => setIsCharging(false)}
          />
          <label htmlFor="no" className="text-white">
            No
          </label>
        </div>

        {isCharging && (
          <div className="flex justify-center items-center my-2">
            <label className="font-['Poppins'] text-white">
              Custom song request amount:
            </label>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(parseInt(e.target.value, 10))}
              className="border-2 rounded-md border-solid border-white bg-transparent w-44 text-white ml-2"
            />
          </div>
        )}

        {isCharging && (
          <div className="flex items-center justify-center my-2 space-x-4">
            <label className="font-['Poppins'] text-white">
              Regular song request amounts, from high to low:
            </label>
            {Array.from({ length: 4 }, (_, i) => (
              <input
                key={i}
                type="number"
                value={regularAmounts[`category_${i + 7}`]}
                onChange={(e) =>
                  setRegularAmounts({
                    ...regularAmounts,
                    [`category_${i + 7}`]: parseInt(e.target.value, 10),
                  })
                }
                className="border-2 rounded-md border-solid border-white bg-transparent w-12 text-white"
              />
            ))}
          </div>
        )}

        {isCharging && (
          <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
            <canvas
              id="myChart"
              ref={graphRef}
              className="w-full"
              height="400"
              style={{ border: "1px solid #FFFFFF" }}
            ></canvas>
          </div>
        )}

        <button
          onClick={handleSave}
          className="rounded-md my-8 p-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3"
          style={{
            backgroundColor: "#6741D9",
            color: "#FFFFFF",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
