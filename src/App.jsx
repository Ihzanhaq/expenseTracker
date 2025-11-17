import { Button, Card, Table } from "react-bootstrap";
import "./App.css";
import { useEffect, useState } from "react";
import {
  deleteExpense,
  getBudget,
  getExpense,
  patchBudget,
  patchExpense,
  postExpense,
} from "./services/allApi";

function App() {
  const [showExpenseInput, setShowExpenseInput] = useState(false);
  const [showBudgetInput, setShowBudgetInput] = useState(false);
  const [expense, setExpense] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [inputDetail, setInputDetail] = useState("");
  const [inputAmt, setInputAmt] = useState("");
  const [budget, setBudget] = useState(0);
  const [budgetDisplay, setBudgetDisplay] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    displayExpense();
    displayBudget();
    const total = expense.reduce(
      (acc, curr) => acc + Number(curr.expenseAmt),
      0
    );
    setTotalExpense(total);
  }, [expense, budgetDisplay]);

  const displayExpense = async () => {
    try {
      let apiResponse = await getExpense();
      if (apiResponse.status == 200) {
        setExpense(apiResponse.data);
      } else {
        alert("Error while fetching data");
      }
    } catch (error) {
      alert("Error while fetching data");
    }
  };

  const editExpense = async (id) => {
    let reqBody = { expenseDetails: inputDetail, expenseAmt: inputAmt };

    try {
      let apiResponse = await patchExpense(id, reqBody);
      if (apiResponse.status == 200) {
        displayExpense();
        setEditMode(false);
      } else {
        alert("Error occured while editing");
      }
    } catch (error) {
      alert("Error occured while editing");
    }
  };

  const addExpense = async () => {
    let reqBody = { expenseDetails: inputDetail, expenseAmt: inputAmt };
    try {
      let apiResponse = await postExpense(reqBody);
      if (apiResponse.status == 201) {
        displayExpense();
        setShowExpenseInput(false);
      } else {
        alert("Error occured while adding data");
      }
    } catch (error) {
      alert("Error while fetching data");
    }
  };

  const removeExpense = async (id) => {
    try {
      let apiResponse = await deleteExpense(id);
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        displayExpense();
      } else {
        alert("Error occured while deleting");
      }
    } catch (error) {
      alert("Error occured while deleting");
    }
  };
  const displayBudget = async () => {
    try {
      let apiResponse = await getBudget();
      setBudgetDisplay(apiResponse.data.budget);
    } catch (error) {
      alert("Error occured while fetching budget");
    }
  };
  const editBudget = async () => {
    try {
      let apiResponse = await patchBudget({ budget: budget });
      if (apiResponse.status == 200) {
        displayBudget();
        setShowBudgetInput(false);
      } else {
        alert("Error while updating budget");
      }
    } catch (error) {
      alert("Error while updating budget");
    }
  };

  return (
    <div className="pt-5 bg" style={{ height: "100vh" }}>
      <div style={{ height: "90vh" }} className="container glass rounded-5">
        <h2 className="text-center my-4">Monthly Expense Tracker</h2>
        <div className="d-flex justify-content-center container gap-3">
          <Card
            className="text-center rounded-2"
            bg={"success"}
            text={"light"}
            style={{ width: "18rem" }}
          >
            <Card.Body>
              <Card.Title>Monthly Budget</Card.Title>
              <Card.Text>₹ {budgetDisplay}</Card.Text>
              <Button
                onClick={() => {
                  setShowBudgetInput(true);
                  setShowExpenseInput(false);
                  setBudget(budgetDisplay);
                }}
                variant="light"
              >
                Set Budget
              </Button>
            </Card.Body>
          </Card>
          <Card
            className="text-center rounded-2"
            bg={"danger"}
            text={"light"}
            style={{ width: "18rem" }}
          >
            <Card.Body>
              <Card.Title>Total Expense</Card.Title>
              <Card.Text>
                ₹{" "}
                {expense.reduce(
                  (acc, curr) => acc + Number(curr.expenseAmt),
                  0
                )}{" "}
              </Card.Text>
              <Button
                onClick={() => {
                  setShowExpenseInput(true);
                  setShowBudgetInput(false);
                  setInputDetail("");
                  setInputAmt("");
                }}
                variant="light"
              >
                Add New Expense
              </Button>
            </Card.Body>
          </Card>
          <Card
            className="text-center rounded-2 justify-content"
            bg={"secondary"}
            text={"light"}
            style={{ width: "18rem" }}
          >
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title>Remaining Budget</Card.Title>
              <Card.Text style={{ fontSize: "2rem" }}>
                ₹ {budgetDisplay - totalExpense}{" "}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="container d-flex justify-content-center gap-3 mt-3">
          {showExpenseInput ? (
            <>
              {" "}
              <input
                type="text"
                className="form-control w-25"
                placeholder="Enter Expense Details"
                onChange={(e) => setInputDetail(e.target.value)}
                value={inputDetail}
              />
              <input
                type="text"
                className="form-control w-25"
                placeholder="Enter Expense Amount"
                onChange={(e) => setInputAmt(e.target.value)}
                value={inputAmt}
              />
              {editMode ? (
                <button
                  onClick={() => {
                    editExpense(editData.id);
                    setShowExpenseInput(false);
                  }}
                  className="btn btn-warning"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => addExpense()}
                  className="btn btn-secondary"
                >
                  Add
                </button>
              )}
            </>
          ) : (
            ""
          )}
          {showBudgetInput ? (
            <>
              <input
                type="text"
                className="form-control w-25"
                placeholder="Set Budget Amount"
                onChange={(e) => setBudget(e.target.value)}
                value={budget}
              />
              <button onClick={editBudget} className="btn btn-secondary">
                Set Budget
              </button>
            </>
          ) : (
            ""
          )}
        </div>
        <div
          className="d-flex justify-content-center mt-3"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          <Table
            className="w-75 rounded-3 overflow-hidden"
            striped
            bordered
            hover
          >
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Expense Detail</th>
                <th>Expense Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expense.map((eachExpense, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{eachExpense.expenseDetails}</td>
                  <td>{eachExpense.expenseAmt}</td>
                  <td>
                    <button
                      onClick={() => {
                        setShowExpenseInput(true);
                        setEditMode(true);
                        setInputAmt(eachExpense.expenseAmt);
                        setInputDetail(eachExpense.expenseDetails);
                        setEditData(eachExpense);
                      }}
                      className="btn btn-warning mx-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeExpense(eachExpense.id)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;
