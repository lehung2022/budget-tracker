import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import moment from "moment";
//   isShowTime,  length, index are three props that i passed in before. I no longer need them
import { useBudgets } from "../context/BudgetContext"; // Import the useBudgets hook

export default function BudgetCard({
  name,
  amount,
  _date,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
  onEditClick,
  hideEditButton, // Accept the hideEditButton prop
}) {
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10", "text-primary");
  } else if (gray) {
    classNames.push("bg-light", "text-primary");
  }
  console.log("Received date prop:", _date);

  function getProgressBarVariant(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
  }

  const { editBudget } = useBudgets();
  // Use the useBudgets hook
  return (
    <Card className={classNames.join(" ")}>
      <Card.Body className="col-12" style={{ width: "100%" }}>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2 text-primary">{name}</div>
          <div className="d-flex align-items-baseline text-primary">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-primary fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
          {/* Conditionally render the "Edit" button based on hideEditButton prop */}
          {!hideEditButton && (
            <Button variant="info" onClick={onEditClick}>
              Chỉnh sửa
            </Button>
          )}
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Thêm khoản chi tiêu
            </Button>
            <Button onClick={onViewExpensesClick} variant="outline-info">
              Xem khoản chi tiêu
            </Button>
          </Stack>
        )}
        {/* {isShowTime && !isShowTime ? <div>{index === length ? moment(date).format("DD/MM/YYYY h:mm:ss") : ''}</div>: ""} */}
        {_date && (
          <div className="time-view">
            {moment(_date).format("DD/MM/YYYY h:mm:ss")}
          </div>
        )}
        {/* Display the date */}
        {/*  */}
      </Card.Body>
    </Card>
  );
}
