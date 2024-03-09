import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import moment from "moment";
export default function BudgetCard({
  isShowTime,
  index,
  length,
  name,
  amount,
  date,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}) {
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10", "text-primary");
  } else if (gray) {
    classNames.push("bg-light", "text-primary");
  }
  console.log(typeof date);
  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
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
        {isShowTime && !isShowTime ? <div>{index === length ? moment(date).format("DD/MM/YYYY h:mm:ss") : ''}</div>: ""}
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}
