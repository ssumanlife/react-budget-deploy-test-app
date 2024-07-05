import { useState } from "react"
import "./App.css"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Alert from "./components/Alert"

const App = () => {
  const [charge, setCharge] = useState("")
  const [amount, setAmount] = useState(0)
  const [alert, setAlert] = useState({ show: false })
  const [id, setId] = useState("")
  const [edit, setEdit] = useState(false)

  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 1600 },
    { id: 2, charge: "교통비", amount: 400 },
    { id: 3, charge: "식비", amount: 1200 },
  ])

  const clearItems = () => {
    setExpenses([])
  }

  // 지출 항목
  const handleCharge = (e) => {
    setCharge(e.target.value)
  }

  // 비용
  const handleAmount = (e) => {
    // console.log(typeof e.target.valueAsNumber)
    setAmount(e.target.valueAsNumber)
  }

  // 리스트 삭제
  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id)
    console.log(newExpenses)
    setExpenses(newExpenses)
    handleAlert({ type: "danger", text: "아이템이 삭제되었습니다." })
  }

  // 버튼 이벤트로 alert띄우기
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 7000)
  }

  // 아이템 항목+비용 수정하기
  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id)
    const { charge, amount } = expense
    setId(id)
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
  }

  // 제출 + 수정버튼
  const handleSubmit = (e) => {
    e.preventDefault()
    if (charge !== "" && amount > 0) {
      if (edit) {
        const newExpense = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item
        })
        setExpenses(newExpense)
        setEdit(false)
        handleAlert({ type: "success", text: "아이템이 수정되었습니다." })
      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount } //charge:charge, amount:amount
        //불변성을 지켜주기 위해 새로운 expenses를 생성
        const newExpenses = [...expenses, newExpense]
        setExpenses(newExpenses)
        handleAlert({ type: "success", text: "아이템이 생성되었습니다." })
      }
      setCharge("")
      setAmount(0)
    } else {
      console.log("error")
      handleAlert({ type: "danger", text: "지출 항목은 빈 값일 수 없으며 비용은 0보다 커야합니다." })
    }
  }

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>
      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        {/* Expense Form */}
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>
      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        {/* Expense List */}
        <ExpenseList expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems} />
      </div>

      <div style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}>
        <p style={{ fontSize: "2rem" }}>
          총지출:
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount)
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  )
}
export default App
