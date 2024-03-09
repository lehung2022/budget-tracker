import { useBudgets } from "../context/BudgetContext"
import BudgetCard from "./BudgetCard"

export default function TotalBudget() {
  const { expenses, budgets } = useBudgets()
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const max = budgets.reduce((total, budget) => total + budget.max, 0)
  if (max === 0) return null
  return <BudgetCard isShowTime={false} amount={amount} name="Tổng cộng" gray max={max} hideButtons />
}